module.exports = {
    branches: [
      { name: 'main' },
      { name: 'develop', prerelease: true },
      { name: 'alpha/*', prerelease: 'alpha' },
      { name: 'beta/*', prerelease: 'beta' },
      { name: 'feature/*', prerelease: 'rc' }
    ],
    plugins: [
      '@semantic-release/commit-analyzer', // Analyzes commit messages to determine the type of version bump
      '@semantic-release/release-notes-generator', // Generates release notes based on commits
      '@semantic-release/changelog', // Updates the changelog file
      ...(process.env.NPM_PUBLISH === 'true' ? ['@semantic-release/npm'] : []),
      '@semantic-release/github', // Publishes the release to GitHub
      '@semantic-release/git' // Commits the updated package.json and changelog to the repo
    ],
    preset: 'conventionalcommits', // Use the conventional commits format
    tagFormat: '${version}', // Customize the tag format
    generateNotes: {
      preset: 'conventionalcommits', // Customize the release notes format
      writerOpts: {
        commitsSort: ['subject', 'scope'] // Customize the sorting of commits in the release notes
      }
    },
    verifyConditions: [
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/github'
    ],
    prepare: [
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/git'
    ],
    publish: [
      '@semantic-release/npm',
      '@semantic-release/github'
    ],
    success: [
      '@semantic-release/github'
    ],
    fail: [
      '@semantic-release/github'
    ]
  };
  