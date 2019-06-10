$("#analyze").on('click', function(){
    // window.location = window.location.href+"/dashboard";
    console.log("hi there");
});

$(function () {
    $("nav").prepend('<div class="overlay"></div>');

    $('#dismiss, .overlay').on('click', function () {
        $('#navbar-sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#navbar-sidebar').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('.overlay').addClass('active');

    });
});


$(function () {
    var $window = $(window);
    var $targets = $('#hidden_id1');
    var windowHeight = $window.height();

    $window.on('scroll', function () {
        var position = $window.scrollTop();
        var windowBottom = position + (windowHeight / 2); // trigger at middle of window

        // loop through targets to see if any are in view...
        $targets.each(function (i) {
            var $this = $(this);
            var thisPos = $this.offset().top;

            if (windowBottom > thisPos) {

                setTimeout(function () {
                    $('#hidden_id1').attr('id', 'animateht1');

                    setTimeout(function () {
                        $('#hidden_id2').attr('id', 'animateht2');

                        setTimeout(function () {
                            $('#hidden_id3').attr('id', 'animateht3');
                        }, 1000);
                        
                    }, 1000);

                }, 200);

            }
        });
    });
});
