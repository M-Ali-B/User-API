import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'cors'
import {createTable,seedTable,viewAllUsers,viewAllMembers,seedMemberTable,createMemberTable, clearUserTable, clearMemberTable} from './database/dbUtility.js'
const PORT = 8000

const app = express()

await createTable();
await clearUserTable();
await seedTable();
await viewAllUsers();
await createMemberTable();
await clearMemberTable()
await seedMemberTable();
await viewAllMembers();
app.use(cors())

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})


app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
