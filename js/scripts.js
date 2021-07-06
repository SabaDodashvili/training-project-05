function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
;
!(function (e) {
  'function' == typeof define && define.amd ? define([], e) : 'object' == typeof exports ? (module.exports = e()) : (window.wNumb = e());
})(function () {
  'use strict';
  var o = ['decimals', 'thousand', 'mark', 'prefix', 'suffix', 'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'];
  function w(e) {
    return e.split('').reverse().join('');
  }
  function h(e, t) {
    return e.substring(0, t.length) === t;
  }
  function f(e, t, n) {
    if ((e[t] || e[n]) && e[t] === e[n]) throw new Error(t);
  }
  function x(e) {
    return 'number' == typeof e && isFinite(e);
  }
  function n(e, t, n, r, i, o, f, u, s, c, a, p) {
    var d,
      l,
      h,
      g = p,
      v = '',
      m = '';
    return (
      o && (p = o(p)),
      !!x(p) &&
        (!1 !== e && 0 === parseFloat(p.toFixed(e)) && (p = 0),
        p < 0 && ((d = !0), (p = Math.abs(p))),
        !1 !== e &&
          (p = (function (e, t) {
            return (
              (e = e.toString().split('e')),
              (+((e = (e = Math.round(+(e[0] + 'e' + (e[1] ? +e[1] + t : t)))).toString().split('e'))[0] + 'e' + (e[1] ? e[1] - t : -t))).toFixed(t)
            );
          })(p, e)),
        -1 !== (p = p.toString()).indexOf('.') ? ((h = (l = p.split('.'))[0]), n && (v = n + l[1])) : (h = p),
        t && (h = w((h = w(h).match(/.{1,3}/g)).join(w(t)))),
        d && u && (m += u),
        r && (m += r),
        d && s && (m += s),
        (m += h),
        (m += v),
        i && (m += i),
        c && (m = c(m, g)),
        m)
    );
  }
  function r(e, t, n, r, i, o, f, u, s, c, a, p) {
    var d,
      l = '';
    return (
      a && (p = a(p)),
      !(!p || 'string' != typeof p) &&
        (u && h(p, u) && ((p = p.replace(u, '')), (d = !0)),
        r && h(p, r) && (p = p.replace(r, '')),
        s && h(p, s) && ((p = p.replace(s, '')), (d = !0)),
        i &&
          (function (e, t) {
            return e.slice(-1 * t.length) === t;
          })(p, i) &&
          (p = p.slice(0, -1 * i.length)),
        t && (p = p.split(t).join('')),
        n && (p = p.replace(n, '.')),
        d && (l += '-'),
        '' !== (l = (l += p).replace(/[^0-9\.\-.]/g, '')) && ((l = Number(l)), f && (l = f(l)), !!x(l) && l))
    );
  }
  function i(e, t, n) {
    var r,
      i = [];
    for (r = 0; r < o.length; r += 1) i.push(e[o[r]]);
    return i.push(n), t.apply('', i);
  }
  return function e(t) {
    if (!(this instanceof e)) return new e(t);
    'object' == typeof t &&
      ((t = (function (e) {
        var t,
          n,
          r,
          i = {};
        for (void 0 === e.suffix && (e.suffix = e.postfix), t = 0; t < o.length; t += 1)
          if (void 0 === (r = e[(n = o[t])]))
            'negative' !== n || i.negativeBefore ? ('mark' === n && '.' !== i.thousand ? (i[n] = '.') : (i[n] = !1)) : (i[n] = '-');
          else if ('decimals' === n) {
            if (!(0 <= r && r < 8)) throw new Error(n);
            i[n] = r;
          } else if ('encoder' === n || 'decoder' === n || 'edit' === n || 'undo' === n) {
            if ('function' != typeof r) throw new Error(n);
            i[n] = r;
          } else {
            if ('string' != typeof r) throw new Error(n);
            i[n] = r;
          }
        return f(i, 'mark', 'thousand'), f(i, 'prefix', 'negative'), f(i, 'prefix', 'negativeBefore'), i;
      })(t)),
      (this.to = function (e) {
        return i(t, n, e);
      }),
      (this.from = function (e) {
        return i(t, r, e);
      }));
  };
});
;
const body = document.querySelector('body');
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelector('.lock-padding');

let unlock = true;

const timeOut = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const curentEl = popupCloseIcon[i];
    curentEl.addEventListener('click', function (e) {
      popupClose(curentEl.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPaddingValue.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeOut);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeOut);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
;
const manuIcon = document.querySelector('.manu__icon');
const manuBody = document.querySelector('.manu__body');

if (manuIcon) {
  manuIcon.addEventListener('click', (e) => {
    manuIcon.classList.toggle('active');
    manuBody.classList.toggle('active');
    body.classList.toggle('lock');
  });
}
;
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};

if (isMobile.any()) {
  body.classList.add('touch');

  let manuArrows = document.querySelectorAll('.manu__arrow');

  if (manuArrows.length > 0) {
    for (let i = 0; i < manuArrows.length; i++) {
      const manuArrow = manuArrows[i];
      manuArrow.addEventListener('click', (e) => {
        manuArrow.parentElement.classList.toggle('active');
      });
    }
  }
} else {
  body.classList.add('mouse');
}
;
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
;
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
;
function animOnScroll(params) {
  for (let i = 0; i < animElements.length; i++) {
    const animElement = animElements[i];
    const animElementHeight = animElement.offsetHeight;
    const animElementOffset = offset(animElement).top;
    const animStart = 4;

    let animElementPoint = window.innerHeight - animElementHeight / animStart;

    if (animElementHeight > window.innerHeight) {
      animElementPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (pageYOffset > animElementOffset - animElementPoint && pageYOffset < animElementOffset + animElementHeight) {
      animElement.classList.add('anim');
    } else {
      if (!animElement.classList.contains('anim-no-hide')) {
        animElement.classList.remove('anim');
      }
    }
  }
}
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
if (animElements.length > 0) {
  animOnScroll();
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
;

