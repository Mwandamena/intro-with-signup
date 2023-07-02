const fn = document.getElementById("firstname");
const ln = document.getElementById("lastname");
const email = document.getElementById("email");
const pwd = document.getElementById("password");

const form = document.getElementById("signup");

// functions to check validity
const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

// function to show the error messages
const showError = (input, message) => {
  const formFeild = input.parentElement;

  formFeild.classList.remove("success");
  formFeild.classList.add("error");
  formFeild.classList.add("icon");

  const icon = formFeild.querySelector("img");
  const error = formFeild.querySelector("#message");

  error.innerText = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");
  formField.classList.remove("icon");

  const error = formField.querySelector("small");
  error.textContent = "";
};

// validation functions
const checkFirstname = () => {
  let valid = false;
  const min = 2;
  const max = 50;

  const username = fn.value.trim();
  if (!isRequired(username)) {
    showError(fn, "Firstname cannot be blank");
  } else if (!isBetween(username.value, min, max)) {
    showError(
      fn,
      `Firstname must be between ${min} and ${max} characters long.`
    );
  } else {
    showSuccess(fn);
    valid = true;
  }

  return valid;
};

const checkLastName = () => {
  let valid = false;
  const min = 2;
  const max = 50;

  const lastname = ln.value.trim();
  if (!isRequired(lastname)) {
    showError(ln, "Firstname cannot be blank");
  } else if (!isBetween(ln.value, min, max)) {
    showError(
      ln,
      `Lastname must be between ${min} and ${max} characters long.`
    );
  } else {
    showSuccess(ln);
    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;

  const userEmail = email.value.trim();
  if (!isRequired(userEmail)) {
    showError(email, "Email cannot be blank.");
  } else if (!isEmail(userEmail)) {
    showError(email, "Looks like this is not an email");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = pwd.value.trim();

  if (!isRequired(password)) {
    showError(pwd, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      pwd,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(pwd);
    valid = true;
  }

  return valid;
};

// debounce
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFirstname = checkFirstname(),
    isLastName = checkLastName(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid =
    isFirstname && isEmailValid && isPasswordValid && isLastName;

  if (isFormValid) {
  }
});

// feedback feature
form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "firstname":
        checkFirstname();
        break;
      case "lastname":
        checkLastName();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
