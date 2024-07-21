const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const TicketController = require('./controllers/ticket.controller');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');
const { 
    createChannel, 
    subscribeMessage, 
} = require('./utils/messageQueue');
const EmailService = require('./services/email-service');


const startServer = async () => {
    app.use(express.json());

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, (req, res) => {
        console.log(`server is started at PORT: ${PORT}`);
        // setupJobs();
    });
}

startServer();