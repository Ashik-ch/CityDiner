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
    7.  Create server.ts
        1. imports          import express from 'express'
                            import cors from 'cors'

                            const app = express()                       //asigning express to app
                            app.use(cors({                              //setting connection between fornd-back end
                                credentials: true,
                                origin: '[http//localhost:4200]'            }))

        2. Add Apis         app.get('/', (req, res) => {
                                res.send('hello')            })

                            const port = 5000;
                            app.listen(port, () => {
                                console.log("Serving at http://localhost:" + port)            })


    9. npm install nodemon ts-node --save-dev       (in package.json - "start": "cd src && nodemon server.ts")  => npm start

    10. Add urls.ts to frontend src-app -   const BASE_URL = 'http://localhost:5000'
                                            export const FOOD_URL = BASE_URL + '/api/foods';
                                            export const FOOD_BY_ID = FOOD_URL + '/';

     11. Add HttpClient module              import { HttpClientModule } from '@angular/common/http'

    12. Update food service                 getAllFood(): Observable<Food[]> {
                                                return this.http.get<Food[]>(FOOD_URL)                         }
                                            getfoodbySearch(searchTerm: string) {
                                                return this.http.get(FOOD_BY_SEARCH + searchTerm)              }

<!-- forms creation -->

    import in module -  FormsModule,
                        ReactiveFormsModule,

    html    -       <form [formGroup]="loginForm" (ngsubmit)="onSubmit()">   <input formControlName=''>

    ts       -      loginForm!: FormGroup
                    constructor(private fb: FormBuilder) {  }
                    ngOnInit(): void {
                    this.loginForm = this.fb.group({
                            email: ['', [Validators.email, Validators.required]],
                            password: ['', [Validators.required]]          })        }

<!-- Connect Login API To MongoDB Atlas -->

        1. Moving Apis into routers
        2. Create MongoDB Atlas
        3. Create .env file
        4. Install      1. mongoose             mongodb
                        2. dotenv               path settng
                        3. bcryptjs             encryption
                        4. express-async-handler
        5. Connect to MongoDB Atlas
        6. Use MongoDB instead of data.ts in apis


        Creation of database

        server.ts       ->          import,  app.use("/api/restaurant", restaurantRouter);

        urls.ts         ->          export const RESTAURANT_URL = BASE_URL + '/api/restaurant';


        rest.routter.ts  ->
                import { Router } from "express";
                import asyncHandler from 'express-async-handler';
                import { IRestaurant, RestaurantModel } from "../models/model";

                const router = Router();

                router.get('/', asyncHandler(async (req, res) => {                          //Get method
                    const restaurants = await RestaurantModel.find();
                    res.send(restaurants);
                }));

                router.post('/', asyncHandler(                                              // Post method
                    async (req, res) => {
                        const { name, place, cuisine, imageUrl, openingtime } = req.body;
                        const item = await RestaurantModel.findOne({ name })
                        if (item)   {   res.status(400).send({ msg: 'Already exist' })                }
                        else        {   const newRestaurant: IRestaurant = { name, place, cuisine, imageUrl, openingtime, stars: 4 }
                                        const dbRestaurant = await RestaurantModel.create(newRestaurant)
                                        res.send(newRestaurant)
                                        }                }
                    ))
                export default router;



         model.ts           ->   Schema and Inerface
                export interface IRestaurant  {     id?: number                          //inerface
                                                    name: string
                                                    favourite?: boolean
                                                    imageUrl: string
                                                    cuisine: string[]       }

                export const restaurantSchema = new Schema<IRestaurant>                   //Schemas
                        ({      name: { type: String, required: true },
                                favourite: { type: Boolean, required: false },
                                imageUrl: { type: String, required: true },
                                cuisine: { type: [String], required: true },            },
                        {       toJSON: { virtuals: true },
                                toObject: { virtuals: true },
                                timestamps: true                                         })

                export const RestaurantModel = model<IRestaurant>('restaurant', restaurantSchema)


        <!-- FRONDENT -->
         rest.serv.ts    ->     getRestaurantAll() {
                                    this.restaurantServ.getRestaurant().subscribe((res: any) => {
                                    this.restaurants = res;
                                });                            }

                                postRestaurant(restaurants: any) {
                                    return this.http.post(RESTAURANT_URL, restaurants) }

        res.com.ts      ->      OnSubmit() {
                                    const formvalue = this.RestaurantForm.value
                                    const restaurant: IRestaurant = {
                                        name: formvalue.name,
                                        place: formvalue.place,
                                        imageUrl: formvalue.imageUrl            }

                                    if (this.RestaurantForm.valid)
                                        this.restaurantServ.postRestaurant(restaurant).subscribe(
                                            (res) => {    console.log("resres", res);                     },
                                            (error => {   alert(error.error.msg)                           })) }
