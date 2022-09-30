export class ConfigService {
    private settings: object = {};

    getSetting(key: string) {
        return this.settings[key];
    }

    addSetting(key: string, setting: object | string | number) {
        if(key.indexOf('[') === -1)
            key = `[${key}]`;

        this.settings[key] = setting;
    }
}