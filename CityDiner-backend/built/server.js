"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv")); //For DB connection
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var restaurant_router_1 = __importDefault(require("./routers/restaurant.router"));
var database_config_1 = require("./configs/database.config"); //For DB connection
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)(); //asigning express to app
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:4200']
}));
app.use("/api/foods", food_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/restaurant", restaurant_router_1.default);
var port = 5000; //Port Address
app.listen(port, function () {
    console.log("Serving at http://localhost:" + port);
});
