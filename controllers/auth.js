import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
      profession: req.body.profession,
    });
    await newUser.save();
    res.status(200).send({ message: "User has been created", status: 200 });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Invalid Credentials!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Invalid Credentials"));

    const token = jwt.sign(
      { id: user._id, password: user.password },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ message: "Login Successful", status: 200 });
  } catch (err) {
    next(err);
  }
};
