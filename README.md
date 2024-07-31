# theme_wf
Configuration Package

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
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github @semantic-release/npm @semantic-release/commit-analyzer @semantic-release/release-notes-generator
```

- Create a .releaserc.js

- Add a script to package.json to run Semantic Release:

```json
"scripts": {
  "semantic-release": "semantic-release"
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
      - next

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Print environment variables
        run: printenv

      - name: Run Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_PUBLISH: 'true'
        run: npx semantic-release

```