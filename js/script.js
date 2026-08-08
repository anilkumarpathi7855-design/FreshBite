// ========================================
// FRESH BITE - MAIN SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // CART
    // ========================================

    let cart =
        JSON.parse(
            localStorage.getItem("freshBiteCart")
        ) || [];


    // ========================================
    // ELEMENTS
    // ========================================

    const cartCount =
        document.getElementById("cartCount");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileNavigation =
        document.getElementById("mobileNavigation");

    const headerSearchBtn =
        document.getElementById("headerSearchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");

    const homeSearch =
        document.getElementById("homeSearch");

    const searchFoodBtn =
        document.getElementById("searchFoodBtn");

    const addCartButtons =
        document.querySelectorAll(".add-cart-btn");

    const wishlistButtons =
        document.querySelectorAll(".wishlist-btn");


    // ========================================
    // UPDATE CART COUNT
    // ========================================

    function updateCartCount() {

        let totalItems = 0;

        cart.forEach(function (item) {

            totalItems +=
                Number(item.quantity) || 0;

        });


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }

    }


    // ========================================
    // SAVE CART
    // ========================================

    function saveCart() {

        localStorage.setItem(
            "freshBiteCart",
            JSON.stringify(cart)
        );

    }


    // ========================================
    // ADD TO CART
    // ========================================

    addCartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    // ----------------------------
                    // GET PRODUCT DATA
                    // ----------------------------

                    const id =
                        String(
                            button.dataset.id
                        );

                    const name =
                        button.dataset.name;

                    const price =
                        Number(
                            button.dataset.price
                        );


                    // ----------------------------
                    // VALIDATE
                    // ----------------------------

                    if (
                        !id ||
                        !name ||
                        Number.isNaN(price)
                    ) {

                        console.error(
                            "Invalid food data:",
                            {
                                id: id,
                                name: name,
                                price: price
                            }
                        );

                        alert(
                            "Unable to add this item to cart."
                        );

                        return;

                    }


                    // ----------------------------
                    // CHECK EXISTING ITEM
                    // ----------------------------

                    const existingItem =
                        cart.find(
                            function (item) {

                                return String(
                                    item.id
                                ) === id;

                            }
                        );


                    // ----------------------------
                    // INCREASE QUANTITY
                    // ----------------------------

                    if (existingItem) {

                        existingItem.quantity =
                            Number(
                                existingItem.quantity
                            ) + 1;

                    }

                    // ----------------------------
                    // NEW ITEM
                    // ----------------------------

                    else {

                        cart.push({

                            id: id,

                            name: name,

                            price: price,

                            quantity: 1

                        });

                    }


                    // ----------------------------
                    // SAVE
                    // ----------------------------

                    saveCart();


                    // ----------------------------
                    // UPDATE COUNT
                    // ----------------------------

                    updateCartCount();


                    // ----------------------------
                    // BUTTON FEEDBACK
                    // ----------------------------

                    const originalHTML =
                        button.innerHTML;


                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Added';


                    button.classList.add(
                        "added"
                    );


                    setTimeout(
                        function () {

                            button.innerHTML =
                                originalHTML;

                            button.classList.remove(
                                "added"
                            );

                        },
                        1200
                    );

                }
            );

        }
    );


    // ========================================
    // WISHLIST
    // ========================================

    wishlistButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const icon =
                        button.querySelector("i");


                    if (!icon) {

                        return;

                    }


                    // Toggle heart

                    icon.classList.toggle(
                        "fa-regular"
                    );

                    icon.classList.toggle(
                        "fa-solid"
                    );


                    // Change color

                    if (
                        icon.classList.contains(
                            "fa-solid"
                        )
                    ) {

                        button.style.color =
                            "#FF6B35";

                    }

                    else {

                        button.style.color =
                            "";

                    }

                }
            );

        }
    );


    // ========================================
    // MOBILE MENU
    // ========================================

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            function () {

                mobileNavigation.classList.toggle(
                    "show"
                );


                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (!icon) {

                    return;

                }


                if (
                    mobileNavigation.classList.contains(
                        "show"
                    )
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                }

                else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }


    // ========================================
    // CLOSE MOBILE MENU
    // ========================================

    if (mobileNavigation) {

        const mobileLinks =
            mobileNavigation.querySelectorAll(
                "a"
            );


        mobileLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileNavigation.classList.remove(
                            "show"
                        );


                        if (mobileMenuBtn) {

                            const icon =
                                mobileMenuBtn.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-xmark"
                                );

                                icon.classList.add(
                                    "fa-bars"
                                );

                            }

                        }

                    }
                );

            }
        );

    }


    // ========================================
    // SEARCH OVERLAY OPEN
    // ========================================

    if (headerSearchBtn) {

        headerSearchBtn.addEventListener(
            "click",
            function () {

                if (searchOverlay) {

                    searchOverlay.classList.add(
                        "show"
                    );


                    if (homeSearch) {

                        setTimeout(
                            function () {

                                homeSearch.focus();

                            },
                            200
                        );

                    }

                }

            }
        );

    }


    // ========================================
    // SEARCH OVERLAY CLOSE
    // ========================================

    if (closeSearch) {

        closeSearch.addEventListener(
            "click",
            function () {

                if (searchOverlay) {

                    searchOverlay.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================
    // CLOSE SEARCH BY CLICKING OUTSIDE
    // ========================================

    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    searchOverlay.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // ========================================
    // SEARCH FOOD
    // ========================================

    function searchFood() {

        if (!homeSearch) {

            return;

        }


        const searchValue =
            homeSearch.value
                .trim();


        if (!searchValue) {

            return;

        }


        // Go to menu page

        window.location.href =
            "menu.html?search=" +
            encodeURIComponent(
                searchValue
            );

    }


    // ========================================
    // SEARCH BUTTON
    // ========================================

    if (searchFoodBtn) {

        searchFoodBtn.addEventListener(
            "click",
            searchFood
        );

    }


    // ========================================
    // SEARCH ENTER KEY
    // ========================================

    if (homeSearch) {

        homeSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchFood();

                }

            }
        );

    }


    // ========================================
    // ESCAPE KEY
    // ========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                // Close search

                if (searchOverlay) {

                    searchOverlay.classList.remove(
                        "show"
                    );

                }


                // Close mobile menu

                if (mobileNavigation) {

                    mobileNavigation.classList.remove(
                        "show"
                    );

                }


                // Reset mobile icon

                if (mobileMenuBtn) {

                    const icon =
                        mobileMenuBtn.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    // ========================================
    // SMOOTH SCROLL
    // ========================================

    const smoothLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    smoothLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    // ========================================
    // ACTIVE NAVIGATION
    // ========================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        function (link) {

            const linkPage =
                link.getAttribute(
                    "href"
                );


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    // ========================================
    // CATEGORY CARDS
    // ========================================

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    // ========================================
    // SCROLL HEADER
    // ========================================

    const header =
        document.querySelector(
            ".header"
        );


    function handleHeaderScroll() {

        if (!header) {

            return;

        }


        if (
            window.scrollY > 50
        ) {

            header.classList.add(
                "scrolled"
            );

        }

        else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );


    // Run once

    handleHeaderScroll();


    // ========================================
    // IMAGE ERROR HANDLING
    // ========================================

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

                }
            );

        }
    );


    // ========================================
    // INITIALIZE
    // ========================================

    updateCartCount();

});