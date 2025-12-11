import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { transferController } from "./transfer.controller.js";

export const transactionRouter = Router();

transactionRouter.post('/transfer', auth, transferController);