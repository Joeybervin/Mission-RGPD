let submenuOpen = -1;
let submenuIsOpen = false;



function noScroll() {
    document.querySelector("html").classList.toggle("noScroll");
}

/* -----------> MENU  <-----------*/
function closeSubmenu(index){
        document.querySelector(`.submenu-mobile-${index}`).classList.toggle("close");
        submenuIsOpen = false;
};
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

/* OPEN submenu (mobile devices) */
const openSubMenu = () => {
    let mobileMenuList = document.querySelectorAll(".menu ul li")
    for (let i = 0; i < 4; i++) {
        mobileMenuList[i].addEventListener("click", () => {
            submenuIsOpen = true;
            submenuOpen = i
            let subMenuTitle = mobileMenuList[i].querySelector("p").innerHTML
            let subMenuOpened = document.querySelector(`.submenu-mobile-${i}`)
            subMenuOpened.classList.toggle("close")
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
        modal.querySelector('.modal__content > img').src = teamMemberImg ;
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
    sliderProgressBarBar.style.width = `${(index + 1 )* (progressBarWidth / sliderLength)}px`;
}

/* -----------> SLIDER  <-----------*/

let sliderSlides = document.querySelectorAll('.slider__slide');
let sliderButtonNext = document.querySelector('.slider-button-next')
let sliderButtonPrev = document.querySelector('.slider-button-prev');
let sliderIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        ProgressBarWidthGrowth(sliderIndex, sliderSlides.length)
    }, 100);
});
const disableSlideButton = (index, sidesList) => {
    if (index  > 0 && index < sidesList.length - 1) {
        sliderButtonNext.classList.remove('disabled');
        sliderButtonPrev.classList.remove('disabled');
    }
    else if (index  === sidesList.length - 1) {
        sliderButtonNext.classList.add('disabled');
        sliderButtonPrev.classList.remove('disabled');
    }
    else if (index  === 0) {
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
    sliderSlides[index - 1 ].classList.remove('slide-animation-exit');
}
function slideExitLeft(index) {
    sliderSlides[index].classList.add('slide-animation-exit');
    sliderSlides[index].addEventListener('transitionend', function() {
        sliderSlides[index].classList.remove('active');
    }, { once: true });
}

/* Click slider button next */
sliderButtonNext.addEventListener('click', () => {
    if (sliderIndex < sliderSlides.length - 1) {
        slideExitLeft(sliderIndex);
        disableSlideButton(sliderIndex, "next");
        sliderIndex++;
        showSlide(sliderIndex);
        ProgressBarWidthGrowth(sliderIndex, sliderSlides.length)
    }
});
/* Click on slider button prev */
sliderButtonPrev.addEventListener('click', () => {
    if (sliderIndex > 0) {
        slideExitRight(sliderIndex);
        sliderIndex--;
        disableSlideButton(sliderIndex, "prev");
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

newsletterEmailInput.addEventListener("blur", function() {
    if (validateEmail(this.value)) {
        this.style.border = "2px solid #23E59F";
    }
})

/* -----------> SCROLL ANIMATIONS <-----------*/

/* ScrollReaveal */


