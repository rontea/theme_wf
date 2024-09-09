# theme_wf
> [!NOTE]
> This is the Concept of this Long Project

Part of Theme_3 Family is a CLI tool that automates project setup and enforces CI/CD workflows. With a single command, it initializes your project by copying essential markdown files and configuring GitHub Actions for CI/CD. It also features a web-based TODO Manager for easy task tracking and collaboration.

> [!WARNING]
> This is still on development

### TODO Function
Develop a website interface to manage the `TODO.md` file. The interface should provide the following features:
- **Add Todo**: Create new tasks and add them to the `TODO.md`.
- **Add/Edit Todo Type**: Define or modify different types or categories of Todos.
- **Add/Edit Status List**: Manage the status options (e.g., pending, in progress, completed) that can be assigned to each Todo.
- **Add Contributor/Team Member**: Maintain a list of contributors or team members to whom tasks can be delegated.
- **Add Subtasks**: Create and manage subtasks under each Todo for better task breakdown and tracking.

> [!NOTE]
> [Theme_ Wiki](https://github.com/rontea/theme_wf/wiki)


#### Running the Server
To start the server, follow these steps:

1. Open your terminal.
2. Navigate to the `src/server` directory:
   ```bash
   cd src/server
   ```
3. Run server
    ```bash
    node server
    ```

> [!NOTE]
> For full branch management explination [click here](https://github.com/rontea/theme_wf/wiki/Branch-Management
)

#### Workflow Branches CI/CD
- **main**: Push to NPM, merge from `beta`.
- **develop**: Create a new branch from `main`, merge/create to `alpha`.
- **feature**: Clone from `develop`. For feature testing, create a branch `feature/[alpha]` to test. Once testing is complete, merge back into `feature/[main]`. When done with the feature, merge into `develop`.
- **alpha**: Create the `alpha` branch from `develop`. Once `alpha` testing is complete, create the `beta` branch.
- **beta**: Create the `beta` branch from `alpha`. After beta testing, merge into `main`. Additional settings can be pushed to NPM if the environment variable is set to `true`.

#### Helper Project

> [!NOTE]
> Day to Day commit Management on Conventional Commit Messaging [Learn More](https://github.com/rontea/theme_wf/wiki/Conventional-Commit-Messaging-Format)

Commitizen will bump versions based on certain commit types (e.g., feat, fix, etc.). To prevent generating excessive releases during branch development, follow the proposed conventional commit messaging format outlined [here](https://github.com/rontea/theme_wf/wiki/Conventional-Commit-Messaging-Format). This approach ensures version bumps and releases are only triggered when necessary.


```bash
git commit -m "type(scope): description"
```

#### [Develop](#Develop)
To create the `develop` branch and publish it to GitHub, follow these steps:

```bash
# List all local branches
git branch 

# Create a new branch called 'develop'
git branch develop 

# Switch to the 'develop' branch
git checkout develop 

# Confirm you're on the 'develop' branch
git branch 

# Stage all changes for commit
git add . 

# Use Commitizen (npx git-cz) to commit with a standardized format
npx git-cz 

# Push the 'develop' branch to GitHub
git push origin develop
```
#### Side Information:

- The develop branch will not be published to NPM, but it will be released under the changelog.
- Always run git pull to get the latest version number updates before pushing changes.
- You can move from develop to a feature branch if working on a specific feature.
- Ensure semantic versioning increments (e.g., major, minor, patch) are followed when - updating version numbers.


### Feature - Sample
- Create a `feature/*` branch from `develop`.
- For testing, create a `feature/alpha/*` branch. 
- Once testing is complete, merge into `feature/*`.
- After completing feature testing, bug fixes, and refactoring, merge into `develop`.

```bash
# Ensure you are on the 'develop' branch and it's up to date
git checkout develop
git pull origin develop

# Create a new feature branch from 'develop'
git checkout -b feature/new-feature

# Optional: Pull any existing changes in the feature branch (if applicable)
git pull origin feature/new-feature

# Stage and commit changes using Commitizen (npx git-cz)
git add . 
npx git-cz

# Push the feature branch to GitHub
git push origin feature/new-feature
```
- Merging Develop and Pushing to GitHub

```bash
# Switch back to 'develop' branch
git checkout develop

# Merge your feature branch into 'develop'
git merge feature/new-feature

# Push the updated 'develop' branch to GitHub
git push origin develop
```

### Alpha - sample

```bash
# Step 1: Pull the latest changes from the develop branch
git pull origin develop

# Step 2: Create a new alpha branch for the feature
git checkout -b alpha/new-feature

# Step 3: Bug fixes - create a separate branch for fixing bugs found in alpha
git checkout -b alpha/new-feature/bug

# Step 4: After bug fixes, switch back to the alpha feature branch
git checkout alpha/new-feature

# Step 5: Merge the bug fix branch into the alpha feature branch
git merge alpha/new-feature/bug

# Step 6: Stage changes for commit
git add .

# Step 7: Use Commitizen for a conventional commit message
npx git-cz

# Step 8: Push the updated alpha feature branch to the remote repository
git push origin alpha/new-feature

```

### Beta - sample

```bash
# Step 1: Pull the latest changes from the alpha feature branch
git pull origin alpha/new-feature

# Step 2: Create a new beta branch for the feature
git checkout -b beta/new-feature

# Step 3: Push the beta branch to the remote repository
git push origin beta/new-feature

# Step 4: If bugs are found, create a separate branch for fixing bugs in the beta phase
git checkout -b beta/new-feature/bug

# Step 5: Once the bug is fixed, switch back to the beta feature branch
git checkout beta/new-feature

# Step 6: Merge the bug fix branch into the beta feature branch
git merge beta/new-feature/bug

# Step 7: Stage all changes
git add .

# Step 8: Use Commitizen for a structured commit message
npx git-cz

# Step 9: Push the updated beta feature branch to the remote repository
git push origin beta/new-feature

```

### Main - Ready for release

```bash
# Step 1: Switch to the main branch
git checkout main

# Step 2: Merge the beta feature branch into the main branch
git merge beta/new-feature

# Step 3: If conflicts arise, resolve them manually by accepting incoming changes
git add <file-with-conflict>

# Step 4: After resolving all conflicts and accepting incoming changes
npx git-cz

# Step 5: Push the changes to the remote main branch
git push origin main

# Step 6: Optionally, delete the branch locally if it's no longer needed
git branch -d <branch-name>

# Step 7: Optionally, delete the branch from the remote repository if it's no longer needed
git push origin --delete <branch-name>
```

#### Removing Branch Note (Local and Remote)
```bash
# Remove the 'develop' branch locally
git branch -d branchName

# Force delete the 'develop' branch locally (if necessary)
git branch -D branchName

# Remove the 'develop' branch from the remote repository
git push origin --delete BranchName

```

#### Commitizen and Conventional Commits
- Install Commitizen and Set Up Conventional Commits


```bash
npm install --save-dev commitizen cz-conventional-changelog
```

- Add Commitizen configuration to your package.json:

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

- Git add

```git
git add .
```

- Use Commitizen to create commits:

```bash
npx git-cz
```

#### Semantic Release

-  Install and Configure Semantic Release

```bash
npm  install --save-dev @semantic-release/changelog@^6.0.3 @semantic-release/commit-analyzer@^13.0.0 @semantic-release/exec@^6.0.3 @semantic-release/git@^10.0.1 @semantic-release/github@^10.1.3 @semantic-release/npm@^12.0.1 @semantic-release/release-notes-generator@^14.0.1 commitizen@^4.3.0 conventional-changelog-conventionalcommits@^8.0.0 cross-env@^7.0.3 cz-conventional-changelog@^3.3.0 semantic-release@^24.0.0 
```

#### Semantic Release extended config
- under scripts in package.json
```json
 "release:semver": "semantic-release --extends ./.releaserc-semver.js",
    "release:npm": "semantic-release --extends ./.releaserc-npm.js",
```

- Create a [.releaserc-semver.js](https://github.com/rontea/theme_wf/wiki/.releaserc%E2%80%90semver.js)
- Create a [.releaserc-npm.js](https://github.com/rontea/theme_wf/wiki/.releaserc%E2%80%90npm.js)


```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

#### GitHub Actions

- semantic release
- npm publish
- X posting

- Create a .github/workflows/release.yml 
  - [semantic-version-update.yml](https://github.com/rontea/theme_wf/wiki/semantic%E2%80%90version%E2%80%90update.yml)



#### Push CLI

```bash
git add.

npx git-cz

npx cross-env NPM_PUBLISH=true git push origin beta

```

#### Dry Run

```bash
npx semantic-release --dry-run
```

#### NPM Delete


#### Commit Types Guide

- feat: A new feature for the user.
- fix: A bug fix for the user.
- docs: Documentation only changes.
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- refactor: A code change that neither fixes a bug nor adds a feature.
- perf: A code change that improves performance.
- test: Adding missing or correcting existing tests.
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- chore: Other changes that don't modify src or test files.
- revert: Reverts a previous commit.

#### Scopes (Optional):

- feat(auth): add login functionality

#### Write Descriptive Subject Lines:

- feat(button): add disabled state
- fix(auth): handle token expiration

#### Provide Detailed Bodies (Optional):

```plaintext
feat(auth): add OAuth2 support

This adds support for OAuth2 authentication, allowing users to log in
using their Google or Facebook accounts. This improves the user
experience and expands the range of supported login methods.
```

#### Add Breaking Changes (If Applicable):

```plaintext
feat(api): update endpoint to v2

BREAKING CHANGE: The endpoint `/api/v1/users` has been changed to
`/api/v2/users`. This change requires updating client applications
to handle the new endpoint format.
```

#### samples

```plaintext

feat(profile): add user avatar upload
fix(auth): correct token refresh logic
docs(readme): update installation instructions
refactor(user-service): simplify user validation logic
perf(database): optimize query performance
test(button): add unit tests for disabled state
chore(deps): update lodash to v4.17.21

```