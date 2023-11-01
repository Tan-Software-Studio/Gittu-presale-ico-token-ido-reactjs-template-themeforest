(function ($) {
    ("use strict");

    $('.sidebar-nav').singlePageNav({
        offset: $('.single-page-nav').outerHeight(),
        threshold: 120,
        speed: 400,
        currentClass: 'active',
        easing: 'swing',
        filter: ':not(.external)',

        beforeStart: function () {
            console.log('begin scrolling');
        },
        onComplete: function () {
            console.log('done scrolling');
        }
    });

})(jQuery);