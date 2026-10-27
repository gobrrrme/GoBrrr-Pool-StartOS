import { setupManifest } from '@start9labs/start-sdk'
import { bitcoindDescription, long, mempoolDescription, short } from './i18n'

export const manifest = setupManifest({
  id: 'gobrrr-pool',
  title: 'GoBrrr Pool',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/gobrrrme/GoBrrr-Pool-StartOS',
  upstreamRepo: 'https://github.com/gobrrrme/GoBrrr-Pool',
  marketingUrl: 'https://gobrrr.me',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'startos', 'logs', 'sockets'],
  images: {
    ckpool: {
      source: { dockerTag: 'ghcr.io/gobrrrme/gobrrr-ckpool:v1.2.2' },
      arch: ['x86_64', 'aarch64'],
    },
    webui: {
      source: { dockerTag: 'ghcr.io/gobrrrme/gobrrr-pool-webui:v1.2.2' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description: bitcoindDescription,
      optional: false,
      metadata: {
        title: 'Bitcoin',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/refs/heads/30.x/dep-icon.svg',
      },
    },
    mempool: {
      description: mempoolDescription,
      optional: true,
      metadata: {
        title: 'Mempool',
        icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/refs/heads/master/icon.svg',
      },
    },
  },
})
