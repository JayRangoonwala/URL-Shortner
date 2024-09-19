import { Router } from "express";
import { handleGenerateNewShortUrl ,handleGetUrl} from "../controller/url.js";

export const router = Router();

router.post('/' , handleGenerateNewShortUrl);

router.get("/:shortId" ,handleGetUrl);