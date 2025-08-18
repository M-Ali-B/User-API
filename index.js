import {SECRET, PORT} from './config.js'
import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'cors'
import {createUsersTable,viewAllUsers, seedUsersTable, createProductTable, seedProductsTable, viewAllProductsTable} from './database/dbUtility.js'

const app = express()


await createUsersTable();
await seedUsersTable();
await viewAllUsers();
await createProductTable();
await seedProductsTable()
await viewAllProductsTable()

app.use(cors())

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})

console.log("SECRET from .env:", process.env.SECRET);
console.log("PORT from .env:", process.env.PORT);

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
