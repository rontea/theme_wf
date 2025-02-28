# theme_wf
Configuration Package Reference

#### Workflow branches
- main : push to NPM , merge from beta
- develop : stay in repo , push to any of the following for merge [alpah,beta]
- alpha : stay in repo , merge coming from [feature,develop] , merge to [alpha,beta]
- beta : push to NPM if env true , merge from [alpha] then can be merge to [main] once test pass
- feature :clone from [main] merge for [alpha,beta] from new feature test, once [beta] pass merge to [main]


#### Develop
- create develop and publish to github
```git
git branch
git branch develop
git checkout develop
git branch
git add . 
npx git-cz
git push origin develop
```
- No NPM publish but will be release under change log
- Make sure to git pull for the update version number
- Can be move to feature for specific feature
- semantic increment 

### Feature - sample
- Create feature branch
- Create feature coming from develop
- Merge to Beta or Alpha

```git
# Create a feature branch from develop

git branch
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
git pull origin feature/new-feature
git add .
npx git-cz
git push origin feature/new-feature
```

- Merge Develop and pull request on github
- remove develop

```git
#remove develop on local branch
git branch -d develop
git branch -d develop --force
```

### Alpha - sample

```git 
git pull origin feature/new-feature
git checkout -b alpha/new-feature

# Do bug fixes > then 

git add .
npx git-cz
git push origin alpha/new-feature

```

### Beta - sample

```git
git pull origin alpha/new-feature
git checkout -b beta/new-feature

# Do bug fixes > then
git add .
npx git-cz
git push origin beta/new-feature
```

### Ready for release

```git
# Merge changes to Main
git checkout main
git merge branch-name

# resolve conflict accept incoming changes
git add <file-with-conflict>

# Once all conflict accept all incoming changes
npx git-cz
git push origin main

# Delete branch origin
git push origin --delete <branch-name>

# Delete branch local
git branch -d <branch-name>
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

- Create a .releaserc.js

```js
module.exports = {
  branches: [
    { name: 'main' },
    { name: 'develop', prerelease: true },
    { name: 'alpha/*', prerelease: 'alpha' },
    { name: 'beta/*', prerelease: 'beta' },
    { name: 'feature/*', prerelease: 'rc' }
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits'
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          commitsSort: ['subject', 'scope']
        }
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: process.env.NPM_PUBLISH === 'true' || process.env.GITHUB_REF === 'refs/heads/main'
      }
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ],
  tagFormat: '${version}'
};

```

- Add a script to package.json to run Semantic Release:

```json
"scripts": {
  "semantic-release": "npx semantic-release",
   "npm-publish-if-true": "if [ \"$NPM_PUBLISH\" = \"true\" ]; then npm publish; else echo \"NPM_PUBLISH is not true, skipping publish\"; fi"
}
```

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

#### GitHub Actions

- Create a .github/workflows/release.yml 

```yaml
name: Release

on:
  push:
    branches:
      - main
      - develop
      - feature/*
      - alpha/*
      - beta/*
      - stable/*
      - master

jobs:
  # Step 1: Build
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

  # Step 2: Semantic Release
  semantic-release:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run semantic release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_PUBLISH: ${{ github.ref == 'refs/heads/main' || (github.ref == 'refs/heads/beta' && env.NPM_PUBLISH == 'true') }}
        run:  npx semantic-release


```


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