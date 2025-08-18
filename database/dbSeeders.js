import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

// import your data arrays
import {
  users,
  categories,
  products,
  product_media,
  product_attributes,
  orders,
  order_items,
  reviews,
  wishlist
} from "../Data.js";

// 1. Users
export async function seedUsersTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { name, email, password, phone, address, created_at } of users) {
      await db.run(
        `INSERT INTO users (name, email, password, phone, address, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, password, phone, address, created_at]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding users:", err.message);
  } finally {
    await db.close();
  }
}

// 2. Categories
export async function seedCategoriesTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { name, parent_id } of categories) {
      await db.run(
        `INSERT INTO categories (name, parent_id) VALUES (?, ?)`,
        [name, parent_id]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding categories:", err.message);
  } finally {
    await db.close();
  }
}

// 3. Products
export async function seedProductsTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const {
      sku,
      name,
      description,
      category_id,
      brand,
      price,
      discount_price,
      currency,
      stock,
      status,
      created_at,
      updated_at
    } of products) {
      await db.run(
        `INSERT INTO products 
          (sku, name, description, category_id, brand, price, discount_price, currency, stock, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sku,
          name,
          description,
          category_id,
          brand,
          price,
          discount_price,
          currency,
          stock,
          status,
          created_at,
          updated_at
        ]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding products:", err.message);
  } finally {
    await db.close();
  }
}

// 4. Product Media
export async function seedProductMediaTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { product_id, media_type, url } of product_media) {
      await db.run(
        `INSERT INTO product_media (product_id, media_type, url) VALUES (?, ?, ?)`,
        [product_id, media_type, url]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding product_media:", err.message);
  } finally {
    await db.close();
  }
}

// 5. Product Attributes
export async function seedProductAttributesTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { product_id, attribute_name, attribute_value } of product_attributes) {
      await db.run(
        `INSERT INTO product_attributes (product_id, attribute_name, attribute_value)
         VALUES (?, ?, ?)`,
        [product_id, attribute_name, attribute_value]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding product_attributes:", err.message);
  } finally {
    await db.close();
  }
}

// 6. Orders
export async function seedOrdersTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const {
      user_id,
      total_amount,
      status,
      shipping_address,
      payment_method,
      created_at
    } of orders) {
      await db.run(
        `INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, total_amount, status, shipping_address, payment_method, created_at]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding orders:", err.message);
  } finally {
    await db.close();
  }
}

// 7. Order Items
export async function seedOrderItemsTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { order_id, product_id, quantity, price } of order_items) {
      await db.run(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [order_id, product_id, quantity, price]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding order_items:", err.message);
  } finally {
    await db.close();
  }
}

// 8. Reviews
export async function seedReviewsTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { product_id, user_id, rating, comment, created_at } of reviews) {
      await db.run(
        `INSERT INTO reviews (product_id, user_id, rating, comment, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [product_id, user_id, rating, comment, created_at]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding reviews:", err.message);
  } finally {
    await db.close();
  }
}

// 9. Wishlist
export async function seedWishlistTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  try {
    await db.exec("BEGIN TRANSACTION");

    for (const { user_id, product_id, created_at } of wishlist) {
      await db.run(
        `INSERT INTO wishlist (user_id, product_id, created_at) VALUES (?, ?, ?)`,
        [user_id, product_id, created_at]
      );
    }

    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding wishlist:", err.message);
  } finally {
    await db.close();
  }
}
