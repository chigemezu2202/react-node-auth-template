import express from 'express'

//TODO: import dotenv to use .env file
import dotenv from 'dotenv'

//TODO: import MongoDb database connection
import { connectDB } from './db/connectDB.js'

//TODO: import authroute from router
import authRouter from './routes/auth.route.js'

dotenv.config(); //Hack: to enable process of .env variables

const app = express()
const PORT = process.env.PORT || 5000;

//TODO: Middleware to parse JSON request bodies  **
//Hack: allows us to parse incomming & ougoing request: req.body in json format
app.use(express.json()) //Hack: parse json request bodies

//TODO: Create Authentication Route ** 
app.use("/api/auth", authRouter)

app.listen(5000, () => {
    connectDB(); //Hack: To Run Database Connection Function
    console.log("Server is running on port", PORT, "hmm", process.env.JWT_SECRET)
})