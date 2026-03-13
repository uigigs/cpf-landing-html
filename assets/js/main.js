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

            if (!valid) return;

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