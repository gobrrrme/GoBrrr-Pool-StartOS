import { i18n } from './i18n'
import { sdk } from './sdk'
import { stratumHighDiffPort, stratumPort, uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui')
  const uiOrigin = await uiMulti.bindPort(uiPort, { protocol: 'http' })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'webui',
    description: i18n('The GoBrrr Pool dashboard'),
    type: 'ui',
    schemeOverride: null,
    masked: false,
    username: null,
    path: '',
    query: {},
  })
  const uiReceipt = await uiOrigin.export([ui])

  const stratumMulti = sdk.MultiHost.of(effects, 'stratum')
  const stratumOrigin = await stratumMulti.bindPort(stratumPort, {
    protocol: null,
    preferredExternalPort: stratumPort,
    addSsl: null,
    secure: { ssl: false },
  })
  const stratum = sdk.createInterface(effects, {
    name: i18n('Stratum'),
    id: 'stratum',
    description: i18n(
      'Miner connection point. Username: your Bitcoin address, optionally followed by .workername. Password: anything',
    ),
    type: 'p2p',
    schemeOverride: null,
    masked: false,
    username: null,
    path: '',
    query: {},
  })
  const stratumReceipt = await stratumOrigin.export([stratum])

  const highDiffMulti = sdk.MultiHost.of(effects, 'stratum-highdiff')
  const highDiffOrigin = await highDiffMulti.bindPort(stratumHighDiffPort, {
    protocol: null,
    preferredExternalPort: stratumHighDiffPort,
    addSsl: null,
    secure: { ssl: false },
  })
  const highDiff = sdk.createInterface(effects, {
    name: i18n('Stratum High-Diff'),
    id: 'stratum-highdiff',
    description: i18n(
      'Stratum port with a very high fixed minimum difficulty, for large farms and hashrate rentals',
    ),
    type: 'p2p',
    schemeOverride: null,
    masked: false,
    username: null,
    path: '',
    query: {},
  })
  const highDiffReceipt = await highDiffOrigin.export([highDiff])

  return [uiReceipt, stratumReceipt, highDiffReceipt]
})
