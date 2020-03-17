const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	origin: {
		type: String,
		required: true,
	},
	destination: {
		type: String,
		required: true,
	},
	departDate: {
		type: String,
		required: true,
	},
	driver: {
		type: String,
	},
	language: {
		type: String,
	},
	pickupTime: {
		type: String,
	}
});

const Booking = new mongoose.model('Booking', bookingSchema );

module.exports = Booking;
