export class ConfigService {
    private settings = {
        "[WF]": "/wf"
    }

    getSetting(setting: string) {
        return this.settings[setting];
    }
}