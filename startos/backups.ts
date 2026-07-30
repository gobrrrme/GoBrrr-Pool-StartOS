import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(
  // logs and sockets are deliberately excluded: sockets are ephemeral and
  // ckpool.log would bloat every backup.
  async ({ effects }) => sdk.Backups.ofVolumes('main', 'startos'),
)
