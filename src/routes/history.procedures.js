import express from "express";
import { createHistory } from "../controllers/history.controller.js";
import { verifyToken } from "../controllers/person.controller.js";

const router = express.Router();

router.post("/", verifyToken, createHistory);

export default router;
