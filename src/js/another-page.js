$(document).ready(function(){
    $('header').css('paddingTop', $('#top-menu').height() + 'px');
    $(window).resize(function() {
        $('header').css('paddingTop', $('#top-menu').height() + 'px');
    });
});