---
name: start-issue-work
description: Start work on a GitHub issue by syncing the develop branch, creating a feature branch, and generating an implementation plan from the issue details.
argument-hint: Issue number, URL, or pasted issue details
disable-model-invocation: true
---

# Start Issue Work

Use this skill when the user wants to start implementing a GitHub issue.

## Goals

- Ensure the work starts from the correct base branch.
- Gather the GitHub issue context.
- Create a feature branch with a consistent naming convention.
- Produce a clear implementation plan before coding.

## Workflow

### 1. Ensure the correct base branch

1. Verify the current branch.
2. If not on `develop`, switch to `develop`.
3. Pull the latest changes from `origin/develop`.

Commands:

```bash
git checkout develop
git pull origin develop
```

### 2. Identify the issue

Ask the user which GitHub issue should be implemented if the issue was not already provided.

Extract or confirm:

- issue number
- issue title
- description
- acceptance criteria
- tasks or checklist items, if available

If the user provides only partial information, use what is available and clearly note any missing details.

### 3. Create the feature branch

Generate the branch name from the issue title in kebab-case.

Pattern:

```text
feat/{issue-name}
```

Example:

```text
feat/drink-search-page
```

Create the branch from `develop`:

```bash
git checkout -b feat/{issue-name}
```

### 4. Generate the implementation plan

Create a development plan in Markdown.

The plan must include:

#### Understanding

A short explanation of the problem being solved.

#### Acceptance Criteria

List every acceptance criterion from the issue.

#### Implementation Steps

Break the work into small steps such as:

1. Create necessary folders and files
2. Implement feature logic
3. Integrate API if needed
4. Implement UI components
5. Handle loading and error states
6. Add tests if applicable
7. Validate acceptance criteria

### 5. Return the result

Return:

1. Branch name created
2. Git commands executed
3. Implementation plan in Markdown

## Response format

Use this structure:

```markdown
## Branch

- `feat/...`

## Git commands executed

- `git checkout develop`
- `git pull origin develop`
- `git checkout -b feat/...`

## Implementation plan

### Understanding

...

### Acceptance Criteria

- ...

### Implementation Steps

1. ...
2. ...
```

## Notes

- Prefer asking only for the missing issue information.
- Do not skip the planning step.
- If branch creation cannot be executed, still propose the branch name and explain what blocked execution.
