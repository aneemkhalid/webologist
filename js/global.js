$(document).ready(function($) {
    animateDiv('.banner .img-wrap img');


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
        dots: false

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
        dots: false
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

    AOS.init();

    new WOW().init();

    $('.click-to-scroll').on('click', function () {
      const currentSection = $('.banner');
      const nextSection = currentSection.next('.banner + section');
      
      if (nextSection.length) {
        // Scroll to the next section
        $('html, body').animate(
          {
            scrollTop: nextSection.offset().top + 1,
          },
          {
            duration: 800,
            easing: 'swing',
          }
        );
      }
    });
});    

function makeNewPosition() {
    // Get the dimensions of the parent wrapper
    var wrapper = $('.banner .img-wrap');
    var wrapperHeight = wrapper.height();  // Height of wrapper (100vh)
    var wrapperWidth = wrapper.width();    // Width of wrapper (640px)

    // Get the dimensions of the div.a
    var divHeight = $('.banner .img-wrap img').height();      // 50px (height of div.banner .img-wrap img)
    var divWidth = $('.banner .img-wrap img').width();        // 50px (width of div.a)

    // Calculate the maximum position value within the wrapper's dimensions
    var nh = Math.floor(Math.random() * (wrapperHeight - divHeight));  // Random top position (ensures within height of wrapper)
    var nw = Math.floor(Math.random() * (wrapperWidth - divWidth));    // Random left position (ensures within width of wrapper)

    return [nh, nw];    
}

function animateDiv(myclass) {
    var newq = makeNewPosition();  // Get a random position inside the wrapper
    $(myclass).animate({ top: newq[0], left: newq[1] }, 4000, function() {
        animateDiv(myclass);  // Repeat the animation
    });
}

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

var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  TweenLite.set(scroller.target, { 
    y: -scroller.y 
  });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}