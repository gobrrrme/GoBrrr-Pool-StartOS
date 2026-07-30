// Constants and helpers shared across this package's startos/ code.

/** Port the web dashboard listens on inside the webui container */
export const uiPort = 3000

/** Standard stratum port (vardiff from startDifficulty) */
export const stratumPort = 3333

/** High-difficulty stratum port (fixed minimum difficulty = highDiff setting) */
export const stratumHighDiffPort = 4444

/** RPC username created on the Bitcoin node for this service */
export const rpcUser = 'gobrrr_pool'

/** Coinbase signature of blocks found by this pool (max 32 chars, fixed) */
export const poolSignature = 'GoBrrrPool_start9'

/** Public mempool API used when the local Mempool service is not installed */
export const mempoolPublicApi = 'https://mempool.space/api'

/** Split a "<host>:<port>" bridge address */
export const hostPort = (addr: string) => {
  const i = addr.lastIndexOf(':')
  return { host: addr.slice(0, i), port: Number(addr.slice(i + 1)) }
}
