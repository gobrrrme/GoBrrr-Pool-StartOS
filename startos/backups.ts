import { cp, rm } from 'fs/promises'
import { sdk } from './sdk'

// ckpool persists pool totals and per-user/worker stats (incl. best shares) in
// pool/ and users/ under its log dir and reloads them on start. The logs volume
// itself isn't backed up — ckpool.log grows by gigabytes — so the stats dirs
// are staged into the main volume around backup and restore. Backups made
// before this staging existed simply have nothing to restore.
const statsDirs = ['users', 'pool']
const staged = (dir: string) => sdk.volumes.main.subpath(`ckpool-stats/${dir}`)
const live = (dir: string) => sdk.volumes.logs.subpath(dir)

export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.ofVolumes('main', 'startos')
      .setPreBackup(async () => {
        await rm(sdk.volumes.main.subpath('ckpool-stats'), {
          recursive: true,
          force: true,
        })
        for (const dir of statsDirs) {
          await cp(live(dir), staged(dir), { recursive: true }).catch(
            (e) => {
              if (e.code !== 'ENOENT') throw e
            },
          )
        }
      })
      .setPostRestore(async () => {
        for (const dir of statsDirs) {
          await cp(staged(dir), live(dir), { recursive: true }).catch(
            (e) => {
              if (e.code !== 'ENOENT') throw e
            },
          )
        }
      }),
)
