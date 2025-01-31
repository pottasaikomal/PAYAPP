import express from "express";
import userRouter from "./user.js";
import accountRouter from "./accounts.js";
const route = express.Router();


route.use('/user', userRouter);
route.use('/account', accountRouter);

export default route;