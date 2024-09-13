// document.addEventListener("DOMContentLoaded", function () {
//   var form = document.getElementById("listingForm");

//   if (!form) {
//     console.error("Form not found");
//     return;
//   }

//   form.addEventListener("submit", function (event) {
//     var isValid = true;

//     // Check all required fields
//     var requiredFields = form.querySelectorAll("[required]");
//     requiredFields.forEach(function (field) {
//       if (!field.value.trim()) {
//         field.classList.add("is-invalid");
//         field.classList.remove("is-valid");
//         isValid = false;
//       } else {
//         field.classList.remove("is-invalid");
//         field.classList.add("is-valid");
//       }
//     });

//     // If form is not valid, prevent submission
//     if (!isValid) {
//       event.preventDefault();
//       event.stopPropagation();
//     }
//   });

//   // Add Bootstrap validation feedback
//   var formElements = form.querySelectorAll(".form-control");
//   formElements.forEach(function (element) {
//     element.addEventListener("input", function () {
//       if (this.value.trim()) {
//         this.classList.remove("is-invalid");
//         this.classList.add("is-valid");
//       } else {
//         this.classList.remove("is-valid");
//         this.classList.add("is-invalid");
//       }
//     });
//   });
// });

() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};
