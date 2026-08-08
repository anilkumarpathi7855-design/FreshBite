// =====================================================
// FRESH BITE - CHECKOUT JAVASCRIPT
// =====================================================


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(
        localStorage.getItem("freshBiteCart")
    ) || [];


// =====================================================
// VARIABLES
// =====================================================

let discountAmount = 0;

let couponApplied = false;

const DELIVERY_FEE = 40;


// =====================================================
// ELEMENTS
// =====================================================

const checkoutItems =
    document.getElementById("checkoutItems");

const itemCount =
    document.getElementById("itemCount");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryFeeElement =
    document.getElementById("deliveryFee");

const discountElement =
    document.getElementById("discount");

const grandTotalElement =
    document.getElementById("grandTotal");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

const couponInput =
    document.getElementById("couponInput");

const applyCouponBtn =
    document.getElementById("applyCoupon");

const couponMessage =
    document.getElementById("couponMessage");

const successModal =
    document.getElementById("successModal");

const successOrderId =
    document.getElementById("successOrderId");

const trackOrderBtn =
    document.getElementById("trackOrderBtn");


// =====================================================
// LOAD CART
// =====================================================

function loadCart() {

    cart =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCart"
            )
        ) || [];


    // Empty cart

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your Cart is Empty
                </h3>

                <p>
                    Add some delicious food before checkout.
                </p>

                <a href="menu.html">

                    Browse Menu

                </a>

            </div>

        `;


        itemCount.textContent =
            "0 items";


        subtotalElement.textContent =
            "₹0.00";


        deliveryFeeElement.textContent =
            "₹0.00";


        discountElement.textContent =
            "-₹0.00";


        grandTotalElement.textContent =
            "₹0.00";


        placeOrderBtn.disabled =
            true;


        return;

    }


    placeOrderBtn.disabled =
        false;


    displayCartItems();

    calculateTotal();

}


// =====================================================
// DISPLAY CART ITEMS
// =====================================================

function displayCartItems() {

    checkoutItems.innerHTML = "";


    let totalItems = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(item.price) || 0;


        const itemTotal =
            price * quantity;


        totalItems += quantity;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-item";


        // Image

        let imageHTML = `

            <div class="checkout-item-image">

                <i
                    class="fa-solid fa-utensils"
                    style="
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        width:100%;
                        height:100%;
                        color:#FF6B35;
                    "
                ></i>

            </div>

        `;


        if (item.image) {

            imageHTML = `

                <div class="checkout-item-image">

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                    >

                </div>

            `;

        }


        itemElement.innerHTML = `

            ${imageHTML}


            <div class="checkout-item-info">

                <div class="checkout-item-name">

                    ${escapeHTML(item.name)}

                </div>


                <div class="checkout-item-qty">

                    ₹${price.toFixed(2)}
                    ×
                    ${quantity}

                </div>

            </div>


            <div class="checkout-item-price">

                ₹${itemTotal.toFixed(2)}

            </div>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    itemCount.textContent =
        `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

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
            Number(item.quantity) || 1;


        subtotal +=
            price * quantity;

    });


    return subtotal;

}


// =====================================================
// CALCULATE TOTAL
// =====================================================

function calculateTotal() {

    const subtotal =
        calculateSubtotal();


    // Delivery

    const deliveryFee =
        subtotal > 0
            ? DELIVERY_FEE
            : 0;


    // Prevent discount from exceeding subtotal

    if (discountAmount > subtotal) {

        discountAmount =
            subtotal;

    }


    const grandTotal =
        subtotal +
        deliveryFee -
        discountAmount;


    subtotalElement.textContent =
        `₹${subtotal.toFixed(2)}`;


    deliveryFeeElement.textContent =
        `₹${deliveryFee.toFixed(2)}`;


    discountElement.textContent =
        `-₹${discountAmount.toFixed(2)}`;


    grandTotalElement.textContent =
        `₹${grandTotal.toFixed(2)}`;

}


// =====================================================
// COUPON
// =====================================================

applyCouponBtn.addEventListener(
    "click",
    applyCoupon
);


couponInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            applyCoupon();

        }

    }
);


function applyCoupon() {

    const coupon =
        couponInput.value
            .trim()
            .toUpperCase();


    // Empty coupon

    if (!coupon) {

        showCouponMessage(
            "Please enter a coupon code.",
            "error"
        );

        return;

    }


    // Already applied

    if (couponApplied) {

        showCouponMessage(
            "Coupon is already applied.",
            "error"
        );

        return;

    }


    // FRESH10

    if (coupon === "FRESH10") {

        const subtotal =
            calculateSubtotal();


        if (subtotal <= 0) {

            showCouponMessage(
                "Add items to cart first.",
                "error"
            );

            return;

        }


        discountAmount =
            subtotal * 0.10;


        couponApplied =
            true;


        couponInput.disabled =
            true;


        applyCouponBtn.disabled =
            true;


        showCouponMessage(
            "FRESH10 applied! You saved 10%.",
            "success"
        );


        calculateTotal();

        return;

    }


    // Invalid coupon

    showCouponMessage(
        "Invalid coupon code.",
        "error"
    );

}


// =====================================================
// COUPON MESSAGE
// =====================================================

function showCouponMessage(
    message,
    type
) {

    couponMessage.textContent =
        message;


    couponMessage.className =
        "coupon-message " + type;

}


// =====================================================
// GET DELIVERY TIME
// =====================================================

function getDeliveryTime() {

    const selected =
        document.querySelector(
            'input[name="deliveryTime"]:checked'
        );


    if (!selected) {

        return "ASAP";

    }


    return selected.value;

}


// =====================================================
// GET PAYMENT METHOD
// =====================================================

function getPaymentMethod() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selected) {

        return "Cash on Delivery";

    }


    return selected.value;

}


// =====================================================
// FORM VALIDATION
// =====================================================

function validateForm() {

    const fullName =
        document.getElementById(
            "fullName"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    // Name

    if (!fullName) {

        alert(
            "Please enter your full name."
        );

        document
            .getElementById("fullName")
            .focus();

        return false;

    }


    // Phone

    if (
        !/^[0-9]{10}$/.test(phone)
    ) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        document
            .getElementById("phone")
            .focus();

        return false;

    }


    // Address

    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        document
            .getElementById("address")
            .focus();

        return false;

    }


    // City

    if (!city) {

        alert(
            "Please enter your city."
        );

        document
            .getElementById("city")
            .focus();

        return false;

    }


    // Pincode

    if (
        !/^[0-9]{6}$/.test(pincode)
    ) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        document
            .getElementById("pincode")
            .focus();

        return false;

    }


    return true;

}


// =====================================================
// PLACE ORDER
// =====================================================

placeOrderBtn.addEventListener(
    "click",
    placeOrder
);


function placeOrder() {

    // Check cart

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    // Validate

    if (!validateForm()) {

        return;

    }


    // Get customer information

    const fullName =
        document
            .getElementById("fullName")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const city =
        document
            .getElementById("city")
            .value
            .trim();


    const pincode =
        document
            .getElementById("pincode")
            .value
            .trim();


    const deliveryTime =
        getDeliveryTime();


    const paymentMethod =
        getPaymentMethod();


    // Calculate amounts

    const subtotal =
        calculateSubtotal();


    const deliveryFee =
        DELIVERY_FEE;


    const discount =
        discountAmount;


    const total =
        subtotal +
        deliveryFee -
        discount;


    // Generate order ID

    const orderId =
        "FB-" +
        Date.now()
            .toString()
            .slice(-8);


    // Current date

    const orderDate =
        new Date().toISOString();


    // Create order

    const order = {

        id:
            orderId,

        date:
            orderDate,

        status:
            "Placed",

        customer: {

            name:
                fullName,

            phone:
                phone,

            address:
                address,

            city:
                city,

            pincode:
                pincode

        },

        deliveryTime:
            deliveryTime,

        paymentMethod:
            paymentMethod,

        items:
            cart.map(item => ({

                id:
                    item.id,

                name:
                    item.name,

                price:
                    Number(item.price) || 0,

                quantity:
                    Number(item.quantity) || 1,

                image:
                    item.image || ""

            })),

        subtotal:
            subtotal,

        deliveryFee:
            deliveryFee,

        discount:
            discount,

        total:
            total

    };


    // =================================================
    // SAVE ORDER
    // =================================================

    let orders =
        JSON.parse(
            localStorage.getItem(
                "freshBiteOrders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "freshBiteOrders",
        JSON.stringify(orders)
    );


    // =================================================
    // SAVE CURRENT USER
    // =================================================

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCurrentUser"
            )
        );


    if (!currentUser) {

        localStorage.setItem(

            "freshBiteCurrentUser",

            JSON.stringify({

                name:
                    fullName,

                email:
                    "guest@freshbite.com",

                phone:
                    phone,

                id:
                    "USER-" +
                    Date.now()
                        .toString()
                        .slice(-6)

            })

        );

    }


    // =================================================
    // SAVE ADDRESS
    // =================================================

    saveDeliveryAddress(
        address,
        city,
        pincode
    );


    // =================================================
    // CLEAR CART
    // =================================================

    localStorage.removeItem(
        "freshBiteCart"
    );


    cart = [];


    // =================================================
    // SHOW SUCCESS
    // =================================================

    successOrderId.textContent =
        orderId;


    successModal.classList.add(
        "show"
    );


    // Disable button

    placeOrderBtn.disabled =
        true;

}


// =====================================================
// SAVE DELIVERY ADDRESS
// =====================================================

function saveDeliveryAddress(
    address,
    city,
    pincode
) {

    let addresses =
        JSON.parse(
            localStorage.getItem(
                "freshBiteAddresses"
            )
        ) || [];


    // Check duplicate address

    const exists =
        addresses.some(
            item =>
                item.address === address &&
                item.city === city &&
                item.pincode === pincode
        );


    if (exists) {

        return;

    }


    addresses.push({

        id:
            "ADDR-" +
            Date.now(),

        name:
            "Delivery Address",

        address:
            address,

        city:
            city,

        pincode:
            pincode

    });


    localStorage.setItem(
        "freshBiteAddresses",
        JSON.stringify(addresses)
    );

}


// =====================================================
// TRACK ORDER
// =====================================================

trackOrderBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "account.html";

    }
);


// =====================================================
// AUTO FILL USER DETAILS
// =====================================================

function autoFillUser() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCurrentUser"
            )
        );


    if (!user) {

        return;

    }


    if (user.name) {

        document
            .getElementById("fullName")
            .value =
            user.name;

    }


    if (user.phone) {

        document
            .getElementById("phone")
            .value =
            user.phone;

    }

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    if (value === undefined ||
        value === null) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// INPUT RESTRICTIONS
// =====================================================

document
    .getElementById("phone")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );


document
    .getElementById("pincode")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

        }
    );


// =====================================================
// INITIALIZE
// =====================================================

autoFillUser();

loadCart();