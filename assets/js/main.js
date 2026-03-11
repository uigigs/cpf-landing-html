(function ($) {
    "use strict";
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("#contact-form");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            let valid = true;

            // Select all inputs and textareas with "required"
            const requiredFields = form.querySelectorAll("input[required], textarea[required]");

            requiredFields.forEach(function (input) {
                // Get the closest .input-fild parent
                let field = input.closest(".input-fild");

                if (!field) {
                    // fallback: look at parent twice if nested in col-md-6
                    field = input.parentElement.closest(".input-fild");
                }

                if (!field) return;

                // Find the .required span inside this field
                const requiredMsg = field.querySelector(".required");

                if (input.value.trim() === "") {
                    // Add class only if empty
                    field.classList.add("required-fild");

                    // Show the required message
                    if (requiredMsg) requiredMsg.style.display = "block";

                    valid = false;
                } else {
                    // Remove class if filled
                    field.classList.remove("required-fild");
                    if (requiredMsg) requiredMsg.style.display = "none";
                }
            });

            // Prevent submit if invalid
            if (!valid) e.preventDefault();
        });
    });

})(jQuery);