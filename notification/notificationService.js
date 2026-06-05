const axios=require("axios");
const logger=require("../logging-middleware/logger");
const API_URL=process.env.NOTIFICATION_API_URL||"http://4.224.186.213/evaluation-service/notifications";
const fetchNotifications=async()=>{
    try{
        logger.info("Fetching notifications");
        const response=await axios.get(API_URL);
        logger.info("Notifications fetched successfully");
        return response.data;
}
catch(err){
    logger.error(`Notification fetch failed: ${err.message}`);
    throw err;
}
};
module.exports={fetchNotifications};