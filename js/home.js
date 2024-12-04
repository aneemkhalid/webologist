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