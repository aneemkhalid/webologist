const imgContainer = document.querySelector(".banner");  // Select the banner container
const imgWrap = document.querySelector(".img-wrap");      // Select the image wrapper inside the banner

const move = function(e) {
  // Get the mouse position relative to the imgContainer (the .banner)
  let x = e.pageX - imgContainer.offsetLeft - imgContainer.offsetWidth / 2;
  let y = e.pageY - imgContainer.offsetTop - imgContainer.offsetHeight / 2;
  
  // Calculate the movement in percentage terms for rotation
  let xPourcent = x * 100 / imgContainer.offsetWidth / 20;
  let yPourcent = y * 100 / imgContainer.offsetHeight / 20;
  
  // Apply the rotation effect to the image inside .img-wrap
  imgWrap.style.transform = "rotate("+ -yPourcent +"deg)";
};

const reinit = function() {
  // Reset the transform on the image after the mouse leaves the banner
  setTimeout(() => {
    imgWrap.style.transform = "";
  }, 500);
};

// Add event listeners to the banner container, not just the image
imgContainer.addEventListener("mousemove", move);  // Mouse move on .banner

$(document).ready(function($) {

    var typing=new Typed(".text", {
      strings: ["developm<b>ent</b>" , "developm<b>ent</b>"],
      typeSpeed: 100,
      backSpeed: 40,
      loop: true,
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