
const { injectQuasarDevServerConfig } = require('@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server');
const { defineConfig } = require('cypress');

require('dotenv').config()

if (typeof Cypress !== 'undefined') {
  process.env = Cypress.env()
}

module.exports = defineConfig({
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  video: true,
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8080/',
    supportFile: 'test/cypress/support/e2e.js',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    browser: "chrome",
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      config.env = {
        ...process.env,
        ...config.env,
      }
      return config;
    },
    testIsolation: false,
    "defaultCommandTimeout": 50000,
    "scrollBehavior": "center",
    "retries": process.env.DEV ? 0 : 2,
  },
  component: {
    // setupNodeEvents(on, config) {},
    supportFile: 'test/cypress/support/component.js',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'test/cypress/support/component-index.html',
    devServer: injectQuasarDevServerConfig(),
  },
  env: {
    NODE_ENV: 'dev',
  },
  
});
