
// menu

var menu = document.querySelector(".menu");

menu.addEventListener("click", () => {
    var header = document.querySelector(".header ul");
    var wrapper = document.querySelector(".wrapper");
    header.classList.toggle("active");
    wrapper.classList.toggle("active");
});

// scroll
var offsetStart = -window.innerHeight;
var offsetEnd = -15;

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', (window.pageYOffset - offsetStart) / (document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight));
}, false);


// ballFooter

const f = document.getElementById("foo");
document.addEventListener(
  "click",
  (ev) => {
    f.style.transform = `translateY(${ev.clientY - 0}px)`;
    f.style.transform += `translateX(${ev.clientX - 0}px)`;
  },
  false,
);

