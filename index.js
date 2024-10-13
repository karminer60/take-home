// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
}

  //get all table's rows
  const rows = await page.$$('.age');

  //extract the attribute you need to check is sorted in the table items


(async () => {
  await sortHackerNewsArticles();
})();
