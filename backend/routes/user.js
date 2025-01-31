import express from "express";
import zod from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, randombalance } from "../config.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";
const router = express.Router();
router.use(express.json());


async function hashPassword(password) {
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}
const signUpBody = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
const signInBody = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})
const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})
router.post('/signUp', async (req, res) => {
    const { success } = signUpBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Invalid data"
        })
    }
    const existingUser = await User.findOne({
        userName: req.body.userName
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Invalid data"
        })
    }

    const user = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: await hashPassword(req.body.password)
    })

    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    const account = Account.create({
        userId: userId,
        balance: randombalance()
    })
    return res.status(200).json({
        message: "User Created Sucessfully",
        token: token
    })

})

router.post('/signIn', async (req, res) => {
    const { success } = signInBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "error while loging"
        })
    }

    const user = await User.findOne({
        userName: req.body.userName
    })
    if (!user) {
        return res.status(411).json({
            message: "user doesnot exist"
        })
    }
    const hasedPassword = user.password;
    const match = await bcrypt.compare(req.body.password, hasedPassword);
    if (!match) {
        return res.status(411).json({
            message: "Incorrect password"
        })
    }
    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    return res.status(200).json({
        message: "sucessfully loged in",
        token: token
    })
})

router.put('/updateUser', authMiddleware, async (req, res) => {
    const { success } = updateUser.safeParse(req.body);
    if (!success) {
        return res.status(403).json({
            message: "invalid data"
        })
    }
    const user = await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
        message: "Update sucessfull"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })
    res.status(200).json({
        user: (users).map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            _id: user._id
        }))
    })
})
export default router;