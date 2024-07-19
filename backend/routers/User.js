import express from "express";
import {
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verify,
} from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";
import { addTask, getAllTasks, getTask, removeTask, updateTask } from "../controllers/Task.js";

export const userRouter = express.Router();

userRouter.route("/register").post(register);

userRouter.route("/verify").post(isAuthenticated, verify);

userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

userRouter.route("/me").get(isAuthenticated, getMyProfile);

// Task start

userRouter.route("/task/add").post(addTask);

userRouter.route("/get/tasks").get(getAllTasks);

userRouter
  .route("/task/:id")
  .put(updateTask)
  .delete(removeTask)
  .get(getTask);

// Task end

userRouter.route("/updateprofile").put(isAuthenticated, updateProfile);
userRouter.route("/updatepassword").put(isAuthenticated, updatePassword);

userRouter.route("/forgetpassword").post(forgetPassword);
userRouter.route("/resetpassword").put(resetPassword);

// export default userRouter;