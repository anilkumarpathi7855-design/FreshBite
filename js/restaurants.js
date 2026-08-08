// =====================================================
// FRESH BITE - RESTAURANTS PAGE JAVASCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const restaurantSearch =
    document.getElementById("restaurantSearch");

const cuisineFilter =
    document.getElementById("cuisineFilter");

const ratingFilter =
    document.getElementById("ratingFilter");

const priceFilter =
    document.getElementById("priceFilter");

const restaurantCards =
    document.querySelectorAll(".restaurant-card");

const restaurantCount =
    document.getElementById("restaurantCount");

const noRestaurantResults =
    document.getElementById("noRestaurantResults");


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(
        localStorage.getItem("freshBiteCart")
    ) || [];


// =====================================================
// CART COUNT
// =====================================================

function updateRestaurantCartCount() {

    let totalItems = 0;


    cart.forEach(item => {

        totalItems +=
            Number(item.quantity) || 0;

    });


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

function saveRestaurantCart() {

    localStorage.setItem(
        "freshBiteCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// RESTAURANT FILTER
// =====================================================

function filterRestaurants() {

    const searchValue =
        restaurantSearch
            ? restaurantSearch.value
                .toLowerCase()
                .trim()
            : "";


    const cuisineValue =
        cuisineFilter
            ? cuisineFilter.value
                .toLowerCase()
            : "all";


    const ratingValue =
        ratingFilter
            ? ratingFilter.value
            .toLowerCase()
            : "all";


    const priceValue =
        priceFilter
            ? priceFilter.value
                .toLowerCase()
            : "all";


    let visibleCount = 0;


    // =================================================
    // LOOP RESTAURANTS
    // =================================================

    restaurantCards.forEach(card => {


        // ---------------------------------------------
        // DATA
        // ---------------------------------------------

        const name =
            (
                card.dataset.name || ""
            ).toLowerCase();


        const cuisine =
            (
                card.dataset.cuisine || ""
            ).toLowerCase();


        const rating =
            Number(
                card.dataset.rating
            ) || 0;


        const price =
            (
                card.dataset.price || ""
            ).toLowerCase();


        // ---------------------------------------------
        // SEARCH
        // ---------------------------------------------

        const matchesSearch =
            name.includes(
                searchValue
            );


        // ---------------------------------------------
        // CUISINE
        // ---------------------------------------------

        const matchesCuisine =
            cuisineValue === "all" ||
            cuisine === cuisineValue;


        // ---------------------------------------------
        // RATING
        // ---------------------------------------------

        let matchesRating = true;


        if (ratingValue === "4") {

            matchesRating =
                rating >= 4;

        }

        else if (ratingValue === "4.5") {

            matchesRating =
                rating >= 4.5;

        }

        else if (ratingValue === "3") {

            matchesRating =
                rating >= 3;

        }


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        const matchesPrice =
            priceValue === "all" ||
            price === priceValue;


        // ---------------------------------------------
        // FINAL RESULT
        // ---------------------------------------------

        if (
            matchesSearch &&
            matchesCuisine &&
            matchesRating &&
            matchesPrice
        ) {

            card.style.display = "";

            visibleCount++;

        }

        else {

            card.style.display =
                "none";

        }

    });


    // =================================================
    // UPDATE COUNT
    // =================================================

    if (restaurantCount) {

        restaurantCount.textContent =
            `${visibleCount} Restaurant${
                visibleCount !== 1
                    ? "s"
                    : ""
            }`;

    }


    // =================================================
    // NO RESULTS
    // =================================================

    if (noRestaurantResults) {

        if (visibleCount === 0) {

            noRestaurantResults.style.display =
                "block";

        }

        else {

            noRestaurantResults.style.display =
                "none";

        }

    }

}


// =====================================================
// SEARCH
// =====================================================

if (restaurantSearch) {

    restaurantSearch.addEventListener(
        "input",
        filterRestaurants
    );

}


// =====================================================
// CUISINE FILTER
// =====================================================

if (cuisineFilter) {

    cuisineFilter.addEventListener(
        "change",
        filterRestaurants
    );

}


// =====================================================
// RATING FILTER
// =====================================================

if (ratingFilter) {

    ratingFilter.addEventListener(
        "change",
        filterRestaurants
    );

}


// =====================================================
// PRICE FILTER
// =====================================================

if (priceFilter) {

    priceFilter.addEventListener(
        "change",
        filterRestaurants
    );

}


// =====================================================
// CLEAR FILTERS
// =====================================================

const clearFilters =
    document.getElementById(
        "clearFilters"
    );


if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        () => {


            if (restaurantSearch) {

                restaurantSearch.value = "";

            }


            if (cuisineFilter) {

                cuisineFilter.value = "all";

            }


            if (ratingFilter) {

                ratingFilter.value = "all";

            }


            if (priceFilter) {

                priceFilter.value = "all";

            }


            filterRestaurants();

        }
    );

}


// =====================================================
// RESTAURANT CARD BUTTONS
// =====================================================

const viewMenuButtons =
    document.querySelectorAll(
        ".view-menu-btn"
    );


viewMenuButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            const restaurant =
                button.dataset.restaurant;


            if (restaurant) {

                localStorage.setItem(
                    "selectedRestaurant",
                    restaurant
                );

            }


            // Go to menu

            window.location.href =
                "menu.html";

        }
    );

});


// =====================================================
// RESTAURANT FAVORITES
// =====================================================

let favoriteRestaurants =
    JSON.parse(
        localStorage.getItem(
            "freshBiteFavoriteRestaurants"
        )
    ) || [];


// =====================================================
// SAVE FAVORITES
// =====================================================

function saveFavoriteRestaurants() {

    localStorage.setItem(
        "freshBiteFavoriteRestaurants",
        JSON.stringify(
            favoriteRestaurants
        )
    );

}


// =====================================================
// FAVORITE BUTTONS
// =====================================================

const restaurantFavoriteButtons =
    document.querySelectorAll(
        ".restaurant-favorite-btn"
    );


restaurantFavoriteButtons.forEach(button => {


    const id =
        String(
            button.dataset.id || ""
        );


    // Restore previous state

    if (
        id &&
        favoriteRestaurants.includes(id)
    ) {

        setRestaurantFavorite(
            button,
            true
        );

    }


    button.addEventListener(
        "click",
        () => {


            const restaurantId =
                String(
                    button.dataset.id || ""
                );


            if (!restaurantId) {

                return;

            }


            const index =
                favoriteRestaurants.indexOf(
                    restaurantId
                );


            if (index === -1) {

                favoriteRestaurants.push(
                    restaurantId
                );

                setRestaurantFavorite(
                    button,
                    true
                );

            }

            else {

                favoriteRestaurants.splice(
                    index,
                    1
                );

                setRestaurantFavorite(
                    button,
                    false
                );

            }


            saveFavoriteRestaurants();

        }
    );

});


// =====================================================
// FAVORITE UI
// =====================================================

function setRestaurantFavorite(
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

    }

    else {

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
// RESTAURANT CATEGORY BUTTONS
// =====================================================

const restaurantCategoryButtons =
    document.querySelectorAll(
        ".restaurant-category-btn"
    );


restaurantCategoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            restaurantCategoryButtons
                .forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


            button.classList.add(
                "active"
            );


            const category =
                (
                    button.dataset.category ||
                    "all"
                ).toLowerCase();


            if (cuisineFilter) {

                cuisineFilter.value =
                    category;

            }


            filterRestaurants();

        }
    );

});


// =====================================================
// INITIALIZE
// =====================================================

updateRestaurantCartCount();

filterRestaurants();