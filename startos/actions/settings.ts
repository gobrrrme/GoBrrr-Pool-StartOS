import { settingsJson } from '../fileModels/settings.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
const { InputSpec, Value } = sdk

const settingsInputSpec = InputSpec.of({
  poolSignature: Value.text({
    name: i18n('Pool Signature'),
    description: i18n(
      'Short text embedded in the coinbase of blocks found by this pool',
    ),
    required: true,
    default: 'GoBrrrPool',
    patterns: [
      {
        regex: '^.{1,32}$',
        description: i18n('Between 1 and 32 characters'),
      },
    ],
  }),
  startDifficulty: Value.number({
    name: i18n('Start Difficulty'),
    description: i18n(
      'Initial share difficulty for new miners, before vardiff adjusts',
    ),
    required: true,
    default: 10000,
    integer: true,
    min: 1,
  }),
  minDifficulty: Value.number({
    name: i18n('Minimum Difficulty'),
    description: i18n('Lowest difficulty vardiff will assign'),
    required: true,
    default: 1,
    integer: true,
    min: 1,
  }),
  maxDifficulty: Value.number({
    name: i18n('Maximum Difficulty'),
    description: i18n('Highest difficulty vardiff will assign (0 = unlimited)'),
    required: true,
    default: 0,
    integer: true,
    min: 0,
  }),
  highDiff: Value.number({
    name: i18n('High-Diff Port Difficulty'),
    description: i18n('Fixed minimum difficulty on the high-diff stratum port'),
    required: true,
    default: 1000000,
    integer: true,
    min: 1,
  }),
  blockPollMs: Value.number({
    name: i18n('Block Poll Interval (ms)'),
    description: i18n(
      'How often to poll Bitcoin for new blocks, in milliseconds (fallback when ZMQ is unavailable)',
    ),
    required: true,
    default: 50,
    integer: true,
    min: 10,
  }),
  updateIntervalSec: Value.number({
    name: i18n('Work Update Interval (seconds)'),
    description: i18n('How often to generate fresh work for miners, in seconds'),
    required: true,
    default: 20,
    integer: true,
    min: 5,
  }),
})

export const settings = sdk.Action.withInput(
  'settings',

  {
    name: i18n('Settings'),
    description: i18n('Pool signature and difficulty tuning'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  settingsInputSpec,

  async ({ effects }) => (await settingsJson.read().once()) ?? undefined,

  async ({ effects, input }) => {
    await settingsJson.merge(effects, input)
    return {
      version: '1',
      title: i18n('Success'),
      message: i18n('Settings saved. GoBrrr Pool will restart to apply them.'),
      result: null,
    }
  },
)
