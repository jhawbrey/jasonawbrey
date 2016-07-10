
/**
 * Preloader
 * --------------------------------------------------


;(function($, window, document, undefined) {

  'use strict';

    $(window).load(function() {
        $('#preloader_3').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({'overflow':'visible'});
    })
})(jQuery, window, document);
*/

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
    .setView([63.426885,10.388494], 16);

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
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MDQ1ZTI0Mi00MDk2LTQ1M2QtOTliMS04MGFlZGVlYzAzMGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REZGMzBCRTM0QzZGMTFFNTlENzRFQzQ1QTYwRDA5N0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REZGMzBCRTI0QzZGMTFFNTlENzRFQzQ1QTYwRDA5N0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MDQ1ZTI0Mi00MDk2LTQ1M2QtOTliMS04MGFlZGVlYzAzMGIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODA0NWUyNDItNDA5Ni00NTNkLTk5YjEtODBhZWRlZWMwMzBiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pW38cwAABI1JREFUeNrsWk1IVFEYferoNDrjWDpSSImlaSBDRQsRqUiJILFFi4KCCmpVi3ZFBRFU1K5FrQoqKKhFi4YJIjQqQlpEhQhpaWISyqjk/OQ0/sz0nde945tXTPNz37uT+MHh3fsG7/nO3Ll/55oXi8WUxRx5SwKzbJ9QTnAQ7OyJCBJC7DlJiP1PAgsIawkNhHomLFlAaD+hj/CFMJ+rAvMJmwnbUxCVTOwLwjtCNJcErifsJFTwF4GZ6YJbH7w13s/dDV8Dvgp/JOQIRKZV4aXW4pDTag+uKa2caK9r7ju6sX2otKhY23MThGeET7IFYoy1Elr4ix7foP1k5/Vt3SO97sj8TFEqjVgLimaaVzf2XGs78dJduS6k+eg1oSubMZqNQCthL+s9xf8zZDny5OpW70B30+z8XGEmDRYWWGbba5vf3N596pVzmX2OvUYvPiJEzBSIieQwYTUqvRND9vaHp/cP+8eqRPzeq50rv3n3XXnQWFHDe3OEcCeTCShTgXsIm1CgMVZ50HPxgD/yo1Tk7Oe0lgTudZy7T2PUx169Jzw2Q2ATYRfvuZa7x4+JFqcV+frQjZuannxKeJPu1J4WJ6GNjzn8LI0Sp3JQ2yoHcbFXbSwHwwTuIKhkmFBEjblkAQ5wsaqF5WCIwJUEN18KMFuatZ8EFzhZ1c1yES6wia17Cta5TJeCTAJc4NSsvU2iBeazfaW6Q8EibvapAJzgZtX6VHNPVWA1wYYCtl+p7lBEBjjBzao2lpMwgfXx8UB7S1lnOx13vUiB5byAjbMsgTrucpEC7QtrU8ghS6CO2y5SYLxhfuSRETpuh0iBthy0W2wiBYZ5AYdVWYp03GGRAoMLG2B7UJZAHXdQpMD4NwebQZZAHXdIpMBJXoCHIkugjntSpMB+XoBBBA/FbHHgBPffchIhcJgParhfMIjMFghOjfMWZjkJExjVfmNwv2AQmSUOXODU9V5UpECFWQWqvwFrD+6XaWOPuDR2Yiwd2yIdgWM46/IKrD24X0aLAwe4NK96WC6GWBbPCapfCd8S1h6MIePWvZKAyrHgkc6xHAzzZPyETl6B2wVrzwiR3DbUOGoK4/an007WvijCBOMXYZovikhwttWuNc66R5jubKtrr6K5m4jPAGIvXxBS7ibif6/obpfiZzfd9dng928JHsq65VXDSa7PeEi9XdLGH/eDfxBd3nZeW4+deXkhSXvC7gctgiY9JDKg5OANryiBfDv3ls12i/KOPrHhvDyHzWZzdnR0VLpcrrLrq3q6tJ+fGHW3jo+PT3k8Hl84HPZTHoYcpIUKJFElym87rwyzfsKHl7a+TaiffbVF9+fYvE/hnEc5/RCVk0WQMMymqxgyPjQQXAA1N0rP0ZiAbz9fgDi0UZelOH2grTrWtlyBFCuUFD3KNMPB2pYu0GXgacklfZKhn9EGehQbJHCa8vsoWyB2L9UGCRym/CZkC8TPvNaAcYh1cYDyi0oVKHCZ0IawZcK8hf7fYchCb+hWjR74H5oiJraQlREzTNAsKwf+i61aLsaSwCWBOR6/BBgArucrhRJAlGgAAAAASUVORK5CYII=',
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
