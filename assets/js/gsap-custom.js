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

    // handle nav link click
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target && smoother) {
                smoother.scrollTo(target, true);
            }
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
    const section = document.querySelector("#fundingAcross");
    const mapImg = document.querySelector(".funding-across-map-img img");
    const images = document.querySelector(".funding-across-images");
    const content = document.querySelector(".funding-across-content");

    if (section && mapImg && images && content) {
        content.style.paddingTop = "30px";

        ScrollTrigger.matchMedia({

            "(min-width: 768px)": function () {

                // ===== 1️⃣ Pin the images container permanently =====
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "center top",
                    pin: images,
                    pinSpacing: false
                });

                // ===== 2️⃣ Timeline for map shrink + content move =====
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=400",   // scroll distance for map/content move
                        scrub: true
                    }
                })
                    // Shrink map
                    .to(mapImg, {
                        scale: 0.7,
                        ease: "none"
                    })
                    // Move map + content up
                    .to([mapImg, content], {
                        y: 80,
                        ease: "power1.out"
                    });
            }

        });

    }


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
    const fundingSection = document.querySelector(".need-funding-section");
    const fundingCard = document.querySelector(".need-funding-card");
    
    if (fundingSection && fundingCard) {
    
        const cardHeight = fundingCard.offsetHeight;
        const sectionHeight = fundingSection.offsetHeight;
    
        const moveDistance = sectionHeight - cardHeight - 200;
    
        gsap.to(fundingCard, {
            y: moveDistance,
            ease: "none",
            scrollTrigger: {
                trigger: fundingSection,
                start: "top bottom",   // animation starts when section enters screen
                end: "bottom top",     // animation ends when section leaves
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    
    }
})(jQuery);