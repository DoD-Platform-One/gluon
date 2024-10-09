// This file has been moved to big-bang-dockerfiles/cypress repo, but needs to stay here for backwards compatility with gluon versions 0.4.10 and earlier
const fs = require('fs');

const logs = [];

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
        fs.writeFile('/test/cypress/logs/results.json', JSON.stringify(results));
        fs.writeFile('/test/cypress/logs/log.log', logs);
      });
    },
  },
};
