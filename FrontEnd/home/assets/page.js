$(function(){  
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