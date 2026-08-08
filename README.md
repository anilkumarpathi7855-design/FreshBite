# FreshBite - Online Food Ordering System

## 1. Project Overview

FreshBite is a web-based online food ordering system that allows users to browse restaurants, view food menus, add food items to a cart, place orders, and view their order details.

The project is designed to provide a simple, user-friendly, and responsive food ordering experience.

---

## 2. Problem Statement

Traditional food ordering can be time-consuming and may require users to contact restaurants directly.

FreshBite provides a simple online platform where users can:

* Browse restaurants
* View available food items
* Add items to the cart
* Check the total price
* Enter delivery details
* Select a payment method
* Place an order
* View order confirmation
* View previous orders

---

## 3. Objectives

The main objectives of the FreshBite project are:

* To develop an easy-to-use online food ordering website.
* To allow users to browse restaurants and menus.
* To provide cart management functionality.
* To calculate order totals automatically.
* To provide a checkout system.
* To generate an order ID after placing an order.
* To provide an order confirmation page.
* To allow users to view their previous orders.
* To create a responsive interface for different screen sizes.

---

## 4. Features

### User Features

* Home page
* Restaurant listing
* Restaurant menu
* Food item selection
* Add to cart
* Increase or decrease quantity
* Remove cart items
* Automatic price calculation
* Checkout
* Delivery address form
* Payment method selection
* Order placement
* Order confirmation
* Order ID generation
* My Orders
* View Order

---

## 5. Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Storage

* Browser LocalStorage

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

## 6. Project Structure

```text
FreshBite/
│
├── css/
│   ├── style.css
│   ├── restaurants.css
│   ├── menu.css
│   ├── cart.css
│   ├── checkout.css
│   ├── order-confirmation.css
│   └── orders.css
│
├── js/
│   ├── script.js
│   ├── restaurant.js
│   ├── menu.js
│   ├── cart.js
│   ├── checkout.js
│   ├── order-confirmation.js
│   └── orders.js
│
├── pages/
│   ├── restaurants.html
│   ├── menu.html
│   ├── cart.html
│   ├── checkout.html
│   ├── order-confirmation.html
│   └── orders.html
│
├── images/
│
├── index.html
│
└── README.md
```

---

## 7. Website Modules

### 1. Home Module

Provides the main landing page and navigation to different sections of the website.

### 2. Restaurant Module

Displays available restaurants and allows users to select a restaurant.

### 3. Menu Module

Displays food items available from the selected restaurant.

### 4. Cart Module

Allows users to:

* Add food items
* Change quantities
* Remove items
* View item totals
* View the final cart amount

### 5. Checkout Module

Allows users to enter:

* Name
* Mobile number
* House / Flat details
* Area
* City
* Pincode
* Payment method

### 6. Order Confirmation Module

After placing an order, the system generates an Order ID and displays:

* Customer details
* Delivery address
* Ordered items
* Payment method
* Total amount
* Order status

### 7. My Orders Module

Allows users to view previously placed orders and open their order details.

---

## 8. User Flow

```text
Home
  ↓
Restaurants
  ↓
Select Restaurant
  ↓
View Menu
  ↓
Add Food to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Enter Delivery Details
  ↓
Select Payment Method
  ↓
Place Order
  ↓
Order Confirmation
  ↓
My Orders
```

---

## 9. Data Storage

FreshBite currently uses browser LocalStorage to store cart and order information.

The following data can be stored locally:

* Cart items
* Item quantities
* Coupon discount
* Latest order
* Previous orders

No external database is required for the current frontend version.

---

## 10. How to Run the Project

### Method 1 - VS Code

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html`.
4. Run the project using a browser or Live Server extension.

### Method 2 - GitHub Pages

The project can also be deployed using GitHub Pages.

---

## 11. Future Enhancements

The project can be improved in the future by adding:

* User registration and login
* Backend server
* Database integration
* Real-time order tracking
* Online payment gateway
* Restaurant admin panel
* Delivery partner module
* User profile management
* Food reviews and ratings
* Search and filter functionality
* Notifications

---

## 12. Advantages

* Simple and user-friendly interface
* Easy restaurant and menu browsing
* Quick cart management
* Automatic total calculation
* Simple checkout process
* Order confirmation
* Previous order viewing
* Responsive design

---

## 13. Limitations

* Current version uses browser LocalStorage.
* No real database is connected.
* Online payment is not connected to a real payment gateway.
* User authentication is not implemented.
* Order tracking is currently a frontend feature.

---

## 14. Conclusion

FreshBite is a simple and user-friendly online food ordering system developed using HTML, CSS, and JavaScript.

The project demonstrates the complete basic food ordering workflow, from browsing restaurants and selecting food items to managing the cart, completing checkout, placing an order, and viewing order details.

The project can be further extended with a backend, database, authentication, online payments, and real-time order tracking to make it a complete real-world food delivery application.

---

## 15. Author

**FreshBite - Online Food Ordering System**

Developed as a web development project using HTML, CSS, and JavaScript.
