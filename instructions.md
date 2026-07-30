# GoBrrr Pool

## Documentation

- [GoBrrr Pool on GitHub](https://github.com/gobrrrme/GoBrrr-Pool) — the upstream project: pool internals, web dashboard, and issue tracker
- [ckpool-solo](https://bitbucket.org/ckolivas/ckpool-solo/) — the solo mining engine GoBrrr Pool is built on

## What you get on StartOS

- A **Stratum** interface on port 3333 — the address your miners connect to
- A **Stratum High-Diff** interface on port 4444 — same pool, but with a very high fixed minimum difficulty, meant for large farms or hashrate rentals
- A **Web UI** — the dashboard with live pool, miner, and worker statistics

Solo mining means there is nothing to configure for payouts: each miner authenticates with its own Bitcoin address, and if that miner finds a block, the entire block reward is paid to that address by the block itself. The pool never holds funds.

## Getting set up

1. Install and start **Bitcoin** (Bitcoin Core or Bitcoin Knots) and let it fully sync. Pruning must be off — not because mining needs old blocks, but because the Bitcoin service only exposes RPC to other services when it is unpruned.
2. When you install GoBrrr Pool, tasks will guide you through preparing Bitcoin: enabling ZMQ block notifications, disabling pruning, and creating RPC credentials for the pool. Complete them all.
3. Start GoBrrr Pool and wait for both health checks to turn green.
4. Point a miner at the **Stratum** interface address, port 3333:
   - **Stratum URL:** `stratum+tcp://<your-server-address>:3333`
   - **Username:** your Bitcoin address, optionally followed by `.workername` (e.g. `bc1q....miner1`)
   - **Password:** anything (it is ignored)
5. Open the **Web UI** — your worker appears on the dashboard once it submits its first share.

To let miners outside your LAN connect, enable additional gateways on the Stratum interface.

## Using the available features

- The dashboard shows pool hashrate, connected workers, best shares ("bestever"), and per-worker statistics.
- Use the **Settings** action for difficulty tuning. Defaults are sensible for typical home miners — you only need this if you know why.
- The high-diff port (4444) rejects shares below a very high difficulty. Use it only for large farms or rented hashrate; a Bitaxe or USB miner belongs on port 3333.
- Bitcoin price, fee, and block data in the dashboard comes from the **Mempool** service if you have it installed and running. Without it, the dashboard falls back to the public mempool.space API, which means your server makes clearnet requests to a third party. Install the Mempool service if you want to avoid that.
