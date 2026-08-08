// =====================================================
// FRESH BITE - ACCOUNT JAVASCRIPT
// =====================================================


// =====================================================
// CURRENT USER
// =====================================================

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "freshBiteCurrentUser"
        )
    );


// =====================================================
// ELEMENTS
// =====================================================

const welcomeName =
    document.getElementById("welcomeName");

const sidebarName =
    document.getElementById("sidebarName");

const sidebarEmail =
    document.getElementById("sidebarEmail");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profilePhone =
    document.getElementById("profilePhone");

const profileId =
    document.getElementById("profileId");

const cartCountElements =
    document.querySelectorAll(".cart-count");


// =====================================================
// DISPLAY USER
// =====================================================

function displayUser() {

    if (!currentUser) {

        welcomeName.textContent =
            "Guest";

        sidebarName.textContent =
            "Guest User";

        sidebarEmail.textContent =
            "Please login";

        profileName.textContent =
            "Guest User";

        profileEmail.textContent =
            "Not logged in";

        profilePhone.textContent =
            "Not available";

        profileId.textContent =
            "—";

        return;

    }


    welcomeName.textContent =
        currentUser.name;


    sidebarName.textContent =
        currentUser.name;


    sidebarEmail.textContent =
        currentUser.email;


    profileName.textContent =
        currentUser.name;


    profileEmail.textContent =
        currentUser.email;


    profilePhone.textContent =
        currentUser.phone || "Not available";


    profileId.textContent =
        currentUser.id || "—";

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCart"
            )
        ) || [];


    let total = 0;


    cart.forEach(item => {

        total +=
            Number(item.quantity) || 0;

    });


    cartCountElements.forEach(
        element => {

            element.textContent =
                total;

        }
    );

}


// =====================================================
// ACCOUNT MENU
// =====================================================

const menuItems =
    document.querySelectorAll(
        ".account-menu-item[data-section]"
    );


const sections = {

    profile:
        document.getElementById(
            "profileSection"
        ),

    orders:
        document.getElementById(
            "ordersSection"
        ),

    addresses:
        document.getElementById(
            "addressesSection"
        ),

    wishlist:
        document.getElementById(
            "wishlistSection"
        ),

    settings:
        document.getElementById(
            "settingsSection"
        )

};


menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const sectionName =
                item.dataset.section;


            // Remove active

            menuItems.forEach(
                menuItem => {

                    menuItem.classList.remove(
                        "active"
                    );

                }
            );


            // Add active

            item.classList.add(
                "active"
            );


            // Hide all sections

            Object.values(sections)
                .forEach(section => {

                    section.classList.remove(
                        "active"
                    );

                });


            // Show selected section

            if (sections[sectionName]) {

                sections[
                    sectionName
                ].classList.add(
                    "active"
                );

            }


            // Load content

            if (
                sectionName ===
                "orders"
            ) {

                loadOrders();

            }


            if (
                sectionName ===
                "addresses"
            ) {

                loadAddresses();

            }


            if (
                sectionName ===
                "wishlist"
            ) {

                loadWishlist();

            }

        }
    );

});


// =====================================================
// ORDERS
// =====================================================

function loadOrders() {

    const ordersList =
        document.getElementById(
            "ordersList"
        );


    const orders =
        JSON.parse(
            localStorage.getItem(
                "freshBiteOrders"
            )
        ) || [];


    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    No Orders Yet
                </h3>

                <p>
                    Your completed orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    ordersList.innerHTML = "";


    orders
        .slice()
        .reverse()
        .forEach(order => {

            const items =
                order.items || [];


            const itemText =
                items
                    .map(item =>
                        `${item.name} × ${item.quantity}`
                    )
                    .join(", ");


            const date =
                order.date
                    ? new Date(
                        order.date
                    ).toLocaleDateString()
                    : "Recently";


            const total =
                Number(
                    order.total
                ) || 0;


            const orderId =
                order.id ||
                "FB-" +
                Date.now();


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "order-card";


            card.innerHTML = `

                <div class="order-top">

                    <span class="order-id">
                        ${orderId}
                    </span>

                    <span class="order-status">
                        ${order.status || "Placed"}
                    </span>

                </div>


                <div class="order-items">

                    ${itemText || "Food items"}

                </div>


                <div class="order-bottom">

                    <span class="order-date">

                        ${date}

                    </span>


                    <span class="order-total">

                        ₹${total.toFixed(2)}

                    </span>

                </div>

            `;


            ordersList.appendChild(
                card
            );

        });

}


