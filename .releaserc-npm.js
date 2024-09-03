module.exports = {
    branches: [
      { name: 'main' },
      { name: 'develop', prerelease: true },
      { name: 'alpha/*', prerelease: 'alpha' },
      { name: 'beta/*', prerelease: 'beta' },
      { name: 'feature/*', prerelease: 'rc' }
    ],
    plugins: [
      '@semantic-release/npm',
      {
        npmPublish: process.env.NPM_PUBLISH === 'true' || process.env.GITHUB_REF === 'refs/heads/main'
      }
    ],
    
  };
  