export class ConfigService {
    private settings = {
        "[WF]": "./polaris/wf"
    }

    getSetting(setting: string) {
        return this.settings[setting];
    }
}