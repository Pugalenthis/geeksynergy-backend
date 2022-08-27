import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully", status: 200 });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted", status: 200 });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select({
      _id: 1,
      username: 1,
      email: 1,
      phone: 1,
      profession: 1,
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select({
      _id: 1,
      username: 1,
      email: 1,
      phone: 1,
      profession: 1,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
