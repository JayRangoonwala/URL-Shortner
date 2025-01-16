import { Router } from "express";
import { handleGenerateNewShortUrl ,handleGetUrl , handleGetAnalytics} from "../controller/url.js";
import {handleAuth} from '../middlewares/auth.js'

export const router = Router();

router.post('/' , handleAuth ,handleGenerateNewShortUrl);

router.get("/:shortId" ,handleAuth,handleGetUrl);

router.get("/analytics/:shortId",handleGetAnalytics);