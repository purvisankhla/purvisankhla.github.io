/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

	// Accordion functionality
	$('.accordion-header').on('click', function() {
		var $item = $(this).parent();
		var $allItems = $('.accordion-item');
		
		// Close all other items
		$allItems.not($item).removeClass('active');
		
		// Toggle current item
		$item.toggleClass('active');
	});

	// Lazy load Cal.com when first needed
	var calLoaded = false;
	var calLoadingPromise = null;
	
	function loadCalEmbed() {
		if (calLoaded) {
			return Promise.resolve();
		}
		
		if (calLoadingPromise) {
			return calLoadingPromise;
		}
		
		calLoadingPromise = new Promise(function(resolve) {
			(function (C, A, L) { 
				let p = function (a, ar) { a.q.push(ar); }; 
				let d = C.document; 
				C.Cal = C.Cal || function () { 
					let cal = C.Cal; 
					let ar = arguments; 
					if (!cal.loaded) { 
						cal.ns = {}; 
						cal.q = cal.q || []; 
						d.head.appendChild(d.createElement("script")).src = A; 
						cal.loaded = true; 
					} 
					if (ar[0] === L) { 
						const api = function () { p(api, arguments); }; 
						const namespace = ar[1]; 
						api.q = api.q || []; 
						if(typeof namespace === "string"){
							cal.ns[namespace] = cal.ns[namespace] || api;
							p(cal.ns[namespace], ar);
							p(cal, ["initNamespace", namespace]);
						} else p(cal, ar); 
						return;
					} 
					p(cal, ar); 
				}; 
			})(window, "https://app.cal.com/embed/embed.js", "init");
			
			// Initialize both event types
			Cal("init", "consultation-call", {origin:"https://app.cal.com"});
			Cal.ns["consultation-call"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
			
			Cal("init", "introduction-get-a-quote", {origin:"https://app.cal.com"});
			Cal.ns["introduction-get-a-quote"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
			
			calLoaded = true;
			setTimeout(resolve, 500); // Give Cal.com time to initialize
		});
		
		return calLoadingPromise;
	}

	// Appointment Scheduler Modal Functions
	window.openSchedulerModal = function() {
		var modal = document.getElementById('schedulerModal');
		modal.style.display = 'block';
		setTimeout(function() {
			modal.classList.add('active');
		}, 10);
		
		// Lazy load Cal.com embed when modal opens
		loadCalEmbed();
	};

	window.closeSchedulerModal = function() {
		// Close any open Cal.com modals first
		if (window.Cal && window.Cal.__modalIframe) {
			// Cal.com modal is open, close it by clicking the overlay
			var calOverlay = document.querySelector('.cal-modal-overlay');
			if (calOverlay) {
				calOverlay.click();
			}
			// Also try removing the iframe directly
			if (window.Cal.__modalIframe && window.Cal.__modalIframe.parentNode) {
				window.Cal.__modalIframe.parentNode.removeChild(window.Cal.__modalIframe);
				window.Cal.__modalIframe = null;
			}
		}
		
		// Close the scheduler choice modal
		var modal = document.getElementById('schedulerModal');
		modal.classList.remove('active');
		setTimeout(function() {
			modal.style.display = 'none';
		}, 300);
	};

	// Close modal on overlay click
	$(document).on('click', '.scheduler-modal-overlay', function() {
		closeSchedulerModal();
	});

	// Close modal on ESC key
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $('#schedulerModal').hasClass('active')) {
			closeSchedulerModal();
		}
	});

	// Handle scheduler card clicks
	$(document).on('click', '.scheduler-card', function() {
		var calLink = $(this).data('cal-link');
		var calNamespace = $(this).data('cal-namespace');
		var calConfig = $(this).data('cal-config');
		
		// Trigger Cal.com modal
		if (window.Cal && window.Cal.ns && window.Cal.ns[calNamespace]) {
			window.Cal.ns[calNamespace]('modal', {
				calLink: calLink,
				config: calConfig
			});
		}
	});

	// Accordion functionality
	$(document).on('click', '.accordion-header', function() {
		var $item = $(this).parent();
		var $allItems = $('.accordion-item');
		
		// Close all other items
		$allItems.not($item).removeClass('active');
		
		// Toggle current item
		$item.toggleClass('active');
	});

	// Booking page tab switching
	$(document).ready(function() {
		// Handle tab button clicks
		$(document).on('click', '.booking-tab-btn', function() {
			var tabName = $(this).data('tab');
			
			// Update active button
			$('.booking-tab-btn').removeClass('active');
			$(this).addClass('active');
			
			// Update active tab content
			$('.booking-tab-content').addClass('hidden').removeClass('active');
			$('#tab-' + tabName).removeClass('hidden').addClass('active');
		});
	});

})(jQuery);