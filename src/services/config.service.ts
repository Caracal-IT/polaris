export class ConfigService {
    private settings = {};

    getSetting(key: string) {
        return this.settings[key];
    }

    addSetting(key: string, setting: any) {
        if(key.indexOf('[') === -1)
            key = `[${key}]`;

        this.settings[key] = setting;
    }
}