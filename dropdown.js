
const items = document.querySelectorAll(".top-link");
const dropdown = document.querySelector(".dropdown");

const maxwidth = 1100;

const btn = dropdown.children[0].children[0];
const ul = dropdown.children[0].children[1];

let clicked = 1;
console.log(btn.children[0]);

function changeBool(x) {
    return x % 2;
}

// Ava ja sulge dropdown vajutuse peale
btn.addEventListener('click', () => {
    if (changeBool(clicked) == 1){
        ul.style.pointerEvents = "all";
        ul.style.opacity = 1;
        btn.children[0].style.transform = "scale(4.5)";
    } else {
        ul.style.pointerEvents = "none";
        ul.style.opacity = 0;
        btn.children[0].style.transform = "scale(3)";
    }
    
    
    clicked++;
    
});

// On window open asenda nupud dropdowniga ja vastupidid olenevalt kui suur
// window on
if (window.innerWidth < maxwidth) {
    dropdown.style.opacity = 1;
    dropdown.style.pointerEvents = "all";
    for (let i = 0; i < items.length; i++) {
        items[i].style.opacity = 0;
        items[i].children[0].style.pointerEvents = "none";
    }

} else {
    dropdown.style.opacity = 0;
    dropdown.style.pointerEvents = "none";
    for (let i = 0; i < items.length; i++) {
        items[i].children[0].style.pointerEvents = "all";
        items[i].style.opacity = 1;
    }
}

// Disable nupud kui window on liiga väike ja asenda see dropdowniga
// ja kui window on piisavalt suur asenda dropdown nuppudega
window.addEventListener("resize", () => {
    if (window.innerWidth < maxwidth) {
        dropdown.style.opacity = 1;
        dropdown.style.pointerEvents = "all";
        for (let i = 0; i < items.length; i++) {
            items[i].style.opacity = 0;
            items[i].children[0].style.pointerEvents = "none";
        }
    } else {
        dropdown.style.opacity = 0;
        dropdown.style.pointerEvents = "none";
        for (let i = 0; i < items.length; i++) {
            items[i].children[0].style.pointerEvents = "all";
            items[i].style.opacity = 1;
        }
    }
});




