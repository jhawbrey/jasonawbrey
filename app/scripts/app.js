






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
	    	history.pushState(null, null, '#'+a);
	    } else {
	    	history.pushState(null, null, '/');
	    }
      if(a === 'biography' || a === 'audio' || a === 'repertoire') {
        $('label[for="nav-trigger"]').addClass('dark');
      } else {
        $('label[for="nav-trigger"]').removeClass('dark');
      }

      ga('send', {
        hitType: 'event',
        eventCategory: 'Section',
        eventAction: 'view',
        eventLabel: a
      });
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
 * Map
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {
  'use strict';
  var geojson = $.getJSON('data/geo.json');
  L.mapbox.accessToken = 'pk.eyJ1IjoiamF3YnJleSIsImEiOiJnWFZxZDFJIn0.J8gkh8-6O-toLs5zD6wB-w';

  geojson.done(function(data) {
    var map = L.mapbox.map('map', 'examples.map-i80bb8p3')
    .setView([32.790807, -96.796489], 16);

    // Disable drag and zoom handlers.
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

    var listings = document.getElementById('listings');
    var locations = L.mapbox.featureLayer().addTo(map);

    locations.setGeoJSON(data);

    function setActive(el) {
      var siblings = listings.getElementsByTagName('div');
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
        .replace(/active/, '').replace(/\s\s*$/, '');
      }

      el.className += ' active';
    }

    locations.eachLayer(function(locale) {

      // Shorten locale.feature.properties to just `prop` so we're not
      // writing this long form over and over again.
      var prop = locale.feature.properties;
      if(prop.timestamp) {
        var datetime = new Date(prop.timestamp).toString().split(" ");
        prop.day = datetime[2];
        prop.month = datetime[1];
      }

      // Each marker on the map.
      var popup = '<h3>' + prop.venue + '</h3><div>' + prop.address;
      popup += '<br /><small class="quiet">' + prop.date + ' &middot; ' + prop.time + '</small>';
      popup += '<br/><small class="quiet"><a href="' + prop.url + '">More info &raquo;</a></small>';


      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';

      //var eventDate = lists

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';

      link.innerHTML = prop.title;
      if (prop.date) {
        link.innerHTML += '<div class="date"><span class="day">' + prop.day + '</span>' + prop.month + '</div>';
        link.innerHTML += '<br /><small class="quiet">' + prop.organization + '</small>';
      }

      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.city + ', ' + prop.state;


      link.onclick = function() {
        setActive(listing);

        // When a menu item is clicked, animate the map to center
        // its associated locale and open its popup.
        map.setView(locale.getLatLng(), 16);
        locale.openPopup();
        return false;
      };

      // Marker interaction
      locale.on('click', function(e) {
        // 1. center the map on the selected marker.
        map.panTo(locale.getLatLng());

        // 2. Set active the markers associated listing.
        setActive(listing);
      });

      popup += '</div>';
      locale.bindPopup(popup);

      locale.setIcon(L.icon({
        iconUrl: 'images/marker.png',
        iconSize: [56, 56],
        iconAnchor: [28, 28],
        popupAnchor: [0, -34]
      }));

    });

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
