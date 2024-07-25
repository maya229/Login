var userName = document.querySelector('#name');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var signin = document.querySelector('#signin');
var signup = document.querySelector('#signup');
var h1 = document.querySelector('#home');
var submit = document.querySelector('#submit');
var logout = document.querySelector('#logout');
var signupPage = document.querySelector('.signup-page');
var loginPage = document.querySelector('.login-page');
var inputt = document.querySelectorAll('input');
var userContainer = JSON.parse(localStorage.getItem('user')) || [];
var userSpecificName;
if (localStorage.getItem('user') == null) {
    userContainer = [];
} else {
    userContainer = JSON.parse(localStorage.getItem('user'));
}
var validationInfo = {
    name: ' Must be 3-15 characters: lowercase letters, numbers, underscores, and hyphens',
    email: ' ex: example@example.com',
    password: ' Must be 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char.',
}
var messages = {
    name: 'invalid userName',
    email: 'invalid email',
    password: 'invalid password',
}
document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    for (var i = 0; i < inputt.length; i++) {
        if (userContainer.length == 0) {
            addUser();
        } else {
            if (signin.innerHTML == 'Signin') {
            console.log(emailValidation());
                if (userName.value && email.value && password.value && emailValidation()) {
                    addUser();
                } else {
                    validateInputs(inputt[i])
                }
            } else {
                if (email.value && password.value) {
                    login();
                } else {
                    messages.email = 'Email Not Found';
                    messages.password = 'Password Not Found';
                    validateInputs(inputt[i]);
                }
            }
        }
    }
    clearForm();
});

function login(usename) {
    for (var i = 0; i < userContainer.length; i++) {
        if (email.value == userContainer[i].email && password.value == userContainer[i].password) {
            document.forms[0].parentElement.nextElementSibling.classList.replace('d-none', 'd-block');
            document.forms[0].parentElement.classList.replace('d-block', 'd-none');
            h1.innerHTML = `Welcome ${userContainer[i].userName}`
        }
    }
}

function emailValidation() {
    for (var i = 0; i < userContainer.length; i++) {
            if (email.value === userContainer[i].email) {
                console.log(email.value);
                console.log(userContainer[i].email);
                email.classList.add('is-invalid');
                email.classList.remove('is-valid');
                email.nextElementSibling.classList.replace('d-none', 'd-block');
                email.nextElementSibling.classList.replace('text-warning', 'text-danger');
                email.nextElementSibling.innerHTML = 'Email is already exist';
                messages.email = 'Email is already exist';
                return false;
        } 
    }
    return true;
}

function addUser() {
    var user = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }
    userContainer.push(user);
    localStorage.setItem('user', JSON.stringify(userContainer));
    login(user.userName)
}
function clearForm() {
    userName.value = null;
    email.value = null;
    password.value = null
}

for (var i = 0; i < inputt.length; i++) {
    inputt[i].addEventListener('blur', function (e) {
        validateInputs(this)
    })
    inputt[i].addEventListener('focus', function (e) {
        this.nextElementSibling.classList.replace('d-none', 'd-block');
        this.nextElementSibling.classList.replace('text-danger', 'text-warning');
        this.nextElementSibling.innerHTML = validationInfo[this.id]
    })
}

var index;
function validateInputs(element) {
    var regex = {
        name: /^[a-z0-9_-]{3,15}$/,
        email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    }
    if (regex[element.id].test(element.value)) {
        for (var i = 0; i < userContainer.length; i++) { }
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none', 'd-block');
        element.nextElementSibling.classList.replace('text-warning', 'text-danger');
        element.nextElementSibling.innerHTML = messages[element.id];
        return false;
    }

}
signin.addEventListener('click', function () {
    if (signin.innerHTML == 'Signin') {
        signin.innerHTML = 'SignUp';
        clearForm();
        userName.parentElement.classList.replace('d-block', 'd-none');
        submit.innerHTML = 'Login'
    } else {
        userName.parentElement.classList.replace('d-none', 'd-block');
        clearForm();
        signin.innerHTML = 'Signin';
        submit.innerHTML = 'Sign up'
    }

})
logout.addEventListener('click', function () {
    document.forms[0].parentElement.nextElementSibling.classList.replace('d-block', 'd-none');
    document.forms[0].parentElement.classList.replace('d-none', 'd-block');
    userName.parentElement.classList.replace('d-none', 'd-block');
    signin.innerHTML = 'Signin';
    location.reload();
})

