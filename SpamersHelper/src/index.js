console.log(1);
var nodemailer = require('nodemailer'); 

const testButton = document.getElementById('sendMailButton')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spamer.helper.ukma@gmail.com',
        pass: 'qwertuiop2'
    }
});

let mailOptions = {
    from: 'smaer.helper.ukma@gmail.com',
    to: 'danil200319771@gmail.com',
    subject: 'TEST!',
    text: 'Test!'
}

testButton.addEventListener('click', () => {
    console.log(1);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sended: ' + info.response);
        }
    })
});