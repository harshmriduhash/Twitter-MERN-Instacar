const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const mongoose = require('mongoose');

const connectionName =  process.env.MONGODB_URL || "mongodb+srv://shreyvijayargiya:treyvijay@cluster0-0xtfy.mongodb.net/test?retryWrites=true&w=majority"; 
mongoose.connect(  connectionName, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin' , "*");
	res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
})
app.use(router);


app.listen(process.env.PORT || 3001, (req, res) => {
	console.log(`Server is listening on port ${process.env.PORT || port}`);
});