import express from 'express'
import { getAllUsers,getUser,deleteUserByID,updateUser,addUser,login, signup } from "../controllers/UserController.js";
import { authenticateToken } from '../middleware/auth.js'
import { authorizeRole } from '../middleware/authorize.js';

export const apiRouter = express.Router()

apiRouter.get('/',authenticateToken,authorizeRole('admin'),getAllUsers);
apiRouter.post('/user',authenticateToken,addUser)
apiRouter.delete('/delete/:id',authenticateToken,deleteUserByID)
apiRouter.put('/user/:id',authenticateToken,updateUser);
apiRouter.get('/user/:id',authenticateToken,getUser)
apiRouter.post('/signup',signup)
apiRouter.post('/login', login)