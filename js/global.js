// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//   target: document.querySelector("#scroll-container"),
//   ease: 0.05, // <= scroll speed
//   endY: 0,
//   y: 0,
//   resizeRequest: 1,
//   scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
//   rotation: 0.01,
//   force3D: true
// });

// window.addEventListener("load", onLoad);

// function onLoad() {    
//   updateScroller();  
//   window.focus();
//   window.addEventListener("resize", onResize);
//   document.addEventListener("scroll", onScroll); 
// }

// function updateScroller() {
  
//   var resized = scroller.resizeRequest > 0;
    
//   if (resized) {    
//     var height = scroller.target.clientHeight;
//     body.style.height = height + "px";
//     scroller.resizeRequest = 0;
//   }
      
//   var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

//   scroller.endY = scrollY;
//   scroller.y += (scrollY - scroller.y) * scroller.ease;

//   if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//     scroller.y = scrollY;
//     scroller.scrollRequest = 0;
//   }
  
//   TweenLite.set(scroller.target, { 
//     y: -scroller.y 
//   });
  
//   requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
//   scroller.scrollRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

// function onResize() {
//   scroller.resizeRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

(function () {

  // Default smooth scroll settings
  var defaultOptions = {
    frameRate: 150,        // 150fps animation
    animationTime: 1000,   // Total scroll duration (in ms)
    stepSize: 120,         // Pixel distance per scroll step
    pulseAlgorithm: true,  // Enable smooth easing
    pulseScale: 4,         // Scaling factor for pulse easing
    pulseNormalize: 1,     // Normalize easing calculations
    accelerationDelta: 20,  // Acceleration threshold
    accelerationMax: 1,
    keyboardSupport: true,  // Enable keyboard scrolling
    arrowScroll: 50
  };

  var options = defaultOptions;

  // Queue and status variables
  var que = [];
  var pending = false;

  var lastScroll = Date.now();
  var direction = { x: 0, y: 0 };

  var requestFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  /**
   * Generalized scroll array logic
   */
  function scrollArray(elem, deltaX, deltaY) {
    directionCheck(deltaX, deltaY);

    // Calculate acceleration and apply easing
    if (options.accelerationMax !== 1) {
      const now = Date.now();
      const elapsed = now - lastScroll;

      if (elapsed < options.accelerationDelta) {
        const factor = (1 + (50 / elapsed)) / 2;
        deltaX *= factor;
        deltaY *= factor;
      }

      lastScroll = now;
    }

    que.push({
      x: deltaX,
      y: deltaY,
      lastX: deltaX < 0 ? 0.99 : -0.99,
      lastY: deltaY < 0 ? 0.99 : -0.99,
      start: Date.now()
    });

    if (!pending) {
      pending = true;
      requestFrame(function () {
        processScrollQueue(elem);
      });
    }
  }

  function processScrollQueue(elem) {
    const now = Date.now();
    let scrollX = 0,
      scrollY = 0;

    for (let i = 0; i < que.length; i++) {
      const item = que[i];
      const elapsed = now - item.start;
      const progress = Math.min(1, elapsed / options.animationTime);

      const easeProgress = options.pulseAlgorithm
        ? easePulse(progress)
        : progress;

      const x = item.x * easeProgress - item.lastX;
      const y = item.y * easeProgress - item.lastY;

      scrollX += x;
      scrollY += y;

      item.lastX += x;
      item.lastY += y;

      if (elapsed >= options.animationTime) {
        que.splice(i, 1);
        i--;
      }
    }

    elem.scrollBy(scrollX, scrollY);

    if (que.length) {
      requestFrame(() => processScrollQueue(elem));
    } else {
      pending = false;
    }
  }

  /**
   * Apply smooth easing with a pulse
   */
  function easePulse(x) {
    x = x * options.pulseScale;
    if (x < 1) {
      return x - (1 - Math.exp(-x));
    }
    return Math.exp(-1) + (1 - Math.exp(-(x - 1)));
  }

  /**
   * Normalize scrolling direction.
   */
  function directionCheck(x, y) {
    const newDirectionX = x > 0 ? 1 : -1;
    const newDirectionY = y > 0 ? 1 : -1;

    if (direction.x !== newDirectionX || direction.y !== newDirectionY) {
      direction.x = newDirectionX;
      direction.y = newDirectionY;
      que = [];
      lastScroll = 0;
    }
  }

  /**
   * Mouse wheel handler
   */
  function wheel(event) {
    const deltaX = event.deltaX || 0;
    const deltaY = event.deltaY || 0;

    scrollArray(document.scrollingElement || document.body, deltaX, deltaY);
    event.preventDefault();
  }

  /**
   * Attach event listeners
   */
  function init() {
    if ('onwheel' in document) {
      document.addEventListener('wheel', wheel, { passive: false });
    } else if ('onmousewheel' in document) {
      document.addEventListener('mousewheel', wheel, { passive: false });
    }

    if (options.keyboardSupport) {
      document.addEventListener('keydown', keyboardHandler, { passive: false });
    }
  }

  function keyboardHandler(event) {
    let deltaY = 0;

    switch (event.keyCode) {
      case 38: // up
        deltaY = -options.arrowScroll;
        break;
      case 40: // down
        deltaY = options.arrowScroll;
        break;
      case 32: // spacebar
        deltaY = options.arrowScroll;
        break;
      default:
        return true;
    }

    scrollArray(document.scrollingElement || document.body, 0, deltaY);
    event.preventDefault();
  }

  init();

})();

