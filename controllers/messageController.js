const messageModel = require('../models/messageModel')

exports.postMessage = async(req , res)=>{
try {
    const text = req.body.message;
    const userId = req.user.id;
    console.log({text,userId})
  const response =  messageModel.addMessage({text,userId});
  return res.send(response);
} catch (error) {
    res.send(error);
}
}