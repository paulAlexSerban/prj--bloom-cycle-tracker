# GitHub Pages Pre-Prod Deployment Plan (GitHub Actions)

## Purpose
Provide a repeatable pre-prod deployment pipeline that aligns with ASR-9 and ADR-007.

## Plan
1. **Enable GitHub Pages (Actions)**
   - Repository Settings → Pages → Source: GitHub Actions.

2. **Automate Build & Deploy**
   - Use a GitHub Actions workflow to build the Vite app and publish the `dist` folder.

3. **Base Path for Repository Pages**
   - Ensure the build uses `--base=/${repository}/` so assets resolve correctly under the repository Pages URL.

4. **Validate Pre-Prod**
   - Open the Pages URL and smoke-test core flows (calendar, logging, offline cache).

## Tasks
- [ ] Add workflow at [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).
- [ ] Set GitHub Pages source to **GitHub Actions**.
- [ ] Trigger a build by pushing to `main` or running the workflow manually.
- [ ] Verify the pre-prod URL loads and the PWA installs.
- [ ] Confirm offline mode works for core screens.

## Notes
- If the default branch is not `main`, update the workflow trigger.
- If custom domains are used in the future, revisit base path handling.
