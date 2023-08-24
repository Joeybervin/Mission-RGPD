let submenuOpen = -1;
let submenuIsOpen = false;


const noScroll = () => {
    document.querySelector("html").classList.toggle("noScroll");
}
const closeSubmenu = (index) => {
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

/* OPEN submenu */
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
console.log(submenuOpen)
}
openSubMenu()


const placeModal = (y) => {
    modal.style.top = `${y}px`;
}

let modal = document.querySelector(".modal")


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

const closeModal = document.querySelector('.modal__content > div img:first-of-type').addEventListener('click', () => {
    modal.classList.toggle('close');
    noScroll();
});

let submitNewsletter = document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
    
})


