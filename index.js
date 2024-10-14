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

  //get all table's age attributes
  const listItems = await page.$$('.age')

  //extract the title content of each list item
  const titles = await Promise.all(listItems.map(async(item) => await item.getAttribute('title')));



(async () => {
  await sortHackerNewsArticles();
})();
