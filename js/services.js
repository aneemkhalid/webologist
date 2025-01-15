// $(document).ready(function($) {
//     $('.tab-menu ul li a').on('click', function (e) {
//         e.preventDefault(); // Prevent the default link behavior

//         $('.tab-menu li a').removeClass('active');
//         $(this).addClass('active');
        
//         const tabId = $(this).data('rel'); // Get the data-rel value from the clicked tab
//         const targetSection = $('#' + tabId); // Select the corresponding tab content by ID
      
//         if (targetSection.length) {
//           // Scroll to the target section
//           $('html, body').animate(
//             {
//               scrollTop: targetSection.offset().top + -103, // Adjust the offset (optional)
//             },
//             {
//               duration: 800,
//               easing: 'swing',
//             }
//           );
//         }
//       });
// });
$(document).ready(function($) {
  // Handle tab click behavior
  $('.tab-menu li a').on('click', function(){
      var target = $(this).attr('data-rel'); // Get the data-rel value

      // Remove active class from all tabs and tab content
      $('.tab-menu li a').removeClass('active');
      $(this).addClass('active');
      $(".tab-box").hide(); // Hide all tabs

      // Show the corresponding tab content
      $("#"+target).fadeIn(1000);
      return false;
  });

  // Check if there's a tab hash in the URL and activate that tab
  if(window.location.hash) {
    var targetTab = window.location.hash.substring(1); // Get the tab ID (e.g., tab-1)

    // Activate the corresponding tab menu item based on data-rel
    $('.tab-menu li a').removeClass('active'); // Remove 'active' class from all tabs
    $('.tab-menu li a[data-rel="'+targetTab+'"]').addClass('active'); // Add 'active' class to the correct tab

    // Show the corresponding tab content
    $(".tab-box").hide(); // Hide all tab contents
    $("#"+targetTab).fadeIn('slow'); // Show the target tab content

    $('html, body').animate({
      scrollTop: $("#" + targetTab).offset().top - 236 // Subtract 50px for the offset
    }, 1000);
  }
});