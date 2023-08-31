let submenuOpen = -1;
let submenuIsOpen = false;



function noScroll() {
    document.querySelector("html").classList.toggle("noScroll");
}

/* -----------> MENU  <-----------*/

const goBackOnMenu = document.querySelectorAll(".go-back").forEach((element, index) => {
    element.addEventListener("click", () => {
        closeSubmenu(index);
    });
});
/* OPEN & CLOSE the mobile navigation menu */
const toggleMenu = document.querySelector('#navigation--mobile img + div').addEventListener("click", () => {
    let burgerMenuIcon = document.getElementById('burger-menu');
    let closeMenuIcon = document.getElementById('close-menu');
    let menu = document.querySelector(".menu");

    closeMenuIcon.classList.toggle("close");
    burgerMenuIcon.classList.toggle("close");
    menu.classList.toggle("menu-open");
    noScroll();
    if (submenuOpen > -1 && submenuIsOpen) {
        closeSubmenu(submenuOpen);
    }

})
/* -----------> SUBMENU  <-----------*/

/* CLOSE submenu (mobile devices) */
function closeSubmenu(index) {
    document.querySelector(`.submenu-mobile-${index}`).classList.toggle("close-submenu");
    submenuIsOpen = false;
};

/* OPEN submenu (mobile devices) */
const openSubMenu = () => {
    let mobileMenuList = document.querySelectorAll(".menu ul li")
    for (let i = 0; i < 4; i++) {
        mobileMenuList[i].addEventListener("click", () => {
            submenuIsOpen = true;
            submenuOpen = i
            let subMenuTitle = mobileMenuList[i].querySelector("p").innerHTML
            let subMenuOpened = document.querySelector(`.submenu-mobile-${i}`)
            subMenuOpened.classList.toggle("close-submenu")
            subMenuOpened.querySelector("div + p").innerHTML = subMenuTitle + " :";
        })
    }
}
openSubMenu()

/* -----------> MODAL  <-----------*/

let modal = document.querySelector(".modal");
function placeModal(y) {
    modal.style.top = `${y}px`;
}
/* OPEN modal */
const openModal = document.querySelectorAll(".team-member").forEach((teamMember) => {
    const imageContainer = teamMember.querySelector('div');
    imageContainer.addEventListener('click', () => {
        const teamMemberImg = teamMember.querySelector('img').src;
        modal.classList.toggle('close');
        modal.querySelector('.modal__content > img').src = teamMemberImg;
        placeModal(window.scrollY);
        noScroll();
    });
})
/* CLOSE MODAL */
const closeModal = document.querySelector('.modal__content > div svg:first-of-type').addEventListener('click', () => {
    modal.classList.toggle('close');
    noScroll();
});

/* -----------> SLIDER PROGRESS BAR  <-----------*/

function ProgressBarWidthGrowth(index, sliderLength) {
    let sliderProgressBar = document.querySelector('.slider-progress-bar');
    let sliderProgressBarBar = document.querySelector('.slider-progress-bar-bar');
    let progressBarWidth = sliderProgressBar.offsetWidth;
    sliderProgressBarBar.style.width = `${(index + 1) * (progressBarWidth / sliderLength)}px`;
}

/* -----------> SLIDER  <-----------*/

let sliderSlides = document.querySelectorAll('.slider__slide');
let sliderButtonNext = document.querySelector('.slider-button-next')
let sliderButtonPrev = document.querySelector('.slider-button-prev');
let sliderIndex = 0;

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        ProgressBarWidthGrowth(sliderIndex, sliderSlides.length)
    }, 100);
});
const disableSlideButton = (index, sidesList) => {
    if (index > 0 && index < sidesList.length - 1) {
        sliderButtonNext.classList.remove('disabled');
        sliderButtonPrev.classList.remove('disabled');
    }
    else if (index === sidesList.length - 1) {
        sliderButtonNext.classList.add('disabled');
        sliderButtonPrev.classList.remove('disabled');
    }
    else if (index === 0) {
        sliderButtonNext.classList.remove('disabled');
        sliderButtonPrev.classList.add('disabled');
    }
}
function showSlide(index) {
    sliderSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}
function slideExitRight(index) {
    sliderSlides[index].classList.remove('active');
    sliderSlides[index - 1].classList.remove('slide-animation-exit');
}
function slideExitLeft(index) {
    sliderSlides[index].classList.add('slide-animation-exit');
    sliderSlides[index].addEventListener('transitionend', function () {
        sliderSlides[index].classList.remove('active');
    }, { once: true });
}

/* Click slider button next */
sliderButtonNext.addEventListener('click', () => {
    if (sliderIndex < sliderSlides.length - 1) {
        slideExitLeft(sliderIndex);
        sliderIndex++;
        disableSlideButton(sliderIndex, sliderSlides);
        showSlide(sliderIndex);
        ProgressBarWidthGrowth(sliderIndex, sliderSlides.length)
    }
});
/* Click on slider button prev */
sliderButtonPrev.addEventListener('click', () => {
    if (sliderIndex > 0) {
        slideExitRight(sliderIndex);
        sliderIndex--;
        disableSlideButton(sliderIndex, sliderSlides);
        showSlide(sliderIndex);
        ProgressBarWidthGrowth(sliderIndex, sliderSlides.length)
    }
});

/* -----------> NEWSLETTER  <-----------*/

