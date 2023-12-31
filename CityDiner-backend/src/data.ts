export const foodItems: any[] = [{
    // id: '1',
    name: 'Pizza Pepperoni',
    price: 10,
    favourite: false,
    restaurant: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/1.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
    category: 'food'
},
{
    // id: '2',
    name: 'Meatball',
    price: 20,
    category: 'food',
    favourite: true,
    restaurant: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/2.jpg',
    tags: ['SlowFood', 'Lunch'],
},
{
    // id: '3',
    name: 'Hamburger',
    price: 5,
    category: 'drinks',
    favourite: false,
    restaurant: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/3.jpg',
    tags: ['FastFood', 'Hamburger'],
},
{
    // id: '4',
    name: 'Fried Potatoes',
    price: 2,
    category: '15-20',
    favourite: true,
    restaurant: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/4.jpg',
    tags: ['FastFood', 'Fry'],
},
{
    // id: '5',
    name: 'Chicken Soup',
    price: 11,
    category: 'food',
    favourite: false,
    restaurant: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/5.jpg',
    tags: ['SlowFood', 'Soup'],
},
{
    // id: '6',
    name: 'Vegetables Pizza',
    price: 9,
    category: 'drinks',
    favourite: false,
    restaurant: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/5.avif',
    tags: ['FastFood', 'Pizza', 'Lunch'],
},]

export const category: any[] = [
    { name: 'All', count: 6 },
    { name: 'FastFood', count: 4 },
    { name: 'Pizza', count: 2 },
    { name: 'Lunch', count: 3 },
    { name: 'SlowFood', count: 2 },
    { name: 'Hamburger', count: 1 },
    { name: 'Fry', count: 1 },
    { name: 'Soup', count: 1 },
]

export const Users: any[] = [
    {
        name: "John Doe",
        email: "john@gmail.com",
        password: "12345",
        address: "Toronto On",
        isAdmin: true,
    },
    {
        name: "Jane Doe",
        email: "Jane@gmail.com",
        password: "12345",
        address: "Shanghai",
        isAdmin: false,
    },
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "admin",
        address: "Kannur",
        isAdmin: false,
    },
];