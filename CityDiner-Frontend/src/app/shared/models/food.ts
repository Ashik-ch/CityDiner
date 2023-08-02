// DataType

export class Food {
    id!: string             //importants
    name!: string
    price!: number
    tags?: string[]          //optional
    imageUrl!: string
    restaurant!: string[]
    category!: string
    favourite!: boolean
    stars!: number
}

export class Category {
    name!: string
    count!: number
}

export class CartItem {
    constructor(public food: Food) { }
    quantity: number = 1
    price: number = this.food.price
}

export class Cart {
    items: CartItem[] = []
    totalPrice: number = 0
    totalCount: number = 0
}