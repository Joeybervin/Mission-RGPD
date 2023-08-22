

let burgerMenuIcon = document.getElementById('burger-menu');
let closeMenuIcon = document.getElementById('close-menu');
let menu = document.querySelector(".menu");
let submenuOpen = -1;
let submenuIsOpen = false;

let closeSubmenu = (index) => {
        document.querySelector(`.submenu-mobile-${index}`).classList.toggle("close");
        submenuIsOpen = false;
};

let goBackOnMenu = document.querySelectorAll(".go-back").forEach((element, index) => {
    element.addEventListener("click", () => {
        closeSubmenu(index);
    });
});

/* OPEN & CLOSE the mobile navigation menu */
const toggleMenu = document.querySelector('#navigation--mobile img + div').addEventListener("click", () => {
    closeMenuIcon.classList.toggle("close");
    burgerMenuIcon.classList.toggle("close");
    menu.classList.toggle("menu-open");
    document.querySelector("html").classList.toggle("noScroll");
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

