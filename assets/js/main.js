// Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, DrawSVGPlugin, MotionPathPlugin);

// Timeline - SVG
const path = document.querySelector(".theLine");
const pathLength = path.getTotalLength();
// Science - Panels
let panelsSection = document.querySelector("#panels"),
    panelsContainer = document.querySelector("#panels-container"),
    tween;
const panels = gsap.utils.toArray("#panels-container .panel");
const horizontalStart = panelsContainer.offsetTop;

// verhindere horizontales Scrollen mit Trackpad bzw. auf Touchscreen

// Trackpad/Touchpad
window.addEventListener("wheel", (e) => {
    if (window.scrollY < horizontalStart && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

// Touchscreen
let startX = 0, startY = 0;
window.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener("touchmove", (e) => {
    let deltaX = e.touches[0].clientX - startX;
    let deltaY = e.touches[0].clientY - startY;

    if (window.scrollY < horizontalStart && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

// GSAP für einzelne Lebenslauf-Elemente

const pulses = gsap
    .timeline({
        defaults: {
            duration: 0.05,
            autoAlpha: 1,
            scale: 1,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)"
        }
    })
    .to(".text01", {}, 0.01)
    .to(".text02", {}, 0.055)
    .to(".text03", {}, 0.075)
    .to(".text04", {}, 0.11)
    .to(".text05", {}, 0.119)
    .to(".text06", {}, 0.135)
    .to(".text07", {}, 0.17)
    .to(".text08", {}, 0.19)
    .to(".text09", {}, 0.22)
    .to(".text10", {}, 0.25)
    .to(".text11", {}, 0.28)
    .to(".text12", {}, 0.304)
    .to(".text13", {}, 0.313)
    .to(".text14", {}, 0.33)
    .to(".text15", {}, 0.35)
    .to(".text15-1", {}, 0.37)
    .to(".text16", {}, 0.385)
    .to(".text17", {}, 0.417)
    .to(".text18", {}, 0.46)
    .to(".text19", {}, 0.503)
    .to(".text20", {}, 0.525)
    .to(".text21", {}, 0.565)
    .to(".text22", {}, 0.61)
    .to(".text23", {}, 0.66)
    .to(".text24", {}, 0.71)
    .to(".text25", {}, 0.75)
    .to(".text26", {}, 0.81)
    .to(".text27", {}, 0.83)
    ;


// GSAP für Gesamtanimation der Timeline
gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
        trigger: "#svg-stage",
        scrub: true,
        start: "top center",
        end: () => `+=${pathLength * 0.34}`,
    }
})
    .to(".ball01", { autoAlpha: 1, duration: 0.01 })
    .from(".theLine", { drawSVG: 0 }, 0)
    .to(".ball01", {
        motionPath: {
            path: ".theLine",
            align: ".theLine",
            alignOrigin: [0.5, 0.5]
        }
    },
        0
    )
    .add(pulses, 0);

/**Panels-Section (horizontales Scrollen)**/

tween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        // snap: {
        //     snapTo: 1 / (panels.length - 1),
        //     inertia: false,
        //     duration: { min: 0.1, max: 0.1 }
        // },
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
    }
});

document.getElementById('state-button').addEventListener('click', () => {
    window.location.href = "assets/pages/statements/statements.html"
});

document.getElementById('source-button').addEventListener('click', () => {
    window.location.href = "assets/pages/sources/sources.html"
});

document.getElementById('hide').addEventListener('click', () => {
    document.querySelector('.error').style.display = "none";
});

function checkAspect() {
    const ratio = window.innerWidth / window.innerHeight;
    console.log(ratio);
    const content = document.querySelector('.error');

    if (ratio > 1.65 && ratio < 1.85) {
        content.style.display = 'none'; // ca. 16:9
    } else {
        content.style.display = 'block';
    }
}

/* window.addEventListener('resize', checkAspect);
checkAspect(); */