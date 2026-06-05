const {fetchNotifications}=require("./notificationService");
const {getTopNotifications}=require("./priorityInbox");
const logger=require("../logging-middleware/logger");
async function run(){
	try{
		logger.info("Program started");
		const notifications=await fetchNotifications();
		const topList=getTopNotifications(notifications,10);
		process.stdout.write("\nTOP 10 PRIORITY UNREAD NOTIFICATIONS\n\n");
		topList.forEach((item,index)=>{
			process.stdout.write(
				`${index+1}. ${item.title} | Priority: ${item.priority} | ${item.timestamp}\n`
			);
		});
		logger.info("Program finished");
	}
	catch(error){
		logger.error(`Error: ${error.message}`);
		process.stdout.write(`Error: ${error.message}\n`);
	}
}
run();