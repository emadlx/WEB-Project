import express from "express"
import {
  login,
  logout,
  signup,
  updateProfile,
checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router =  express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);

//protectRoute will check if the user is authenticated to reach updateprofile or not if not the function won't be called "for security "
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth)
export default router;
