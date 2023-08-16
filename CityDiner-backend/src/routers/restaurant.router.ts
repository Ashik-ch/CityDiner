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
        const { name, place, cuisine, imageUrl, openingtime, closingtime, AddressLat, AdressLong } = req.body;
        const item = await RestaurantModel.findOne({ name })
        if (item) {
            res.status(400).send({ msg: 'Already exist' })
        }
        else {
            const newRestaurant: IRestaurant = {
                name, place, cuisine, imageUrl, openingtime, closingtime, stars: 4, AddressLat, AdressLong
            }
            const dbRestaurant = await RestaurantModel.create(newRestaurant)
            res.send(newRestaurant)
        }
    }
))

//getting restaurant by id
router.get('/:restaurantid', asyncHandler(
    async (req, res) => {
        const restaurant = await RestaurantModel.findById(req.params.restaurantid)
        res.send(restaurant)

    }
))

//for  cuisine filterring
router.get('/cuisine/:id', asyncHandler(
    async (req, res) => {
        const cuisineIds = req.params.id
        console.log("cuisineIds", cuisineIds);

        const cuisineTypes = await RestaurantModel.find({ cuisine: cuisineIds });
        res.send(cuisineTypes);
    }
));

//Delete Restaurant
router.delete('/:id', asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const restaurnt = await RestaurantModel.findOneAndDelete({ _id: id })
        if (restaurnt) res.status(200).send({ msg: "Deleted Succesfully" });
        else res.status(400).send({ msg: "Not Found" })
    }
))

//Update Restaurant
router.put('/:id', asyncHandler(
    async (req, res) => {
        const { name, place, cuisine, imageUrl, openingtime, closingtime, AddressLat, AdressLong } = req.body;
        const id = req.params.id
        const updateRest = await RestaurantModel.findOneAndUpdate({ _id: id },
            { name, place, cuisine, imageUrl, openingtime, closingtime, AddressLat, AdressLong })
        res.status(200).send(updateRest)
    }
))

export default router;