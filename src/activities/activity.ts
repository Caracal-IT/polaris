export interface Activity {
    name: string;
    type: string;
    execute(): Promise<boolean>;
}
