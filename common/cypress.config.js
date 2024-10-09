const topLevelFileSystemForLogs = require('fs');

const topLevelLogsForArtifactGeneration = [];

module.exports = {
  defaultCommandTimeout: 12000,
  screenshot: true,
  screenshotOnRunFailure: true,
  video: true,
  videoCompression: 35,
  e2e: {
    supportFile: '/test/cypress/support/index.js',
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log (args) {
          const message = args.join('\n');
          topLevelLogsForArtifactGeneration.push(message);
        }
      });
      on('after:run', (results) => {
        topLevelFileSystemForLogs.writeFile('/test/cypress/logs/results.json', JSON.stringify(results));
        const logs = topLevelLogsForArtifactGeneration.join('\n');
        topLevelFileSystemForLogs.writeFile('/test/cypress/logs/log.log', logs);
      });
    },
  },
};
