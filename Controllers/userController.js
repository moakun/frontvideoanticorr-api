const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

// login
const loginUser = async (req, res) => {
  const { firstName, lastName, userName, companyName, password } = req.body;

  try {
    const user = await User.login(
      firstName,
      lastName,
      userName,
      companyName,
      password
    );
    const token = createToken(user._id);
    res.status(200).json({ firstName, lastName, userName, companyName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register
const registerUser = async (req, res) => {
  const { firstName, lastName, userName, companyName, password } = req.body;
  try {
    const user = await User.register(
      firstName,
      lastName,
      userName,
      companyName,
      password
    );

    //create token
    const token = createToken(user._id);

    res.status(200).json({ firstName, lastName, userName, companyName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
