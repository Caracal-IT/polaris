export class ConfigService {
    private settings = {};

    getSetting(key: string) {
        return this.settings[key];
    }

    addSetting(key: string, setting: any) {
        this.settings[key] = setting;
    }
}