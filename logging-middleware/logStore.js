const logs=[];
const addLog=(log)=>{
    logs.push(log);
};
const getLogs=()=>{
    return [...logs];
};
module.exports={addLog,getLogs};