$(document).ready(function($) {
    $( ".accordion li" ).each(function( index ) {
        $(this).children('.accordion-head').on("click", function(){
           if($(this).parent().hasClass('active')){
              $(this).parent().removeClass('active');
              $(this).parent().children('.accordion-body').slideUp();
           }
    
           else{
              $(this).parent().children('.accordion-body').slideDown();
              $(this).parent().addClass('active');
           }
  
           //$(this).parent().children('.accordion-body').slideDown();
           $(this).parent().siblings().children( ".accordion-body" ).slideUp(); 
           $(this).parent().siblings().removeClass('active');
        });
    });

    $('header .hamburger-menu').on("click", function(){
      $('header .menu').fadeToggle();
      $(this).toggleClass('active');
      $('html').toggleClass('menu-open');
    });


    var owl = $('.gallery1');
    owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 5000,
        dots: false,
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 1,
          },
          // breakpoint from 575 up
          575 : {
            items: 2,
          },
          // breakpoint from 768 up
          768 : {
            items: 3,
          },
          // breakpoint from 1024 up
          1024 : {
            items: 4,
          }
        }
    });

    var owl = $('.gallery2');
    owl.owlCarousel({
        items: 4,
        loop: true,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 5000,
        dots: false,
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 1,
          },
          // breakpoint from 575 up
          575 : {
            items: 2,
          },
          // breakpoint from 768 up
          768 : {
            items: 3,
          },
          // breakpoint from 1024 up
          1024 : {
            items: 4,
          }
        }
    });

    // $('.owl-carousel').each(function() {
    //     var owl = $(this);  // Reference to the current owl instance
    //     owl.on('mousewheel', '.owl-stage', function (e) {
    //         if (e.deltaY > 0) {
    //             owl.trigger('next.owl'); // Go to next slide
    //         } else {
    //             owl.trigger('prev.owl'); // Go to previous slide
    //         }
    //         e.preventDefault(); // Prevent default behavior (scrolling the page)
    //     });
    // });

    setTimeout(function() {
      // Hide the loader
      AOS.init({
        offset: 100, // default is 200px
      });
      
      AOS.refresh();
  
      new WOW().init();
    }, 2300); 
    

    $('.click-to-scroll').on('click', function () {
      const currentSection = $('.banner');
      const nextSection = currentSection.next('.banner + section');
      
      if (nextSection.length) {
        // Scroll to the next section
        $('html, body').animate(
          {
            scrollTop: nextSection.offset().top - 100,
          },
          {
            duration: 800,
            easing: 'swing',
          }
        );
      }
    });

    $('.scroll-up').on('click', function () {
      const nextSection = $('body');
      
      if (nextSection.length) {
        // Scroll to the next section
        $('html, body').animate(
          {
            scrollTop: nextSection.offset().top,
          },
          {
            duration: 1000,
            easing: 'swing',
          }
        );
      }
    });

    if ($(window).scrollTop() > 30) {
      $('header').addClass('fixed');
    } else {
      $('header').removeClass('fixed');
    }
    
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 30) {
        $('header').addClass('fixed');
      } else {
        $('header').removeClass('fixed');
      }
    });
});    



const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.take-charge');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .4, {
    x: e.pageX - 15,
    y: e.pageY - 15
  })
  TweenMax.to($smallBall, .1, {
    x: e.pageX - 5,
    y: e.pageY - 12
  })
}

// Hover an element
const $cursor = document.querySelector('.cursor');
 
function onMouseHover() {
  $cursor.classList.add('white');  
}

function onMouseHoverOut() {
    $cursor.classList.remove('white'); 
}
