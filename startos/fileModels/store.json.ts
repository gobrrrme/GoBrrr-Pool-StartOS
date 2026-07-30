import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// StartOS-level state. The RPC credentials are generated once at install and
// handed to bitcoind via the generate-rpc-dependent task; ckpool reads them
// from here on every start. The username carries a per-install random suffix:
// bitcoind's task errors on an existing username, so a reinstall must not
// collide with the rpcauth entry a previous install left behind.
const shape = z.object({
  rpcUsername: z.string().optional().catch(undefined),
  rpcPassword: z.string().optional().catch(undefined),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: '/store.json' },
  shape,
)
