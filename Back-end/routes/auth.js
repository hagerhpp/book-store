const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
router.post("/register", async (req, res) => {
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "This user already registered" });
      }
      
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

      const result = await user.save();
      const token = null;

      const { password, ...other } = result._doc;

    res.status(201).json({...other, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
router.post("/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalide Email or Password" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalide Email or Password" });
    }

      const token = null;
      const { password, ...other } = user._doc;

    res.status(200).json({...other, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