// =====================================================
// ADDRESSES
// =====================================================

function getAddresses() {

    return JSON.parse(
        localStorage.getItem(
            "freshBiteAddresses"
        )
    ) || [];

}


function saveAddresses(addresses) {

    localStorage.setItem(
        "freshBiteAddresses",
        JSON.stringify(addresses)
    );

}


function loadAddresses() {

    const addressesList =
        document.getElementById(
            "addressesList"
        );


    const addresses =
        getAddresses();


    if (addresses.length === 0) {

        addressesList.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-location-dot"></i>

                <h3>
                    No Saved Addresses
                </h3>

                <p>
                    Add an address for faster checkout.
                </p>

            </div>

        `;

        return;

    }


    addressesList.innerHTML = "";


    addresses.forEach(
        (address, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "address-card";


            card.innerHTML = `

                <button
                    class="delete-address"
                    data-index="${index}"
                    title="Delete Address">

                    <i class="fa-solid fa-trash"></i>

                </button>


                <h3>

                    <i class="fa-solid fa-house"></i>

                    ${address.name}

                </h3>


                <p>

                    ${address.address}

                    <br>

                    ${address.city}

                    -

                    ${address.pincode}

                </p>

            `;


            addressesList.appendChild(
                card
            );

        }
    );


    // Delete buttons

    document
        .querySelectorAll(
            ".delete-address"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const addresses =
                        getAddresses();


                    addresses.splice(
                        index,
                        1
                    );


                    saveAddresses(
                        addresses
                    );


                    loadAddresses();

                }
            );

        });

}


// =====================================================
// ADDRESS FORM
// =====================================================

const addAddressBtn =
    document.getElementById(
        "addAddressBtn"
    );

const addressForm =
    document.getElementById(
        "addressForm"
    );

const saveAddressBtn =
    document.getElementById(
        "saveAddressBtn"
    );

const cancelAddressBtn =
    document.getElementById(
        "cancelAddressBtn"
    );


addAddressBtn.addEventListener(
    "click",
    () => {

        addressForm.classList.add(
            "show"
        );

    }
);


cancelAddressBtn.addEventListener(
    "click",
    () => {

        addressForm.classList.remove(
            "show"
        );

    }
);


// =====================================================
// SAVE ADDRESS
// =====================================================

saveAddressBtn.addEventListener(
    "click",
    () => {

        const name =
            document
                .getElementById(
                    "addressName"
                )
                .value
                .trim();


        const address =
            document
                .getElementById(
                    "addressText"
                )
                .value
                .trim();


        const city =
            document
                .getElementById(
                    "addressCity"
                )
                .value
                .trim();


        const pincode =
            document
                .getElementById(
                    "addressPincode"
                )
                .value
                .trim();


        if (
            !name ||
            !address ||
            !city ||
            !pincode
        ) {

            alert(
                "Please fill all address fields."
            );

            return;

        }


        if (
            !/^[0-9]{6}$/.test(
                pincode
            )
        ) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return;

        }


        const addresses =
            getAddresses();


        addresses.push({

            id:
                "ADDR-" +
                Date.now(),

            name:
                name,

            address:
                address,

            city:
                city,

            pincode:
                pincode

        });


        saveAddresses(
            addresses
        );


        document
            .getElementById(
                "addressName"
            )
            .value = "";


        document
            .getElementById(
                "addressText"
            )
            .value = "";


        document
            .getElementById(
                "addressCity"
            )
            .value = "";


        document
            .getElementById(
                "addressPincode"
            )
            .value = "";


        addressForm.classList.remove(
            "show"
        );


        loadAddresses();

    }
);


// =====================================================
// WISHLIST
// =====================================================

function loadWishlist() {

    const wishlistList =
        document.getElementById(
            "wishlistList"
        );


    const wishlist =
        JSON.parse(
            localStorage.getItem(
                "freshBiteWishlist"
            )
        ) || [];


    const cart =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCart"
            )
        ) || [];


    if (wishlist.length === 0) {

        wishlistList.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-heart"></i>

                <h3>
                    Your Wishlist is Empty
                </h3>

                <p>
                    Add your favorite food items from the menu.
                </p>

            </div>

        `;

        return;

    }


    wishlistList.innerHTML = "";


    wishlist.forEach(
        wishlistId => {

            const item =
                cart.find(
                    product =>
                        String(
                            product.id
                        ) ===
                        String(
                            wishlistId
                        )
                );


            if (!item) {

                return;

            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "wishlist-card";


            card.innerHTML = `

                <div class="wishlist-image">

                    ${
                        item.image
                        ?
                        `<img
                            src="${item.image}"
                            alt="${item.name}"
                        >`
                        :
                        `<div class="empty-image">
                            <i class="fa-solid fa-utensils"></i>
                        </div>`
                    }

                </div>


                <div class="wishlist-info">

                    <h3>
                        ${item.name}
                    </h3>


                    <span class="wishlist-price">

                        ₹${Number(
                            item.price
                        ).toFixed(2)}

                    </span>


                    <button
                        class="remove-wishlist"
                        data-id="${item.id}">

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>

            `;


            wishlistList.appendChild(
                card
            );

        }
    );


    // =================================================
    // REMOVE WISHLIST
    // =================================================

    document
        .querySelectorAll(
            ".remove-wishlist"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        String(
                            button.dataset.id
                        );


                    let wishlist =
                        JSON.parse(
                            localStorage.getItem(
                                "freshBiteWishlist"
                            )
                        ) || [];


                    wishlist =
                        wishlist.filter(
                            itemId =>
                                String(
                                    itemId
                                ) !== id
                        );


                    localStorage.setItem(
                        "freshBiteWishlist",
                        JSON.stringify(
                            wishlist
                        )
                    );


                    loadWishlist();

                }
            );

        });

}


