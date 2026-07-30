import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// Pool tuning written by the Settings action; main.ts maps these to the env
// vars the ckpool entrypoint consumes.
const shape = z.object({
  poolSignature: z.string().max(32).catch('GoBrrrPool'),
  startDifficulty: z.number().int().min(1).catch(10000),
  minDifficulty: z.number().int().min(1).catch(1),
  maxDifficulty: z.number().int().min(0).catch(0),
  highDiff: z.number().int().min(1).catch(1000000),
  blockPollMs: z.number().int().min(10).catch(50),
  updateIntervalSec: z.number().int().min(5).catch(20),
})

export const settingsJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: '/settings.json' },
  shape,
)
