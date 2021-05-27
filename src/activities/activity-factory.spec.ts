import { ActivityFactory } from "./activity-factory";
import { NullActivity } from "./null.activity";

describe('activities/activity-factory', () => {
    it('should return NULL activity for null config', () => {
        const act = ActivityFactory.create(null, null);

        expect(act).toBeInstanceOf(NullActivity);
    });

    it('should return NULL activity for null config type', () => {
        const act = ActivityFactory.create({type: null}, null);

        expect(act).toBeInstanceOf(NullActivity);
    });

    it('should return NULL activity if the activity isn\'t registered', () => {
        const act = ActivityFactory.create({type: 'my-act'}, null);

        expect(act).toBeInstanceOf(NullActivity);
    });

    it('should add activity', () => {
        const act = {name: 'my-act', type:'mock-act', execute: null};
        ActivityFactory.add(act);

        expect(ActivityFactory.activities.pop()).toBe(act);
    });

    it('should add multiple activities', () => {
        ActivityFactory.activities = [];
        const actCount = ActivityFactory.activities.length;
        const act = {name: 'my-act', type:'mock-act', execute: null};
        const act2 = {name: 'my-act2', type:'mock-act-2', execute: null};

        ActivityFactory.add(act);
        ActivityFactory.add(act2);

        expect(ActivityFactory.activities.length).toBe(actCount + 2);
        expect(ActivityFactory.activities.pop()).toBe(act2);
        expect(ActivityFactory.activities.pop()).toBe(act);
    });

    it('should add activity once', () => {
        ActivityFactory.activities = [];
        const actCount = ActivityFactory.activities.length;
        const act = {name: 'my-act', type:'mock-act', execute: null};
        const act2 = {name: 'my-act2', type:'mock-act', execute: null};

        ActivityFactory.add(act);
        ActivityFactory.add(act2);

        expect(ActivityFactory.activities.length).toBe(actCount + 1);
        expect(ActivityFactory.activities.pop()).not.toBe(act2);
    });

    it('should replace activity', () => {
        ActivityFactory.activities = [];
        const actCount = ActivityFactory.activities.length;
        const act = {name: 'my-act', type:'mock-act', execute: null};
        const act2 = {name: 'my-act2', type:'mock-act', execute: null};

        ActivityFactory.add(act);
        ActivityFactory.add(act2, true);

        expect(ActivityFactory.activities.length).toBe(actCount + 1);
        expect(ActivityFactory.activities.pop()).toBe(act2);
    });
});