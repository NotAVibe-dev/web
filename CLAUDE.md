<!-- infra-request:start (managed by notavibe/infra — do not edit inside these markers) -->
@.claude/skills/infra-request/DELEGATION.md
<!-- infra-request:end -->

## Founders operating model

This summarises version 2 of the founders' operating model, which is on a 4-week trial. Source: https://claude.ai/artifact/FCKobboiJi9Eie9hLbYUXo. If the doc and this section disagree, the doc wins.

- **Lanes.** Gamal (CEO): business strategy, customers and sales, positioning and pricing, partnerships, fundraising, legal and finance. Maghraby, or m@ (CPO): product strategy and roadmap, feature priority and scope, UX/UI, frontend on the agreed stack, accepting finished work. Ramy, or r@ (CTO): architecture and stack, engineering standards including frontend conventions, backend and infra, security and reliability, release safety.
- **On web:** UX, copy and layout are m@'s calls. Frontend conventions are r@'s. A stack or vendor change is r@'s call after a 48-hour consult. A public launch is m@'s call after a 48-hour consult.
- **Decision tiers.** (1) The owner decides. (2) The owner decides after a 48-hour consult; no reply means no objection. (3) Reserved for all three: objectives and target customer, pivots, equity and founder roles, fundraising terms, hiring and contractors, spending above the monthly limit, contracts that bind the company, shutting down or selling.
- **Sensitive zones:** auth and permissions, customer data and migrations (waitlist emails count), infra and deploy config, secrets and dependencies, payments and billing. A change here needs Ramy's review before merge, tests that cover it, and a preview or staging run first. A migration also needs a backup and a rollback. The only exception is an emergency production fix: it can ship first and be reviewed within 48 hours.
- **Agents** flag product decisions to m@ instead of making them. They don't put secrets or customer data into AI tools beyond what the tools policy allows.
