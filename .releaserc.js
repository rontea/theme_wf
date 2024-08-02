module.exports = {
    branches: [
      { name: 'main' },
      { name: 'develop', prerelease: true },
      { name: 'alpha/*', prerelease: 'alpha' },
      { name: 'beta/*', prerelease: 'beta' },
      { name: 'feature/*', prerelease: 'rc' }
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/github',
      '@semantic-release/git'
    ],
    preset: 'conventionalcommits',
    tagFormat: '${version}',
    generateNotes: {
      preset: 'conventionalcommits',
      writerOpts: {
        commitsSort: ['subject', 'scope']
      }
    }
  };