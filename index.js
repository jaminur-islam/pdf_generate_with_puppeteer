const express = require("express");
const app = express();
const port = 5000;
const { onPdfGenerate } = require("./generatePdf");
const fs = require("fs-extra");
const sendEmailFunction = require("./utils/sendEmail");
const ShortUniqueId = require("short-unique-id");
const path = require("path");

app.get("/", async (req, res) => {
  const uid = new ShortUniqueId();
  const pdfPath = path.join(__dirname, `pdf`, `employee-${uid()}.pdf`);
  const dir = path.join(__dirname, "pdf");
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    await onPdfGenerate(pdfPath);
    const data = await fs.readFile(pdfPath);
    // await sendEmailFunction(pdfPath);
    await fs.unlink(pdfPath);

    res.contentType("application/pdf");
    res.send(data);
    console.log("hi");
  } catch (err) {
    res.status(500).send("This is a server side error ");
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("server listening port", port);
});

/* 


  


   await onPdfGenerate();
  fs.readFile("pdf/employee.pdf", async (err, data) => {
    if (err === null) {
      // await sendEmailFunction();
      console.log("read pdf successfully");
      res.contentType("application/pdf");
      res.send(data);

      fs.unlink("pdf/employee.pdf", (err, data) => {
        if (err === null) {
          console.log("delete pdf successfully");
        }
      });
    }
  });
*/
