"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var model_1 = require("../models/model");
var router = (0, express_1.Router)();
router.get('/', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurants;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.RestaurantModel.find()];
            case 1:
                restaurants = _a.sent();
                res.send(restaurants);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, place, cuisine, imageUrl, openingtime, closingtime, AddressLat, AdressLong, item, newRestaurant, dbRestaurant;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, place = _a.place, cuisine = _a.cuisine, imageUrl = _a.imageUrl, openingtime = _a.openingtime, closingtime = _a.closingtime, AddressLat = _a.AddressLat, AdressLong = _a.AdressLong;
                return [4 /*yield*/, model_1.RestaurantModel.findOne({ name: name })];
            case 1:
                item = _b.sent();
                if (!item) return [3 /*break*/, 2];
                res.status(400).send({ msg: 'Already exist' });
                return [3 /*break*/, 4];
            case 2:
                newRestaurant = {
                    name: name,
                    place: place,
                    cuisine: cuisine,
                    imageUrl: imageUrl,
                    openingtime: openingtime,
                    closingtime: closingtime,
                    stars: 4,
                    AddressLat: AddressLat,
                    AdressLong: AdressLong
                };
                return [4 /*yield*/, model_1.RestaurantModel.create(newRestaurant)];
            case 3:
                dbRestaurant = _b.sent();
                res.send(newRestaurant);
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.get('/:restaurantid', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.RestaurantModel.findById(req.params.restaurantid)];
            case 1:
                restaurant = _a.sent();
                console.log("ress", restaurant);
                res.send(restaurant);
                return [2 /*return*/];
        }
    });
}); }));
//Delete Restaurant
router.delete('/:id', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, restaurnt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, model_1.RestaurantModel.findOneAndDelete({ _id: id })];
            case 1:
                restaurnt = _a.sent();
                if (restaurnt)
                    res.status(200).send({ msg: "Deleted Succesfully" });
                else
                    res.status(400).send({ msg: "Not Found" });
                return [2 /*return*/];
        }
    });
}); }));
//Update Restaurant
router.put('/:id', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, place, cuisine, imageUrl, openingtime, closingtime, AddressLat, AdressLong, id, updateRest;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, place = _a.place, cuisine = _a.cuisine, imageUrl = _a.imageUrl, openingtime = _a.openingtime, closingtime = _a.closingtime, AddressLat = _a.AddressLat, AdressLong = _a.AdressLong;
                id = req.params.id;
                return [4 /*yield*/, model_1.RestaurantModel.findOneAndUpdate({ _id: id }, { name: name, place: place, cuisine: cuisine, imageUrl: imageUrl, openingtime: openingtime, closingtime: closingtime, AddressLat: AddressLat, AdressLong: AdressLong })];
            case 1:
                updateRest = _b.sent();
                res.status(200).send(updateRest);
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
