import { utils } from '@start9labs/start-sdk'
import { settingsJson } from '../fileModels/settings.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { rpcUserPrefix } from '../utils'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await settingsJson.merge(effects, {})

  const store = await storeJson.read().once()
  if (!store?.rpcPassword) {
    // fresh install; charsets restricted to generate-rpc-dependent's patterns
    await storeJson.merge(effects, {
      rpcUsername: `${rpcUserPrefix}_${utils.getDefaultString({ charset: 'a-z,0-9', len: 4 })}`,
      rpcPassword: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 }),
    })
  } else if (!store.rpcUsername) {
    // install predating stored usernames — its rpcauth entry used the bare prefix
    await storeJson.merge(effects, { rpcUsername: rpcUserPrefix })
  } else {
    await storeJson.merge(effects, {})
  }
})
