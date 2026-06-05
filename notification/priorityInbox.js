const logger=require("../logging-middleware/logger");
const MinHeap=require("./minHeap");
const getTopNotifications=(notifications,limit=10)=>{
	logger.info("Filtering unread notifications");
	const unread=notifications.filter(item=>!item.read);
	logger.info(`Unread notifications: ${unread.length}`);
	const heap=new MinHeap();
	for(const notification of unread){
		if(heap.size()<limit){
			heap.insert(notification);
		}
		else if(notification.priority>heap.peek().priority){
			heap.removeMin();
			heap.insert(notification);
		}
	}
	const result=[...heap.heap];
	result.sort((a,b)=>b.priority-a.priority);
	logger.info("Top notifications generated");
	return result;
};
module.exports={getTopNotifications};