const mongoose = require("mongoose");

module.exports = async () => {
	const mongoUrl =
		process.env.DATABASE;

	try {
		await mongoose.connect(mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("mongoose connected");
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
