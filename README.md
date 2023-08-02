1. ng generate CityDiner-Frontend --skip-tests
2.

<!-- food.ts --> Datatype (interface) -->

    export class Food {
        id!: string             //importants
        name!: string}

<!-- storing data as json -->

    export const foodItems: Food[] = [{
        id: '1',
        name: 'Pizza Pepperoni',
        price: 10,
        favourite: false,
        restaurant: ['italy'],
        stars: 4.5,
        imageUrl: 'assets/1.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
        category: 'food'
        },
        {......}
    ]

<!-- Searching function -->

    <!-- inService -->
        getfoodbySearch(searchTerm:string){
            return this.getAllFood().filter(food=>{food.name.toLowerCase().includes(searchTerm.toLowerCase())
            })}

    <!-- inHome -->
        activateRoute.params.subscribe(params => {
            if (params['searchTerm']) {        this.food = this.foodServ.getfoodbySearch(params['searchTerm'])      }
            else {        this.food = this.foodServ.getAllFood()      }
            })


    <!-- in search bar -->
        <input #serch type="text" class="search" placeholder="Search here.." (keyup.enter)="searchfunc(serch.value)"
            [value]="serch.value">
        search(searchs: string): void {
            if (searchs) this.route.navigateByUrl('/search/' + searchs)
            else this.route.navigateByUrl('')    }

<!-- params, Perticular view -->

    constructor(private foodServ: FoodService,activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(params => {
      this.foods = this.foodServ.getFoodbyId(params['foodid'])
    })

<!-- @input of title -->

    @Input() visible = false
    @Input() message = 'Not Found'
    @Input() LinkText!: string
    @Input() Link = '/'
    @Input() imageUrl = ''

    <!-- Parent html -->
       <app-not-found class="food-container" style="padding: 0 20px ;" [visible]=!food.length      LinkText="Go To home Page" Link="/food" message="No Result Found " [imageUrl]="imageUrl">
       </app-not-found>

<!-- CSS -->

    flex-wrap: wrap; //automatical godown when filled

.
.
.
.
.

<!-- Connect To Backend -->

    1.  Create backend folder
    2.  npm init                                    npm init -y
    3.  npm install typescript express cors         npm  install typescript  express cors
    4.  Create tsconfig.json in backend folder      copy paste the code
    5.  Create .gitignore                           and => node_modules

    6.  Copy data.ts to backend/src
      8.  Create server.ts
        1. install @types

            import express from 'express'
            import cors from 'cors'

            const app = express()                       //asigning express to app
            app.use(cors({                              //setting connection between fornd-back end
                credentials: true,
                origin: '[http//localhost:4200]'            }))

            app.get('/', (req, res) => {
                res.send('hello')            })

            const port = 5000;
            app.listen(port, () => {
                console.log("Serving at http://localhost:" + port)            })

        2. Add Apis
    9. npm install nodemon ts-node --save-dev       (in package.json - "start": "cd src && nodemon server.ts")  => npm start
    10. Add urs.ts to frontend
    11. Add HttpClient module
    12. Update food service
