const {message} = require('../database/db')

exports.addMessage = async(text)=>{
return await message.create(text);
}