import { Activity } from "../activities/activity";

export interface Process {
    name: string;
    activities: Activity[];
}