const axios = require("axios");
const logger = require("../logging-middleware/logger");

const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";

async function getAccessToken() {
	if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
		throw new Error("CLIENT_ID and CLIENT_SECRET must be set in .env");
	}

	logger.info("Requesting access token from auth service");

	try {
		const payload = {
			email: "23bq1a5446@vvit.net",
			name: "Venkata Sai Jaggarapu",
			rollNo: "23BQ1A5446",
			accessCode: "QQdEYy",
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
		};

		const { data } = await axios.post(AUTH_URL, payload);
		logger.info("Access token obtained successfully");
		return data.access_token;
	} catch (err) {
		const serverMsg =
			err.response && err.response.data
				? JSON.stringify(err.response.data)
				: err.message;
		logger.error(`Auth failed: ${serverMsg}`);
		throw new Error(`Auth failed: ${serverMsg}`);
	}
}

module.exports = { getAccessToken };
