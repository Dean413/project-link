const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user._id, role: user.role };
  const secret = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
};

//Register new user
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
            message: 'User already exists' 
        });
    }
    user = await User.create({ email, password, role });
    const token = generateToken(user);
    res.status(201).json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

//log in registered User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ 
        message: "login successful",
        token, 
        user: { 
            email: user.email, role: user.role 
        } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all registered users
exports.getUsers = async (req, res) => {
    try {
    const users = await User.find({}, 'email _id');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}