(function ($) {
    "use strict";
    document.addEventListener("DOMContentLoaded", function () {

        (function () {
            emailjs.init("GoDIcfCVHRgOCB8Nz");
        })();

        const form = document.querySelector("#contact-form");
        if (!form) return;

        const requiredFields = form.querySelectorAll("input[required], textarea[required]");

        function validateField(input) {

            const field = input.closest(".input-fild");
            if (!field) return true;

            const requiredMsg = field.querySelector(".required");

            if (input.value.trim() === "") {

                field.classList.add("required-fild");
                if (requiredMsg) requiredMsg.style.display = "block";

                return false;

            } else {

                field.classList.remove("required-fild");
                if (requiredMsg) requiredMsg.style.display = "none";

                return true;

            }
        }

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            let valid = true;

            requiredFields.forEach(function (input) {
                if (!validateField(input)) {
                    valid = false;
                }
            });

            // যদি validation fail হয়
            if (!valid) return;

            // validation pass হলে email send
            emailjs.sendForm("service_91zqw1p", "template_3oxik3j", form)
                .then(function () {

                    alert("Email Sent!");
                    form.reset();

                    // reset validation UI
                    document.querySelectorAll(".required").forEach(el => el.style.display = "none");
                    document.querySelectorAll(".required-fild").forEach(el => el.classList.remove("required-fild"));

                })
                .catch(function (error) {
                    alert("Error: " + JSON.stringify(error));
                });

        });

        // live validation
        requiredFields.forEach(function (input) {

            input.addEventListener("input", function () {
                validateField(input);
            });

            input.addEventListener("blur", function () {
                validateField(input);
            });

        });

    });

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

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target
                });
            }
        });
    });


    new WOW().init();

})(jQuery);