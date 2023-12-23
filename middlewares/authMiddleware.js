const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
	const token = req.headers.authorization;
    const key = process.env.SECRET
   
    const accessToken = req.headers.authorization.split(" ")[1];
	if (!token) {
		res
			.status(401)
			.json({ success: false, message: "Unauthorized: Token not provided" });
		return;
	}

	jwt.verify(accessToken, key, (err, decoded) => {
		if (err) {
			res
				.status(401)  
				.json({ success: false, message: "Unauthorized: Invalid token" });
			return;
		}

		req.user = decoded;
		next();
	});
};
