const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');

const startServer = () => {
    app.use(express.json());

    app.listen(PORT, (req, res) => {
        console.log(`server is started at PORT: ${PORT}`);
    });
}

startServer();