// =====================================================
// LOGOUT
// =====================================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


logoutBtn.addEventListener(
    "click",
    () => {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmLogout) {

            return;

        }


        localStorage.removeItem(
            "freshBiteCurrentUser"
        );


        localStorage.removeItem(
            "freshBiteRememberMe"
        );


        window.location.href =
            "login.html";

    }
);


// =====================================================
// SETTINGS
// =====================================================

const orderNotifications =
    document.getElementById(
        "orderNotifications"
    );

const offerNotifications =
    document.getElementById(
        "offerNotifications"
    );


orderNotifications.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "freshBiteOrderNotifications",
            orderNotifications.checked
        );

    }
);


offerNotifications.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "freshBiteOfferNotifications",
            offerNotifications.checked
        );

    }
);


// =====================================================
// LOAD SETTINGS
// =====================================================

function loadSettings() {

    const orderSetting =
        localStorage.getItem(
            "freshBiteOrderNotifications"
        );


    const offerSetting =
        localStorage.getItem(
            "freshBiteOfferNotifications"
        );


    if (orderSetting !== null) {

        orderNotifications.checked =
            orderSetting === "true";

    }


    if (offerSetting !== null) {

        offerNotifications.checked =
            offerSetting === "true";

    }

}


// =====================================================
// INITIALIZE
// =====================================================

displayUser();

updateCartCount();

loadOrders();

loadAddresses();

loadWishlist();

loadSettings();