import { Schema, model } from "mongoose"

export interface Food {                 //interface
    id: string
    name: string
    price: number
    tags: string[]
    imageUrl: string
    restaurant: string[]
    category: string
    favourite: boolean
    stars: number
}

export const FoodSchema = new Schema<Food>(    //Schemas
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        imageUrl: { type: String, required: true },
        restaurant: { type: [String], required: true },
        favourite: { type: Boolean, required: false },
        stars: { type: Number, required: true },
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


export interface User {
    id: string
    name: string;
    email: string;
    password: string;
    address: string;
    isAdmin: boolean;
}


export const UserSchema = new Schema<User>({            //Schemas
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


export const FoodModel = model<Food>('food', FoodSchema)
export const UserModel = model<User>('user', UserSchema)