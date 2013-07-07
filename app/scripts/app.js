/*global define */
define(['jquery', 'skrollr'], function ($, skrollr) {
    'use strict';
    
    var $window = $(window), 
    	$fixedNav = $(".fixedNav"), 
    	lastScrollTop = $window.scrollTop(), 
		wasScrollingDown = true, 
		bannerHeight = $('.banner.hero').height(), 
		initialFixedNavTop = $fixedNav.offset().top;


        skrollr.init({
            forceHeight: false
        });


        $(".scroll").click(function(event){
             event.preventDefault();
             //calculate destination place
             var dest=0;
             if($(this.hash).offset().top > $(document).height()-$(window).height()){
                  dest=$(document).height()-$(window).height() - 51;
             }else{
                  dest=$(this.hash).offset().top - 51;
             }
             //go to destination
             $('html,body').animate({scrollTop:dest}, 1000,'swing');
         });

/*
   	$('.pl[data-type="background"]').each(function(){
		var $bgobj = $(this); // assigning the object

		$(window).scroll(function() {
			// Scroll the background at var speed
			// the yPos is a negative value because we're scrolling it UP!								
			var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
			
			// Put together our final background position
			var coords = '50% '+ yPos + 'px';

			// Move the background
			$bgobj.css({ backgroundPosition: coords });
		
		}); // window scroll Ends

 	});
*/

    $window.scroll(function(event) {

        var windowHeight = $window.height(), 
         	fixedNavHeight = $fixedNav.outerHeight(), 

         	scrollTop = $window.scrollTop(), 
         	scrollBottom = scrollTop + windowHeight, 

         	fixedNavTop = $fixedNav.offset().top, 
         	fixedNavBottom = fixedNavTop + fixedNavHeight, 

         	heightDelta = Math.abs((windowHeight - fixedNavHeight)), 
         	scrollDelta = lastScrollTop - scrollTop, 

         	isScrollingDown = (scrollTop > lastScrollTop), 
         	isWindowLarger = (windowHeight > fixedNavHeight), 

         	dragBottomDown = (fixedNavBottom <= scrollBottom && isScrollingDown),
        	dragTopUp = (fixedNavTop >= scrollTop && !isScrollingDown),
        	reachedBottom = '';

     	//console.log(bannerHeight + ' ' + scrollTop);
     	//console.log('fixedNavTop: ' + fixedNavTop + ', ' + 'fixedNavBottom: ' + fixedNavBottom)
     	//console.log((bannerHeight - windowHeight) + fixedNavHeight + ': ' + scrollTop);

         if(scrollTop >= bannerHeight && dragBottomDown) {
         	$fixedNav.addClass('top');
         }

    	if(scrollTop < bannerHeight && dragTopUp) {
         	$fixedNav.removeClass('top');
         }
		if(((bannerHeight - windowHeight) + fixedNavHeight) < scrollTop && dragBottomDown) {
         	$fixedNav.removeClass('bottom');
         }

		if(!$fixedNav.hasClass('bottom') && scrollTop < ((bannerHeight - windowHeight) + fixedNavHeight)) {
         	$fixedNav.addClass('bottom');
         }
        	 
/*
        console.log("dragBottomDown: " + dragBottomDown);
        console.log("dragTopUp: " + dragTopUp);
        
        console.log("-------------------");
*/

        lastScrollTop = scrollTop;
        wasScrollingDown = isScrollingDown;

    });

});