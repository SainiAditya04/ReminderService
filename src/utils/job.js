const cron = require('node-cron');
const emailService = require('../services/email-service');

// every 5 minutes
// we will check if there are any emails pending, which were expected to
// be sent by now and is pending

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            emailService.sendBasicEmail(
                'ReminderService@airline.com',
                email.recepientEmail,
                email.subject,
                email.content,
            );
        })
        console.log(response)
    });
}

module.exports = setupJobs;