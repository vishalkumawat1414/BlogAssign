const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const DBconnect = require("./DBconnect");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
dotenv.config("./.env");

const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

const app = express();
app.use(bodyParser.json());

//middlewares

app.use(mongoSanitize()); //to sanitize user input

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

module.exports = app;

// router
app.use("/blogauth", authRouter);
app.use("/blogposts", postRouter);

//for data base connecting
DBconnect();

//listning
app.listen(process.env.PORT, () => {
	console.log(`Listening at port :${process.env.PORT}`);
});
