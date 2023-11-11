"use strict";
///////////////////////////////////////////////////////////
//  testimonials                                         //
///////////////////////////////////////////////////////////

const testimonials = document.querySelector(".testimonials");
const slidesNode = testimonials.querySelector(".slides");
const allSlides = [...testimonials.querySelectorAll(".slide")];
const slideCount = slidesNode.childElementCount;
const indicators = testimonials.querySelectorAll(".slide-indicator");
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
  indicators[idx].classList.add("slide-indicator--current");
};

indicators.forEach(dot =>
  dot.addEventListener("click", e => {
    console.log([...indicators].map(item => item === e.target));
    idx = [...indicators].map(item => item === e.target).indexOf(true);
    moveToIndex(idx + 1);
  })
);

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
btnPrev.addEventListener("click", e => {
  movePrevious();
});

btnNext.addEventListener("click", e => {
  moveNext();
});

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
  targetElement && targetElement.scrollIntoView({ behavior: "smooth" });
});

// const mainNavLinks = document.querySelectorAll(".nav__link");

// mainNavLinks.forEach(link =>
//   link.addEventListener("click", e => {
//     const targetId = e.target.textContent.toLowerCase();
//     const target = document.querySelector(`#${targetId}`);

//     target && target.scrollIntoView({ behavior: "smooth" });
//   })
// );
