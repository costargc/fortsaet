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


$(function(){
    var $window = $(window);
    var $targets = $('#hidden_id1');
    var windowHeight = $window.height();
    
    $window.on('scroll', function(){
      var position = $window.scrollTop();
      var windowBottom = position + (windowHeight/2); // trigger at middle of window
  
      // loop through targets to see if any are in view...
      $targets.each(function(i){
        var $this = $(this);
        var thisPos = $this.offset().top;
  
        if (windowBottom > thisPos) {
          // trigger animation...
          $this.attr('id', 'animateht1');
        }
      });
    });
  });
  
$(function(){
    var $window = $(window);
    var $targets = $('#hidden_id2');
    var windowHeight = $window.height();
    
    $window.on('scroll', function(){
      var position = $window.scrollTop();
      var windowBottom = position + (windowHeight/2); // trigger at middle of window
  
      // loop through targets to see if any are in view...
      $targets.each(function(i){
        var $this = $(this);
        var thisPos = $this.offset().top;
  
        if (windowBottom > thisPos) {
          // trigger animation...
          setTimeout(function(){ 
            $this.attr('id', 'animateht2');
            }, 1000);
        }
      });
    });
  });
  
$(function(){
    var $window = $(window);
    var $targets = $('#hidden_id3');
    var windowHeight = $window.height();
    
    $window.on('scroll', function(){
      var position = $window.scrollTop();
      var windowBottom = position + (windowHeight/2); // trigger at middle of window
  
      // loop through targets to see if any are in view...
      $targets.each(function(i){
        var $this = $(this);
        var thisPos = $this.offset().top;
  
        if (windowBottom > thisPos) {
          // trigger animation...
          setTimeout(function(){ 
            $this.attr('id', 'animateht3');
            }, 2000);
        }
  
      });
    });
  });