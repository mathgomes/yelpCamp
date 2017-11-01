window.onload = function() {
    
    $(window).scroll(function() {
        if($(window).scrollTop() > 10) {
            $("#navbar").addClass("scrolled");
            $('#navbar .nav-link').attr('id', 'scrolledId');
        }
        else {
            $("#navbar").removeClass("scrolled");
            $('#navbar .nav-link').removeAttr('id');
        }
        
    });
}