import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createHistory = async (req, res) => {
  try {
    const history = await prisma.history.create({
      data: {
        idpet: req.body.idpet,
      },
    });
    console.log(history);
    res.status(201).json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
