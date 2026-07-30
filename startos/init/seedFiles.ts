import { utils } from '@start9labs/start-sdk'
import { settingsJson } from '../fileModels/settings.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await settingsJson.merge(effects, {})

  const store = await storeJson.read().once()
  if (!store?.rpcPassword) {
    // charset restricted to generate-rpc-dependent's password pattern
    await storeJson.merge(effects, {
      rpcPassword: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 }),
    })
  } else {
    await storeJson.merge(effects, {})
  }
})
