import { generateRpcUserDependent } from 'bitcoin-core-startos/startos/actions/generateRpcUserDependent'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { rpcUser } from '../utils'

// One-shot task at install/restore: have bitcoind create a stable rpcauth
// user for us. Not an 'input-not-matches' task — the action has no prefill,
// so a condition would re-prompt forever.
export const taskRpcCredentials = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install' && kind !== 'restore') return

  const rpcPassword = (await storeJson.read().once())?.rpcPassword
  if (!rpcPassword) return

  await sdk.action.createTask(
    effects,
    'bitcoind',
    generateRpcUserDependent,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [{ username: rpcUser, password: rpcPassword }],
        set: { username: rpcUser, password: rpcPassword },
      },
      reason: i18n(
        'Create RPC credentials on your Bitcoin node for GoBrrr Pool',
      ),
    },
  )
})
