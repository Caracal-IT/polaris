import { newE2EPage } from '@stencil/core/testing';

describe('polaris-workflow', () => {
    const process = {
        name : "demo",
        activities: [
          {
            name: "start",
            type: "page-activity",            
            controls: [
                {tag : "h1", innerHTML: "Polaris" },
                {tag : "span", innerHTML: "Welcome to polaris workflow" }                    
            ]        
          }
        ]
      };

    it('should render polaris-workflow', async () => {
        const page = await newE2EPage();
        await page.setContent(`<polaris-workflow></polaris-workflow>`);
        const el = await page.find('polaris-workflow');
        expect(el).not.toBeNull();
    });

    it('should render process', async () => {
        const page = await newE2EPage();
        await page.setContent(`<polaris-workflow></polaris-workflow>`);
        const wf = await page.find('polaris-workflow');
        
        wf.callMethod('load', process);
        await page.waitForChanges();

        const header =  await wf.find('h1');
        const body =  await wf.find('span');

        expect(wf).toHaveClasses(['hydrated']);
        expect(header.innerText).toBe('Polaris');
        expect(body.innerText).toBe('Welcome to polaris workflow');
    });
});