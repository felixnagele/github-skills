# OctoAcme — Release Readiness & Incident/Feedback Intake

## Purpose
Two lightweight templates in one place:

1. **Release Readiness / Go-No-Go Checklist** — confirms that QA, DevOps, and Support are aligned before deploying to production.
2. **Incident / Customer Feedback Intake** — provides a consistent handoff from Support/Customer Success to PdM, PM, and Developers.

---

## Part 1 — Release Readiness / Go-No-Go Checklist

**Owner:** PM, with sign-off from QA Lead, DevOps Engineer, and Support/Customer Success.
Complete this checklist before every Minor and Major release. Patch (hotfix) releases should complete at minimum the starred (★) items.

### Engineering & Quality
- [ ] ★ All items in scope have passed the [Quality Gates & Definition of Done](octoacme-quality-gates-and-dod.md) checklist
- [ ] ★ CI/CD pipeline is green (build, tests, security scan)
- [ ] ★ Staging smoke tests passed
- [ ] No unresolved high/critical security vulnerabilities
- [ ] Performance benchmarks within acceptable thresholds (if applicable)

### DevOps & Infrastructure
- [ ] ★ Deployment runbook is up to date
- [ ] ★ Rollback plan documented and tested
- [ ] Monitoring dashboards and alerts configured for new functionality
- [ ] Deployment window communicated to the team and stakeholders
- [ ] On-call rotation confirmed for post-release window

### Release Communications
- [ ] ★ Release notes drafted and reviewed
- [ ] Stakeholder announcement prepared (PM owns)
- [ ] Support/Customer Success briefed on new features, known issues, and rollback criteria
- [ ] Customer-facing communication drafted (if user-visible changes)

### Go / No-Go Decision

| Role | Name | Status | Date |
|---|---|---|---|
| QA Lead | | ☐ Go / ☐ No-Go | |
| DevOps Engineer | | ☐ Go / ☐ No-Go | |
| Support/Customer Success | | ☐ Go / ☐ No-Go | |
| PM (final decision) | | ☐ Go / ☐ No-Go | |

**No-Go reasons (if any):**

> _Document blockers here before rescheduling._

---

## Part 2 — Incident / Customer Feedback Intake

**Owner:** Support/Customer Success captures initial details; PM/PdM triages and routes.
Use this template to log and hand off incidents or feedback items from users to the product/engineering team.

---

### Intake Form

**Date reported:**
**Reported by (Support rep):**
**Customer / user (anonymised if needed):**

#### Description
> _What happened? Include steps to reproduce if known._

#### Impact
- Affected users / accounts:
- Severity: ☐ Critical (service down / data loss) ☐ High (major feature broken) ☐ Medium (degraded experience) ☐ Low (minor / cosmetic)
- Business impact (if known):

#### Supporting Evidence
- Logs / screenshots / session IDs:
- First seen / frequency:

#### Customer Expectation
> _What did the customer expect to happen?_

---

### Triage & Routing (PM/PdM to complete)

**Triaged by (PM/PdM):**
**Date triaged:**

- Type: ☐ Bug ☐ Feature request ☐ Documentation gap ☐ Support/process issue ☐ Other
- Routed to: ☐ Developers ☐ QA Lead ☐ DevOps ☐ UX Designer ☐ Backlog (no action now)
- Priority: ☐ P0 – immediate fix ☐ P1 – next sprint ☐ P2 – backlog ☐ Won't fix (reason below)

**GitHub issue / board link:**
**Follow-up action:**
**Expected resolution / communication date:**
