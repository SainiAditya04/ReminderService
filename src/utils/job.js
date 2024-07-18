const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');


// every 5 minutes
// we will check if there are any emails pending, which were expected to
// be sent by now and is pending

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    emailService.updateTicket(email.id, { status: "SUCCESS" });
                }
            })
        });
        console.log(response)
    });
}

module.exports = setupJobs;