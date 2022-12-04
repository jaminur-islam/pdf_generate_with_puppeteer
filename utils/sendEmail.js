const sgMail = require("@sendgrid/mail");
const fs = require("fs-extra");
const path = require("path");

const sendEmailFunction = async (pathName) => {
  const attachment = fs.readFileSync(pathName).toString("base64");
  return new Promise((resolve, reject) => {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      from: "alifahmed.47@gmail.com", // Change to your recipient
      to: "jaminurislam250@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      attachments: [
        {
          content: attachment,
          filename: "employee.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = sendEmailFunction;
