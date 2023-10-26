const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.user;

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_KEY);
};

exports.login = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (!userEmail || !userPassword)
    return res
      .status(401)
      .send({ message: "Email and password are reqiured", login: false });
  try {
    const usr = await await user.findOne({where: {email:userEmail}});

    if (usr) {
      const result = await bcrypt.compare(userPassword,usr.password);
      if (result) {
        const token = generateToken(user.id);

        res.send({ message: "Login successfully", login: true, token });
      } else {
        res.status(401).send({ message: "Password incorrect", login: false });
      }
    } else {
      res
        .status(404)
        .send({ message: "This email doesn't exist", login: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred, Please try again later.",
      login: false,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;
    const checkUser = user.findOne({where: {email}})
    const createHash = bcrypt.hash(password, 10);
    const [foudUser , hash] = await Promise.all([checkUser , createHash]);
    if(foudUser) return res.status(402).send({ message: "This email already exists",success:false});
    const response = await user.create({ name, email, mobile, password: hash});
    const token = generateToken(response.id);
    return res.json({ success: true, message: "User created successfully", login: true, token  });
  } catch (err) {
    res.status(500).send({ message: err.message, error: err });
  }
};
