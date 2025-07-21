/** @type {HTMLFormElement} */
const $form = document.getElementById("contact-form");

/** @type {HTMLInputElement} */
const $firstName = document.getElementById("first-name");

/** @type {HTMLInputElement} */
const $lastName = document.getElementById("last-name");

/** @type {HTMLInputElement} */
const $email = document.getElementById("email");

/** @type {NodeListOf<HTMLInputElement>} */
const $queryTypes = document.getElementsByName("query-type");

/** @type {HTMLTextAreaElement} */
const $message = document.getElementById("message");

/** @type {HTMLInputElement} */
const $contactConsent = document.getElementById("contact-consent");

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearAllErrors($form);

  if (isEmptyString($firstName.value)) {
    showError($firstName, "This field is required");
  }

  if (isEmptyString($lastName.value)) {
    showError($lastName, "This field is required");
  }

  if (isEmptyString($email.value)) {
    showError($email, "This field is required");
  } else if (!isValidEmail($email.value)) {
    showError($email, "Please enter a valid email address");
  }

  if ([...$queryTypes].every((type) => !type.checked)) {
    showError($queryTypes[0], "Please select a query type");
  }

  if (isEmptyString($message.value)) {
    showError($message, "This field is required");
  }

  if (!$contactConsent.checked) {
    showError(
      $contactConsent,
      "To submit this form, please consent to being contacted"
    );
  }
});

/**
 * @param {string} value
 * @returns {boolean}
 */
function isEmptyString(value) {
  return value.trim().length === 0;
}

/**
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 *
 * @param {HTMLElement} input
 * @param {string} errorMessage
 */
function showError(input, errorMessage) {
  const group = input.closest(".validation-required");
  group.classList.add("has-errors");

  const error = group.querySelector(".form__error");
  console.log(error);
  error.textContent = errorMessage;
}

function clearAllErrors(form) {
  const groups = form.querySelectorAll(".has-errors");

  for (const group of groups) {
    group.classList.remove("has-errors");

    const errorMessage = group.querySelector(".form__error");
    errorMessage.textContent = "";
  }
}
