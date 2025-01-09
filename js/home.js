$(document).ready(function($) {
    var typing=new Typed(".text", {
      strings: ["developm<b>ent</b>" , "Engineeri<b>ng</b>", "Managem<b>ent</b>"],
      typeSpeed: 100,
      backSpeed: 40,
      loop: true,
    });

    var swiper = new Swiper(".mySwiper", {
      effect: 'cards',
      grabCursor: true,
      speed: 800,
      initialSlide: 5,
      mousewheel: true,
      arrows: true,
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
    });
});

function makeNewPosition() {
  // Get the dimensions of the parent wrapper
  var wrapper = $('.banner .img-wrap');
  var wrapperHeight = wrapper.height();
  var wrapperWidth = wrapper.width();

  // Get the dimensions of the image
  var divHeight = $('.banner .img-wrap img').outerHeight(true); // true includes margins
  var divWidth = $('.banner .img-wrap img').outerWidth(true);

  // Calculate a new random position
  var nh = Math.floor(Math.random() * (wrapperHeight - divHeight));
  var nw = Math.floor(Math.random() * (wrapperWidth - divWidth));

  return [nh, nw];
}

function animateDiv(myclass) {
  // Set the initial position to start at 30% top and 20% left
  var wrapper = $('.banner .img-wrap');
  var initialTop = wrapper.height() * 0.08; // 10% of the wrapper's height
  var initialLeft = wrapper.width() * 0.2; // 20% of the wrapper's width

  $(myclass).css({
    top: initialTop,
    left: initialLeft,
  });

  function move() {
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 4000, function() {
      move();
    });
  }

  move();
}

$(document).ready(function() {
  setTimeout(function() {
    animateDiv('.banner .img-wrap img');
  }, 2000);
});