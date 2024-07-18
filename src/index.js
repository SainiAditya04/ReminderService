const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const TicketController = require('./controllers/ticket.controller');
const setupJobs = require('./utils/job');

const startServer = () => {
    app.use(express.json());

    app.post('/api/v1/tickets', TicketController.create);
    
    app.listen(PORT, (req, res) => {
        console.log(`server is started at PORT: ${PORT}`);
        setupJobs();
    });
}

startServer();