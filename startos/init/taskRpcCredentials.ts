import { generateRpcUserDependent } from 'bitcoin-core-startos/startos/actions/generateRpcUserDependent'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// One-shot task at install/restore: have bitcoind create a stable rpcauth
// user for us. Not an 'input-not-matches' task — the action has no prefill,
// so a condition would re-prompt forever.
export const taskRpcCredentials = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install' && kind !== 'restore') return

  const store = await storeJson.read().once()
  if (!store?.rpcUsername || !store.rpcPassword) return

  await sdk.action.createTask(
    effects,
    'bitcoind',
    generateRpcUserDependent,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [{ username: store.rpcUsername, password: store.rpcPassword }],
        set: { username: store.rpcUsername, password: store.rpcPassword },
      },
      reason: i18n(
        'Create RPC credentials on your Bitcoin node for GoBrrr Pool',
      ),
    },
  )
})
