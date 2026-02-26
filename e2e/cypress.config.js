const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Adding a slight delay to ensure UI updates are caught in this simple example
    defaultCommandTimeout: 5000,
  },
});
