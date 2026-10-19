const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./specs', timeout:45000, expect:{timeout:8000}, workers:2, retries:0,
 outputDir:'./test-results', reporter:[['list'],['json',{outputFile:'artifacts/results.json'}]],
 use:{baseURL:process.env.BASE_URL||'http://127.0.0.1:4179', screenshot:'only-on-failure',trace:'retain-on-failure',
 launchOptions:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{ }},
 projects:[320,390,768,1024,1440].map(width=>({name:String(width),use:{viewport:{width,height:950}}})),
 webServer:process.env.BASE_URL?undefined:{command:'node server.cjs',url:'http://127.0.0.1:4179',timeout:120000,reuseExistingServer:!process.env.CI}
});
