import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/token", (req, res) => {
  const secret = "$2a$12$kxHyO2./SM/wucbfmSu37.1RdqVbWZEUbFIKT5UF35ze2wfcU6K5m";

  const token = jwt.sign(user, secret);
  res.send(token);
});

//Middleware
app.use(express.json());

export default app;
