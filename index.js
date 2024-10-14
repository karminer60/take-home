// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
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
  
    //get all table's age attributes
    const listItems = await page.$$('.age')
  
    //extract the title content of each list item
    const titles = await Promise.all(listItems.map(async(item) => await item.getAttribute('title')));
  
    //create a copy of the list, sorted
    const sortedTitles = titles.toSorted().reverse();
  
    //compare titles to sortedTitles
    assert.deepEqual(titles, sortedTitles);
  });
});

