import { SECRET, PORT } from './config.js'
import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'cors'
import { createUsersTable, viewCategories,viewAllUsers, seedUsersTable, createProductTable, seedProductsTable, viewAllProductsTable, createProductAttributeTable, viewAllProductAttributes, createReviewsTable, viewAllReviews, createProductMediaTable, viewAllProductMedia, createCategoriesTable, viewAllCategories, createOrderItemsTable, viewAllOrderItems, createOrdersTable, viewAllOrders, createWishListTable, viewAllWishlist } from './database/dbUtility.js'
import { seedCategoriesTable, seedOrderItemsTable, seedOrdersTable, seedProductAttributesTable, seedProductMediaTable, seedReviewsTable, seedWishlistTable } from './database/dbSeeders.js'

const app = express()

// creating tables

await createUsersTable();
await createProductTable()
await createProductAttributeTable()
await createReviewsTable()
await createProductMediaTable()
await createCategoriesTable()
await createOrderItemsTable()
await createOrdersTable()
await createWishListTable()

// seeding tables with data

await seedUsersTable();
await seedProductsTable()
await seedProductAttributesTable()
await seedReviewsTable()
await seedProductMediaTable()
await seedCategoriesTable()
await seedOrderItemsTable()
await seedOrdersTable()
await seedWishlistTable()

// viewing data from tables
console.log('Users Table:');
await viewAllUsers();
console.log('Products Table:');
await viewAllProductsTable()
console.log('Product Attributes Table:');
await viewAllProductAttributes()
console.log('Reviews Table:');
await viewAllReviews()
console.log('Product Media Table:');  
await viewAllProductMedia()
console.log('Categories Table:'); 
await viewAllCategories()
console.log('Order Items Table:');
await viewAllOrderItems()
console.log('Orders Table:'); 
await viewAllOrders()
console.log('Wishlist Table:');
await viewAllWishlist();
console.log('view categories with products')
await viewCategories();



app.use(cors())

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})

console.log("SECRET from .env:", process.env.SECRET);
console.log("PORT from .env:", process.env.PORT);

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
