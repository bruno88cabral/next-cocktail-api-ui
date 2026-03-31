---
name: open_pull_request
description: Commit changes, push the feature branch, and open a Pull Request using the pull-request-template skill.
argument-hint: <issue-number>
disable-model-invocation: true
---

# Open Pull Request

This skill finalizes the implementation of a GitHub issue by committing the changes, pushing the branch, and opening a Pull Request using the existing PR template.

---

## Step 1 — Validate Branch

Confirm the current branch is a feature branch.

Expected pattern:

feat/{issue-name}

Run:

git branch --show-current

If the branch does not follow the pattern, warn the user before proceeding.

---

## Step 2 — Verify Working Tree

Check if there are pending changes.

Run:

git status

If there are changes, stage them.

git add .

---

## Step 3 — Create Commit

Create a commit referencing the issue.

Commit pattern:

feat: {short-description} (#issue-number)

Example:

feat: add drink search page (#12)

Command:

git commit -m "feat: {short-description} (#issue-number)"

---

## Step 4 — Push Branch

Push the feature branch to origin.

Command:

git push origin HEAD

---

## Step 5 — Create Pull Request

Open a Pull Request with the following configuration:

Base branch:

develop

Head branch:

current feature branch

Title pattern:

feat: {issue-title} (#issue-number)

---

## Step 6 — Generate PR Description

Use the skill:

pull-request-template

Populate the template using the issue information and implementation summary.

Include:

- Summary
- Issue reference
- Acceptance criteria
- Tasks performed

---

## Step 7 — Final Output

Return:

- branch name
- commit message
- PR title
- PR description (generated from the template)
- confirmation that the PR targets the `develop` branch
