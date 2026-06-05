const {fetchNotifications}=require("./notificationService");
const {getTopNotifications}=require("./priorityInbox");
const logger=require("../logging-middleware/logger");
async function run(){
	try{
		logger.info("Program started");
		const data=await fetchNotifications();
		const topList=getTopNotifications(data,10);
		console.log("\nTop 10 Unread Notifications\n");
		topList.forEach((n,i)=>{
			console.log(`${i+1}. ${n.title} | Priority: ${n.priority} | ${n.timestamp}`);
		});
		logger.info("Program finished");
	}
	catch(error){
		logger.error(`Error: ${error.message}`);
	}
}
run();