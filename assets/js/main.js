(function ($) {
    "use strict";

    // contact form
    document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init("GoDIcfCVHRgOCB8Nz");

    const form = document.querySelector("#contact-form");
    if (!form) return;

    const requiredFields = form.querySelectorAll("input[required], textarea[required]");

    // Email regex
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Validate a single field
    function validateField(input) {

        const field = input.closest(".input-fild");
        if (!field) return true;

        // Trim value
        let value = input.value.trim();

        // Force lowercase if email
        if (input.type === "email") {
            value = value.toLowerCase();
            input.value = value;
        }

        // Reset classes
        field.classList.remove("required-fild", "invalid-fild");

        // Empty check
        if (value === "") {
            field.classList.add("required-fild");
            return false;
        }

        // Email format check
        if (input.type === "email" && !emailPattern.test(value)) {
            field.classList.add("invalid-fild");
            return false;
        }

        return true;
    }

    // Form submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        requiredFields.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (!isValid) return;

        // Send email via EmailJS
        emailjs.sendForm("service_91zqw1p", "template_3oxik3j", form)
            .then(() => {
                alert("Email Sent!");
                form.reset();

                // Reset all error classes
                document.querySelectorAll(".input-fild")
                    .forEach(el => el.classList.remove("required-fild", "invalid-fild"));

            })
            .catch(error => {
                alert("Error: " + JSON.stringify(error));
            });

    });

    // Live validation on input and blur
    requiredFields.forEach(input => {

        input.addEventListener("input", function () {
            validateField(input);
        });

        input.addEventListener("blur", function () {
            validateField(input);
        });

    });

});




    // ===== Sticky Header =====
    const header = document.querySelector(".header-section");

    if (header) {

        let lastScroll = 0;

        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {

                let currentScroll = self.scroll();

                if (currentScroll > lastScroll) {
                    // scrolling down
                    header.classList.remove("sticky");
                    document.body.classList.remove("nav-expanded");
                } else {
                    // scrolling up
                    header.classList.add("sticky");
                }

                if (currentScroll === 0) {
                    header.classList.remove("sticky");
                }

                lastScroll = currentScroll;
            }
        });

    }
    // close drawer
    document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            const offcanvasElement = document.getElementById("mobileMenu");
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

            if (offcanvas) {
                offcanvas.hide();
            }

            // wait for drawer close animation
            setTimeout(function () {

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }, 350);

        });

    });


    new WOW().init();

})(jQuery);