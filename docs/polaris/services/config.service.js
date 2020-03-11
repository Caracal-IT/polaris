export class ConfigService {
    constructor() {
        this.settings = {};
    }
    getSetting(key) {
        return this.settings[key];
    }
    addSetting(key, setting) {
        this.settings[key] = setting;
    }
}
