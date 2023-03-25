import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import { kpis, products, transactions } from './data/data.js'
import KPI from './models/KPI.js'
import Product from './models/Product.js'
import Transaction from './models/Transaction.js'

import KpiRoutes from './routes/kpi.js'
import ProductRoutes from './routes/product.js'
import TransactionRoutes from './routes/transaction.js'

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTE
app.use("/kpi", KpiRoutes)
app.use("/product", ProductRoutes)
app.use("/transaction", TransactionRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
        
        // ADD DATA ONE TIME ONLY
        // await mongoose.connection.db.dropDatabase()
        // KPI.insertMany(kpis)
        // Product.insertMany(products)
        // Transaction.insertMany(transactions)
    })
    .catch((error) => console.log(`${error} did not connect`))
