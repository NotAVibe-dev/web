This repo does **not** make infrastructure changes. For anything touching DNS, domains, TLS,
cloud/GCP, secrets, env vars, API tokens, IAM/access/service accounts, org/repo settings, Google
Workspace users/groups, or **CI that needs an infra-level thing** (a new/changed GitHub Actions
**secret**, a **WIF/cloud identity**, or an **org-managed Actions-allowlist** entry): use the
**`infra-request`** skill to file a request to `NotAVibe-dev/infra`, then stop. The change is
delivered as a PR that a founder merges. Never run `tofu`/`gcloud`/Cloudflare or edit infra config in
this repo — it holds only its own scoped credentials and cannot change infra.

**This repo DOES own its own CI content.** Editing the workflows in this repo's `.github/workflows/`
— build/test/deploy steps, or **bumping the version of an action it already uses** (e.g.
`actions/checkout@v4 → v7`) — is this repo's job; do it here directly. Only reach for `infra-request`
when such a change *also* needs one of the infra-level things above.
