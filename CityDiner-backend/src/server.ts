import express from 'express'
import cors from 'cors'
import { Users, category, foodItems } from './data'
import jwt from 'jsonwebtoken'

const app = express();                    //asigning express to app
app.use(express.json());

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

app.post('/api/users/login', (req, res) => {
    // const body = req.body;
    // const user = Users.filter(user => user.email == body.email && user.password == body.password })

    const { email, password } = req.body;    	        //Destructing method
    const validUser = Users.find(user => user.email === email && user.password === password);
    if (validUser) {
        res.send(jwtokenGenearate(validUser))
    }
    else {
        res.status(400).send({ msg: "Invalid paasword or Email" })
    }
})

const jwtokenGenearate = (User: any) => {
    const token = jwt.sign({
        email: User.email, isAdmin: User.isAdmin
    }, "SecretRandomKey", { expiresIn: '30d' })

    User.token = token
    return User;
}

const port = 5000;                      //Port Address
app.listen(port, () => {
    console.log("Serving at http://localhost:" + port)
})