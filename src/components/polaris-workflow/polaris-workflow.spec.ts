import { PolarisWorkflow } from "./polaris-workflow";

describe('app-profile', () => {
    it('builds', () => {
      expect(new PolarisWorkflow()).toBeTruthy();
    });
});