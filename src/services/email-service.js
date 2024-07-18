const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket.repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody,
        });
    }
    catch (error) {
        console.log(error);
    }
}

// fetchPendingEmails function will 
// fetch all the emails which are pending before this timestamp
const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({ status: "PENDING" });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log("error in service layer");
        throw error;
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log("error in service layer");
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
}