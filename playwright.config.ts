import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "ui-chromium",
      testDir: "./tests/UI",
      use: {
        baseURL: "https://www.saucedemo.com",
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 919 },
      },
    },
    {
      name: "ui-firefox",
      testDir: "./tests/UI",
      use: {
        baseURL: "https://www.saucedemo.com",
        browserName: "firefox",
        headless: true,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 919 },
      },
    },
    {
      name: "ui-webkit",
      testDir: "./tests/UI",
      use: {
        baseURL: "https://www.saucedemo.com",
        browserName: "webkit",
        headless: true,
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 919 },
      },
    },
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL: "https://petstore.swagger.io/v2",
        headless: true,
        trace: "retain-on-failure",
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
