// 1. Users
export const users = [
  {
    name: "Ali Khan",
    email: "ali@example.com",
    password: "hashed_password_123",
    phone: "+92-300-1234567",
    address: "Lahore, Pakistan",
    created_at: "2025-08-18T12:00:00Z"
  },
  {
    name: "Sara Ahmed",
    email: "sara@example.com",
    password: "hashed_password_456",
    phone: "+92-321-9876543",
    address: "Karachi, Pakistan",
    created_at: "2025-08-17T10:30:00Z"
  }
];

// 2. Categories
export const categories = [
  { name: "Electronics", parent_id: null },
  { name: "Laptops", parent_id: 1 },
  { name: "Mobiles", parent_id: 1 },
  { name: "Home Appliances", parent_id: null }
];

// 3. Products
export const products = [
  {
    sku: "LAP-001",
    name: "Dell Inspiron 15",
    description: "15-inch laptop with Intel i5 and 8GB RAM",
    category_id: 1,
    brand: "Dell",
    price: 800,
    discount_price: 750,
    currency: "USD",
    stock: 20,
    status: "active",
    created_at: "2025-08-18T09:00:00Z",
    updated_at: "2025-08-18T09:00:00Z"
  },
  {
    sku: "MOB-001",
    name: "iPhone 14 Pro",
    description: "Apple iPhone 14 Pro 128GB",
    category_id: 1,
    brand: "Apple",
    price: 1200,
    discount_price: 1100,
    currency: "USD",
    stock: 15,
    status: "active",
    created_at: "2025-08-18T09:30:00Z",
    updated_at: "2025-08-18T09:30:00Z"
  }
];

// 4. Product Media
export const product_media = [
  { product_id: 1, media_type: "image", url: "https://example.com/images/dell.jpg" },
  { product_id: 2, media_type: "image", url: "https://example.com/images/iphone.jpg" },
  { product_id: 2, media_type: "video", url: "https://example.com/videos/iphone.mp4" }
];

// 5. Product Attributes
export const product_attributes = [
  { product_id: 1, attribute_name: "RAM", attribute_value: "8GB" },
  { product_id: 1, attribute_name: "Processor", attribute_value: "Intel i5" },
  { product_id: 2, attribute_name: "Color", attribute_value: "Deep Purple" }
];

// 6. Orders
export const orders = [
  {
    user_id: 1,
    total_amount: 1550,
    status: "pending",
    shipping_address: "Ali Khan, Lahore",
    payment_method: "Credit Card",
    created_at: "2025-08-18T11:00:00Z"
  },
  {
    user_id: 2,
    total_amount: 1200,
    status: "shipped",
    shipping_address: "Sara Ahmed, Karachi",
    payment_method: "Cash on Delivery",
    created_at: "2025-08-17T16:45:00Z"
  }
];

// 7. Order Items
export const order_items = [
  { order_id: 1, product_id: 1, quantity: 1, price: 750 },
  { order_id: 1, product_id: 2, quantity: 1, price: 800 },
  { order_id: 2, product_id: 2, quantity: 1, price: 1200 }
];

// 8. Reviews
export const reviews = [
  {
    product_id: 1,
    user_id: 2,
    rating: 4,
    comment: "Good laptop, decent performance.",
    created_at: "2025-08-18T12:15:00Z"
  },
  {
    product_id: 2,
    user_id: 1,
    rating: 5,
    comment: "Amazing phone! Totally worth it.",
    created_at: "2025-08-18T12:20:00Z"
  }
];

// 9. Wishlist
export const wishlist = [
  { user_id: 1, product_id: 2, created_at: "2025-08-18T13:00:00Z" },
  { user_id: 2, product_id: 1, created_at: "2025-08-18T13:05:00Z" }
];
