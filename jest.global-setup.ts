const { setup: setupPuppeteer } = require('jest-environment-puppeteer');
/**
 * Sets up the environment for running tests with Jest
 */
module.exports = async function globalSetup(globalConfig: any) {
	// do stuff which needs to be done before all tests are executed
	await setupPuppeteer(globalConfig);
};