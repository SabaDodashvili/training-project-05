let wrapper = document.querySelector('.wrapper');
const animElements = document.querySelectorAll('.anim-element');

let inMove;
let innTransition = true;
let interval;
let timeOutt;
let pageSlider = new Swiper('.page', {
  //My Classes
  wrapperClass: 'page__wrapper',
  slideClass: 'screen',

  direction: 'vertical',

  slidesPerView: 'auto',

  parallax: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  mousewheel: {
    sensitivity: 1,
  },

  watchOverflow: true,

  speed: 800,

  observer: true,

  observeSlideParents: true,

  observeSlideChildren: true,

  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active',
  },

  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true,
    // touchStartPreventDefault: false,
  },

  init: false,

  on: {
    init: function () {
      manuSlider();
      setScrollType();
      wrapper.classList.add('loaded');
    },
    slideChange: function () {
      manuSliderRemove();
      manuLinks[pageSlider.realIndex].classList.add('active');
    },
    resize: function () {
      setScrollType();
    },
    touchEnd: function () {
      if (animElements.length > 0) {
        inMove = false;
        innTransition = true;
        checkScrollStatus();
      }
    },
    transitionStart: function () {
      if (animElements.length > 0) {
        inMove = false;
        innTransition = true;
        checkScrollStatus();
      }
    },
    progress: function () {
      if (animElements.length > 0) {
        inMove = true;
        checkScrollStatus();
      }
    },
  },
});

let manuLinks = document.querySelectorAll('.manu__link');

function manuSlider() {
  if (manuLinks.length > 0) {
    manuLinks[pageSlider.realIndex].classList.add('active');
    for (let i = 0; i < manuLinks.length; i++) {
      const manuLink = manuLinks[i];
      manuLink.addEventListener('click', function (e) {
        manuSliderRemove();
        if (body.classList.contains('lock')) {
          manuIcon.classList.remove('active');
          manuBody.classList.remove('active');
          body.classList.remove('lock');
        }

        pageSlider.slideTo(i, 800);
        manuLink.classList.add('active');
        e.preventDefault();
      });
    }
  }
}

function manuSliderRemove() {
  let manuLinkActive = document.querySelector('.manu__link.active');
  if (manuLinkActive) {
    manuLinkActive.classList.remove('active');
  }
}

function setScrollType() {
  if (wrapper.classList.contains('free')) {
    wrapper.classList.remove('free');
    pageSlider.params.freeMode = false;
    document.querySelector('.page').classList.add('swiper-no-swiping');
  }

  for (let i = 0; i < pageSlider.slides.length; i++) {
    const pageSlide = pageSlider.slides[i];
    const pageSlideContent = pageSlide.querySelector('.screen__content');
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('free');
        pageSlider.params.freeMode = true;
        document.querySelector('.page').classList.remove('swiper-no-swiping');
        break;
      }
    }
  }
}

function checkScrollStatus() {
  if (inMove === false) {
    if (innTransition === true) {
      clearInterval(interval);
      clearTimeout(timeOutt);
      interval = setInterval(() => {
        animOnScroll();
      }, 50);
      timeOutt = setTimeout(() => {
        clearInterval(interval);
      }, 1000);
      return;
    }
    interval = setInterval(() => {
      animOnScroll();
    }, 50);
    timeOutt = setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  } else if (inMove === true) {
    animOnScroll();
  }
}

pageSlider.init();
