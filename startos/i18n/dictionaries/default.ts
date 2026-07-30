export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting GoBrrr Pool!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  Stratum: 4,
  'The stratum server is ready for miners': 5,
  'The stratum server is not ready': 6,
  // interfaces.ts
  'Web UI': 7,
  'The GoBrrr Pool dashboard': 8,
  'Miner connection point. Username: your Bitcoin address, optionally followed by .workername. Password: anything': 9,
  'Stratum High-Diff': 10,
  'Stratum port with a very high fixed minimum difficulty, for large farms and hashrate rentals': 11,
  // dependencies.ts
  'The Bitcoin service only exposes RPC to other services when pruning is disabled. GoBrrr Pool needs RPC access and ZMQ block notifications.': 12,
  // init/taskRpcCredentials.ts
  'Create RPC credentials on your Bitcoin node for GoBrrr Pool': 13,
  // actions/settings.ts
  Settings: 14,
  'Difficulty and work generation tuning': 15,
  'Start Difficulty': 19,
  'Initial share difficulty for new miners, before vardiff adjusts': 20,
  'Minimum Difficulty': 21,
  'Lowest difficulty vardiff will assign': 22,
  'Maximum Difficulty': 23,
  'Highest difficulty vardiff will assign (0 = unlimited)': 24,
  'High-Diff Port Difficulty': 25,
  'Fixed minimum difficulty on the high-diff stratum port': 26,
  'Block Poll Interval (ms)': 27,
  'How often to poll Bitcoin for new blocks, in milliseconds (fallback when ZMQ is unavailable)': 28,
  'Work Update Interval (seconds)': 29,
  'How often to generate fresh work for miners, in seconds': 30,
  Success: 31,
  'Settings saved. GoBrrr Pool will restart to apply them.': 32,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
