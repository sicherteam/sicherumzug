const {test,expect}=require('@playwright/test');
for(const edge of ['header','bottom'])test('pointer opens FAQ near '+edge+' without scroll jump',async({page},info)=>{
 test.skip(!['390','1440'].includes(info.project.name));
 await page.goto('/');
 const summary=page.locator('.faq-section details>summary').first();
 await summary.evaluate((e,edge)=>{const header=document.querySelector('.site-header').getBoundingClientRect(),bar=document.querySelector('.mobile-contact');const bottom=getComputedStyle(bar).display==='none'?innerHeight:bar.getBoundingClientRect().top;const top=edge==='header'?header.bottom-12:bottom-20;scrollTo(0,e.getBoundingClientRect().top+scrollY-top)},edge);
 const before=await page.evaluate(()=>scrollY),box=await summary.boundingBox();
 await page.mouse.click(box.x+box.width/2,edge==='header'?box.y+box.height-5:box.y+5);
 await expect(summary.locator('..')).toHaveAttribute('open','');
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 expect(Math.abs(await page.evaluate(()=>scrollY)-before)).toBeLessThan(2);
});
test('Tab focus stays clear of the sticky header',async({page},info)=>{
 test.skip(!['390','1440'].includes(info.project.name));
 await page.goto('/');
 const summaries=page.locator('.faq-section details>summary');
 await summaries.nth(1).focus({preventScroll:true});
 await summaries.first().evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-document.querySelector('.site-header').getBoundingClientRect().bottom+12));
 await page.keyboard.press('Shift+Tab');
 await expect(summaries.first()).toBeFocused();
 await expect.poll(async()=>{const box=await summaries.first().boundingBox();return box.y-(await page.locator('.site-header').boundingBox()).height}).toBeGreaterThanOrEqual(8);
});
