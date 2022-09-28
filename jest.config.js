module.exports = {
	preset: 'jest-puppeteer',
	testMatch: ["src/**/?(*.)+(spec|e2e).[t]s"],
	testPathIgnorePatterns: ['/node_modules/', 'dist'], // 
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		"^.+\\.ts?$": "ts-jest"
	},
	globalSetup: './jest.global-setup.ts', // will be called once before all tests are executed
	//globalTeardown: './jest.global-teardown.ts' // will be called once after all tests are executed
	collectCoverage: true,
	//coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
	  ],
};