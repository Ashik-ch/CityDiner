import { Router } from 'express'
import { Users } from '../data';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/model';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(Users);
        res.send("Seed Is Done!");
    }
))



router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password });

        if (user) {
            res.send(generateTokenReponse(user));
        }
        else {
            res.status(400).send("Username or password is invalid!");
        }
    }
))

const generateTokenReponse = (user: User) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}


export default router;