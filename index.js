// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1

const { chromium } = require("playwright");
const { convertArrayToCSV } = require("convert-array-to-csv");
const fs = require('fs');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");
  const title = await page.evaluate(() => {
    return Array.from(document.getElementsByClassName("titleline")).map(item => item.textContent);
  });

  const hrefs = await page.evaluate(() => {
    return Array.from(document.getElementsByClassName("titleline")).map(item => item.querySelector('.titleline a').getAttribute('href'));
  });


  for (let i = 0; i < 10; i++) {
    console.log(title[i], hrefs[i])
    }
  const header = ['title', 'url']
  const dataArrays = [
    [title[0], hrefs[0]],
    [title[1], hrefs[1]],
    [title[2], hrefs[2]],
    [title[3], hrefs[3]],
    [title[4], hrefs[4]],
    [title[5], hrefs[5]],
    [title[6], hrefs[6]],
    [title[7], hrefs[7]],
    [title[8], hrefs[8]],
    [title[9], hrefs[9]]
  ]

  const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
    header, separator: ','
  });

  fs.writeFile('output.csv', csvFromArrayOfArrays, err => {
    if (err) {
      console.log(18, err);
    }
    console.log('CSV successfully saved');
  })

  browser.close()

}

(async () => {
  await saveHackerNewsArticles();
})();
