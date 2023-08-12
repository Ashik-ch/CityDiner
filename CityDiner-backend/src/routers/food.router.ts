import { Router } from 'express'
import { category, foodItems } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/model';

const router = Router();                    //asigning express to router

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await FoodModel.create(foodItems);
        res.send("Seed Is Done!");
    }
))

/**@description get All foods */
router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
))

/**@description Adding Foods */
router.post('/', asyncHandler(
    async (req, res) => {
        const { name, imageUrl, restaurant, price, tags, category, stars } = req.body
        console.log(req.body);
        const foodname = await FoodModel.findOne({ name })
        if (foodname) {
            res.status(400).send("Already exist")
        }
        else {
            const FoodItem: any = {
                name, imageUrl, restaurant, price, tags, category, stars: 5
            }
            const fooditems = await FoodModel.create(FoodItem)
            res.send(FoodItem)
        }
    })
)

/**@description get foods by search */
router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({ name: { $regex: searchRegex } })
        res.send(foods);
    }
))


/**@description get categories */
router.get('/category', asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))


/**@description get foods by category */
router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({ tags: req.params.tagName })
        res.send(foods);
    }
))

/**@description get foods by id */
router.get("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
))

router.delete("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId)
        if (food) {
            await food.deleteOne(); //
            res.send({ msg: "Deleted" });
        }
        else {
            res.status(500).send("Not Found")
        }
    }
))

router.put('/', asyncHandler(
    async (req, res) => {
        const { id, name, price, tags, imageUrl, restaurant, category, } = req.body
        try {
            const updateFood = await FoodModel.findByIdAndUpdate(id, {
                name, price, tags, imageUrl, restaurant, category
            }, { new: true });
            if (updateFood) {
                res.json(updateFood);
            } else {
                res.status(404).json({ message: 'Food item not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating food item' });
        }
    }
))


export default router;