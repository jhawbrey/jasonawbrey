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
 *

;(function($, window, document, undefined) {
  L.mapbox.accessToken = 'pk.eyJ1IjoiamF3YnJleSIsImEiOiJnWFZxZDFJIn0.J8gkh8-6O-toLs5zD6wB-w';
  var map = L.mapbox.map('map', 'jawbrey.n9le2i3f');
  map.setView([32.8515, -96.759], 15);

  // Build a marker from a simple GeoJSON object:
  var marker = L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-96.759, 32.8515]
      },
      properties: {
        title: '<h3 style="text-align:center;">Nature\'s Song</h3>',
        description: '<div style="width:100%;text-align:center;">CCGD @ Zion Lutheran Church<br />October 4, 3:30 PM<br />Jason Awbrey, baritone; Erika Kinser, piano<br />More info at <a href="http://www.thechildrenschorus.org/current-season.html">thechildrenschorus.org</a>.</div>',
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

*/



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
 * Map
 * --------------------------------------------------
 */

;(function($, window, document, undefined) {
  'use strict';

  L.mapbox.accessToken = 'pk.eyJ1IjoiamF3YnJleSIsImEiOiJnWFZxZDFJIn0.J8gkh8-6O-toLs5zD6wB-w';
  var geojson = [
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.759208,
                32.851958
              ]
            },
            "properties": {
              "organization": "Children's Chorus of Greater Dallas",
              "date": "Oct 4, 2015",
              "time": "3:30 pm",
              "title": "Nature's Song",
              "url":"",
              "venue":"Zion Lutheran Church",
              "address": "6121 E Lovers Ln",
              "city": "Dallas",
              "country": "United States",
              "crossStreet": "at 15th St NW",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.376348,
                34.004277
              ]
            },
            "properties": {
              "organization": "Vox Humana",
              "date": "Oct 8, 2015",
              "time": "7:30 pm",
              "title": "Sing Joyfully",
              "url":"",
              "venue":"Southeastern Oklahoma State University",
              "address": "1405 N 4th Ave",
              "city": "Durant",
              "country": "United States",
              "state": "OK"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.723976,33.17728
              ]
            },
            "properties": {
              "organization": "Vox Humana",
              "date": "Oct 10, 2015",
              "time": "7:30 pm",
              "title": "Sing Joyfully",
              "url":"",
              "venue":"St. Francis of Assisi Catholic Church",
              "address": "8000 W. Eldorado Parkway",
              "city": "Frisco",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.80302,32.858893
              ]
            },
            "properties": {
              "organization": "Vox Humana",
              "date": "Oct 11, 2015",
              "time": "6:00 pm",
              "title": "Sing Joyfully",
              "url":"",
              "venue":"University Park United Methodist Church",
              "address": "4024 Caruth Blvd",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.796489,32.790807
              ]
            },
            "properties": {
              "organization": "Orpheus Chambers Singers",
              "date": "Oct 18, 2015",
              "time": "7:00 pm",
              "title": "Masterworks Ancient & Modern",
              "url":"",
              "venue":"City Performance Hall",
              "address": "2520 Flora Street",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.754983,32.832916
              ]
            },
            "properties": {
              "organization": "Vox Humana",
              "date": "Dec 5, 2015",
              "time": "7:30 pm",
              "title": "Serenity",
              "url":"",
              "venue":"St. Thomas Aquinas Catholic Church",
              "address": "6306 Kenwood Ave",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.80302,32.858893
              ]
            },
            "properties": {
              "organization": "Vox Humana",
              "date": "Dec 6, 2015",
              "time": "4:00 pm",
              "title": "Holiday Pops",
              "url":"",
              "venue":"University Park United Methodist Church",
              "address": "4024 Caruth Boulevard",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.787448,32.940838
              ]
            },
            "properties": {
              "organization": "Orpheus Chamber Singers",
              "date": "Dec 17, 2015",
              "time": "8:00 pm",
              "title": "An Orpheus Christmas",
              "url":"",
              "venue":"Episcopal Church of the Transfiguration",
              "address": "14115 Hillcrest",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.754983,32.832916
              ]
            },
            "properties": {
              "organization": "Orpheus Chamber Singers",
              "date": "Dec 19, 2015",
              "time": "7:00 pm",
              "title": "An Orpheus Christmas",
              "url":"",
              "venue":"Saint Thomas Aquinas Catholic Church",
              "address": "6306 Kenwood",
              "city": "Dallas",
              "country": "United States",
              "state": "TX"
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -96.650572,33.121957
              ]
            },
            "properties": {
              "organization": "Orpheus Chamber Singers",
              "date": "Dec 20, 2015",
              "time": "7:00 pm",
              "title": "An Orpheus Christmas",
              "url":"",
              "venue":"Saint Jude Catholic Church",
              "address": "1515 N Greenville Ave",
              "city": "Allen",
              "country": "United States",
              "state": "TX"
            }
          }
        ]
      }
  ];
  var map = L.mapbox.map('map', 'examples.map-i80bb8p3')
  .setView([32.851958, -96.759208], 16);

  map.scrollWheelZoom.disable();

  var listings = document.getElementById('listings');
  var locations = L.mapbox.featureLayer().addTo(map);

  locations.setGeoJSON(geojson);

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

    // Each marker on the map.
    var popup = '<h3>' + prop.venue + '</h3><div>' + prop.address;

    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';

    //var eventDate = lists

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';

    link.innerHTML = prop.title;
    if (prop.date) {
      link.innerHTML += '<br /><small class="quiet">' + prop.organization + '</small>';
      popup += '<br /><small class="quiet">' + prop.date + ' &middot; ' + prop.time + '</small>';
      popup += '<br/><small class="quiet"><a href="#">More info &raquo;</a></small>';
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
