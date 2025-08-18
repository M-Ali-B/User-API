🔹 Core Tables
1. Users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

2. Categories
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

3. Products
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category_id INTEGER,
    brand TEXT,
    price REAL NOT NULL,
    discount_price REAL,
    currency TEXT DEFAULT 'USD',
    stock INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

4. Product Media
CREATE TABLE product_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    media_type TEXT CHECK(media_type IN ('image', 'video')),
    url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

5. Product Attributes (Flexible key-value model)
CREATE TABLE product_attributes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    attribute_name TEXT NOT NULL,
    attribute_value TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

🔹 Transactional Tables
6. Orders
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_amount REAL,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT,
    payment_method TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

7. Order Items
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

🔹 Supporting Tables
8. Reviews
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    user_id INTEGER,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

9. Wishlist
CREATE TABLE wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

🔹 Notes

product_attributes makes it flexible → you can store category-specific attributes (like size, color, RAM, author, etc.) without altering schema.

categories is self-referencing → supports nested categories (e.g., Electronics → Mobiles → Android).

orders + order_items let you track purchases with multiple products.