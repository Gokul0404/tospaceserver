//npm i nodemon express

const express = require("express");
const app = express();
const cors = require("cors"); // npm i cors
const mailer = require("nodemailer");
require("dotenv").config(); //npm i dotenv

//middleware
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send('<h1 style="text-align:center; color:blue">welcome</h1>');
});

app.post("/api/sendEmail", (req, res) => {
  console.log(req.body);

  let data = req.body;
  console.log(data);

  //mail send work
  const transporter = mailer.createTransport({
    host: "example.com",
    port: 465,
    secure: true,

    service: "gmail",
    auth: {
      user: "gokul332020@gmail.com",
      pass: process.env.appPassword,
    },
    // secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailoptions = {
    from: "gokul332020@gmail.com",
    to: ["gokulspk04@gmail.com"],
    subject: "Message From Client",
    html: `<ul style="list-style:none; color:black;">
          <li> Name: ${data.name}</li>
          <li>MobileNumber: ${data.phone}</li>
          <li>Email Id: ${data.email}</li>
          <li>Designation: ${data.designation}</li>
          <li>Department: ${data.dept}</li>
          <li>Course: ${data.course}</li>
          <li>Message: ${data.message}</li>
        </ul>`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      return res.status(200).send({ message: "success" });
    }
  });
});

app.listen(process.env.port || 8002, () => {
  console.log("port start");
});
