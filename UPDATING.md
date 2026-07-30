# Updating the upstream version

"Upstream" is the [gobrrrme/GoBrrr-Pool](https://github.com/gobrrrme/GoBrrr-Pool) release: each git tag `vX.Y.Z` there triggers a GitHub Actions build that pushes multi-arch (amd64+arm64) images `ghcr.io/gobrrrme/gobrrr-ckpool:vX.Y.Z` and `ghcr.io/gobrrrme/gobrrr-pool-webui:vX.Y.Z`. Both images are always released together under the same tag.

## Determining the upstream version

- Current pin: the two `dockerTag` values in `startos/manifest/index.ts` (`images.ckpool` and `images.webui`).
- Latest upstream: `gh release view -R gobrrrme/GoBrrr-Pool --json tagName -q .tagName` (or check the repo's tags).
- Verify both images exist for the new tag and are multi-arch before bumping:
  `docker manifest inspect ghcr.io/gobrrrme/gobrrr-ckpool:vX.Y.Z | jq '.manifests[].platform.architecture'`

## Applying the bump

1. Update both `dockerTag` pins in `startos/manifest/index.ts` to the new `vX.Y.Z` (same tag for both images).
2. Set `version` in `startos/versions/current.ts` to `X.Y.Z:0` (reset the downstream counter; bump only the downstream part for packaging-only changes, e.g. `X.Y.Z:1`).
3. Add release notes in `startos/versions/current.ts`.
4. Check the upstream diff for new/renamed environment variables consumed by the ckpool entrypoint (`ckpool/docker-entrypoint.sh` upstream) or the webui (`process.env` usages) and mirror them in `startos/main.ts` / the Settings action.
5. Build (`make`), test on a StartOS device, then tag the packaging repo `vX.Y.Z_0` (ExVer `:` becomes `_` in git tags).
