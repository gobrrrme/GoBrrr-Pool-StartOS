# TODO — bring GoBrrr Pool from template to release-ready

Remaining work; completed items have been removed.

## Build, test, ship

- [ ] First test build: `make` (or `start-cli s9pk pack`) — blocked on `squashfs-tools`
      being installed on this machine (needs root).
- [ ] Install on a StartOS box and verify: dependency tasks (bitcoind autoconfig +
      RPC credentials), both health checks green, miner connects on 3333/4444,
      dashboard reachable over LAN and Tor (watch the webui same-origin check
      behind the StartOS proxy).
- [ ] Verify Mempool switchover: without the Mempool service the dashboard uses
      mempool.space; installing/starting Mempool restarts the webui onto the
      local API (and back on removal).
- [ ] Verify `ulimit -n` inside the ckpool subcontainer (target 65535; document
      the actual LXC hard limit if lower).
- [ ] Backup / restore sanity check (miner-types.json + settings survive; logs and
      sockets excluded).
- [ ] 24h soak: log-rotate daemon truncates ckpool.log above 50 MB; dashboard
      stats remain correct afterwards.
- [ ] Review README and instructions once more against actual behavior.

## Deferred

- [ ] Consider a connect-info action showing copyable stratum URLs per address
      (needs `sdk.host.getOwn` address walking; the interface panel already
      shows addresses, so v1 ships without it).
