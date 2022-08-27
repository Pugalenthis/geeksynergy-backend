import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} from "../controllers/user.js";
const router = express.Router();

//GET ALL USER
router.get("/", getUsers);

//GET USERBYID
router.get("/:id", getUser);

//UPDATE USER
router.put("/:id", updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

export default router;
