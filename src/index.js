const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require("./services/email-service");

const startServer = () => {
    app.use(express.json());

    app.listen(PORT, (req, res) => {
        console.log(`server is started at PORT: ${PORT}`);

        sendBasicEmail(
            'support@admin.com',
            'qriocity01@gmail.com',
            'This is a test email',
            'Hey there, hope you are doing fine ?'
        );
    });
}

startServer();