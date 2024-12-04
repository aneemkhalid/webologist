$(document).ready(function($) {
    $('.tab-menu li a').on('click', function(){
        var target = $(this).attr('data-rel');

        $('.tab-menu li a').removeClass('active');
        $(this).addClass('active');
        $("#"+target).fadeIn('slow').siblings(".tab-box").hide();
        return false;
    });
});