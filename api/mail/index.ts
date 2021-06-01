import nodemailer from "nodemailer";

let mail: any;

export async function mailInit() {
  let testAccount = await nodemailer.createTestAccount();
  mail = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendEmail({
  from = "molly@molly.com",
  to = "molly@molly.com",
  subject,
  html,
}: any) {
  try {
    const info = await mail.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("info", info);
  } catch (e) {
    console.error(e);
  }
}
