

function animateFrom(elem, direction) {
    direction = direction || 1;
    const x = 0;
    const y = direction * 100;

    let delay = 0;

    if (elem.classList.contains("delay")) {
        delay = 0.5; // Définissez la valeur du délai ici
    }

    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
    }

    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";

    gsap.fromTo(
        elem,
        { x: x, y: y, autoAlpha: 0 },
        {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto",
            delay: delay // Applique le délai ici
        }
    );
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
        hide(elem);

        ScrollTrigger.create({
            trigger: elem,
            markers: true,
            onEnter: function () {
                animateFrom(elem);
            },
            onEnterBack: function () {
                animateFrom(elem, -1);
            },
            onLeave: function () {
                hide(elem);
            }
        });
    });
});
