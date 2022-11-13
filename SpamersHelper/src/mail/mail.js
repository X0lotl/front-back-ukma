export class MailSender {
    
    constructor () {
        this.nodemailer = require("nodemailer");

        this.transporter = nodemailer.createTransport({
            host: "gmail",
            port: 2525,
            auth: {
              user: "spamer.helper.ukma@gmail.com",
              pass: "Dania20031977"
            }
          });
          
          this.message = {
            from: "sma er.helper.ukma@gmail.com",
            to: "danil200319771@gmail.com",
            subject: "Subject",
            html: "<h1>Test</h1>"
          };
    }

    *mySendMail() {
        transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          });
    }
}