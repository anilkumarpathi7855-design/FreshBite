// =====================================================
// FRESH BITE - LOGIN / REGISTER JAVASCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const loginTab =
    document.getElementById("loginTab");

const registerTab =
    document.getElementById("registerTab");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const authTitle =
    document.getElementById("authTitle");

const authSubtitle =
    document.getElementById("authSubtitle");

const loginMessage =
    document.getElementById("loginMessage");

const registerMessage =
    document.getElementById("registerMessage");


// =====================================================
// USERS
// =====================================================

let users =
    JSON.parse(
        localStorage.getItem("freshBiteUsers")
    ) || [];


// =====================================================
// SAVE USERS
// =====================================================

function saveUsers() {

    localStorage.setItem(
        "freshBiteUsers",
        JSON.stringify(users)
    );

}


// =====================================================
// SHOW LOGIN
// =====================================================

function showLogin() {

    loginTab.classList.add("active");

    registerTab.classList.remove("active");

    loginForm.classList.remove("hidden");

    registerForm.classList.add("hidden");

    authTitle.textContent =
        "Welcome Back!";

    authSubtitle.textContent =
        "Login to continue ordering delicious food.";

    clearMessages();

}


// =====================================================
// SHOW REGISTER
// =====================================================

function showRegister() {

    registerTab.classList.add("active");

    loginTab.classList.remove("active");

    registerForm.classList.remove("hidden");

    loginForm.classList.add("hidden");

    authTitle.textContent =
        "Create Account";

    authSubtitle.textContent =
        "Join Fresh Bite and start ordering today.";

    clearMessages();

}


// =====================================================
// TAB EVENTS
// =====================================================

loginTab.addEventListener(
    "click",
    showLogin
);


registerTab.addEventListener(
    "click",
    showRegister
);


// =====================================================
// CLEAR MESSAGES
// =====================================================

function clearMessages() {

    loginMessage.textContent = "";

    registerMessage.textContent = "";

    loginMessage.className =
        "form-message";

    registerMessage.className =
        "form-message";

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMessage(
    element,
    message,
    type
) {

    element.textContent =
        message;

    element.className =
        `form-message ${type}`;

}


// =====================================================
// REGISTER
// =====================================================

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ---------------------------------------------
        // GET VALUES
        // ---------------------------------------------

        const name =
            document
                .getElementById("registerName")
                .value
                .trim();


        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();


        const phone =
            document
                .getElementById("registerPhone")
                .value
                .trim();


        const password =
            document
                .getElementById("registerPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

        if (name.length < 2) {

            showMessage(
                registerMessage,
                "Please enter your full name.",
                "error"
            );

            return;

        }


        if (!/^\S+@\S+\.\S+$/.test(email)) {

            showMessage(
                registerMessage,
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        if (!/^[0-9]{10}$/.test(phone)) {

            showMessage(
                registerMessage,
                "Please enter a valid 10-digit phone number.",
                "error"
            );

            return;

        }


        if (password.length < 6) {

            showMessage(
                registerMessage,
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }


        if (password !== confirmPassword) {

            showMessage(
                registerMessage,
                "Passwords do not match.",
                "error"
            );

            return;

        }


        // ---------------------------------------------
        // CHECK EXISTING USER
        // ---------------------------------------------

        const existingUser =
            users.find(
                user =>
                    user.email === email
            );


        if (existingUser) {

            showMessage(
                registerMessage,
                "An account with this email already exists.",
                "error"
            );

            return;

        }


        // ---------------------------------------------
        // CREATE USER
        // ---------------------------------------------

        const newUser = {

            id:
                "USER-" +
                Date.now(),

            name:
                name,

            email:
                email,

            phone:
                phone,

            password:
                password,

            createdAt:
                new Date().toISOString()

        };


        users.push(newUser);


        saveUsers();


        // ---------------------------------------------
        // SUCCESS
        // ---------------------------------------------

        showMessage(
            registerMessage,
            "Account created successfully! Please login.",
            "success"
        );


        registerForm.reset();


        // Switch to login after short delay

        setTimeout(
            () => {

                showLogin();

                document
                    .getElementById("loginEmail")
                    .value = email;

            },
            1500
        );

    }
);


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        // ---------------------------------------------
        // FIND USER
        // ---------------------------------------------

        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        // ---------------------------------------------
        // INVALID LOGIN
        // ---------------------------------------------

        if (!user) {

            showMessage(
                loginMessage,
                "Invalid email or password.",
                "error"
            );

            return;

        }


        // ---------------------------------------------
        // SAVE CURRENT USER
        // ---------------------------------------------

        const currentUser = {

            id:
                user.id,

            name:
                user.name,

            email:
                user.email,

            phone:
                user.phone

        };


        localStorage.setItem(
            "freshBiteCurrentUser",
            JSON.stringify(currentUser)
        );


        // ---------------------------------------------
        // REMEMBER ME
        // ---------------------------------------------

        const rememberMe =
            document.getElementById(
                "rememberMe"
            );


        if (rememberMe.checked) {

            localStorage.setItem(
                "freshBiteRememberMe",
                "true"
            );

        }

        else {

            localStorage.removeItem(
                "freshBiteRememberMe"
            );

        }


        // ---------------------------------------------
        // SUCCESS
        // ---------------------------------------------

        showMessage(
            loginMessage,
            `Welcome back, ${user.name}!`,
            "success"
        );


        // Go home

        setTimeout(
            () => {

                window.location.href =
                    "index.html";

            },
            1000
        );

    }
);


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

const passwordToggleButtons =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordToggleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const targetId =
                button.dataset.target;


            const input =
                document.getElementById(
                    targetId
                );


            const icon =
                button.querySelector("i");


            if (input.type === "password") {

                input.type =
                    "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

            }

            else {

                input.type =
                    "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

            }

        }
    );

});


// =====================================================
// PHONE NUMBER ONLY
// =====================================================

const phoneInput =
    document.getElementById(
        "registerPhone"
    );


phoneInput.addEventListener(
    "input",
    () => {

        phoneInput.value =
            phoneInput.value
                .replace(
                    /[^0-9]/g,
                    ""
                )
                .slice(0, 10);

    }
);


// =====================================================
// FORGOT PASSWORD - DEMO
// =====================================================

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


forgotPassword.addEventListener(
    "click",
    () => {

        const email =
            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim();


        if (!email) {

            showMessage(
                loginMessage,
                "Enter your email first.",
                "error"
            );

            return;

        }


        const user =
            users.find(
                item =>
                    item.email ===
                    email.toLowerCase()
            );


        if (!user) {

            showMessage(
                loginMessage,
                "No account found with this email.",
                "error"
            );

            return;

        }


        showMessage(
            loginMessage,
            "Password reset is simulated in this frontend demo.",
            "success"
        );

    }
);


// =====================================================
// CHECK LOGGED-IN USER
// =====================================================

function checkCurrentUser() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "freshBiteCurrentUser"
            )
        );


    if (currentUser) {

        console.log(
            "Logged in user:",
            currentUser
        );

    }

}


// =====================================================
// INITIALIZE
// =====================================================

checkCurrentUser();