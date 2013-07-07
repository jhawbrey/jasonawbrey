/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-headphones' : '&#xe000;',
			'icon-html5' : '&#xe001;',
			'icon-html5-2' : '&#xe002;',
			'icon-soundcloud' : '&#xe003;',
			'icon-soundcloud-2' : '&#xe004;',
			'icon-github' : '&#xe005;',
			'icon-vimeo' : '&#xe00a;',
			'icon-twitter' : '&#xe00b;',
			'icon-monitor' : '&#xe00c;',
			'icon-linkedin' : '&#xe00d;',
			'icon-quill' : '&#xe006;',
			'icon-music' : '&#xe007;',
			'icon-location' : '&#xe008;',
			'icon-location-2' : '&#xe009;',
			'icon-map' : '&#xe00e;',
			'icon-compass' : '&#xe00f;',
			'icon-map-2' : '&#xe010;',
			'icon-mobile' : '&#xe011;',
			'icon-tablet' : '&#xe012;',
			'icon-calendar' : '&#xe013;',
			'icon-screen' : '&#xe014;',
			'icon-mobile-2' : '&#xe015;',
			'icon-laptop' : '&#xe016;',
			'icon-bubble' : '&#xe017;',
			'icon-bubbles' : '&#xe018;',
			'icon-bubbles-2' : '&#xe019;',
			'icon-bubble-2' : '&#xe01a;',
			'icon-bubbles-3' : '&#xe01b;',
			'icon-bubbles-4' : '&#xe01c;',
			'icon-quotes-left' : '&#xe01d;',
			'icon-cancel-circle' : '&#xe01e;',
			'icon-checkmark-circle' : '&#xe01f;',
			'icon-close' : '&#xe020;',
			'icon-checkmark' : '&#xe021;',
			'icon-code' : '&#xe022;',
			'icon-console' : '&#xe023;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};