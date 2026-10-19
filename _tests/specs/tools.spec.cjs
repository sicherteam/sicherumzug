const {test,expect}=require('@playwright/test');
const fs=require('node:fs');const cases=require('../tool-cases.cjs');
for(const s of cases)test(s.id+' result, keyboard, exports and reset',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Always intercept the real mail endpoint, even though these tests do not submit it.
 await page.route('**/form-handler.yasin2celik-62a.workers.dev/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}));
 await page.addInitScript(()=>{window.__printed=0;window.print=()=>{window.__printed++;window.dispatchEvent(new Event('beforeprint'));window.dispatchEvent(new Event('afterprint'))}});
 const response=await page.goto(s.path);expect(response.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);
 if(s.setup)await s.setup(page);await page.locator(s.form+' button[type=submit]').first().click();await expect(page.locator(s.result)).toBeVisible();if(s.check)await s.check(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await page.locator(s.form+' input:not([type=hidden]),'+s.form+' select').first().focus();await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.activeElement!==document.body)).toBe(true);
 if(info.project.name==='390'){
 const result=page.locator(s.result);await result.locator('.tool-print-result').click();expect(await page.evaluate(()=>window.__printed)).toBe(1);
 const waiting=page.waitForEvent('download');await result.locator('.tool-pdf-download').click();const download=await waiting;const output=info.outputPath(s.id+'.pdf');await download.saveAs(output);const pdf=fs.readFileSync(output);expect(pdf.subarray(0,4).toString()).toBe('%PDF');expect(pdf.length).toBeGreaterThan(1000);
 await page.emulateMedia({media:'print'});await expect(result).toBeVisible();await page.emulateMedia({media:'screen'});
 await page.screenshot({path:info.outputPath(s.id+'.png')});
 if(s.quote){await page.locator(s.quote).click();await expect(page.locator('#form-planning')).not.toHaveValue('');await page.goto(s.path);if(s.setup)await s.setup(page);await page.locator(s.form+' button[type=submit]').first().click();await expect(page.locator(s.result)).toBeVisible()}
 await page.locator(s.reset).click();await expect(page.locator(s.result)).toBeHidden();
 }expect(errors).toEqual([]);
});
