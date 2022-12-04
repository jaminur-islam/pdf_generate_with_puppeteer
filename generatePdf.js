const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const data = require("./users.json");

async function compile(templateName, data) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
}

// anonymise function likhle () diye dei tahole seta ke functional object baniye dey ;
async function onPdfGenerate(pdfPath) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const content = await compile("index", data);
    await page.setContent(content);
    // create a pdf document
    await page.setViewport({
      width: 595,
      height: 842,
      deviceScaleFactor: 1,
    });
    await page.addStyleTag({ content: "@page { size: A4 landscape; }" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "40px",
        right: "30px",
        bottom: "0px",
        left: "30px",
      },
    });
    console.log("pdf crating successfully");
    await browser.close();
    // stop all execution after this line
    // process.exit();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { onPdfGenerate };

/* 

Last week I went home. I had some work to do there. I came to office on monday and finished my node js course. And this week on Friday we all went to eat together at a resurent. I had a lot of fun going there.
And today I will work on generating PDF of timely project.
After long days of learning I am back to actual work.
That's it for me this week
We all had a lot of fun there. Anik bhai had a little more fun. Anik brother say something? About this.
We all listen to him.
I was learning for a long time


*/
