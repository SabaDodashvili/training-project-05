let sliderCards = document.querySelectorAll('.blog-card');

if (sliderCards.length > 0 && body.classList.contains('touch')) {
  for (let i = 0; i < sliderCards.length; i++) {
    const sliderCard = sliderCards[i];
    sliderCard.addEventListener('click', () => {
      sliderCard.classList.toggle('active');
    });
  }
}

let blogSlider = new Swiper('.blog-slider', {
  wrapperClass: 'blog-slider__wrapper',
  slideClass: 'blog-slider__slide',
  nested: true,

  speed: 800,

  navigation: {
    nextEl: '.blog-slider__arrow_next',
    prevEl: '.blog-slider__arrow_prev',
  },
  pagination: {
    el: '.blog-slider__fraction',
    type: 'fraction',
  },

  breakpoints: {
    0: { slidesPerView: 1, slidesPerGroup: 1 },
    630: { slidesPerView: 2, slidesPerGroup: 2 },
    992: { slidesPerView: 3, slidesPerGroup: 3 },
  },
  on: {
    slideChange: function () {
      for (let i = 0; i < sliderCards.length; i++) {
        if (sliderCards[i].classList.contains('active')) {
          sliderCards[i].classList.remove('active');
        }
      }
    },
  },
});

let animalSLider = new Swiper('.animal-slider', {
  wrapperClass: 'animal-slider__wrapper',
  slideClass: 'animal-slider__slide',
  nested: true,
  loop: true,
  speed: 800,

  preloadImages: false,
  lazy: {
    loadOntransitionStart: true,
    loadPrevNext: false,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  autoplay: {
    delay: 7000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.animal-slider__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'animal-slider__bullet',
    bulletActiveClass: 'animal-slider__bullet_active',
  },
});

let journeySLider = new Swiper('.journey-slider', {
  wrapperClass: 'journey-slider__wrapper',
  slideClass: 'journey-slider__slide',
  nested: true,
  speed: 800,
  loop: true,

  preloadImages: false,
  lazy: {
    loadOntransitionStart: true,
    loadPrevNext: false,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  autoplay: {
    delay: 7000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.journey-slider__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'journey-slider__bullet',
    bulletActiveClass: 'journey-slider__bullet_active',
  },
});

let peopleSLider = new Swiper('.people-slider', {
  wrapperClass: 'people-slider__wrapper',
  slideClass: 'people-slider__slide',
  nested: true,
  speed: 800,
  loop: true,

  preloadImages: false,
  lazy: {
    loadOntransitionStart: true,
    loadPrevNext: false,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  autoplay: {
    delay: 7000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.people-slider__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'people-slider__bullet',
    bulletActiveClass: 'people-slider__bullet_active',
  },
});
