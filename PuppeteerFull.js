const puppeteer = require('puppeteer');
require('dotenv').config();

const browserPromise = puppeteer.launch({args:[
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--single-process',
    '--no-zygote'
],headless:true, executablePath: process.env.NODE_ENV=='production'?process.env.PUPPETEER_EXECUTABLE_PATH:puppeteer.executablePath()});
module.exports= async function PuppeteerFull(username){

    const ret = {
        time: {
            browserInit: 0,
            pageInit: 0,
            pageNav: 0,
            pageTitle: 0,
            total: 0
        },
        result: ''
    }
    let time = Date.now();
    let totalTime = time;
    try{
    const browser = await browserPromise;
    ret.time.browserInit = Date.now()-time;
    time = Date.now();
    const page = await browser.newPage();
    ret.time.pageInit = Date.now()-time;
    time = Date.now();
    await page.goto('https://instagram.com/'+username, {
        waitUntil: 'domcontentloaded'
    })
    ret.time.pageNav = Date.now()-time;
    time = Date.now();
    const title = await page.title();
    ret.time.pageTitle = Date.now()-time;
    ret.time.total = Date.now()-totalTime;
    ret.result = title;
    return ret;}
    catch(error){
        console.error("Error in Puppeteer:", error);
        return ret;
    }
}