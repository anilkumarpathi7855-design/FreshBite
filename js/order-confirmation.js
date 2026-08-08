// ========================================
// ORDER CONFIRMATION
// ========================================


// Get latest order

const order =
    JSON.parse(localStorage.getItem("latestOrder"));


// ========================================
// LOAD ORDER
// ========================================

function loadOrderConfirmation() {

    if (!order) {

        alert("No order found.");

        window.location.href =
            "index.html";

        return;
    }


    // ================================
    // ORDER ID
    // ================================

    document.getElementById("orderId")
        .textContent =
        order.orderId || "--";


    // ================================
    // CUSTOMER DETAILS
    // ================================

    document.getElementById("customerName")
        .textContent =
        order.customer?.name || "--";


    document.getElementById("customerMobile")
        .textContent =
        order.customer?.mobile || "--";


    const address =
        order.customer?.address;


    if (address) {

        document.getElementById("customerAddress")
            .textContent =

            `${address.house}, ${address.area}, ${address.city} - ${address.pincode}`;

    } else {

        document.getElementById("customerAddress")
            .textContent = "--";
    }


    // ================================
    // PAYMENT METHOD
    // ================================

    let paymentText =
        order.paymentMethod || "--";


    if (paymentText === "cod") {

        paymentText =
            "Cash on Delivery";

    } else if (paymentText === "upi") {

        paymentText =
            "UPI";

    } else if (paymentText === "card") {

        paymentText =
            "Credit / Debit Card";
    }


    document.getElementById("paymentMethod")
        .textContent =
        paymentText;


    // ================================
    // ORDER ITEMS
    // ================================

    const orderedItems =
        document.getElementById("orderedItems");


    orderedItems.innerHTML = "";


    if (!order.items || order.items.length === 0) {

        orderedItems.innerHTML = `
            <p>No items found.</p>
        `;

    } else {

        order.items.forEach((item) => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const total =
                price * quantity;


            orderedItems.innerHTML += `

                <div class="confirmation-item">

                    <div class="item-left">

                        <img
                            src="${item.image || "https://via.placeholder.com/55"}"
                            alt="${item.name}"
                        >

                        <div>

                            <div class="item-name">
                                ${item.name}
                            </div>

                            <div class="item-quantity">
                                Qty: ${quantity}
                            </div>

                        </div>

                    </div>


                    <strong>
                        ₹${total}
                    </strong>

                </div>

            `;
        });
    }


    // ================================
    // PRICE DETAILS
    // ================================

    document.getElementById("itemTotal")
        .textContent =
        `₹${order.itemTotal || 0}`;


    document.getElementById("deliveryFee")
        .textContent =

        order.deliveryFee === 0
            ? "FREE"
            : `₹${order.deliveryFee || 0}`;


    document.getElementById("discount")
        .textContent =
        `-₹${order.discount || 0}`;


    document.getElementById("grandTotal")
        .textContent =
        `₹${order.total || 0}`;
}


// ========================================
// CONTINUE SHOPPING
// ========================================

function continueShopping() {

    window.location.href =
        "index.html";
}


// ========================================
// VIEW ORDER
// ========================================

function viewOrder() {

    alert(
        "Order ID: " +
        (order?.orderId || "Not Available")
    );
}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadOrderConfirmation
);