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
                    end: "+=150",       // total scroll distance for animation
                    pin: section,
                    pinSpacing: false
                });

                // ===== 2️⃣ Timeline =====
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=700",   // total scroll distance
                        scrub: true
                    }
                });

                // Step 1: shrink map from 1 → 0.5
                tl.to(mapImg, {
                    width: "70%",
                    ease: "none",
                    duration: 0.5
                })

                    // Step 2: move map + content up by 100px
                    .to([mapImg, content], {
                        y: -200,
                        ease: "power1.out",
                        duration: 0.7,
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
                end: "bottom 70%",     // animation ends when section leaves
                scrub: 1,
                invalidateOnRefresh: true
            }
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