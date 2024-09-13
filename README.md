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

> [!WARNING]
> Prototype Version Interface

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

### Branch Management

[Learn more Quick Guide](https://github.com/rontea/theme_wf/wiki/Quick-Branch-Lookup)


#### Commitizen and Conventional Commits
- Install Commitizen and Set Up Conventional Commits


```bash
npm install --save commitizen cz-conventional-changelog
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
npm  install @semantic-release/changelog@^6.0.3 @semantic-release/commit-analyzer@^13.0.0 @semantic-release/exec@^6.0.3 @semantic-release/git@^10.0.1 @semantic-release/github@^10.1.3 @semantic-release/npm@^12.0.1 @semantic-release/release-notes-generator@^14.0.1 commitizen@^4.3.0 conventional-changelog-conventionalcommits@^8.0.0 cross-env@^7.0.3 cz-conventional-changelog@^3.3.0 semantic-release@^24.0.0 --save
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

[Learn more](https://github.com/rontea/theme_wf/wiki/Commitizen-Types-Guide) on Commitizen 