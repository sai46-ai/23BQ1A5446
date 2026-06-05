const logger = require("../logging-middleware/logger");
const MinHeap = require("./minHeap");

// Priority map — higher number = higher priority
const PRIORITY = {
	Placement: 5,
	Internship: 4,
	Result: 3,
	Workshop: 2,
	Event: 1,
};

const getPriority = (type) => PRIORITY[type] || 0;

const getTopNotifications = (notifications, limit = 10) => {
	logger.info("Filtering notifications");

	// API has no 'read' field — all notifications are treated as unread
	const unread = notifications.filter((n) => !n.read);
	logger.info(`Unread notifications count: ${unread.length}`);

	const heap = new MinHeap();

	for (const n of unread) {
		const priority = getPriority(n.Type);
		const item = { ...n, priority };

		if (heap.size() < limit) {
			heap.insert(item);
			logger.info(`Inserted "${n.Message}" (${n.Type}, priority: ${priority})`);
		} else if (priority > heap.peek().priority) {
			const removed = heap.removeMin();
			logger.info(`Evicted "${removed.Message}" (priority: ${removed.priority})`);
			heap.insert(item);
			logger.info(`Inserted "${n.Message}" (${n.Type}, priority: ${priority})`);
		}
	}

	const result = [...heap.heap];
	result.sort((a, b) => b.priority - a.priority);
	logger.info(`Top ${result.length} notifications ready`);
	return result;
};

module.exports = { getTopNotifications };