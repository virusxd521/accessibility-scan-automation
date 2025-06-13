// pa11y-wrapper.js
// This script runs Pa11y on a given URL and outputs the results as JSON to stdout.

const pa11y = require('pa11y');

// Get the URL to scan from command-line arguments.
// If no argument is provided, it defaults to 'https://example.com'.
const url = process.argv[2] || 'https://example.com';

(async () => {
  try {
    // Run Pa11y with a specific URL and configuration.
    // chromeLaunchConfig args are important for running in a CI/Docker environment.
    const results = await pa11y(url, {
      chromeLaunchConfig: {
        args: [
          '--no-sandbox', // Required for running Puppeteer (used by Pa11y) in a Docker/CI environment
          '--disable-setuid-sandbox', // Another important arg for CI environments
          '--disable-dev-shm-usage' // Mitigates issues with /dev/shm in some environments
        ]
      }
    });

    // Output the full Pa11y results as a pretty-printed JSON string.
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    // If Pa11y encounters an error, log it and exit with a non-zero status.
    console.error('Error running Pa11y:', error.message);
    process.exit(1); // Indicate failure
  }
})();