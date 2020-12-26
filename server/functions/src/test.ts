import * as nodemailer from "nodemailer";
const user = "hello@movie-sync.com";
const pass = "$:+DaUb\\7_%";

const main = async () => {
  console.log(pass);

  const transport = nodemailer.createTransport({
    host: "securemail.Aplus.net",
    port: 465,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user,
      pass,
    },
  });

  const message = {
    from: "hello@movie-sync.com",
    to: "wang703003515@gmail.com",
    subject: "test from movie-sync",
    text: "hey it's Nick",
    html: "<p>HTML version of the message</p>",
  };

  const info = await transport.sendMail(message);
  console.log(info);
};

main().catch(console.error);
