---
name: infra-request
description: Delegate ALL infrastructure/IT changes to notavibe's infra repo — never make them here. Use whenever a task touches DNS, domains, TLS/certs, cloud/GCP resources, secrets, API tokens, environment variables, IAM/access/permissions/service accounts, CI/CD, GitHub Actions/workflows, org/repo settings, or Google Workspace users/groups — and BEFORE running any OpenTofu/Terraform, gcloud, or Cloudflare change. Files a structured infra-request issue to NotAVibe-dev/infra via a subagent and tracks it to a human-merged PR. If you are about to provision, configure, or change infrastructure, STOP and use this instead.
---

# infra-request — delegate infra/IT changes to notavibe's infra repo

You are in a **product repo**, not the infra repo. This repo must **never** make infrastructure
changes itself. When a task touches infrastructure, file a request to `NotAVibe-dev/infra` and stop.

## When this applies
DNS, domains, TLS/certs, cloud/GCP resources, secrets, API tokens, environment variables,
IAM/access/permissions/service accounts, CI/CD, GitHub Actions/workflows, org/repo settings, or
Google Workspace users/groups — and **before** running any OpenTofu/Terraform, `gcloud`, or
Cloudflare change.

## What to do — run in a SUBAGENT (keeps the main context clean)
1. Gather specifics: what change, why, target repo/env, urgency. Never include secret **values**.
2. File the request to the infra queue:
   ```
   gh issue create --repo NotAVibe-dev/infra --title "[infra] <short summary>" \
     --body "<category / what & why / specifics / target / urgency>"
   ```
   (Mirror the infra-request issue-form fields.)
3. Report the issue URL to the user. The infra agent triages it, opens a PR, and a founder merges.
   You are **done** — do not attempt the change here.

## Never
- Never run tofu/gcloud/Cloudflare/DNS/secret/IAM changes in this repo.
- Never edit infra config here. This repo holds only its own scoped credentials and **cannot** change
  infra (the access wall) — filing the request is the only path.
