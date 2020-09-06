const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const http = require('http');

const PORT = 5000;
const CONTAINER_SELECTOR = '.mqtn.card.container';
const IMAGE_PATH = 'build/card.png';

const serve = http.createServer(handler);

serve.listen(PORT, async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/`, {waitUntil: 'networkidle0'});
    await page.evaluate(() => document.body.style.background = 'transparent');
    const elements = await page.$$(CONTAINER_SELECTOR);
    const container = elements[0];
    await container.screenshot({ path: IMAGE_PATH, omitBackground: true });
    await browser.close();
    process.exit(0);
  } catch (e){
    console.error(`Error occured while take screenshot: ${e}`);
    process.exit(1);
  }
})
