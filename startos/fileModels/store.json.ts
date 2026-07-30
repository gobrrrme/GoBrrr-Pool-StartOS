import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// StartOS-level state. The RPC password is generated once at install and
// handed to bitcoind via the generate-rpc-dependent task; ckpool reads it
// from here on every start.
const shape = z.object({
  rpcPassword: z.string().optional().catch(undefined),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: '/store.json' },
  shape,
)
