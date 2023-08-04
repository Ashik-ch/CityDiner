import { Router } from 'express'
import { category, foodItems } from '../data';

const router = Router();                    //asigning express to router

/**@description get All foods */
router.get('/', (req, res) => {
    res.send(foodItems)
})

/**@description get foods by search */
router.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm
    const FoodbySearch = foodItems.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(FoodbySearch)
})

/**@description get categories */
router.get('/category', (req, res) => {
    res.send(category)
})

/**@description get foods by category */
router.get('/category/:filters', (req, res) => {
    const filters = req.params.filters
    const categoryName = foodItems.filter(categ => categ.tags?.includes(filters))
    res.send(categoryName)
})

/**@description get foods by id */
router.get('/:id/', (req, res) => {
    const foodId = req.params.id
    const FoodbyId = foodItems.find(food => food.id === foodId)
    res.send(FoodbyId)
})


export default router;