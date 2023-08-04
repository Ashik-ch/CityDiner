import { connect, ConnectOptions } from 'mongoose';   //pre Defined settings

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("Connect successfully"),
        (error) => console.log(error)
    )
}