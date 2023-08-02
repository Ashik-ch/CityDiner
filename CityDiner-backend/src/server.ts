import express from 'express'
import cors from 'cors'
import { foodItems } from './data'

const app = express()                       //asigning express to app
app.use(cors({                              //setting connection between fornd-back end
    credentials: true,
    origin: '[http//localhost:4200]'
}))

app.get('/', (req, res) => {            //creating API
    res.send(foodItems)

})

const port = 5000;                      //Port Address
app.listen(port, () => {
    console.log("Serving at http://localhost:" + port)
})