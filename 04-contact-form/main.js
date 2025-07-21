/**
 * @typedef {HTMLInputElement | HTMLTextAreaElement | NodeListOf} Field
 */

/**
 * @typedef {Object} Validator
 * @property {(field: Field) => boolean} validator
 * @property {string} message
 */

/**
 * @typedef {Object} FieldValidator
 * @property {Field} field
 * @property {Validator[]} validators
 */

/** @type {HTMLFormElement} */
const $form = document.getElementById("contact-form");

/** @type {FieldValidator[]} */
const validations = [
  {
    field: document.getElementById("first-name"),
    validators: [
      {
        validator: (field) => isEmptyString(field.value),
        message: "This field is required",
      },
    ],
  },
  {
    field: document.getElementById("last-name"),
    validators: [
      {
        validator: (field) => isEmptyString(field.value),
        message: "This field is required",
      },
    ],
  },
  {
    field: document.getElementById("email"),
    validators: [
      {
        validator: (field) => isEmptyString(field.value),
        message: "This field is required",
      },
      {
        validator: (field) => !isValidEmail(field.value),
        message: "Please enter a valid email address",
      },
    ],
  },
  {
    field: document.getElementsByName("query-type"),
    validators: [
      {
        validator: (fields) => [...fields].every((radio) => !radio.checked),
        message: "Please select a query type",
      },
    ],
  },
  {
    field: document.getElementById("message"),
    validators: [
      {
        validator: (field) => isEmptyString(field.value),
        message: "This field is required",
      },
    ],
  },
  {
    field: document.getElementById("contact-consent"),
    validators: [
      {
        validator: (field) => !field.checked,
        message: "To submit this form, please consent to being contacted",
      },
    ],
  },
];

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearAllErrors($form);
  if (!isFormValid(validations)) return;

  const $successToast = document.getElementById("success-toast");
  $successToast.classList.remove("hidden");

  $form.reset()
  setInterval(() => $successToast.classList.add("hidden"), 2000);
});

//#region form handler =========================================================

/**
 * @param {FieldValidator[]} validations
 * @returns {boolean}
 */
function isFormValid(validations) {
  let formIsValid = true;
  validations.forEach((fieldValidation) => {
    if (!isFieldValid(fieldValidation)) formIsValid = false;
  });
  return formIsValid;
}

/**
 * @param {FieldValidator} fieldValidator
 * @returns {boolean}
 */
function isFieldValid({ field, validators }) {
  for (const { validator, message } of validators) {
    if (validator(field)) {
      showError(field, message);
      return false;
    }
  }
  return true;
}

/**
 * @param {Field} field
 * @param {string} errorMessage
 */
function showError(field, errorMessage) {
  const element = field instanceof NodeList ? field[0] : field;
  const group = element.closest(".validation-required");
  const error = group.querySelector(".form__error");
  group.classList.add("has-errors");
  error.textContent = errorMessage;
}

/**
 * @param {HTMLFormElement} form
 * @returns {void}
 */
function clearAllErrors(form) {
  const groups = form.querySelectorAll(".has-errors");
  for (const group of groups) {
    group.classList.remove("has-errors");
    const errorMessage = group.querySelector(".form__error");
    errorMessage.textContent = "";
  }
}

//#endregion

//#region validators ===========================================================

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

//#endregion
