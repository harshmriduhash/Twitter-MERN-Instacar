const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
});

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hashSync(this.password, 8);
	next();
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
