import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { viewAllProductsTable } from '../database/dbUtility.js'
export const getAllProducts = async (req,res) => {
        try {
            const products = await viewAllProductsTable();  // get data from DB
            res.json(products);                     // send data as JSON response
        } catch (err) {
            console.error('Error in getAllProducts:', err.message);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    
}


export const viewAllProducts = async (req,res) => {
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    });
    try{
    const products = await db.all('SELECT * FROM products');
    res.status(201).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    } 
}