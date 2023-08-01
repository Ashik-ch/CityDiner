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