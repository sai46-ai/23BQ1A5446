const axios = require("axios");
const logger = require("../logging-middleware/logger");
const { getAccessToken } = require("./authService");

const API_URL =
	process.env.NOTIFICATION_API_URL ||
	"http://4.224.186.213/evaluation-service/notifications";

const fetchNotifications = async () => {
	try {
		logger.info("Fetching notifications from API");
		const token = await getAccessToken();
		const { data } = await axios.get(API_URL, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const list = data.notifications || data;
		logger.info(`Received ${list.length} notifications`);
		return list;
	} catch (err) {
		logger.error(`Notification fetch failed: ${err.message}`);
		throw err;
	}
};

module.exports = { fetchNotifications };