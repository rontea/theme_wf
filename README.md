# theme_wf
Configuration Package Reference

#### Workflow branches
- main : push to NPM , merge from beta
- develop : stay in repo , push to any of the following for merge
- feature : merge coming [develop,alpha,beta] from new features
- alpha : stay in repo , merge coming from [feature] if feature
- beta : push to NPM if env true , merge from alpha

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

### Feature 
- Merge featured to develop
- Push to develop 

```git
# Create a feature branch from develop

git branch
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# After developing the feature, merge it back into develop

git branch
git checkout develop
git merge feature/new-feature

# Push changes to the develop branch

git add .
npx git-cz
git push origin develop
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

  semantic-release:
    runs-on: ubuntu-latest
    needs: build
    if: |
      github.ref == 'refs/heads/main' || 
      github.ref == 'refs/heads/master' || 
      github.ref == 'refs/heads/develop' || 
      startsWith(github.ref, 'refs/heads/stable/') || 
      startsWith(github.ref, 'refs/heads/beta/') || 
      startsWith(github.ref, 'refs/heads/alpha/')
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
        run: npx semantic-release

```


- Push CLI

```bash
git add.

npx git-cz

npx cross-env NPM_PUBLISH=true git push origin main

```