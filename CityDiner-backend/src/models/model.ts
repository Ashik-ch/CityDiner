import { Schema, VirtualType, model } from "mongoose"

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

export const foodSchema = new Schema<Food>({            //Schemas
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
})

// export interface Category {
//     name: string
//     count: number
// }

// export class CartItem {
//     constructor(public food: Food) { }
//     quantity: number = 1
//     price: number = this.food.price
// }

// export class Cart {
//     items: CartItem[] = []
//     totalPrice: number = 0
//     totalCount: number = 0
// }

export interface Login {
    id: string
    email: string
    name: string
    password: string
    address: string
    isAdmin: boolean
}


export const userSchema = new Schema<Login>({            //Schemas
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})


export const FoodModel = model<Food>('food', foodSchema)
export const userSModel = model<Login>('food', userSchema)