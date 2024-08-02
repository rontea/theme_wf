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
          npmPublish: true
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
  