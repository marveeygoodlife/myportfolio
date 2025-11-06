'use strict'

const nav = document.querySelector("nav");
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const scrollBtn = document.querySelector("#scrollBtn")
/* reusable function */
function closeMenu(){
    nav.classList.remove('active');
    hamburgerMenu.setAttribute('aria-expanded', "false");
};

/* function to toggle navigation and dark mode */
function dynamicToggle() {
    /* get element from dom */
const themeToggle = document.querySelector("#themeToggle");
const body = document.documentElement;
    const ulLinks = nav.querySelectorAll('a');

    
    /* open nav */
    hamburgerMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        /* aria-expanded logic for accessibility*/
        const expanded = hamburgerMenu.getAttribute("aria-expanded") === 'true';
        hamburgerMenu.setAttribute("aria-expanded", !expanded);
        nav.classList.toggle('active');  
    });

    /* close nav on click of links */
    nav.addEventListener("click", (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const targetId = e.target.getAttribute("href");
            closeMenu();

            setTimeout(() => {
                document.querySelector(targetId).scrollIntoView({ behaviour: "smooth", });
            }, 300)
        }
    })

/* load saved theme from local storage */
    const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'darkMode') {
    body.classList.add('darkMode');
};
/* toggle dark mode */
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("darkMode");
        if (body.classList.contains('darkMode')) {
            localStorage.setItem('theme', "darkMode");
        } else {
            localStorage.removeItem('theme');
        }
    }); 
}; dynamicToggle();

/* close nav when user clicks outside it */
document.addEventListener("click", (e) => {
  
    const navOpen = nav.classList.contains('active');
    const clickedToggle = hamburgerMenu.contains(e.target);
    const clickedNav = nav.contains(e.target);

    /* check if nav menu is open and user  clicks outside my nav || !nav button then close nav, reset attribute*/
    if (navOpen && !clickedNav && !clickedToggle) {
        closeMenu();
    };
});

/* show scroll to top button */
window.addEventListener("scroll", () => {
     const scrollPosition = window.scrollY;
    if (scrollPosition > 1000) {
        scrollBtn.classList.add("showScroll");
    } else {
        scrollBtn.classList.remove("showScroll");
    }; 
});

/* scroll to top */
scrollBtn.addEventListener("click", () => {
     window.scrollTo({top: 0, behaviour: "smooth"})
 })