/***SVG-Positioning***/
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });

    canvas.width = window.innerWidth;
    let canvasWidth = canvas.width;
    canvas.height = window.innerHeight * 0.8;
    let canvasHeight = canvas.height;

    const image = this.document.getElementById('image');

    const maxWidth = window.innerWidth * 0.8;
    const aspectRatio = image.width / image.height;

    let imageWidth = maxWidth;
    let imageHeight = imageWidth / aspectRatio; //imageWidth / aspectRatio;

    if (image.width < maxWidth) {
        imageWidth = image.width;
        imageHeight = image.height;
    }

    const x = canvasWidth * 0.5 - imageWidth * 0.5;
    const y = canvasHeight * 0.7 - imageHeight * 0.5;

    console.log("canvasWidth:", canvasWidth, "window.innerWidth:", window.innerWidth);
    console.log("imageWidth:", imageWidth, "x:", x, "y:", y);
    ctx.drawImage(image, x, y, imageWidth, imageHeight);

    function resize(width, height) {
        canvasWidth = width;
        canvasHeight = height;
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resize(canvas.width, canvas.height);
    });
});

/***GSAP***/
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, DrawSVGPlugin, MotionPathPlugin);

const path = document.querySelector(".theLine");
const pathLength = path.getTotalLength();

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
    .to(".text02", {}, 0.029)
    .to(".text03", {}, 0.05)
    .to(".text04", {}, 0.08)
    .to(".text05", {}, 0.105)
    .to(".text06", {}, 0.135)
    .to(".text07", {}, 0.18)
    .to(".text08", {}, 0.21)
    .to(".text09", {}, 0.22)
    .to(".text10", {}, 0.25)
    .to(".text11", {}, 0.265)
    .to(".text12", {}, 0.28)
    .to(".text13", {}, 0.375)
    .to(".text14", {}, 0.42)
    .to(".text15", {}, 0.49)
    .to(".text16", {}, 0.54)
    .to(".text17", {}, 0.57)
    .to(".text18", {}, 0.60)
    .to(".text19", {}, 0.63)
    .to(".text20", {}, 0.67)
    ;

// GSAP für Gesamtanimation der Timeline
gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
        trigger: "#svg-stage",
        scrub: true,
        start: "top center",
        end: () => `+=${pathLength * 1.35}`,
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