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
        preset: 'conventionalcommits',
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: determineChangelogFile(process.env.GITHUB_REF),
      }
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          determineChangelogFile(process.env.GITHUB_REF)
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }
    ]
  ],
  tagFormat: '${version}'
};

/**
 * Determines the changelog file based on the current branch.
 * @param {string} branchName - The name of the branch.
 * @returns {string} - The file name to be used for changelog.
 */
function determineChangelogFile(branchName) {
  if (branchName === 'refs/heads/main') {
    return 'CHANGELOG.md';
  }
  return 'DEVELOPMENT.md';
}