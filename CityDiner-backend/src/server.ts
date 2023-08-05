import dotenv from 'dotenv'         //For DB connection
dotenv.config();

import express from 'express'
import cors from 'cors'
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router'
import { dbConnect } from './configs/database.config';      //For DB connection
dbConnect();

const app = express();                    //asigning express to app
app.use(express.json());

app.use(cors({                              //setting connection between fornd-back end
    credentials: true,
    origin: ['http://localhost:4200']
}));


app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000;                      //Port Address
app.listen(port, () => {
    console.log("Serving at http://localhost:" + port)
})