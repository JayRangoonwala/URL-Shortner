import { Router } from "express";
import { GenerateQRCode } from "../controller/qrcode.js";

export const qrrouter = Router();

qrrouter.get("/",GenerateQRCode);