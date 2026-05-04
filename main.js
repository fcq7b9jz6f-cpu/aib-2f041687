import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP + Model Viewer Choreography
const model = document.getElementById('watch-model');

// Wait for model to be loaded to avoid errors
model.addEventListener('load', () => {
    gsap.timeline({
        scrollTrigger: {
            trigger: "#journey",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: ".model-container",
        }
    });

    // Section 1: Movement
    gsap.to(model, {
        scrollTrigger: {
            trigger: "#movement",
            start: "top center",
            end: "center center",
            scrub: true,
        },
        cameraOrbit: "-30deg 105deg 0.4m",
        cameraTarget: "auto auto 0.05m",
    });

    // Section 2: Dial
    gsap.to(model, {
        scrollTrigger: {
            trigger: "#dial",
            start: "top center",
            end: "center center",
            scrub: true,
        },
        cameraOrbit: "0deg 80deg 0.3m",
        cameraTarget: "auto auto auto",
    });

    // Section 3: Case
    gsap.to(model, {
        scrollTrigger: {
            trigger: "#case",
            start: "top center",
            end: "center center",
            scrub: true,
        },
        cameraOrbit: "-90deg 90deg 0.4m",
        cameraTarget: "0m 0.03m auto",
    });

    // Section 4: Craftsmanship (return to default view)
    gsap.to(model, {
        scrollTrigger: {
            trigger: "#craftsmanship",
            start: "top center",
            end: "bottom bottom",
            scrub: true,
        },
        cameraOrbit: "15deg 75deg 0.5m",
        cameraTarget: "auto auto auto",
    });
});

// Hero text fade on scroll
gsap.to(".hero", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    opacity: 0,
    y: -100
});