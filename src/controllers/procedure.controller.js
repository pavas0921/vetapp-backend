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
export const createProcedure = async (req, res) => {
  const currentDate = new Date();
  try {
    const procedure = await prisma.procedure.create({
      data: {
        procedure_title: req.body.procedure_title,
        procedure_detail: req.body.procedure_detail,
        start_date: new Date(currentDate),
        attached: req.body.attached,
        idperson: req.body.idperson,
        idprocedure_type: req.body.idprocedure_type,
        idhistory: req.body.idhistory,
      },
    });
    console.log(procedure);
    res.status(201).json(procedure);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//Get procedures by history id
export const getProceduresByHistoryId = async (req, res) => {
  console.log("procedures");
  const { idhistory } = req.params;

  try {
    const procedure = await prisma.procedure.findMany({
      where: {
        idhistory: +idhistory,
      },
    });
    if (procedure && Object.keys(procedure).length > 0) {
      res.status(200).json(procedure);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    console.log(error);
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
