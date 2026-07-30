import {
  rpcHostId,
  rpcPort,
  zmqHostId,
  zmqPortBlock,
} from 'bitcoin-core-startos/startos/utils'
import {
  mainHostId as mempoolMainHostId,
  uiPort as mempoolUiPort,
} from 'mempool-startos/startos/utils'
import { settingsJson } from './fileModels/settings.json'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  hostPort,
  mempoolPublicApi,
  poolSignature,
  rpcUserPrefix,
  stratumHighDiffPort,
  stratumPort,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting GoBrrr Pool!'))

  const settings = (await settingsJson.read().const(effects))!
  const store = await storeJson.read().const(effects)

  const rpcAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'bitcoind',
      hostId: rpcHostId,
      internalPort: rpcPort,
      ssl: false,
    })
    .const()
  // bitcoind's zmq host only exists once zmqEnabled is set — null until the
  // autoconfig task has been completed. ckpool then falls back to polling.
  const zmqAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'bitcoind',
      hostId: zmqHostId,
      internalPort: zmqPortBlock,
    })
    .const()
  const mempoolAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'mempool',
      hostId: mempoolMainHostId,
      internalPort: mempoolUiPort,
      ssl: false,
    })
    .const()

  const rpc = hostPort(rpcAddr ?? `127.0.0.1:${rpcPort}`)
  const bitcoinEnv = {
    BITCOIN_RPC_HOST: rpc.host,
    BITCOIN_RPC_PORT: String(rpc.port),
    BITCOIN_RPC_USER: store?.rpcUsername ?? rpcUserPrefix,
    BITCOIN_RPC_PASS: store?.rpcPassword ?? '',
  }

  const sharedMounts = () =>
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'sockets',
        subpath: null,
        mountpoint: '/tmp/ckpool',
        readonly: false,
      })
      .mountVolume({
        volumeId: 'logs',
        subpath: null,
        mountpoint: '/var/log/ckpool',
        readonly: false,
      })

  return sdk.Daemons.of(effects)
    .addDaemon('ckpool', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'ckpool' },
        sharedMounts(),
        'ckpool',
      ),
      exec: {
        // stratum connections are file descriptors — raise the limit first
        command: [
          '/bin/sh',
          '-c',
          'ulimit -n 65535 2>/dev/null || true; exec /docker-entrypoint.sh',
        ],
        env: {
          ...bitcoinEnv,
          ...(zmqAddr ? { BITCOIN_ZMQ_HASHBLOCK: `tcp://${zmqAddr}` } : {}),
          POOL_SIGNATURE: poolSignature,
          STRATUM_PORT: String(stratumPort),
          STRATUM_HIGHDIFF_PORT: String(stratumHighDiffPort),
          START_DIFFICULTY: String(settings.startDifficulty),
          MIN_DIFFICULTY: String(settings.minDifficulty),
          MAX_DIFFICULTY: String(settings.maxDifficulty),
          HIGHDIFF: String(settings.highDiff),
          BLOCKPOLL: String(settings.blockPollMs),
          UPDATE_INTERVAL: String(settings.updateIntervalSec),
          TZ: 'UTC',
        },
      },
      ready: {
        display: i18n('Stratum'),
        gracePeriod: 30_000,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, stratumPort, {
            successMessage: i18n('The stratum server is ready for miners'),
            errorMessage: i18n('The stratum server is not ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('webui', {
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'webui' },
        sharedMounts().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/app/data',
          readonly: false,
        }),
        'webui',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          ...bitcoinEnv,
          PORT: String(uiPort),
          NODE_ENV: 'production',
          CKPOOL_SOCKET_DIR: '/tmp/ckpool',
          CKPOOL_LOGS_DIR: '/var/log/ckpool',
          STRATUM_PORT: String(stratumPort),
          MEMPOOL_API_URL: mempoolAddr
            ? `http://${mempoolAddr}/api`
            : mempoolPublicApi,
          TZ: 'UTC',
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['ckpool'],
    })
    .addDaemon('log-rotate', {
      // ckpool never rotates its log (~85 MB/day under load); it opens the log
      // in append mode, so truncating while it runs is safe.
      subcontainer: sdk.SubContainer.of(
        effects,
        { imageId: 'webui' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'logs',
          subpath: null,
          mountpoint: '/var/log/ckpool',
          readonly: false,
        }),
        'log-rotate',
      ),
      exec: {
        command: [
          '/bin/sh',
          '-c',
          'while true; do sz=$(stat -c %s /var/log/ckpool/ckpool.log 2>/dev/null || echo 0); if [ "$sz" -gt 52428800 ]; then cp /var/log/ckpool/ckpool.log /var/log/ckpool/ckpool.log.1 && truncate -s 0 /var/log/ckpool/ckpool.log; fi; sleep 3600; done',
        ],
      },
      ready: {
        display: null,
        fn: () => ({ result: 'success' as const, message: null }),
      },
      requires: [],
    })
})
