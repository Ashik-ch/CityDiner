"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = exports.UserModel = exports.FoodModel = exports.restaurantSchema = exports.UserSchema = exports.FoodSchema = void 0;
var mongoose_1 = require("mongoose");
exports.FoodSchema = new mongoose_1.Schema(//Schemas
{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    imageUrl: { type: String, required: true },
    restaurant: { type: [String], required: true },
    favourite: { type: Boolean, required: false },
    category: { type: String, required: true },
    stars: { type: Number, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.restaurantSchema = new mongoose_1.Schema(//Schemas
{
    name: { type: String, required: true },
    favourite: { type: Boolean, required: false },
    imageUrl: { type: String, required: true },
    cuisine: { type: [String], required: true },
    openingtime: { type: String, required: true },
    closingtime: { type: String, required: true },
    stars: { type: Number, required: true },
    place: { type: String, required: true },
    AddressLat: { type: Number, required: true },
    AdressLong: { type: Number, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});
exports.FoodModel = (0, mongoose_1.model)('food', exports.FoodSchema);
exports.UserModel = (0, mongoose_1.model)('user', exports.UserSchema);
exports.RestaurantModel = (0, mongoose_1.model)('restaurant', exports.restaurantSchema);
