    const db = require("../database/db");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const user = db.user;
    
    const createUser = async (name, email, mobile, password) => {
      try {
        const checkUser = user.findOne({where: {email}})
        const createHash = bcrypt.hash(password, 10);
        const [foudUser , hash] = await Promise.all([checkUser , createHash]);
        if(foudUser) throw new Error("This email already exists");
        const response = await user.create({ name, email, mobile, password: hash});
        return response;
      } catch (err) {
        throw({message:err.message });
      }
    
};


const getUserByEmail = async (email) => {
  return await user.findOne({where: {email}});
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_KEY);
};

module.exports = {
  createUser,
  getUserByEmail,
  comparePasswords,
  generateToken,
};
