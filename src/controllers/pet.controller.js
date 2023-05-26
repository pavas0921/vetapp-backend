import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { exp: expDate } = decoded;

    //Expired?
    if (Date.now() / 1000 > expDate) {
      console.log("expired");
      res.status(401).send();
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send("no");
  }
};

//Create pet
export const createPet = async (req, res) => {
  console.log("hola");
  try {
    const pet = await prisma.pet.create({
      data: req.body,
    });
    console.log(pet);
    res.status(201).json(pet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//Get pet by id
export const getPetById = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await prisma.pet.findUnique({
      where: {
        idpet: +id,
      },
      include: {
        history: true,
      },
    });
    if (pet && Object.keys(pet).length > 0) {
      res.status(200).json(pet);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send({ error });
  }
};

//Get pet by owner
export const getPetByOwner = async (req, res) => {
  const { idperson } = req.params;
  console.log(idperson);

  try {
    const pet = await prisma.pet.findMany({
      where: {
        idperson: +idperson,
      },
    });
    if (pet && Object.keys(pet).length > 0) {
      res.status(200).json(pet);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

//Edit pet
export const updateFav = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.update({
      where: {
        idpet: +id,
      },
      data: req.body,
    });
    res.json(pet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
