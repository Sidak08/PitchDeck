import { Router } from "express";
import {
  signup,
  login,
  getMe,
  updateFavourites,
  getFavourites,
  logout,
} from "../controllers/authController";
import { validateSignup, validateLogin } from "../middleware/validateUser";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/me", getMe);
router.post("/favourites", updateFavourites);
router.get("/favourites", getFavourites);
router.post("/logout", logout);

export default router;
