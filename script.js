const wrapper = document.querySelector(".frame");
let carousel = document.querySelector(".nine-section-container");
let firstCardWidth = carousel.querySelector(".customer-1").offsetWidth;
const carouselChildrens = [...carousel.children];
let images = document.querySelectorAll(".customer-1");
const button = document.querySelector(".three-dots-parent");
let length = images.length;
console.log(length);
let slidenumber = 1;
let isDragging = false,
isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
let c = 0;

for (let i = 0; i < length; i++) {
  const div = document.createElement("div");
  div.className = "dot";
  button.appendChild(div);
}

const buttons = document.querySelectorAll(".dot");

const mod = (n, m) => (n % m + m) % m;
const BgColor = () => {
  buttons.forEach((button) => {
    button.style.backgroundColor = "#ddd";
  });
};
const anim = () => {
  const cMod = mod(c, length);
  // Move slider
  // console.log(c);
  // elCarouselSlider.style.transitionDuration = `${ms}ms`;
  // elCarouselSlider.style.transform = `translateX(${(-c - 1) * 100}%)`;
  // Handle active classes (slide and bullet)
  buttons.forEach((elSlide, i) => elSlide.classList.toggle("is-active", cMod === i));
  // elsBtns.forEach((elBtn, i) => elBtn.classList.toggle("is-active", cMod === i));
};

let firstscrolled = false;
let secondscrolled = false;
let thirdscrolled = false;
const goto = (i) => {
  c = i;
  console.log(c);
  if(c==1 && !firstscrolled && !thirdscrolled && !secondscrolled){
        carousel.scrollLeft+=firstCardWidth;
        firstscrolled = true;
        secondscrolled=false;
        thirdscrolled=false;
        console.log("first");
    }
    else if(c==2 && !secondscrolled){
      carousel.scrollLeft+=firstCardWidth;
      firstscrolled = false;
      secondscrolled=true;
      thirdscrolled=false;
      console.log("second");
    }
    else if(c==1 && !firstscrolled && secondscrolled && !thirdscrolled){
      carousel.scrollLeft+=-firstCardWidth;
      firstscrolled = true;
      secondscrolled=false;
      thirdscrolled=false;
      console.log("third");
    }
    else if(c==0 && firstscrolled && !thirdscrolled && !secondscrolled ){
        firstscrolled=false;
        secondscrolled=false;
        thirdscrolled=false;
        carousel.scrollLeft+=-firstCardWidth;
        console.log("upar zero 1");
      }
    else if (c==0 && secondscrolled){
        firstscrolled=false;
        secondscrolled=false;
        thirdscrolled=false;
        console.log("upar zero 2");
        carousel.scrollLeft+=-firstCardWidth;
      }
      else if(c==0 && !firstscrolled && !thirdscrolled && !secondscrolled){
      carousel.scrollLeft+=-firstCardWidth;
      firstscrolled=false;
      secondscrolled=true;
      thirdscrolled=false;
    }
  anim();
};
// buttons[0].style.backgroundColor = "red";
buttons.forEach((button, i) => {
  button.addEventListener("click", () => {
    goto(i);
    // BgColor();
    // button.style.backgroundColor = "red";
    // 
  });
});

const arrowBtns = document.querySelectorAll(".arrow-parents div");
console.log(arrowBtns);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


function Right() {
    carousel.scrollLeft += firstCardWidth;  
    next();
    // buttons[1].style.backgroundColor="red"
    // buttons[0].style.backgroundColor="#ddd"
}
const next = () => {
  console.log(c);
  if (c >= length) return; // prevent blanks on fast next-click
  c += 1;
  if (c >= length) c = 0;
  anim();
};


function Left(){
  carousel.scrollLeft +=-firstCardWidth;
  prev();
}
const prev = () => {
  if (c <= -1) return; // prevent blanks on fast prev-click
  c -= 1;
  if (c <= -1) c = length - 1;
  anim();
};

//Add event listeners for the arrow buttons to scroll the c0rousel left and right
arrowBtns.forEach((btn,index) => {
  console.log(index);
  const ar=[0,1,2];
  btn.addEventListener("click", () => {
    btn.id == "left" ? Left():Right();
    });
});



const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  
  // Records the initial cursor and scroll position of the carousel

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
  console.log(startScrollLeft + "startscrollleft");
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  const deltaX = startX - e.pageX;
  console.log(deltaX);

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

  // const direction = deltaX > 0 ? 'left' : 'right';
  // if (direction === 'left') {
    // goto(slidenumber);
    // slidenumber++;
  // } else {
  //   // Update button index for dragging to the right
  
  // }
  // console.log(carousel.scrollLeft);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    // if (c <= -1) c = length - 1;
    
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};
anim();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

// -------------------------hamburger touch event----------------------------------

let hamburgerContainer =document.querySelector(".hamburger-slider-parent");
let hamburger =document.querySelector(".hamburger");
let nav =document.querySelectorAll(".ul-second li a");
console.log(nav);
let toggle =false
function add(){
  if(!toggle){
  hamburgerContainer.style.transform="translate(-100%)";
  document.body.style.overflow = 'hidden';
  toggle=true;
}
else{
  hamburgerContainer.style.transform="translate(100%)";
  document.body.style.overflow = 'scroll';
  toggle=false
}
}
function remove(){
  hamburgerContainer.style.display="none"
  document.body.style.overflow = 'scroll';
  console.log("remove");
}
hamburger.addEventListener("click",add)
// nav.addEventListener("click",remove)
nav.forEach((list)=>{
list.addEventListener("click",remove);
})

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  console.log(section);
  if (section) {
    section.scrollIntoView({ behavior:"smooth"});
  }
  return false;
  // Prevent default anchor behavior
}


