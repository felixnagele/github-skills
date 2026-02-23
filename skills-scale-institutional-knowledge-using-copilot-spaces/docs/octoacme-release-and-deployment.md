# OctoAcme — Release & Deployment Guide

## Purpose
Standardize how OctoAcme releases features to production to reduce risk and improve observability.

## Release Types
- Patch: hotfixes addressing critical production issues
- Minor: incremental features and improvements
- Major: significant functionality or breaking changes

## Pre-release requirements
- All acceptance criteria met and PRs merged
- Passing CI and security scans
- Release notes drafted
- Rollback / mitigation plan documented
- Smoke tests prepared
- Complete the [Release Readiness / Go-No-Go Checklist](octoacme-release-readiness-checklist.md) with sign-off from QA Lead, DevOps Engineer, and Support/Customer Success before deploying.

## Deployment Checklist
- [ ] Deployment window scheduled (if needed)
- [ ] Backup or snapshot (if applicable)
- [ ] Deploy to staging and run smoke tests
- [ ] Deploy to production (automated pipeline preferred)
- [ ] Run post-deploy verifications
- [ ] Announce release to stakeholders and support

## Rollback & Incident Playbook
- If a deployment fails or causes a critical issue:
  - **DevOps Engineer** triggers incident response, notifies on-call, and executes rollback to the last known-good release if necessary
  - **PM** coordinates stakeholder communications
  - **Support/Customer Success** drafts customer-facing notifications and monitors impact
  - Triage root cause and capture action items; use the [Incident / Customer Feedback Intake](octoacme-release-readiness-checklist.md#part-2----incident--customer-feedback-intake) template to log and route the issue

## Release Notes Template
- Release name / number:
- Date:
- Summary:
- Notable changes:
- Migration steps (if any):
- Known issues:
