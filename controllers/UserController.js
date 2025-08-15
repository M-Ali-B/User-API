import { user } from "../database/db.js";

export const getAllUsers = (req, res) => {

    res.json(user)

}

export const getUser = (req, res) => {

    const { id } = req.params
    let getUser = user.find(user => user.id === Number(id));
    //console.log(getUser)
    res.json(getUser)
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
    let filterIndex = user.findIndex(item => item.id !== Number(id))
    user.splice(filterIndex, 1);
    res.json(user);
}


export const updateUser = (req, res) => {
    let userData = user;
    const { name, job, country } = req.query;
    const { id } = req.params;

    userData = userData.map(item => item.id === Number(id) ? { ...item, name, job, country } : item)

    res.json({ message: "User updated", userData })

}