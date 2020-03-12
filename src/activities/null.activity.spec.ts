import { NullActivity } from "./null.activity";

describe('activities/null-activity', () => {
    it('builds', () => {
        expect(new NullActivity()).toBeTruthy();
    });

    it('should have a default name', () => {
        expect(new NullActivity().name).toBe('undefined');
    });

    it('should have a null activity type', () => {
        expect(new NullActivity().type).toBe('null-activity');
    });

    it('should always fail', async () => {
        const act = new NullActivity();

        await expect(act.execute()).rejects.toEqual("NULL Activity");
    });
});