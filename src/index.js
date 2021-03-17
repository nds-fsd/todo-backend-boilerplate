const express = require("express");
require('./mongo/test.js');
require("dotenv").config();
const testRouter = require('./mongo/test');
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require("body-parser");
const server = app.listen(process.env.PORT, () => {
	console.log('server is running on port', server.address().port);
});

const appRouter = require('./router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/",appRouter);

testRouter(app);