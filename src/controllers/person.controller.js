import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const generateToken = (req, res, next) => {
  try {
    const { person } = req.body;
    const payload = {
      idperson: person.idperson,
      name: person.name,
      last_name: person.last_name,
      status: person.status,
      email: person.email,
      token: null,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    payload.token = token;
    if (token) {
      req.body.payload = payload;
      next();
    }
    //res.status(200).json({ payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const person = await prisma.person.findFirst({
      where: {
        email: email,
      },
    });

    const isValidUser = bcrypt.compareSync(password, person.password); // true
    if (isValidUser) {
      req.body.person = person;
      next();
    } else {
      res
        .status(401)
        .json({ error: true, message: "email or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

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

//Obtener todos los usuarios
export const getAllPerson = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    const person = await prisma.person.findMany({
      where: {
        status: true,
      },
      skip: skip,
      take: pageSize,
    });
    const totalCount = await prisma.person.count();

    const totalPages = Math.ceil(totalCount / pageSize);
    if (person.length >= 1) {
      res.status(200).json({
        data: person,
        page: page,
        totalPages: totalPages,
      });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

//Get one person by identification
export const getPersonById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const person = await prisma.person.findUnique({
      where: {
        idperson: +id,
      },
    });
    if (Object.keys(person).length > 0) {
      res.status(200).json(person);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

//Crear un usuario
export const createPerson = async (req, res) => {
  const {
    name,
    last_name,
    identification,
    email,
    password,
    phone,
    image,
    status,
    idrol,
  } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  try {
    const person = await prisma.person.create({
      data: {
        name,
        last_name,
        identification,
        email,
        password: hash,
        phone,
        image,
        status,
        idrol,
      },
    });
    res.status(201).json({ success: true, person });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//Edit person
export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await prisma.person.update({
      where: {
        idperson: +id,
      },
      data: req.body,
    });
    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//Edit person
export const disablePerson = async (req, res) => {
  try {
    const { identification } = req.params;
    const person = await prisma.person.update({
      where: {
        identification: identification,
      },
      data: req.body,
    });
    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//Obtener por nombre
export const getbyName = async (req, res) => {
  try {
    const { name } = req.params;
    const person = await prisma.person.findMany({
      where: {
        name: {
          equals: name,
        },
      },
    });

    if (person.length >= 1) {
      res.status(200).json({
        data: person,
      });
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
    console.log(error);
  }
};
