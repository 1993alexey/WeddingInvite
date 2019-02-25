;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};

	var owl = $('.owl-carousel-fullwidth');

	$('#name-input, #wish-input').on('click change focus', function(e){
		owl.trigger('stop.owl.autoplay')
		e.stopPropagation();
	});

	$("#go-to-new-wish").click((e) => {
		let numItems = $(".owl-dot").length;
		owl.trigger('to.owl.carousel', numItems - 1);
	})

	owl.on('changed.owl.carousel', function(event) {
		let numItems = event.page.count;
		let currentItem = event.page.index;

		// if no empty, exit the function
		if (!numItems)
			return;

		if (currentItem + 1 == numItems)
			$("#go-to-new-wish").css('visibility', 'hidden');
		else 
			$("#go-to-new-wish").css('visibility', 'visible');
	})


	let nameInput = $('#name-input');
	let wishInput = $('#wish-input');

	function addNewWish() {
		let name = nameInput.val();
		let wish = wishInput.val();

		if (!wish) {
			wishInput.focus();
			return;
		}

		if (!name)
			name = "Unknown";

		let newWish = `
		<div class="item">
			<div class="testimony-slide active text-center">
				<span>${name}</span>
				<blockquote>
					<p>"${wish}"</p>
				</blockquote>
			</div>
		</div>`;

		owl
			.trigger('add.owl.carousel', [$(newWish), 0])
			.trigger('refresh.owl.carousel');
		owl.trigger('to.owl.carousel', 0);
		
		// clear the text area
		wishInput.val("");
	}

	$("#add-wish").click(() => {
		addNewWish();
	})

	var testimonialCarousel = function(){
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 500,
			autoHeight: true,
			autoplaySpeed: false,
			autoplay: true,
			touchDrag: false,
			mouseDrag: false,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
	});

	scrollTo('#about', '#fh5co-couple');
	scrollTo('#events', '#fh5co-event')
	scrollTo('#story', '#fh5co-couple-story')
	scrollTo('#registry', '#fh5co-started')
	scrollTo('#wishes', '#fh5co-testimonial')
	scrollTo('.btn-attend', '.enroll-block')

	$(".attend-reception").click((e) => {
		$("#activityType").val("reception");
	})

	$(".attend-sealing").click((e) => {
		$("#activityType").val("sealing");
	})	
}());

function scrollTo(selector, anchor){
	$(selector).click((e) => {
		e.preventDefault();
		e.stopPropagation();
		$("html, body").animate({ scrollTop: $(anchor).offset().top }, 500);
	})
}


