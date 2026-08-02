---
name: infra-request
description: Delegate INFRASTRUCTURE changes to notavibe's infra repo — never make them here. Use whenever a task touches DNS, domains, TLS/certs, cloud/GCP resources, secrets, API tokens, environment variables, IAM/access/permissions/service accounts, org/repo settings, Google Workspace (onboarding/offboarding a user, resetting a password, groups), OR CI that needs an infra-level thing — a new/changed GitHub Actions secret, a WIF/cloud identity, or an org-managed Actions-allowlist entry — and BEFORE running any OpenTofu/Terraform, gcloud, or Cloudflare change. Do NOT use it for editing THIS repo's own workflow content (build/test/deploy steps, or bumping versions of actions it already uses) — that is the repo's own job, done here. Files a structured infra-request issue to NotAVibe-dev/infra via a subagent and tracks it to a human-merged PR. If you are about to provision or change infrastructure (not your own repo's workflow content), STOP and use this instead.
---

# infra-request — delegate infra/IT changes to notavibe's infra repo

You are in a **product repo**, not the infra repo. This repo must **never** make infrastructure
changes itself. When a task touches infrastructure, file a request to `NotAVibe-dev/infra` and stop.

## When this applies
Google Workspace — **onboarding/offboarding a user, resetting a password**, groups/membership;
DNS, domains, TLS/certs; cloud/GCP resources; secrets, API tokens, environment variables;
IAM/access/permissions/service accounts; org/repo settings; **CI that needs an infra-level thing** —
a new/changed GitHub Actions **secret**, a **WIF/cloud identity**, or an **org-managed
Actions-allowlist** entry — and **before** running any OpenTofu/Terraform, `gcloud`, or Cloudflare change.

## When this does NOT apply — do it here yourself
Editing THIS repo's own `.github/workflows/` content is the repo's own job — do it here directly, do
**not** file a request: adding or changing build/test/deploy **steps**, or **bumping the version of an
action it already uses** (e.g. `actions/checkout@v4 → v7`). Only file an infra-request if that change
*also* needs one of the infra-level things above — a new/changed **secret**, a **WIF/cloud identity**,
or an **org-managed Actions-allowlist** entry. (Bumping an already-permitted action needs none of these.)

## What to do — run in a SUBAGENT (keeps the main context clean)
1. Gather specifics: what change, why, target repo/env, urgency. Never include secret **values**.
2. File the request to the infra queue:
   ```
   gh issue create --repo NotAVibe-dev/infra --title "[infra] <short summary>" \
     --body "<category / what & why / specifics / target / urgency>"
   ```
   (Mirror the infra-request issue-form fields.)
3. Report the issue URL to the user. The infra agent triages it and posts a plan; a founder approves
   it, the agent opens a PR, and a founder merges. You are **done** — do not attempt the change here.

## Never
- Never run tofu/gcloud/Cloudflare/DNS/secret/IAM changes in this repo.
- Never edit infra config here. This repo holds only its own scoped credentials and **cannot** change
  infra (the access wall) — filing the request is the only path.
