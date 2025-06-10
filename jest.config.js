require('dotenv').config({ path: '.env.test' });

module.exports = {
  // Automatically load .env.test before each test run
    setupFiles: ['<rootDir>/jest.setup.js'],

  // Specify the testing environment
    testEnvironment: 'node',

  // (Optional) Only include test files in the tests/ directory
    testMatch: ['**/tests/**/*.test.js'],

  // (Optional) Add clear module file extensions if needed
    moduleFileExtensions: ['js', 'json', 'node'],
};


