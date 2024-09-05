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
      '@semantic-release/npm',
      {
        npmPublish: shouldPublishToNpm(),
      }
    ]
  ]
};

/**
 * Determines whether to publish to npm based on the branch and environment variable.
 * @returns {boolean} - True if npm should be published, otherwise false.
 */
function shouldPublishToNpm() {
  const branch = process.env.GITHUB_REF;
  const npmPublishEnv = process.env.NPM_PUBLISH === 'true';
  
  // Publish to npm only on main or beta branches, or if explicitly set via NPM_PUBLISH=true
  if (branch === 'refs/heads/main') {
    return true;
  }
  
  if (branch.startsWith('refs/heads/beta/')) {
    return npmPublishEnv;
  }
  
  return false; // Do not publish on other branches
}
