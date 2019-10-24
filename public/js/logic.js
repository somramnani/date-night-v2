//__________________________________________________________
//GLOBAL VARIABlES
//__________________________________________________________
  var header = $(".navbar");
 
  var startButton = $("#getstartedbutton");




//__________________________________________________________


//__________________________________________________________
//ANIMATION FUNCTIONS
//__________________________________________________________

$(function() {  
    
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    // console.log(scroll);

    function displayNavBar(){
      if (scroll >= 569.5999755859375) {

        header.addClass("fixed-top fadeInDown");
        header.removeClass("bg-transparent fadeInUp");

      } 
      else {
        header.removeClass("fixed-top fadeInDown ");
        header.addClass("bg-transparent fadeInUp");			
      }
    }
    
    displayNavBar();

    
  });
});

//__________________________________________________________