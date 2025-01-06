console.log ('Browser')

// WebDriver - https://w3c.github.io/webdriver
// Webdriver.io - https://github.com/webdriverio
// WebDriver Bidi - https://w3c.github.io/webdriver-bidi
//  Happy Dom
//    - https://github.com/capricorn86/happy-dom/wiki/Browser
//    - https://github.com/capricorn86/happy-dom/wiki/BrowserPage
//    - https://github.com/capricorn86/happy-dom/wiki/BrowserContext
// Benchmark - https://dev.to/chuongtrh/improve-performance-generate-pdf-using-puppeteer-4lg7
// scrapes - https://hackernoon.com/tips-and-tricks-for-web-scraping-with-puppeteer-ed391a63d952

const
// Navigate to chrome://version
//path = '/usr/bin/chromium-browser'
  headless = false
, encoding = 'utf8'
, data     = html =>
    `data:text/html,${html}`
, open     = require ('fs').readFileSync
, path     = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
, puppeteer
    = require ('puppeteer-core')

, html = open ('./test/index.html', encoding)


module.exports = async function ( url = new URL ('https://snuggsi.com') ) {
  return

  const
    browser
      = await puppeteer.launch ({
        // flags - https://peter.sh/experiments/chromium-command-line-switches/
          headless
        , dumpio: true
        , timeout: 25000
        , devtools: true
        // chrome://version from browser
        , executablePath: path // https://stackoverflow.com/a/49734268
        , waitUntil: 'networkidle2'
  //      , args: [
  //          '--no-sandbox',
  //        , '--disable-gpu',
  //        , '--window-size=1920x1080',
  //        ]
        })

  , page = await browser.newPage ``

  void await page
    .goto ( url )
  //.goto ( data (html) )
  //.setContent ( html )

  console.warn ( await page.content () )

  await browser.close ``
}
