// ================================
// FreshBite Contact Page JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("#contactForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();


        // Validation

        if (name === "") {
            alert("Please enter your name.");
            return;
        }


        if (email === "") {
            alert("Please enter your email address.");
            return;
        }


        if (!email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }


        if (subject === "") {
            alert("Please enter the subject.");
            return;
        }


        if (message === "") {
            alert("Please enter your message.");
            return;
        }


        // Success message

        alert(
            "Thank you, " +
            name +
            "! Your message has been sent successfully."
        );


        // Clear form

        form.reset();

    });

});