import { Router } from "express";
import { handleAuth } from "../middlewares/auth.js";
import { handleAnalysis } from "../controller/analysis.js";

export const analyticRouter = Router();

analyticRouter.get("/", handleAuth ,handleAnalysis);