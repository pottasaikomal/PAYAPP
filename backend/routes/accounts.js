import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";
const router = express.Router();
router.use(express.json());

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;  //as userid is added to req need to fetch that back from req.
    const data = await Account.findOne({
        userId
    })
    return res.status(200).json({
        balance: data.balance
    })
})

router.post('/transfer', authMiddleware, async (req,res) => {
    const userId = req.userId;
    const to = req.body.to;
    const amount = req.body.amount;
    const session = await mongoose.startSession();
    session.startTransaction();

    const account = await Account.findOne({
        userId
    }).session(session);
    
    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid user"
        })
    }

    await Account.updateOne({userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();

    res.status(200).json({
        message: "transaction sucessful"
    })
})
export default router;