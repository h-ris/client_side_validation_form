/* Name: Huixin Xu
Due Date: Mar 26th, 2023
Section: CST8285 313
Lab: 23W lab5
File: index.js
Lab objective: Using client-side form validation using DOM manipulation. 
*/

/* 
you will confirm this input in the get header ???
/g ???
why term check cannot use arrow function??
*/

//define global variables
let emailInput = document.querySelector("#email");
let emailErrorMsg = "Please enter a valid email";

let usernameInput = document.querySelector("#username");
let usernameErrorMsg = "User name should be non-empty, and within 20 characters long";

let passwordInput = document.querySelector("#pass");
let passwordErrorMsg = "Password should be at least 6 characters: 1 uppercase, 1 lowercase";

let password2Input = document.querySelector("#pass2");
let password2ErrorMsg = "Please retype password matching the one above";

let termCheck = document.querySelector("#terms");
let termErrorMsg = "Please check the terms and conditions";

let subscribeCheck = document.querySelector("#subscribe");
let subscribeMsg = "Note: opt-in to receive newsletter may result in possible spam";

let validMsg = "Data is valid!";



// create paragraph to display the error Msg returented by all the aildate...() function 
// and assign this paragraph to the class warning to style the error Msg
let emailError = document.createElement("p");
emailError.setAttribute("class", "warning");

let usernameError = document.createElement("p");
usernameError.setAttribute("class", "warning");

let passwordError = document.createElement("p");
passwordError.setAttribute("class", "warning");

let password2Error = document.createElement("p");
password2Error.setAttribute("class", "warning");

let subscribeAlert = document.createElement("p");
subscribeAlert.setAttribute("class", "warning");

let termError = document.createElement("p");
termError.setAttribute("class", "warning");

let formValid = document.createElement("p");
formValid.setAttribute("class", "valid");



//append the created element to the "form-group" div
document.querySelectorAll(".form-group")[0].append(emailError);
document.querySelectorAll(".form-group")[1].append(usernameError);
document.querySelectorAll(".form-group")[2].append(passwordError);
document.querySelectorAll(".form-group")[3].append(password2Error);

//append the created element to the "form-check" div
document.querySelectorAll(".form-check")[0].append(termError);
document.querySelectorAll(".form-check")[1].append(subscribeAlert);


//check the validate email structure to be xyz@xyz.xyz
function validateEmail(){
    let email = emailInput.value; // access the email input value
    let validEmailEx = /\S+@\S+\.\S+/; //regex for email address

    if(validEmailEx.test(email)) //test is predefiend method to check if the entered email matches the regexp
        error = null;
    else
        error = emailErrorMsg;

    return error;
}

//check the login name that should be non-empty and less than 20 characters long. 
//Convert the login name to all lower-case alphabetic characters.
function validateUserName(){
    let username = usernameInput.value;
    let validUserNameEx = /^\S{1,20}$/g;

    if(validUserNameEx.test(username)){
        error = null;
        username = usernameInput.value.toLowerCase();}
    else
        error = usernameErrorMsg;

    return error;
}

//check the password that should be at least 6 characters long
//should have at least 1 uppercase letter and 1 lowercase letter
function validatePassword(){
    let password = passwordInput.value;
    let validPasswordEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/g;

    if(validPasswordEx.test(password))
        error = null;
    else
        error = passwordErrorMsg;

    return error;
}

//validate password2, ensure that both the password fields have the same value and are not blank
function vaildatePassword2(){
    let password2 = password2Input.value;
    let password = passwordInput.value;

    if(password2 == password && password2.trim().length >= 1)
        error = null;
    else
        error = password2ErrorMsg;
    
    return error;
}

//if user selects to receive a newsletter, alert them about possible spam by setting an event on this field
subscribeCheck.addEventListener("change", function(){ // anonymous function
    if(this.checked)
        subscribeAlert.textContent = subscribeMsg;
})

//ensure the terms and conditions are accepted
function validatTerms(){
    if(termCheck.checked)
        return null;
    else
        return termErrorMsg;
}

//event handler for submit event, form submission is successful only if the equirements are all met
function validate(event){
    event.preventDefault(); // prevent the submit event from refreshing the page

    let emailValid = validateEmail();
    let usernameValid = validateUserName();
    let passwordValid = validatePassword();
    let password2Valid = vaildatePassword2();
    let termsValid = validatTerms();

    if(emailValid !== null){
        emailError.textContent = emailValid;
    }

    if(usernameValid !== null){
        usernameError.textContent = usernameValid;
    }

    if(passwordValid !== null){
        passwordError.textContent = passwordValid;
    }

    if(password2Valid !== null){
        password2Error.textContent = password2Valid;
    }

    if(termsValid !== null){
        termError.textContent = termsValid;
    }

    //On a successful submission the form call itself clearing its contents and providing the submitted data in the URL.
    if(emailValid == null && usernameValid == null && passwordValid == null && password2Valid == null && termsValid == null){
        alert(validMsg);
        document.querySelector('form').submit();
        document.querySelector('form').reset();
    }
};


//reset event clears all error messages as well as default input
function resetFormError(){
    emailError.textContent = null;
    usernameError.textContent = null;
    passwordError.textContent = null;
    password2Error.textContent = null;
    termError.textContent = null;
    subscribeAlert.textContent = null;
}

document.form.addEventListener("reset",resetFormError);


//add event listner to the textbox or checkbox, if you entered correct input,the error paragraph with be empty
emailInput.addEventListener("blur", ()=>{
    let x = validateEmail();
    if(x == null)
        emailError.textContent = null;
});

usernameInput.addEventListener("blur", ()=>{
    let x = validateUserName();
    if(x == null)
        usernameError.textContent = null;
});

passwordInput.addEventListener("blur", ()=>{
    let x = validatePassword();
    if(x == null)
        passwordError.textContent = null;
});

password2Input.addEventListener("blur", ()=>{
    let x = vaildatePassword2();
    if(x == null)
        password2Error.textContent = null;
});

termCheck.addEventListener("change", function(){
    if(this.checked)
        termError.textContent= null;
    });


//if uncheck the subscribe box, the subscribe alert would be empty
subscribeCheck.addEventListener("change", function(){
    if(!this.checked)
    subscribeAlert.textContent= null;
    });

document.form.addEventListener("submit", validate);