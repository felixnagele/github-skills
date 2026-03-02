# OctoAcme — Quality Gates & Definition of Done

## Purpose
Clarify the quality gates that each increment must pass before progressing to the next stage, and define what "Done" means at OctoAcme. This checklist is owned by the **QA Lead** in collaboration with Developers, the PM, and the PdM.

---

## Definition of Done (DoD)

An item (story, feature, bug fix) is **Done** when **all** of the following are true:

### Code Quality
- [ ] Code reviewed and approved by at least one peer
- [ ] Automated tests written and passing (unit + integration where applicable)
- [ ] CI pipeline passes (build, lint, security scan, tests)
- [ ] No new high/critical security vulnerabilities introduced

### Functional Acceptance
- [ ] Acceptance criteria from the issue/story are met
- [ ] Feature behaves correctly in the staging environment
- [ ] Edge cases and error states handled and tested

### QA Sign-off
- [ ] QA Lead (or delegate) has verified the item against acceptance criteria
- [ ] Regression test suite passes (automated or manual as appropriate)
- [ ] Any known issues are documented and accepted by the PdM

### Documentation & Observability
- [ ] Relevant documentation updated (README, runbooks, API docs)
- [ ] Logging and monitoring in place for new functionality (where applicable)
- [ ] Release notes entry drafted

---

## Quality Gates by Stage

| Stage | Gate Owner | Gate Criteria |
|---|---|---|
| **Ready for Development** | PdM + QA Lead | Acceptance criteria written and understood; design assets available |
| **In Review (PR)** | Developer + Peer | Code review approved; CI passes |
| **QA** | QA Lead | Acceptance criteria verified; regression tests pass |
| **Ready for Release** | PM + QA Lead + DevOps | Full DoD checklist complete; release readiness confirmed (see [Release Readiness Checklist](octoacme-release-readiness-checklist.md)) |
| **Done** | PM | Deployed to production; post-deploy verification passed |

---

## When is this checklist required?

- **Every story/bug** must satisfy the DoD before moving from `QA` → `Done` on the project board.
- **Every release** must pass the Release Readiness Checklist in addition to individual item DoDs.
- **Exceptions** (e.g., urgent hotfixes) must be explicitly approved by the PM and PdM, with a follow-up ticket to address any skipped items.

---

## Roles & Accountability

| Responsibility | Owner |
|---|---|
| Define and update DoD | QA Lead (with team input) |
| Enforce DoD on individual items | QA Lead |
| Accept exceptions and track follow-ups | PM + PdM |
| Automate quality checks in CI | DevOps Engineer |
| Write and maintain tests | Developers |
