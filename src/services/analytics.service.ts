export class AnalyticsService {
    sendMessage(event: object) {
        this.sendPostMessage(event["detail"]);
    }

    send(actType: string, path: HTMLElement[]) {
        const wfElement = path.find(i => i["wf-Workflow"] !== undefined);
        
        if(!wfElement)
            return;

        const payload = this.createPayload(actType, wfElement, path);

        if(payload !== undefined && payload !== null) {
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

    getPath(event: {composedPath(event: object)}) {
        return event.composedPath(event);
    }

    private sendPostMessage(message: object) {
        const msg: object = {...message, timestamp:Date.now()};

        console.log("ANALYTICS", msg);
        window.postMessage(msg, "*");
    }

    private getName(item: HTMLElement & {id: string, page: {name: string}}): string {
        if(item.id != null)
            return item.id;

        if(item.page !== null && item.page.name !== null)
            return item.page.name;

        return "";
    }

    private createPayload(actType: string, wfElement: HTMLElement, path: HTMLElement[]){
        const notFound = -1;

        const p = path.filter(i => i.nodeName !== null && i.nodeName.indexOf("document-fragment") === notFound);
        const wfPage = p.find(i => i.localName === "polaris-workflow");

        if(wfPage === null)
            return null;

        const wfPageElement = <HTMLPolarisWorkflowElement> wfPage;
            
        const activity = wfPageElement.ctx.wf.activity; 
        const wfPath = p.slice(0, p.indexOf(wfPage) + 1)

        if(activity.name === undefined || activity.name === null)
            return null;

        const process = wfPageElement.ctx.wf.process.name;
    
        const act = activity.name;
        const control = wfElement.id;
        const valueHash = this.getHashCode(wfElement["value"]);

        return { "type": actType, process, activity: act, control, valueHash, wfPath};        
    }

    private getHashCode(str: string): number {
        const startIndex = 0;
        const hashLength = 31;

        let hash = startIndex
        for (let i = startIndex; i < str.length; i = i + 1)
            hash = Math.imul(hashLength, hash) + str.charCodeAt(i)

        return hash;
    }
}