import express from "express";

const router = express.Router();

// controllers
import { login , register} from "../controllers/auth";


router.post("/login", login);
router.post("/register", register);


module.exports = router;
