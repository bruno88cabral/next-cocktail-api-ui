---
name: implement-issue
description: Implement a GitHub issue following the implementation plan, project architecture, and acceptance criteria.
argument-hint: <issue-number-or-title>
disable-model-invocation: true
---

# Implement Issue

This skill helps implement a GitHub issue after the feature branch and implementation plan have already been created.

It ensures that development follows the issue requirements, acceptance criteria, and project best practices.

Before implementing anything, always load and apply these supporting skills as part of the context:

- `shadcn-ui` — for UI component patterns, accessibility, theming, and integration consistency.
- `vercel-react-best-practices` — for React/Next.js architecture, rendering, data-fetching, and performance guidance.

These two skills must always be used whenever this skill is invoked, especially for any work involving UI, React components, Next.js pages, hooks, styling, or performance-sensitive code.

---

## Step 1 — Validate Branch

Confirm the current branch is a feature branch.

Pattern required:

feat/{issue-name}

Run:

git branch --show-current

If the branch does not follow the pattern, warn the user.

---

## Step 2 — Review the Issue

Read the selected GitHub issue and extract:

- Issue title
- Description
- Acceptance criteria
- Tasks (if present)

Summarize the feature that must be implemented.

---

## Step 3 — Review the Implementation Plan

Locate the implementation plan previously generated for the issue.

Confirm:

- feature objective
- implementation steps
- acceptance criteria

If the plan is missing, generate a new implementation plan before coding.

---

## Step 4 — Define Technical Approach

Before writing code, define:

### File Structure

Follow the project structure used in the repository.

Example (Next.js):

app/
components/
services/
types/
hooks/
utils/

---

### Responsibilities

Separate concerns clearly:

- **UI Components** → components
- **API calls** → services
- **Types/interfaces** → types
- **Reusable logic** → hooks
- **Helpers** → utils

---

## Step 5 — Implement the Feature

Implement the feature step by step following the plan.

Guidelines:

- Use **TypeScript types**
- Prefer **functional components**
- Use **clean and readable code**
- Avoid duplication
- Follow **SOLID principles**
- Follow existing project patterns

---

## Step 6 — Validate Acceptance Criteria

Verify that all issue acceptance criteria are satisfied.

Create a checklist:

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Step 7 — Quality Check

Before finishing implementation, ensure:

- code compiles
- no TypeScript errors
- lint passes
- feature works as expected
- code follows project standards

Run if available:

npm run lint  
npm run build

---
