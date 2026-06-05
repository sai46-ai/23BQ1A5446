const logger=require("../logging-middleware/logger");
const MinHeap=require("./minHeap");
const getTopNotifications=(notifications,limit=10)=>{
	logger.info("Filtering unread notifications");
	const heap = new MinHeap();
	for (const notification of notifications) {
		if (notification.read) {
			continue;
		}
		if (heap.size() < limit) {
			heap.insert(notification);
		} else if (notification.priority > heap.peek().priority) {
			heap.removeMin();
			heap.insert(notification);
		}
	}
	logger.info("Top notifications generated");
	return heap.heap.sort((a, b) => b.priority - a.priority);
};
module.exports = { getTopNotifications };