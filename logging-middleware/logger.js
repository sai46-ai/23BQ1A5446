const {addLog}=require("./logStore");
const createLog=(level,message)=>{
const entry={
    timestamp:new Date().toISOString(), level,message};
    addLog(entry);
};
const info=(message)=>{
    createLog("INFO",message);
};
const warn=(message)=>{
    createLog("WARN",message);
};
const error=(message)=>{
    createLog("ERROR",message);
};
module.exports={info,warn,error};