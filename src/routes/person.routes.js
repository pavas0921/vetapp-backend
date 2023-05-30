import express from "express";
import {
  createPerson,
  getAllPerson,
  getPersonById,
  updatePerson,
  login,
  generateToken,
  verifyToken,
  getbyName,
} from "../controllers/person.controller.js";
import { sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

//Login
router.post("/login", login, generateToken, sendEmail);

//Get all person
router.get("/", verifyToken, getAllPerson);

//Get person by id
router.get("/:id", verifyToken, getPersonById);

//Get by name
router.get("/name/:name", verifyToken, getbyName);

//Create a new person
router.post("/", verifyToken, createPerson);

//Edit person
router.put("/:id", verifyToken, updatePerson);

export default router;
