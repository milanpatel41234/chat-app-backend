const userModel = require("../models/userModel");

exports.login = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (!userEmail || !userPassword)
    return res
      .status(401)
      .send({ message: "Email and password are reqiured", login: false });
  try {
    const user = await userModel.getUserByEmail(userEmail);

    if (user) {
      const result = await userModel.comparePasswords(
        userPassword,
        user.password
      );
      if (result) {
        const token = userModel.generateToken(user.id);

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
    const response = await userModel.createUser(name, email, mobile, password);
    const token = userModel.generateToken(response.id);
    return res.json({ success: true, message: "User created successfully", login: true, token  });
  } catch (err) {
    res.status(500).send({ message: err.message, error: err });
  }
};
