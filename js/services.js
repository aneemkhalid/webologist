$(document).ready(function($) {
    $('.tab-menu ul li a').on('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior

        $('.tab-menu li a').removeClass('active');
        $(this).addClass('active');
        
        const tabId = $(this).data('rel'); // Get the data-rel value from the clicked tab
        const targetSection = $('#' + tabId); // Select the corresponding tab content by ID
      
        if (targetSection.length) {
          // Scroll to the target section
          $('html, body').animate(
            {
              scrollTop: targetSection.offset().top + 3, // Adjust the offset (optional)
            },
            {
              duration: 800,
              easing: 'swing',
            }
          );
        }
      });
});