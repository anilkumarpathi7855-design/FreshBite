// ================================
// FreshBite About Page JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId !== "#") {

                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }

        });

    });


    // Animate feature cards when they enter viewport
    const cards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.2
        }
    );


    cards.forEach(function (card) {
        observer.observe(card);
    });

});