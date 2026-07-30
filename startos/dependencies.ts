import { autoconfig } from 'bitcoin-core-startos/startos/actions/config/autoconfig'
import {
  mainHostId as mempoolMainHostId,
  uiPort as mempoolUiPort,
} from 'mempool-startos/startos/utils'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  // A pruned bitcoind binds RPC to localhost only (unreachable over the
  // bridge), and the zmq host doesn't exist until zmqEnabled is set.
  await sdk.action.createTask(effects, 'bitcoind', autoconfig, 'critical', {
    input: {
      kind: 'partial',
      accept: [{ prune: 0, zmqEnabled: true }],
      set: { prune: 0, zmqEnabled: true },
    },
    when: { condition: 'input-not-matches', once: false },
    reason: i18n(
      'The Bitcoin service only exposes RPC to other services when pruning is disabled. GoBrrr Pool needs RPC access and ZMQ block notifications.',
    ),
  })

  const mempoolAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'mempool',
      hostId: mempoolMainHostId,
      internalPort: mempoolUiPort,
      ssl: false,
    })
    .const()

  return {
    ...(mempoolAddr
      ? {
          mempool: {
            kind: 'running' as const,
            versionRange: '>=3.3.1:0',
            healthChecks: [],
          },
        }
      : {}),
    bitcoind: {
      kind: 'running',
      versionRange: '>=28.4:14',
      healthChecks: ['bitcoind', 'sync-progress'],
    },
  }
})
