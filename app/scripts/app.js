/**
 * Sticky Header
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {

  'use strict';

  var $win = $(window);
  var $hero = $('.module--hero');
  var $header = $('header');
  var $body = $('body');
  var $root = $('html, body');

  $win.on('scroll', function() {
    if ($(window).scrollTop() > ($hero.height() - $header.height())) {
      $body.addClass('has-fixed-header');
    } else {
      $body.removeClass('has-fixed-header');
    }
  });

  $('nav li a').click(function() {
    var href = $.attr(this, 'href'),
    	$trigger = $('#nav-trigger');

    if($trigger.prop('checked')) {
    	$trigger.attr('checked', false);
    }
    
    $('nav li a').removeClass('active');
	$(this).addClass('active');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
    
  });

})(jQuery, window, document);





/**
 * Map
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {
  L.mapbox.accessToken = 'pk.eyJ1IjoiamF3YnJleSIsImEiOiJnWFZxZDFJIn0.J8gkh8-6O-toLs5zD6wB-w';
  var map = L.mapbox.map('map', 'jawbrey.gafj3efk');
  map.setView([30.286475, -97.731209], 15);

  // Build a marker from a simple GeoJSON object:
  var marker = L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-97.731209, 30.286475]
      },
      properties: {
        title: '<h3 style="text-align:center;">Nico Muhly: How Little You Are</h3>',
        description: '<div style="width:100%;text-align:center;">Conspirare @ Bass Concert Hall<br />April 18, 2015, 8 PM<br />More info at <a href="http://conspirare.org/event/nico-muhlys-how-little-you-are/">conspirare.org</a>.</div>',
        'marker-size': 'large',
        'marker-color': '#548cba',
      }
  }).addTo(map);

  // Disable drag and zoom handlers.
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  // Iterate over the featureLayer we've called "marker"
  // and open its popup instead of clicking to trigger it.
  marker.eachLayer(function(m) {
    m.openPopup();
  });
})(jQuery, window, document);





/**
 * Navigation
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {
  'use strict';
  var $win = $(window),
    active,
    el;

  // Creates a "named" logging function.
	function setActive() {
	  return function(_, a) {
	  	$('nav li a').removeClass('active');
	    $('nav li a.' + a).addClass('active');
	    if(a !== 'hero') {
	    	//window.location.replace('/#'+ a);
	    	//window.location.hash = a;
	    	history.pushState(null, null, '#'+a);
        if (window._gaq !== undefined) { window._gaq.push(['_trackPageview', '/'+a]); }
	    } else {
	    	history.pushState(null, null, '/');
        if (window._gaq !== undefined) { window._gaq.push(['_trackPageview', '/']); }
	    	//window.location.hash = '';
	    }
      console.log(a);
      if(a === 'biography' || a === 'audio' || a === 'repertoire') {
        $('label[for="nav-trigger"]').addClass('dark');
      } else {
        $('label[for="nav-trigger"]').removeClass('dark');
      }
	  };
	}

	$.subscribe('section.active', setActive('section.active'));

	$win.on('scroll', function() {
		
		if(document.elementFromPoint(0, 49).id) {
			el = document.elementFromPoint(0, 49).id;
		}
		if(active !== el) {
			active = el;
			$.publish('section.active', el);
		} 
	});


})(jQuery, window, document);





/**
 * Footer
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {

	'use strict';

  	var currYear = new Date().getFullYear();
  	$('footer .copyright').html('&copy;' + currYear + ' Jason Awbrey. All rights reserved.');

})(jQuery, window, document);





