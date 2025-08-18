import { user } from "../database/db.js";
import { deleteUserDb, viewAllUsers, viewUser, updateUserById, findusersByCredientials, insertUser } from '../database/dbUtility.js'
import jwt from 'jsonwebtoken'
import {SECRET} from '../config.js'



export const login = (req, res) => {
    const { username,password } = req.query
    // Replace with real user lookup
  //  const foundUser = users.find(u => u.username === username && u.password === password); 
  const foundUser = findusersByCredientials(username,password);  
  if (!foundUser) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: foundUser.id, username: foundUser.username ,role : foundUser.role}, SECRET, { expiresIn: '1h' })
    res.json({ token })
}

export const signup = async (req, res) => {
    const { username,password} = req.query;
    const signupUser = await insertUser(username,password,'user'); // Default role is 'user'
    console.log(signupUser);
    if (signupUser && signupUser !== "DUPLICATE") {
       await res.status(201).json({ message: 'User created successfully' });
    } else if (signupUser === "DUPLICATE") {
        await res.status(409).json({ message: 'Username already exists' });
    }
    else {
        await  res.status(500).json({ message: 'Error creating user' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await viewAllUsers();  // get data from DB
        res.json(users);                     // send data as JSON response
    } catch (err) {
        console.error('Error in getAllUsers:', err.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }


}

export const getUser = async (req, res) => {

    const { id } = req.params
    // let getUser = user.find(user => user.id === Number(id));
    let getUser = await viewUser(id);
    getUser.length > 0 ? res.json(getUser) : res.status(404).json({ message: `user with id =  ${id} do not exists` })

}

export const addUser = (req, res) => {
    const { name, job, country } = req.query;
    const addItem = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,
        job,
        country
    }
    user.push(addItem);
    res.status(200).json({ message: "User added ", length: user.length, user })

}

export const deleteUserByID = (req, res) => {


    const { id } = req.params;
    // let filterIndex = user.findIndex(item => item.id !== Number(id))
    // user.splice(filterIndex, 1);
    deleteUserDb(id)
    let data = viewAllUsers()
    res.json(data);
}


export const updateUser = async (req, res) => {
    //let userData = user;
    const { name, job, country } = req.query;
    const { id } = req.params;

    let data = await updateUserById(name, job, country, id)

    //userData = userData.map(item => item.id === Number(id) ? { ...item, name, job, country } : item)
    data === true ?
        res.json({ message: "User updated", data })
        :
        res.status(404).json({ message: `user with id =  ${id} do not exists` })


}