export class AnalyticsService {
    sendMessage(event: any) {
        this.sendPostMessage(event.detail);
    }

    send(actType: string, path: Array<HTMLElement>) {
        const wfElement = path.find(i => i["wf-Workflow"] !== undefined);
        
        if(!wfElement)
            return;

        const payload = this.createPayload(actType, wfElement, path);

        if(payload) {
            this.sendPostMessage({
                type: payload.type, 
                process: payload.process,
                activity: payload.activity, 
                control: payload.control, 
                valueHash: payload.valueHash,
                path: payload.wfPath.map(this.getName)
            });
        }
    }

    getPath(event: any) {
        return event.composedPath(event);
    }

    private sendPostMessage(message: any) {
        const msg = {...message, timestamp:Date.now()};

        console.log("ANALYTICS", msg);
        window.postMessage(msg, "*");
    }

    private getName(item: any): string {
        if(item.id)
            return item.id;

        if(item.page && item.page.name)
            return item.page.name;

        return "";
    }

    private createPayload(actType: string, wfElement: HTMLElement, path: Array<HTMLElement>){
        const p = path.filter(i => i.nodeName && i.nodeName.indexOf("document-fragment") === -1);
        const wfPage = p.find(i => i.localName === "polaris-workflow") as HTMLPolarisWorkflowElement;

        if(!wfPage)
            return null;
            
        const activity = wfPage.ctx.wf.activity; 
        const wfPath = p.slice(0, p.indexOf(wfPage) + 1)

        if(!activity.name)
            return null;

        const process = wfPage.ctx.wf.process.name;
    
        const act = activity.name;
        const control = wfElement.id;
        const valueHash = this.getHashCode(wfElement["value"]);

        return { "type": actType, process, activity: act, control, valueHash, wfPath};        
    }

    private getHashCode(str: string): number {
        let hash = 0
        for (let i = 0; i < str.length; ++i)
            hash = Math.imul(31, hash) + str.charCodeAt(i)

        return hash;
    }
}