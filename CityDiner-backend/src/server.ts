import express from 'express'
import cors from 'cors'
import { category, foodItems } from './data'

const app = express()                       //asigning express to app
app.use(cors({                              //setting connection between fornd-back end
    credentials: true,
    origin: 'http://localhost:4200'
}))

/**@description get All foods */
app.get('/api/foods', (req, res) => {
    res.send(foodItems)
})

/**@description get foods by search */
app.get('/api/foods/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm
    const FoodbySearch = foodItems.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(FoodbySearch)
})

/**@description get categories */
app.get('/api/foods/category', (req, res) => {
    res.send(category)
})

/**@description get foods by category */
app.get('/api/foods/category/:filters', (req, res) => {
    const filters = req.params.filters
    const categoryName = foodItems.filter(categ => categ.tags?.includes(filters))
    res.send(categoryName)
})

/**@description get foods by id */
app.get('/api/foods/:id/', (req, res) => {
    const foodId = req.params.id
    const FoodbyId = foodItems.find(food => food.id === foodId)
    res.send(FoodbyId)
})

const port = 5000;                      //Port Address
app.listen(port, () => {
    console.log("Serving at http://localhost:" + port)
})