# OctoAcme Personas

This document defines typical roles and responsibilities used in OctoAcme project docs and exercises.

---

## Developers

### Role Summary
Developers design, build, test, and deliver software components. They collaborate with product and project leads to implement features that meet acceptance criteria and quality standards.

### Responsibilities
- Implement features and fixes to meet acceptance criteria
- Write and maintain tests and documentation
- Participate in design and code reviews
- Assist in estimating and planning work
- Help identify technical risks and propose mitigations

### Goals
- Deliver reliable, maintainable code
- Reduce cycle time from idea to production
- Maintain high test coverage and observability

### Typical Communication
- Daily standups and sprint planning
- PR descriptions and code review comments
- Technical design docs when needed

---

## Product Managers

### Role Summary
Product Managers define what should be built to deliver customer and business value. They own the product vision, prioritize the backlog, and measure outcomes.

### Responsibilities
- Define problem statements and success metrics
- Prioritize the roadmap and backlog
- Collaborate with stakeholders and engineering on trade-offs
- Validate solutions through user research and metrics

### Goals
- Maximize customer value and impact
- Make clear, data-driven prioritization decisions
- Ensure product-market fit and usability

### Typical Communication
- Weekly alignment with PM and engineering leads
- Roadmap updates and stakeholder briefings
- Acceptance criteria and feature specs

---

## Project Managers

### Role Summary
Project Managers coordinate delivery activities, manage schedules, risks, and communications. They enable the team to deliver on commitments efficiently.

### Responsibilities
- Create and maintain project plans and timelines
- Manage risks, dependencies, and resource constraints
- Facilitate meetings (kickoff, planning, retrospectives)
- Ensure consistent project documentation and status reporting
- Coordinate cross-team and stakeholder communication

### Goals
- Deliver projects on time and within scope
- Minimize unplanned work and escalations
- Maintain transparency and alignment across stakeholders

### Typical Communication
- Weekly status updates and stakeholder reports
- Risk registers and decision logs
- Coordination via project boards and meeting facilitation

---

## QA Lead

### Role Summary
The QA Lead coordinates the quality assurance process, defines the testing strategy, ensures quality gates are met before each release, and triages reported issues.

### Responsibilities
- Define and communicate QA/testing processes and standards
- Coordinate and track test execution, coverage, and results
- Own the Definition of Done (DoD) and acceptance-criteria sign-off
- Identify and escalate critical quality risks to the PM and PdM
- Partner with DevOps to integrate automated tests into CI/CD pipelines

### Goals
- Ensure every increment meets agreed acceptance criteria before release
- Reduce defect escape rate to production
- Build a shared quality culture across the team

### Typical Communication
- QA status updates in sprint reviews and weekly delivery syncs
- Bug and test-result reports linked to project board cards
- Release-blocker escalations to PM

### Interaction with Other Roles
- Works with Developers to ensure features are testable and acceptance criteria are clear
- Informs Project/Product Managers of test status, coverage gaps, and release blockers
- Collaborates with DevOps to automate regression and smoke tests in pipelines
- Coordinates UAT with stakeholders and Support/Customer Success when needed

---

## UX Designer

### Role Summary
The UX Designer leads user experience and interface design to ensure usability, accessibility, and alignment with business and product goals.

### Responsibilities
- Gather user requirements, conduct user research, and synthesise feedback
- Design and prototype interfaces; maintain a design system or component library
- Conduct usability testing and iterate on designs based on findings
- Produce design assets, annotations, and handoff documentation for developers

### Goals
- Deliver intuitive, accessible experiences that meet user needs
- Reduce rework caused by late-stage design changes
- Champion the user perspective in backlog prioritisation discussions

### Typical Communication
- Design reviews with Developers and Product Managers before implementation starts
- Prototype walkthroughs with stakeholders for early feedback
- Handoff notes and annotated design assets shared via design tooling

### Interaction with Other Roles
- Collaborates with Product Managers to define user goals and validate hypotheses
- Provides Developers with design assets and answers implementation questions
- Shares usability findings with Project Managers and stakeholders
- Works with Support/Customer Success to collect real-world user feedback

---

## DevOps Engineer

### Role Summary
The DevOps Engineer owns CI/CD pipelines, deployment automation, environment management, and operational reliability, ensuring the team can ship and run software safely at pace.

### Responsibilities
- Build, maintain, and improve CI/CD build, test, and deployment pipelines
- Manage environments (dev, staging, production) and infrastructure-as-code
- Implement observability, alerting, and site-reliability best practices
- Respond to and lead triage of deployment incidents and operational issues
- Enforce security and compliance controls in the delivery pipeline

### Goals
- Maximise deployment frequency while maintaining stability and security
- Reduce mean time to recovery (MTTR) for incidents
- Eliminate manual, error-prone deployment steps

### Typical Communication
- Pipeline status and environment health updates in delivery syncs
- Incident notifications and post-mortems shared with the full team
- Documentation of runbooks and deployment procedures in the repo

### Interaction with Other Roles
- Supports Developers with tooling, environments, and build troubleshooting
- Partners with QA Lead to automate regression and smoke tests in pipelines
- Notifies the PM and team of incidents, planned maintenance, or operational risks
- Works with Support/Customer Success to communicate release windows and known issues

---

## Support / Customer Success

### Role Summary
Support/Customer Success acts as the bridge between end-users and the development team, collecting feedback, supporting rollouts, and ensuring users can adopt and benefit from new features.

### Responsibilities
- Capture, triage, and relay user feedback, bug reports, and feature requests
- Support incident response communications to affected customers
- Track user adoption and satisfaction metrics; surface trends to PdM
- Assist in release communications, known-issue notices, and rollout plans

### Goals
- Ensure users receive timely, accurate information during and after releases
- Close the feedback loop between users and the product/engineering team
- Reduce escalations by proactively surfacing issues before they grow

### Typical Communication
- Feedback summaries and escalations to PdM and PM in weekly syncs
- Customer-facing release notes and known-issue updates coordinated with PM
- Incident communications drafted in collaboration with DevOps and PM

### Interaction with Other Roles
- Informs Product Managers of usability trends, pain points, and feature requests
- Collaborates with Project Managers on release communications and known-issue tracking
- Coordinates with DevOps on incident notifications and rollback impact for customers
- Works with UX Designers to provide real-world user feedback into the design process

---

## How these personas are used in the exercise
- Use these persona definitions to frame scenarios and sample interactions in the Skills Exercise.
- Each persona can be used as a persona prompt for Copilot Spaces to shape role-specific guidance.

