# Testing GoBrrr Pool on StartOS (beta)

Thanks for helping test! This package is not yet on a registry — you install it
by sideloading the `.s9pk` file.

## Requirements

- StartOS **0.4.0.1** or later (x86_64 or aarch64)
- **Bitcoin** (Bitcoin Core or Bitcoin Knots) installed and **fully synced**.
  Pruning must be off (the Bitcoin service only exposes RPC to other services
  when unpruned) — if yours is pruned, expect a resync after the setup task
  disables pruning.
- A miner to point at the pool (Bitaxe, any ASIC, or cpuminer for smoke tests)

## Install

1. Download `gobrrr-pool.s9pk` from the latest
   [release](https://github.com/gobrrrme/GoBrrr-Pool-StartOS/releases).
2. In StartOS: **System → Sideload a Service** → select the file.
3. After install, two **tasks** appear. Complete both:
   - *Auto-Configure* Bitcoin (sets `prune=0` and enables ZMQ — Bitcoin restarts)
   - *Create RPC Credentials* for GoBrrr Pool
4. Start GoBrrr Pool and wait for both health checks (**Stratum**, **Web
   Interface**) to turn green.
5. Point a miner at port **3333** of your server's address:
   - Username: your Bitcoin address, optionally `.workername` (e.g. `bc1q….bitaxe1`)
   - Password: anything

## What to test and report

Please open a [GitHub issue](https://github.com/gobrrrme/GoBrrr-Pool-StartOS/issues)
for anything unexpected — logs and screenshots welcome. Especially interesting:

- Fresh install and the two Bitcoin tasks: any errors or confusing steps?
- Miner connects, shares are accepted, vardiff settles; worker shows up in the
  dashboard with correct hashrate
- Web UI over LAN and Tor
- High-diff port **4444** (only if you have serious hashrate — min difficulty 1M)
- Restart Bitcoin while the pool runs: does the pool recover on its own?
- Restart GoBrrr Pool: clean start, no errors?
- If you run the **Mempool** service: dashboard price/fee data should come from
  it automatically (and fall back to mempool.space without it)
- Backup → uninstall → restore: pool totals, per-worker best shares, and the leaderboard survive
- Uninstall: note that the pool's RPC user stays behind in Bitcoin — remove it
  with Bitcoin's *Delete RPC Users* action if you want to clean up fully

## Known limitations

- Found-block behavior can't be tested on mainnet without actually finding a
  block — the shares/submitblock path relies on upstream ckpool-solo.
- The coinbase signature is fixed to `GoBrrrPool_start9`.
