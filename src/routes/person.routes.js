import express from "express";
import {
  createPerson,
  getAllPerson,
  getPersonById,
  updatePerson,
  login,
  generateToken,
  verifyToken,
} from "../controllers/person.controller.js";

const router = express.Router();

//Login
router.post("/login", login, generateToken);

//Get all person
router.get("/", verifyToken, getAllPerson);

//Get person by id
router.get("/:identification", verifyToken, getPersonById);

//Create a new person
router.post("/", verifyToken, createPerson);

//Edit person
router.put("/:identification", verifyToken, updatePerson);

export default router;
