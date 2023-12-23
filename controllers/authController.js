const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("../config");

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ username, password: hashedPassword });

		await user.save();

		res.json({ success: true, message: "User registered successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			res
				.status(401)
				.json({ success: false, message: "Invalid username or password" });
			return;
		}

		const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
			expiresIn: "1h",
		});

		res.json({ success: true, token });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({
				success: false,
				message: "Internal Server Error or user already exists",
			});
	}
};
