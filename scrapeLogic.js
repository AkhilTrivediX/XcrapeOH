const puppeteer = require("puppeteer");
require("dotenv").config();


const browserPromise = puppeteer.launch({
  args: [
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--single-process",
    "--no-zygote",
  ],
  executablePath:
    process.env.NODE_ENV === "production"
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const scrapeLogic = async (res) => {

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
  const browser = await browserPromise;

  ret.time.browserInit = Date.now()-time;
    time = Date.now();
  try {
    const page = await browser.newPage();
    ret.time.pageInit = Date.now()-time;
    time = Date.now();
    await page.goto('https://instagram.com/cristiano');
    ret.time.pageNav = Date.now()-time;
    time = Date.now();
    const title = await page.title();
    ret.time.pageTitle = Date.now()-time;
    ret.time.total = Date.now()-totalTime;
    ret.result = title;
    res.send(ret)
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  }
};

module.exports = { scrapeLogic };
