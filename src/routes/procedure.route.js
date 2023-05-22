import express from "express";
import {
  createProcedure,
  getProceduresByHistoryId,
} from "../controllers/procedure.controller.js";

const router = express.Router();

router.post("/", createProcedure);
router.get("/history/:idhistory", getProceduresByHistoryId);

export default router;
