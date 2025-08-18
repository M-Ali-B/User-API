
---

# 🛒 E-Commerce API (Express + SQLite)

A simple **E-commerce backend API** built with **Express.js** and **SQLite3**.
This project provides a clean database schema and RESTful structure for managing **users, products, categories, orders, carts, reviews, and wishlists**.

---

## 🚀 Features

* 👤 **User Management** – Register, login, update profile.
* 🏷️ **Categories** – Nested categories (e.g., Electronics → Mobiles → Android).
* 📦 **Products** – With SKU, attributes (size, color, RAM, etc.), stock, media (images/videos).
* 🛒 **Cart & Wishlist** – Add/remove products to cart or wishlist.
* 📑 **Orders** – Place orders with multiple items, track status (`pending`, `paid`, etc.).
* ⭐ **Reviews** – Users can review products with rating & comments.

---

## 🗄️ Database Schema

### 🔹 Core Tables

* **Users**
* **Categories** (self-referencing for nested categories)
* **Products**
* **Product Media** (images, videos)
* **Product Attributes** (flexible key-value storage)

### 🔹 Transactional Tables

* **Orders**
* **Order Items**

### 🔹 Supporting Tables

* **Reviews**
* **Wishlist**
* **Cart** *(optional, recommended to track shopping cart before checkout)*

---

## 📂 Project Structure

```
ecommerce-api/
│── controllers/     # API logic (Users, Products, Orders, etc.)
│── routes/          # Express routes
│── database/        # SQLite database + schema
│── models/          # Query helpers
│── app.js           # Express server entry point
│── package.json     # Dependencies
│── README.md        # Documentation
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQLite3
* **Authentication:** JWT (planned)
* **ORM/Querying:** Raw SQL with `sqlite3`

---

## 🔧 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run database migrations (schema creation):

   ```bash
   node database/init.js
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

Server will run on:
👉 `http://localhost:5000`

---

## 📌 Example API Endpoints

### Users

* `POST /api/users` → Register user
* `GET /api/users/:id` → Get user profile

### Categories

* `GET /api/categories` → List categories

### Products

* `GET /api/products` → List all products
* `GET /api/products/:id` → Product details

### Cart

* `POST /api/cart/add` → Add product to cart
* `GET /api/cart/:userId` → Get user’s cart

### Orders

* `POST /api/orders` → Place new order
* `GET /api/orders/:id` → Get order details

---

## 📖 Notes

* `product_attributes` allows flexible product properties (e.g., Size = XL, RAM = 8GB, Author = XYZ).
* `categories` is **self-referencing** to support nested categories.
* `wishlist` & `cart` tables are optional but recommended for real e-commerce flow.

---

## 🏆 Future Enhancements

* ✅ JWT-based Authentication & Authorization
* ✅ Admin Dashboard (manage products, categories, orders)
* ✅ Payment Gateway Integration (Stripe, PayPal)
* ✅ Swagger/OpenAPI Documentation

---

## 📜 License

MIT License © 2025

---
