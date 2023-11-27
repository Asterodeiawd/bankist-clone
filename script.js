"use strict";
///////////////////////////////////////////////////////////
//  testimonials                                         //
///////////////////////////////////////////////////////////

const testimonials = document.querySelector(".testimonials");
const slidesNode = testimonials.querySelector(".slides");
const allSlides = [...testimonials.querySelectorAll(".slide")];
const slideCount = slidesNode.childElementCount;
const indicator = testimonials.querySelector(".indicators");
const dots = testimonials.querySelectorAll(".slide-indicator");
const btnPrev = testimonials.querySelector(".move-prev");
const btnNext = testimonials.querySelector(".move-next");
let currentSlide = 0;

const moveToIndex = idx => {
  idx = idx < 0 ? 0 : idx;
  idx = idx > slideCount ? slideCount : idx;

  slidesNode.style.transition = "transform 0.4s";
  slidesNode.style.transform = `translateX(-${(idx + 1) * 100}%)`;
  currentSlide = idx;
  updateIndicators(currentSlide);
};

const updateIndicators = idx => {
  testimonials
    .querySelector(".slide-indicator--current")
    .classList.remove("slide-indicator--current");
  dots[idx].classList.add("slide-indicator--current");
};

indicator.addEventListener("click", e => {
  const dot = e.target.closest(".slide-indicator");

  dot && moveToIndex(Number(dot.dataset.slide) - 1);
});

const initTestimonials = () => {
  slidesNode.append(allSlides[0].cloneNode(true));
  slidesNode.prepend(allSlides.at(-1).cloneNode(true));

  moveToIndex(currentSlide);
};

initTestimonials();

const movePrevious = () => {
  if (currentSlide === 0) {
    slidesNode.style.transition = "none";
    slidesNode.style.transform = `translateX(-${(slideCount + 1) * 100}%)`;
    slidesNode.clientHeight;
    moveToIndex(slideCount - 1);
  } else moveToIndex(currentSlide - 1);
};

const moveNext = () => {
  if (currentSlide === slideCount - 1) {
    slidesNode.style.transition = "none";
    slidesNode.style.transform = "translateX(0)";
    slidesNode.clientHeight;
    moveToIndex(0);
  } else moveToIndex(currentSlide + 1);
};
btnPrev.addEventListener("click", e => movePrevious());
btnNext.addEventListener("click", e => moveNext());

///////////////////////////////////////////////////////////
//  cta buttons                                          //
///////////////////////////////////////////////////////////
const ctaButtons = document.querySelectorAll(".cta");
const dialog = document.querySelector(".register-dialog");
const btnCloseDialog = dialog.querySelector(".close");

ctaButtons.forEach(btn =>
  btn.addEventListener("click", _ => dialog.showModal())
);

btnCloseDialog.addEventListener("click", _ => dialog.close());

///////////////////////////////////////////////////////////
//  operation tabs                                       //
///////////////////////////////////////////////////////////
const operationTabs = [...document.querySelectorAll(".operations__tab")];
const operationContents = document.querySelectorAll(".operations__content");
const operationsTabContainer = document.querySelector(
  ".operations__tab-container"
);

operationsTabContainer.addEventListener("click", e => {
  const tab = e.target.closest(".operations__tab");
  const tabIndex = Number(tab?.dataset.tab);

  if (!tabIndex) return;

  operationTabs.forEach((item, index) => {
    if (index + 1 === tabIndex) {
      item.classList.add("operations__tab--active");
      operationContents[index].classList.add("operations__content--active");
    } else {
      item.classList.remove("operations__tab--active");
      operationContents[index].classList.remove("operations__content--active");
    }
  });
});

// operationTabs.forEach(tab =>
//   tab.addEventListener("click", e => {
//     operationTabs.forEach((item, index) => {
//       if (item === e.currentTarget) {
//         item.classList.add("operations__tab--active");
//         operationContents[index].classList.add("operations__content--active");
//       } else {
//         item.classList.remove("operations__tab--active");
//         operationContents[index].classList.remove(
//           "operations__content--active"
//         );
//       }
//     });
//   })
// );

///////////////////////////////////////////////////////////
// main nav                                              //
///////////////////////////////////////////////////////////
const mainNav = document.querySelector(".nav__links");

mainNav.addEventListener("click", e => {
  e.preventDefault();
  const link = e.target.closest(".nav__link");
  const targetHref = link?.getAttribute("href");

  if (!targetHref || targetHref === "#") return;

  const targetElement = document.querySelector(`${targetHref}`);
  targetElement?.scrollIntoView({ behavior: "smooth" });
});

const handleHover = function (e) {
  const clickedLink = e.target.closest(".nav__link");
  if (!clickedLink) return;

  const img = document.querySelector(".logo");
  const links = mainNav.querySelectorAll(".nav__link");
  // [...document.querySelectorAll(".nav__link")].filter(
  img.style.opacity = this;
  links.forEach(el => {
    if (el !== clickedLink) el.style.opacity = this;
  });
};

mainNav.addEventListener("mouseout", handleHover.bind(1));
mainNav.addEventListener("mouseover", handleHover.bind(0.5));
// const mainNavLinks = document.querySelectorAll(".nav__link");

// mainNavLinks.forEach(link =>
//   link.addEventListener("click", e => {
//     const targetId = e.target.textContent.toLowerCase();
//     const target = document.querySelector(`#${targetId}`);

//     target && target.scrollIntoView({ behavior: "smooth" });
//   })
// );

///////////////////////////////////////////////////////////
// sticky nav                                            //
///////////////////////////////////////////////////////////
const heroSection = document.querySelector(".header");
const featureSection = document.querySelector("#features");
const { height: heroYCoord } = heroSection.getBoundingClientRect();
const stickyHeader = document.querySelector(".main__nav");

const obsCallback = (entries, obs) => {
  // console.log(obs);
  if (!entries[0].isIntersecting) {
    stickyHeader.classList.add("sticky");
  } else {
    stickyHeader.classList.remove("sticky");
  }
  console.log(entries);
};

const obsOptions = {
  root: null,
  threshold: [0, 0.25, 0.75],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(heroSection);
observer.observe(featureSection);
// document.addEventListener("scroll", e => {
//   if (window.scrollY >= height) stickyHeader.classList.add("sticky");
//   else {
//     stickyHeader.classList.remove("sticky");
//   }
// });
