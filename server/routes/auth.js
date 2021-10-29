import express from "express";

const router = express.Router();

// controllers
import {show, login , register} from "../controllers/auth";


router.post("/login", login);
router.post("/register", register);
router.get("/:reg", show);

module.exports = router;
