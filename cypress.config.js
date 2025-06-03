const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://pushing-front.vercel.app/",
    watchForFileChanges: false,
    defaultCommandTimeout: 75000
  },

   env: {
    "usuario": "Leonardo747",
    "password": "Segur@2024!"
  }

});
