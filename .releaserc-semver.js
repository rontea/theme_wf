module.exports = {
  branches: [
    { name: 'main' },  // Stable releases on the main branch
    { name: 'beta/*', prerelease: 'beta' },  // Beta pre-releases
    { name: 'develop', prerelease: true },  // Develop branch for ongoing work
    { name: 'alpha/*', prerelease: 'alpha' },  // Alpha testing
    { name: 'feature/*', prerelease: 'rc' }  // Feature branches
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
        assets: ['package.json', determineChangelogFile(process.env.GITHUB_REF)],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        tagFormat: shouldTagRelease(process.env.GITHUB_REF) ? '${version}' : false,  // Conditional tag creation
      }
    ]
  ]
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
  return 'DEVELOPMENT.md';  // Use Development.md for non-main branches
}

/**
 * Determines if a tag should be created based on the current branch.
 * @param {string} branchName - The name of the branch.
 * @returns {boolean} - True if a tag should be created, false otherwise.
 */
function shouldTagRelease(branchName) {
  // Only create tags for the main and beta branches
  return branchName === 'refs/heads/main' || branchName.startsWith('refs/heads/beta/');
}
