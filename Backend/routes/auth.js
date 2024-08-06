import express from "express"
import { loginUser, logoutUser, registerUser } from "../Controllers/authControllers.js";

const router =express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)



 export default router;

