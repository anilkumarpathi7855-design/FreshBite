// =====================================================
// FRESH BITE - CART JAVASCRIPT
// =====================================================


// =====================================================
// GET CART FROM LOCAL STORAGE
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("freshBiteCart")) || [];


// =====================================================
// HTML ELEMENTS
// =====================================================

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartContent =
    document.getElementById("cartContent");

const cartCount =
    document.getElementById("cartCount");

const subtotalElement =
    document.getElementById("cartSubtotal");

const deliveryElement =
    document.getElementById("deliveryFee");

const discountElement =
    document.getElementById("discountAmount");

const totalElement =
    document.getElementById("cartTotal");

const couponInput =
    document.getElementById("couponInput");

const couponButton =
    document.getElementById("applyCoupon");

const couponMessage =
    document.getElementById("couponMessage");


// =====================================================
// DELIVERY FEE
// =====================================================

const DELIVERY_FEE = 40;


// =====================================================
// DISCOUNT
// =====================================================

let discount = 0;

let couponApplied = false;


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "freshBiteCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    let totalItems = 0;


    cart.forEach(item => {

        totalItems += Number(item.quantity) || 0;

    });


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // Update all cart count elements
    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                totalItems;

        });

}


// =====================================================
// CALCULATE SUBTOTAL
// =====================================================

function calculateSubtotal() {

    let subtotal = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 0;


        subtotal +=
            price * quantity;

    });


    return subtotal;

}


// =====================================================
// FORMAT PRICE
// =====================================================

function formatPrice(price) {

    return "₹" +
        Number(price).toLocaleString("en-IN");

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    updateCartCount();


    // -----------------------------------------------
    // EMPTY CART
    // -----------------------------------------------

    if (cart.length === 0) {

        if (cartContent) {

            cartContent.style.display =
                "none";

        }


        if (emptyCart) {

            emptyCart.style.display =
                "flex";

        }


        updateSummary();

        return;

    }


    // -----------------------------------------------
    // SHOW CART
    // -----------------------------------------------

    if (cartContent) {

        cartContent.style.display =
            "block";

    }


    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    if (!cartItemsContainer) {

        updateSummary();

        return;

    }


    cartItemsContainer.innerHTML = "";


    // -----------------------------------------------
    // CREATE CART ITEMS
    // -----------------------------------------------

    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image || getFoodImage(item.id)}"
                    alt="${item.name}"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="cart-item-details">

                <h3>
                    ${item.name}
                </h3>


                <p class="cart-item-price">

                    ${formatPrice(price)}
                    each

                </p>


                <div class="cart-item-actions">


                    <div class="quantity-control">

                        <button
                            class="quantity-btn decrease-btn"
                            data-index="${index}"
                            aria-label="Decrease quantity"
                        >

                            <i class="fa-solid fa-minus"></i>

                        </button>


                        <span class="quantity">
                            ${quantity}
                        </span>


                        <button
                            class="quantity-btn increase-btn"
                            data-index="${index}"
                            aria-label="Increase quantity"
                        >

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>


                    <button
                        class="remove-cart-btn"
                        data-index="${index}"
                    >

                        <i class="fa-regular fa-trash-can"></i>

                        Remove

                    </button>


                </div>

            </div>


            <div class="cart-item-total">

                ${formatPrice(itemTotal)}

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    attachCartEvents();

    updateSummary();

}


// =====================================================
// FOOD IMAGE
// =====================================================

function getFoodImage(id) {

    const images = {

        "food-001":
            "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=300&q=80",

        "food-002":
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80",

        "food-003":
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",

        "food-004":
            "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80",

        "food-005":
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80",

        "food-006":
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",

        "food-007":
            "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&q=80",

        "food-008":
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&q=80",

        "food-009":
            "https://images.unsplash.com/photo-1601303516534-2e4a4c6a6d5e?auto=format&fit=crop&w=300&q=80",

        "food-010":
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80",

        "food-011":
            "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80",

        "food-012":
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80"

    };


    return images[id] || "";

}


// =====================================================
// CART EVENTS
// =====================================================

