// =====================================================
// FRESH BITE - MENU PAGE JAVASCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const foodSearch =
    document.getElementById("foodSearch");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const dietButtons =
    document.querySelectorAll(".diet-btn");

const foodCards =
    document.querySelectorAll(".food-card");

const foodCount =
    document.getElementById("foodCount");

const noFoodResults =
    document.getElementById("noFoodResults");

const cartCount =
    document.getElementById("cartCount");


// =====================================================
// FILTER VARIABLES
// =====================================================

let selectedCategory = "all";

let selectedDiet = "all";


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(
        localStorage.getItem("freshBiteCart")
    ) || [];


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    let totalItems = 0;


    cart.forEach(item => {

        totalItems +=
            Number(item.quantity) || 0;

    });


    // Main cart count

    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // Other cart count elements

    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                totalItems;

        });

}


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
// FILTER FOOD
// =====================================================

function filterFood() {

    const searchValue =
        foodSearch
            ? foodSearch.value
                .toLowerCase()
                .trim()
            : "";


    let visibleCount = 0;


    foodCards.forEach(card => {


        // ---------------------------------------------
        // DATA
        // ---------------------------------------------

        const foodName =
            (
                card.dataset.name || ""
            ).toLowerCase();


        const category =
            (
                card.dataset.category || ""
            ).toLowerCase();


        const diet =
            (
                card.dataset.diet || ""
            ).toLowerCase();


        // ---------------------------------------------
        // SEARCH
        // ---------------------------------------------

        const matchesSearch =
            foodName.includes(
                searchValue
            );


        // ---------------------------------------------
        // CATEGORY
        // ---------------------------------------------

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        // ---------------------------------------------
        // DIET
        // ---------------------------------------------

        const matchesDiet =
            selectedDiet === "all" ||
            diet === selectedDiet;


        // ---------------------------------------------
        // FINAL RESULT
        // ---------------------------------------------

        if (
            matchesSearch &&
            matchesCategory &&
            matchesDiet
        ) {

            card.style.display =
                "";

            visibleCount++;

        } else {

            card.style.display =
                "none";

        }

    });


    // =================================================
    // FOOD COUNT
    // =================================================

    if (foodCount) {

        foodCount.textContent =
            `${visibleCount} Item${
                visibleCount !== 1
                    ? "s"
                    : ""
            }`;

    }


    // =================================================
    // NO RESULTS
    // =================================================

    if (noFoodResults) {

        if (visibleCount === 0) {

            noFoodResults.style.display =
                "block";

        } else {

            noFoodResults.style.display =
                "none";

        }

    }

}


// =====================================================
// SEARCH
// =====================================================

if (foodSearch) {

    foodSearch.addEventListener(
        "input",
        filterFood
    );

}


// =====================================================
// CATEGORY FILTER
// =====================================================

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // Remove active from all

            categoryButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // Add active

            button.classList.add(
                "active"
            );


            // Get category

            selectedCategory =
                (
                    button.dataset.category ||
                    "all"
                ).toLowerCase();


            // Filter

            filterFood();

        }
    );

});


// =====================================================
// DIET FILTER
// =====================================================

dietButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // Remove active

            dietButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // Add active

            button.classList.add(
                "active"
            );


            // Get diet

            selectedDiet =
                (
                    button.dataset.diet ||
                    "all"
                ).toLowerCase();


            // Filter

            filterFood();

        }
    );

});


// =====================================================
// ADD TO CART
// =====================================================

const addCartButtons =
    document.querySelectorAll(
        ".add-cart-btn"
    );


addCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // -----------------------------------------
            // GET PRODUCT DATA
            // -----------------------------------------

            const id =
                String(
                    button.dataset.id
                );


            const name =
                button.dataset.name ||
                "Food Item";


            const price =
                Number(
                    button.dataset.price
                ) || 0;


            const image =
                button.dataset.image ||
                getImageFromCard(button);


            // -----------------------------------------
            // CHECK PRICE
            // -----------------------------------------

            if (price <= 0) {

                console.error(
                    "Invalid food price:",
                    name
                );

                alert(
                    "Food price is missing."
                );

                return;

            }


            // -----------------------------------------
            // CHECK EXISTING ITEM
            // -----------------------------------------

            const existingItem =
                cart.find(
                    item =>
                        String(item.id) ===
                        id
                );


            if (existingItem) {

                existingItem.quantity =
                    Number(
                        existingItem.quantity
                    ) + 1;

            } else {

                cart.push({

                    id: id,

                    name: name,

                    price: price,

                    image: image,

                    quantity: 1

                });

            }


            // -----------------------------------------
            // SAVE
            // -----------------------------------------

            saveCart();


            // -----------------------------------------
            // UPDATE COUNT
            // -----------------------------------------

            updateCartCount();


            // -----------------------------------------
            // BUTTON FEEDBACK
            // -----------------------------------------

            const originalHTML =
                button.innerHTML;


            button.classList.add(
                "added"
            );


            button.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                Added
                `;


            setTimeout(
                () => {

                    button.classList.remove(
                        "added"
                    );


                    button.innerHTML =
                        originalHTML;

                },
                1200
            );


        }
    );

});


// =====================================================
// GET IMAGE FROM FOOD CARD
// =====================================================

function getImageFromCard(button) {

    const card =
        button.closest(".food-card");


    if (!card) {

        return "";

    }


    const image =
        card.querySelector(
            ".food-image img"
        );


    if (!image) {

        return "";

    }


    return image.src;

}


// =====================================================
// WISHLIST
// =====================================================

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "freshBiteWishlist"
        )
    ) || [];


// =====================================================
// SAVE WISHLIST
// =====================================================

function saveWishlist() {

    localStorage.setItem(
        "freshBiteWishlist",
        JSON.stringify(wishlist)
    );

}


// =====================================================
// WISHLIST BUTTONS
// =====================================================

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist-btn"
    );


wishlistButtons.forEach(button => {

    const id =
        String(
            button.dataset.id || ""
        );


    // Check already saved

    if (
        id &&
        wishlist.includes(id)
    ) {

        setWishlistActive(
            button,
            true
        );

    }


    button.addEventListener(
        "click",
        () => {

            const itemId =
                String(
                    button.dataset.id || ""
                );


            if (!itemId) {

                return;

            }


            const index =
                wishlist.indexOf(
                    itemId
                );


            if (index === -1) {

                wishlist.push(
                    itemId
                );

                setWishlistActive(
                    button,
                    true
                );

            } else {

                wishlist.splice(
                    index,
                    1
                );

                setWishlistActive(
                    button,
                    false
                );

            }


            saveWishlist();

        }
    );

});


// =====================================================
// WISHLIST UI
// =====================================================

function setWishlistActive(
    button,
    active
) {

    const icon =
        button.querySelector("i");


    if (!icon) {

        return;

    }


    if (active) {

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

        button.style.color =
            "var(--orange)";

    } else {

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

        button.style.color =
            "";

    }

}


// =====================================================
// CART PAGE LINK
// =====================================================

document
    .querySelectorAll(
        'a[href="cart.html"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                saveCart();

            }
        );

    });


// =====================================================
// INITIALIZE
// =====================================================

updateCartCount();

filterFood();