let newsletterEmailInput = document.getElementById('email');
let newsletterConditionsCheckBox = document.getElementById('conditions');
let errorMessage = document.querySelector('.error-message');
let form = document.querySelector('form')

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function showError(messageLocation, message, inputError) {

    messageLocation.innerHTML = message;
    inputError.style.border = "2px solid rgb(255, 51, 51)"

}
/* SUBMIT form newsletter */
let submitNewsletter = form.addEventListener("submit", (e) => {

    let submitButton = document.querySelector("form button");
    e.preventDefault();

    if (!validateEmail(newsletterEmailInput.value)) {
        showError(errorMessage, 'Veuillez entrer une adresse email valide.', newsletterEmailInput)
    }
    else if (!newsletterConditionsCheckBox.checked) {
        showError(errorMessage, 'Veuillez cochez les condditions.', newsletterConditionsCheckBox)
    }
    else {
        /* TODO : */
        /* changer étét bouton */
        submitButton.innerHTML = 'Envoyé';
        submitButton.classList.add('animed');
        submitButton.disabled = true;
        form.reset()
        errorMessage.innerHTML = "";
        newsletterEmailInput.style.border = "none";
    }
})

newsletterEmailInput.addEventListener("blur", function () {
    if (validateEmail(this.value)) {
        this.style.border = "2px solid #23E59F";
    }
})

/* -----------> FOOTER <-----------*/

let openDropdownMenu = document.querySelectorAll(".inactive").forEach((element) => {
    element.addEventListener('click', function () {
        element.classList.toggle('inactive')
        element.querySelector("svg").classList.toggle('open')
    })
})


/* -----------> SCROLL ANIMATIONS <-----------*/

/* let fadeInUpAnimation = document.querySelectorAll(".fade-in-up");
let fadeInDownAnimation = document.querySelectorAll(".fade-in-down");
let fadeInFromRightAnimation = document.querySelectorAll(".fade-in-from-right");
let fadeInFromLeftAnimation = document.querySelectorAll(".fade-in-from-left");

function extractDelayFromClass(element) {
    let elClassNames = element.classList;
    let elClassNameArray = Object.values(elClassNames)
    let elDelayClassName = elClassNameArray.find((className) => className.match(/delay-(\d+)/))

    if (elDelayClassName === undefined) {
        return "0"
    }
    else {
        return elDelayClassName.substring(6)

    }

}

function activateAnimations(elToAnimate) {

    for (let i = 0; i < elToAnimate.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = elToAnimate[i].getBoundingClientRect().top;
        let elementVisible = 50;
        let delay = extractDelayFromClass(elToAnimate[i]);

        if (delay > 0) {
            elToAnimate[i].style.transitionDelay = `${extractDelayFromClass(elToAnimate[i])}ms`;
        }

        if (elementTop < windowHeight - elementVisible) {
            elToAnimate[i].classList.add("active");
        } else {
            elToAnimate[i].classList.remove("active");
        }
    }
}

let animationsToActivate = [fadeInUpAnimation, fadeInDownAnimation, fadeInFromLeftAnimation, fadeInFromRightAnimation]

if (window.innerWidth >= 1200) {

    document.addEventListener("DOMContentLoaded", function () {

        window.addEventListener("scroll", () => {
            animationsToActivate.forEach((animation) => {
                activateAnimations(animation);
            })
        });
    });
    

} */


/* GSAPS SCROLLTRIGGER */

function extractDelayFromClass(element) {
    let elClassNames = element.classList;
    let elClassNameArray = Object.values(elClassNames)
    let elDelayClassName = elClassNameArray.find((className) => className.match(/delay-(\d+)/))

    if (elDelayClassName === undefined) {
        return "0"
    }
    else {
        return elDelayClassName.substring(6)

    }

}

function hide(elem) {
    gsap.set(elem, { duration: 1.25,opacity: 0 });
}

function animateElements(element, direction) {

    direction = direction || 1;
    let x = 0;
    let y = direction * 0;
    let delay = extractDelayFromClass(element);
    
    let className = element.className

    if (className.includes("fadeInUp")) {
        y = 100 ;
    }
    else if (className.includes("fadeInDown")) {
        y = -50 ;
    }
    else if (className.includes("fadeInFromLeft")) {
        x = -300
    }
    else if (className.includes("fadeInFromRight")) {
        x = 100
    }

    gsap.fromTo(
        element,
        { x: x, y: y, opacity: 0 },
        {
            duration: 1.25,
            y: 0,
            x: 0,
            ease: "ease-in-out",
            opacity: 1,
            delay: delay,
            
        }
    );
    
}


document.addEventListener("DOMContentLoaded", function () {

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
            gsap.utils.toArray(".gs_reveal").forEach(function (el) {

                hide(el);
                let animated = false;
                let exitedViewOnce = false;

                ScrollTrigger.create({
                    trigger: el,
                    start : "top+=200px bottom+=100px",
                    end: "bottom+=50px top+=150px",
                    markers: true,
                    scrub: 0.5,
                    
                    onEnter: function () {
                        if (!animated) {
                            animateElements(el);
                            animated = true;
                        }},
                    onEnterBack: function () {
                            if (animated && !exitedViewOnce) {
                                animateElements(el, -1);
                                exitedViewOnce = true;
                            }
                        },
                        
                });
            });
        }
    })

    ScrollTrigger.refresh(true);
    
});

