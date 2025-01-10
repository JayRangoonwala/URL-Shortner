import { Router } from "express";
import { handleGenerateNewShortUrl ,handleGetUrl , handleGetAnalytics} from "../controller/url.js";

export const router = Router();

router.post('/' , handleGenerateNewShortUrl);

router.get("/:shortId" ,handleGetUrl);

router.get("/analytics/:shortId",handleGetAnalytics);