import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";
import petRoutes from "./routes/pet.routes.js";
import procedureRoutes from "./routes/procedure.route.js";

const app = express();

app.use(cors());

// app.get("/token", (req, res) => {
//   console.log("appget");
//   const secret = "$2a$12$kxHyO2./SM/wucbfmSu37.1RdqVbWZEUbFIKT5UF35ze2wfcU6K5m";

//   const token = jwt.sign(user, secret);
//   res.send(token);
// });

//Middleware
app.use(express.json());
app.use("/person", personRoutes);
app.use("/pet", petRoutes);
app.use("/procedure", procedureRoutes);

export default app;
