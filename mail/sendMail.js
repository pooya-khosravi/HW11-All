var nodemailer = require('nodemailer');

//create info your email
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',//our gmail
        pass: ''//enter our pass
    }
});

var mailOptions = {
    from: '',
    to: '',
    subject: 'hello',
    text: 'are u good?!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log("ERROR: "+error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});