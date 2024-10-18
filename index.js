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
    let listItems = await page.$$('.age')
    const titles = await Promise.all(listItems.map(async(item) => await item.getAttribute('title')));
    while(titles.length < 100){
      await page.getByText('More').click();
      //get all table's age attributes
      listItems = await page.$$('.age')
  
      //extract the title content of each list item
      titles.push(...await Promise.all(listItems.map(async(item) => await item.getAttribute('title'))));
    }
  
    //create a copy of the list, sorted
    const sortedTitles = titles.toSorted().reverse();
  
    //compare titles to sortedTitles
    assert.deepEqual(titles, sortedTitles);
  
  });
});

