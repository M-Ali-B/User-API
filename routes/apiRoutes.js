import express from 'express'
import { getAllUsers,getUser,deleteUserByID,updateUser,addUser,login } from "../controllers/UserController.js";
import { authenticateToken } from '../middleware/auth.js'

export const apiRouter = express.Router()

apiRouter.get('/',getAllUsers);
apiRouter.post('/user',addUser)
apiRouter.delete('/delete/:id',deleteUserByID)
apiRouter.put('/user/:id',updateUser);
apiRouter.get('/user/:id',getUser)
apiRouter.post('/login', login)