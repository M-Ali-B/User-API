import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'cors'
import {createTable,seedTable,viewAllUsers,viewAllMembers,seedMemberTable,createMemberTable} from './database/dbUtility.js'
const PORT = 8000

const app = express()

await createTable();
await seedTable();
// await viewAllUsers();
await createMemberTable();
await seedMemberTable();
await viewAllMembers();
app.use(cors())

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})


app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
