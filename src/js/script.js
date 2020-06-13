var wow = new WOW({
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       false,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
    // the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
});
wow.init();
$('.lazy').lazy();

let menuActive = false,
    menuSize = false,
    detectMenu = false,
    modalIn = 'animate__fadeInDown',
    modalOut = 'animate__fadeOutUp',
    detectedModal = 0,
    paddingSection = 100;

$(document).ready(function(){
    $('body').addClass('loaded');

    $(".move-to").click(function(e) {
        e.preventDefault();
        let moveNow = $(this);
        $([document.documentElement, document.body]).animate({
            scrollTop: $(moveNow.attr('href')).offset().top - $('#top-menu').height()
        }, 1500);
    });

    $(".mobile-menu .move-to").click(function(e) {
        activatedMenu();
    });
    $("a[data-modal]").click(function(e) {
        e.preventDefault();
        $($(this).attr('href')).removeClass(modalOut);
        $($(this).attr('href')).addClass(modalIn);
        $(this).modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
        if ($('.menu-toggle').hasClass('active')) {
            activatedMenu();
        }
    });
    
    $('.modal_close').click(function(e) {
        e.preventDefault();
        $(this).parent('.modal').removeClass(modalIn);
        $(this).parent('.modal').addClass(modalOut);
        $(this).parent('.modal').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
            detectedModal++;
            if(detectedModal <= 1) {
                $.modal.close();
            } else {
                detectedModal = 0;
            }
        });
    });

    $('.menu-toggle').click(function(){
        activatedMenu();
    }); 

    $('.mobile-menu').hide();

    $(".form").submit(function(e) { //устанавливаем событие отправки для формы с id=form
        e.preventDefault();
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "send.php", //путь до php фаила отправителя
            data: form_data,
            success: function() {
                //код в этом блоке выполняется при успешной отправке сообщения
                alert("Ваше сообщение отправлено!");
            }
        });
    });

    addClassAnimation($('.big-word'), 'animate__fadeInLeft', 'animate__fadeInUp', 960);
    addClassAnimation($('.main-word'), 'animate__fadeInDown', 'animate__fadeInUp', 960);
    addClassAnimation($('.small-word'), 'animate__fadeInUp', 'animate__fadeInUp', 960); 

    addClassAnimation($('.portfolio-item'), 'fadeIn', 'fadeInUp', 1100);
    
    if ($(window).scrollTop() + $(window).height() > $('.skills-table').offset().top + $('.skills-table').height() / 2) {
        for( let i = 0; i < $('.progress-line').length; i++) {
            $('.progress-line')[i].style.width = $('.progress-line span')[i].innerHTML + '%';
        }
    }

    for( let i = 0; i < $('.progress-line').length; i++) {
        $('.progress-line')[i].style.transitionDelay =  i/5 + 's';
    }

    $(window).resize(function() {
        if ($(window).width() > 1100) {
            if ($('.menu-toggle').hasClass('active')) {
                activatedMenu();
            } 
        }

        if ($(window).width() < 960) {
            paddingSection = 50;
        }
    });

    $(window).scroll(function(e) {
        if ($(window).scrollTop() > 0) {
            $('#top-menu').addClass('top-menu-down');
        } else {
            $('#top-menu').removeClass('top-menu-down');
        }
        if ($(window).scrollTop() + $(window).height() > $('.skills-table').offset().top + $('.skills-table').height() / 2) {
            for( let i = 0; i < $('.progress-line').length; i++) {
                $('.progress-line')[i].style.width = $('.progress-line span')[i].innerHTML + '%';
            }
        }
        
        let allSection = document.querySelectorAll('section');
        allSection.forEach(function(index, value) {
            if ($(window).scrollTop() + $('#top-menu').height() + paddingSection > $('#'+index.id).offset().top && $(window).scrollTop() + $('#top-menu').height() + paddingSection < $('#'+index.id).offset().top + $('#'+index.id).height()) {
                $('.move-to').parent('li').removeClass('active');
                $('.move-to[href="#'+index.id+'"]').parent('li').addClass('active');
            } else if ($(window).scrollTop() + $('#top-menu').height() + paddingSection < $('#front-header').height()) {
                $('.move-to').parent('li').removeClass('active');
            }
        });
    });
});

function addClassAnimation(obj, classAnimationTop, classAnimationBot, widthWindow) {
    if ($(window).width() >= widthWindow) {
        obj.removeClass(classAnimationBot);
        obj.addClass(classAnimationTop);
    } else {
        obj.removeClass(classAnimationTop);
        obj.addClass(classAnimationBot);
    }
}

function activatedMenu() {
    $('.menu-toggle').toggleClass('active');
        
    if (!$('#top-menu').hasClass('top-menu-down') && detectMenu == false) {
        menuSize = true;
        detectMenu = true;
    } else if ($('#top-menu').hasClass('top-menu-down') && detectMenu == false) {
        menuSize = false;
        detectMenu = true;
    }

    if (menuSize == true && menuActive == true) {
        menuActive = false;
        detectMenu = false;
        $('#top-menu').removeClass('top-menu-down');
    } else if (menuSize == false && menuActive == true) {
        menuActive = false;
        detectMenu = false;
    } else if (menuSize == true && menuActive == false) {
        menuActive = true;
        $('#top-menu').addClass('top-menu-down');
    } else if (menuSize == false && menuActive == false) {
        menuActive = true;
    } 

    $('body').toggleClass('active-menu');

    if ( $('body').hasClass('active-menu')) {
        $('.mobile-menu').show(400);
    } else {
        $('.mobile-menu').hide(250);
    }
}