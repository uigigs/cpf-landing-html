(function ($) {
    "use strict";

    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother;

    // smooth-scroll
    if (document.body.classList.contains("smooth-scroll")) {
        smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
        });
    }



    // ===== Smooth Scroll for Anchors (Home Page + Other Pages) =====
    document.addEventListener("DOMContentLoaded", () => {
        // 1️⃣ Handle page load with hash (when redirected from another page)
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target && smoother) {
                // Small delay to ensure everything is rendered
                setTimeout(() => {
                    smoother.scrollTo(target, true);
                }, 100);
            }
        }

        // 2️⃣ Handle clicks on menu/anchor links
        document.querySelectorAll('a[href*="#"]:not(.back-to-top)').forEach(anchor => {
            anchor.addEventListener("click", function (e) {

                const url = this.getAttribute("href");
                if (!url || url === "#") return;

                const hash = url.substring(url.indexOf("#"));

                if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {

                    const target = document.querySelector(hash);

                    if (target && smoother) {
                        e.preventDefault();
                        smoother.scrollTo(target, true);
                    }

                } else {
                    e.preventDefault();
                    window.location.href = `/index.html${hash}`;
                }

            });
        });
    });

    // BannerParallax
    gsap.to(".banner-section", {
        backgroundPosition: "center 200px",
        ease: "none",
        scrollTrigger: {
            trigger: ".banner-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // projectParallax
    var projectParallax = $(".project-section");
    if (projectParallax.length) {
        gsap.to(".project-parallax-bg", {
            y: 300,
            ease: "none",
            scrollTrigger: {
                trigger: ".project-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // productGuideParallax
    var productGuideParallax = $(".product-guide-section");
    if (productGuideParallax.length) {
        gsap.to(".parallax-bg", {
            y: 250,
            ease: "none",
            scrollTrigger: {
                trigger: ".product-guide-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // ====== Funding Across Section Scroll Animation ======
    // ===== Funding Across Section Scroll Animation =====
    const section = document.querySelector("#fundingAcross");
    const mapImg = document.querySelector(".funding-across-map-img img");
    const images = document.querySelector(".funding-across-images");
    const content = document.querySelector(".funding-across-content");

    if (section && mapImg && images && content) {

        content.style.paddingTop = "30px";

        ScrollTrigger.matchMedia({

            "(min-width: 768px)": function () {

                // ===== 1️⃣ Pin the whole section =====
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "+=200",       // total scroll distance for animation
                    pin: section,
                    pinSpacing: false
                });

                // ===== 2️⃣ Timeline =====
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=700",   // total scroll distance
                        scrub: true,
                    }
                });

                // Step 1: shrink map from 1 → 0.5
                tl.to(mapImg, {
                    width: "70%",
                    ease: "none",
                    duration: 0.5
                })

                    // Step 2: move map + content up by 50px
                    .to([mapImg, content], {
                        y: -90,
                        ease: "power1.out",
                        duration: 2,
                        paddingBottom: "200px",
                    })

            }

        });

    }


    // asset-banner-bg
    gsap.to(".asset-banner-bg", {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
            trigger: ".asset-banner",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });


    // ===== Need Funding Section Scroll Animation =====
    const FlotingSection = document.querySelector(".need-funding-section");
    const card = document.querySelector(".need-funding-card");

    if (FlotingSection && card) {

        // === Scroll Down Effect ===
        ScrollTrigger.create({
            trigger: FlotingSection,
            start: "top 370",
            end: () => `bottom 900`,
            pin: card,
            pinSpacing: false,
            scrub: true
        });
    }



    // fade up elements
    gsap.utils.toArray(".banner-section h1, .banner-section h3").forEach((el, i) => {

        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
                trigger: ".banner-section",
                start: "top 80%",
            }
        });

    });
})(jQuery);