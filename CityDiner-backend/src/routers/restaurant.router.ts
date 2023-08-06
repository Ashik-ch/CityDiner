import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { IRestaurant, RestaurantModel } from "../models/model";

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const restaurants = await RestaurantModel.find();
    res.send(restaurants);
}));

router.post('/', asyncHandler(
    async (req, res) => {
        const { name, place, cuisine, imageUrl, openingtime } = req.body;
        const item = await RestaurantModel.findOne({ name })
        if (item) {
            res.status(400).send({ msg: 'Already exist' })
        }
        else {
            const newRestaurant: IRestaurant = {
                name, place, cuisine, imageUrl, openingtime, stars: 4,
            }
            const dbRestaurant = await RestaurantModel.create(newRestaurant)
            res.send(newRestaurant)
        }
    }
))

export default router;