function attachCartEvents() {


    // -----------------------------------------------
    // INCREASE QUANTITY
    // -----------------------------------------------

    document
        .querySelectorAll(".increase-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (cart[index]) {

                        cart[index].quantity =
                            Number(
                                cart[index].quantity
                            ) + 1;

                    }


                    saveCart();

                    renderCart();

                }
            );

        });


    // -----------------------------------------------
    // DECREASE QUANTITY
    // -----------------------------------------------

    document
        .querySelectorAll(".decrease-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) {

                        return;

                    }


                    cart[index].quantity =
                        Number(
                            cart[index].quantity
                        ) - 1;


                    // Remove when quantity becomes 0

                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart();

                    renderCart();

                }
            );

        });


    // -----------------------------------------------
    // REMOVE ITEM
    // -----------------------------------------------

    document
        .querySelectorAll(".remove-cart-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        index >= 0 &&
                        index < cart.length
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart();

                    renderCart();

                }
            );

        });

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary() {

    const subtotal =
        calculateSubtotal();


    // -----------------------------------------------
    // DELIVERY
    // -----------------------------------------------

    let deliveryFee = 0;


    if (subtotal > 0) {

        if (subtotal >= 499) {

            deliveryFee = 0;

        } else {

            deliveryFee =
                DELIVERY_FEE;

        }

    }


    // -----------------------------------------------
    // TOTAL
    // -----------------------------------------------

    const total =
        subtotal +
        deliveryFee -
        discount;


    // -----------------------------------------------
    // UPDATE HTML
    // -----------------------------------------------

    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (deliveryElement) {

        if (deliveryFee === 0 && subtotal > 0) {

            deliveryElement.textContent =
                "FREE";

        } else {

            deliveryElement.textContent =
                formatPrice(deliveryFee);

        }

    }


    if (discountElement) {

        discountElement.textContent =
            "- " +
            formatPrice(discount);

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                Math.max(total, 0)
            );

    }

}


// =====================================================
// APPLY COUPON
// =====================================================

if (couponButton) {

    couponButton.addEventListener(
        "click",
        applyCoupon
    );

}


// =====================================================
// COUPON FUNCTION
// =====================================================

function applyCoupon() {

    if (!couponInput) {

        return;

    }


    const coupon =
        couponInput.value
            .trim()
            .toUpperCase();


    const subtotal =
        calculateSubtotal();


    if (subtotal === 0) {

        showCouponMessage(
            "Add items to your cart first.",
            "error"
        );

        return;

    }


    if (couponApplied) {

        showCouponMessage(
            "Coupon already applied.",
            "error"
        );

        return;

    }


    // -----------------------------------------------
    // FRESH10
    // -----------------------------------------------

    if (coupon === "FRESH10") {

        discount =
            Math.round(
                subtotal * 0.10
            );


        couponApplied = true;


        showCouponMessage(
            "10% discount applied!",
            "success"
        );


        updateSummary();

        return;

    }


    // -----------------------------------------------
    // BITE50
    // -----------------------------------------------

    if (
        coupon === "BITE50" &&
        subtotal >= 299
    ) {

        discount = 50;

        couponApplied = true;


        showCouponMessage(
            "₹50 discount applied!",
            "success"
        );


        updateSummary();

        return;

    }


    // -----------------------------------------------
    // WELCOME
    // -----------------------------------------------

    if (
        coupon === "WELCOME"
    ) {

        discount = 30;

        couponApplied = true;


        showCouponMessage(
            "₹30 welcome discount applied!",
            "success"
        );


        updateSummary();

        return;

    }


    // -----------------------------------------------
    // INVALID
    // -----------------------------------------------

    discount = 0;

    showCouponMessage(
        "Invalid coupon code.",
        "error"
    );


    updateSummary();

}


// =====================================================
// COUPON MESSAGE
// =====================================================

function showCouponMessage(
    message,
    type
) {

    if (!couponMessage) {

        return;

    }


    couponMessage.textContent =
        message;


    couponMessage.className =
        "coupon-message " +
        type;

}


// =====================================================
// REMOVE COUPON
// =====================================================

function removeCoupon() {

    discount = 0;

    couponApplied = false;


    if (couponInput) {

        couponInput.value = "";

    }


    if (couponMessage) {

        couponMessage.textContent =
            "";

        couponMessage.className =
            "coupon-message";

    }


    updateSummary();

}


// =====================================================
// CLEAR CART
// =====================================================

function clearCart() {

    if (cart.length === 0) {

        return;

    }


    const confirmClear =
        confirm(
            "Are you sure you want to remove all items from your cart?"
        );


    if (!confirmClear) {

        return;

    }


    cart = [];


    saveCart();

    removeCoupon();

    renderCart();

}


// =====================================================
// CLEAR CART BUTTON
// =====================================================

const clearCartButton =
    document.getElementById(
        "clearCart"
    );


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        clearCart
    );

}


// =====================================================
// CHECKOUT
// =====================================================

const checkoutButton =
    document.getElementById(
        "checkoutBtn"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add some food first."
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

    }
);