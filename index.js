// run with: node --test index.js
const { chromium } = require("playwright");
const assert = require('node:assert/strict');
const { describe, it, before, after, beforeEach, afterEach } = require("node:test");

describe("Hacker News Articles", () => {
  let browser;
  let context;
  before(async () => {
    // launch browser
    browser = await chromium.launch({ headless: false });
  });
  beforeEach(async () => {
    context = await browser.newContext();
  });
  afterEach(async () => {
    await context.close();
  });
  after(async () => {
    await browser.close();
  });
  it("are sorted", async () => {
    const page = await context.newPage();
  
    //go to Hacker News
    await page.goto("https://news.ycombinator.com/newest");
    //create a list of title content for age elements
    const titles = await page.locator('.age').evaluateAll((items) => items.map((item) => item.getAttribute('title')));
    while(titles.length < 100){
      await page.locator('.morelink').click();
      
      //extend list of title content for age elements
      titles.push(...await page.locator('.age').evaluateAll((items) => items.map((item) => item.getAttribute('title'))));
    }
  
    //create a copy of the list, sorted
    const sortedTitles = titles.toSorted().reverse();
  
    //compare titles to sortedTitles
    assert.deepEqual(titles, sortedTitles);
  
  });
});

