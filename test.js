const puppeteer = require('puppeteer');
const axios = require('axios').default;


const URL = 'https://onlineedlreg.dotm.gov.np/dlNewRegHome';
const reTryAfterSeconds = 3;


function checkWebsite() {
    console.log('Loading ', URL)
    axios.get(URL)
        .then(res => {
            // if success the open in browser
            console.log('\x1b[32m', 'Yay!, The website is Up!', '\x1b[0m');
            openInBrowser();
        })
        .catch(err => {
            console.log('\x1b[31m', 'Uff, There is server issue launching again...', '\x1b[0m');
            var count = 1;
            var interval = setInterval(() => {
                console.log('\x1b[31m', count, '\x1b[0m');
                count++;
                if (count > reTryAfterSeconds) {
                    clearInterval(interval);
                    start();
                }
            }, 1000)
        })
}

async function openInBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--app-shell-host-window-size=1600x1239"]
        });
        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: 'networkidle2' });
        browser.close();
    } catch (err) {
        console.log('OOOOooooops ')
    }
}

function start() {
    checkWebsite()
}
start();