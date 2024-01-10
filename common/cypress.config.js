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
      },
    },
  };