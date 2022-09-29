const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer/teardown');
/**
 * Sets up the environment for running tests with Jest
 */
module.exports = async function globalSetup(globalConfig: object) {
	// do stuff which needs to be done before all tests are executed
	await teardownPuppeteer(globalConfig);
};