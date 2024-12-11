// const imgContainer = document.querySelector(".banner");  // Select the banner container
// const imgWrap = document.querySelector(".img-wrap");      // Select the image wrapper inside the banner

// const move = function(e) {
//   // Get the mouse position relative to the imgContainer (the .banner)
//   let x = e.pageX - imgContainer.offsetLeft - imgContainer.offsetWidth / 2;
//   let y = e.pageY - imgContainer.offsetTop - imgContainer.offsetHeight / 2;
  
//   // Calculate the movement in percentage terms for rotation
//   let xPourcent = x * 100 / imgContainer.offsetWidth / 20;
//   let yPourcent = y * 100 / imgContainer.offsetHeight / 20;
  
//   // Apply the rotation effect to the image inside .img-wrap
//   imgWrap.style.transform = "rotate("+ -yPourcent +"deg)";
// };

// const reinit = function() {
//   // Reset the transform on the image after the mouse leaves the banner
//   setTimeout(() => {
//     imgWrap.style.transform = "";
//   }, 500);
// };

// // Add event listeners to the banner container, not just the image
// imgContainer.addEventListener("mousemove", move);  // Mouse move on .banner

$(document).ready(function($) {

    var typing=new Typed(".text", {
      strings: ["developm<b>ent</b>" , "developm<b>ent</b>"],
      typeSpeed: 100,
      backSpeed: 40,
      loop: true,
      });
});

animateDiv('.banner .img-wrap img');

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