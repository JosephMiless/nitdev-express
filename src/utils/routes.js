import { Router } from "express";
import {userRouter } from "../users/users.routes.js"
import { transactionRouter } from "../transactions/transactions.routes.js";
import { accountRouter } from "../accounts/users.routes.js";

export const router = Router();

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/accounts', accountRouter);