require("dotenv").config();
const { fetchNotifications } = require("./notificationService");
const { getTopNotifications } = require("./priorityInbox");
const logger = require("../logging-middleware/logger");

async function run() {
	try {
		logger.info("Application started");
		const notifications = await fetchNotifications();
		const topList = getTopNotifications(notifications, 10);
		process.stdout.write("\nTOP 10 PRIORITY UNREAD NOTIFICATIONS\n\n");
		topList.forEach((item, index) => {
			process.stdout.write(
				`${index + 1}. ${item.Message} | Type: ${item.Type} | ${item.Timestamp}\n`
			);
		});
		logger.info("Application finished");
	} catch (error) {
		logger.error(`Application error: ${error.message}`);
		process.stdout.write(`Error: ${error.message}\n`);
		process.exit(1);
	}
}

run();