import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";
import petRoutes from "./routes/pet.routes.js";
import procedureRoutes from "./routes/procedure.route.js";
import historyRoutes from "./routes/history.routes.js";

const app = express();

app.use(cors());

//Middleware
app.use(express.json());
app.use("/person", personRoutes);
app.use("/pet", petRoutes);
app.use("/procedure", procedureRoutes);
app.use("/history", historyRoutes);

export default app;
