This repo does **not** make infrastructure changes. For anything touching DNS, domains, TLS,
cloud/GCP, secrets, env vars, IAM/access/service accounts, CI/CD, GitHub Actions, org/repo settings,
or Google Workspace users/groups: use the **`infra-request`** skill to file a request to
`NotAVibe-dev/infra`, then stop. The change is delivered as a PR that a founder merges. Never run
`tofu`/`gcloud`/Cloudflare or edit infra config in this repo — it holds only its own scoped
credentials and cannot change infra.
