const wrapper = document.querySelector(".frame"); 
let carousel = document.querySelector(".nine-section-container");
let firstCardWidth = carousel.querySelector(".customer-1").offsetWidth;
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
console.log(cardPerView);

const arrowBtns = document.querySelectorAll(".arrow-parents div");

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  // console.log(card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  // console.log(card.outerHTML);
});

// carousel.classList.add("no-transition");
// carousel.scrollLeft = carousel.offsetWidth;
// carousel.classList.remove("no-transition");

//Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});


const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
 
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
  console.log(startScrollLeft +"startscrollleft");
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  console.clear();
  console.log(startX +"startx");
  console.log(e.pageX +"moving e.pagex");
  console.log(startScrollLeft +"startscrollleft");
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  console.log(carousel.scrollLeft);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      // console.log(carousel.scrollWidth);
      // console.log(carousel.offsetWidth);
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      console.log(carousel.scrollLeft);
      carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
  }

}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
  

 
  

  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


  

  
  
  
  

  
  
  
  // let slidenumber =1;
  // const length =image.length;
  
  // const NextSlide=()=>{
  //   slider.style.transform=`translateX(-${slidenumber*1120}px)`;
  //     slidenumber++;
  //   }

  //   const prevSlide=()=>{
    //     slider.style.transform=`translate(-${(slidenumber-2)*1120}px)`;
  //     slidenumber++
  // }

  // const getFirstSlide=()=>{
  //   slider.style.transform=`translateX(0px)`;
  //   slidenumber=1;
  // }

  // const getLastSlide=()=>{
  //   slider.style.transform=`translate(-${(length-1)*1120}px)`
  //   slidenumber=length;
  //   console.log(slidenumber+"last");
  // }

  // right.addEventListener("click", ()=>{
  //   slidenumber<length?NextSlide():getFirstSlide();
  // })

  // left.addEventListener("click", ()=>{
  //   slidenumber>1?prevSlide():getLastSlide();
  // })