const { Op } = require('sequelize');
const { NotificationTicket } = require('../models/index');

class TicketRepository {

    async getAll() {
        try {
            const response = await NotificationTicket.findAll();
            return response;
        } catch (error) {
            console.log("Error in ticket repository");
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await NotificationTicket.create(data);
            return response;
        } catch (error) {
            console.log("error in ticket repo");
            throw error;
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        }
        catch (error) {
            console.log("error in ticket repo");
            throw error;
        }
    }
}

module.exports = TicketRepository;