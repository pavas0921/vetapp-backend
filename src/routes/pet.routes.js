import express from "express";
import {
  createPet,
  updateFav,
  getPetById,
  getPetByOwner,
} from "../controllers/pet.controller.js";

const router = express.Router();

//Create pet
router.post("/", createPet);

//Edit pet
router.put("/:id", updateFav);

//Get pet by id
router.get("/:id", getPetById);

//Get pets by owner
router.get("/person/:idperson", getPetByOwner);

export default router;
