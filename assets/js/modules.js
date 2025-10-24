(function ($) {
    "use strict";

    window.mkdf = {};
    mkdf.modules = {};

    mkdf.scroll = 0;
    mkdf.window = $(window);
    mkdf.document = $(document);
    mkdf.windowWidth = $(window).width();
    mkdf.windowHeight = $(window).height();
    mkdf.body = $('body');
    mkdf.html = $('html, body');
    mkdf.htmlEl = $('html');
    mkdf.menuDropdownHeightSet = false;
    mkdf.defaultHeaderStyle = '';
    mkdf.minVideoWidth = 1500;
    mkdf.videoWidthOriginal = 1280;
    mkdf.videoHeightOriginal = 720;
    mkdf.videoRatio = 1.61;

    mkdf.mkdfOnDocumentReady = mkdfOnDocumentReady;
    mkdf.mkdfOnWindowLoad = mkdfOnWindowLoad;
    mkdf.mkdfOnWindowResize = mkdfOnWindowResize;
    mkdf.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    $(window).resize(mkdfOnWindowResize);
    $(window).scroll(mkdfOnWindowScroll);

	/*
        Add 'touch' class to html element if the device has a touch screen
    */
	if ("ontouchstart" in window || "ontouch" in window) { mkdf.htmlEl.addClass('touch'); }

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdf.scroll = $(window).scrollTop();
        mkdfBrowserDetection();

        //set global variable for header style which we will use in various functions
        if (mkdf.body.hasClass('mkdf-dark-header')) {
            mkdf.defaultHeaderStyle = 'mkdf-dark-header';
        }
        if (mkdf.body.hasClass('mkdf-light-header')) {
            mkdf.defaultHeaderStyle = 'mkdf-light-header';
        }
    }

    /* 
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {

    }

    /* 
     All functions to be called on $(window).resize() should be in this function
     */
    function mkdfOnWindowResize() {
        mkdf.windowWidth = $(window).width();
        mkdf.windowHeight = $(window).height();
    }

    /* 
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
        mkdf.scroll = $(window).scrollTop();
    }

    //set boxed layout width variable for various calculations

    switch (true) {
        case mkdf.body.hasClass('mkdf-grid-1300'):
            mkdf.boxedLayoutWidth = 1350;
            //mkdf.gridWidth = 1300;
            break;
        case mkdf.body.hasClass('mkdf-grid-1200'):
            mkdf.boxedLayoutWidth = 1250;
            //mkdf.gridWidth = 1200;
            break;
        case mkdf.body.hasClass('mkdf-grid-1000'):
            mkdf.boxedLayoutWidth = 1050;
            //mkdf.gridWidth = 1000;
            break;
        case mkdf.body.hasClass('mkdf-grid-800'):
            mkdf.boxedLayoutWidth = 850;
            //mkdf.gridWidth = 800;
            break;
        default :
            mkdf.boxedLayoutWidth = 1150;
            //mkdf.gridWidth = 1100;
            break;
    }

    mkdf.gridWidth = function () {
        var gridWidth = 1100;

        switch (true) {
            case mkdf.body.hasClass('mkdf-grid-1300') && mkdf.windowWidth > 1400:
                gridWidth = 1300;
                break;
            case mkdf.body.hasClass('mkdf-grid-1200') && mkdf.windowWidth > 1300:
                gridWidth = 1200;
                break;
            case mkdf.body.hasClass('mkdf-grid-1000') && mkdf.windowWidth > 1200:
                gridWidth = 1200;
                break;
            case mkdf.body.hasClass('mkdf-grid-800') && mkdf.windowWidth > 1024:
                gridWidth = 800;
                break;
            default :
                break;
        }

        return gridWidth;
    };

    mkdf.transitionEnd = (function () {
        var el = document.createElement('transitionDetector'),
            transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                'MozTransition'    : 'transitionend',      // only for FF < 15
                'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
            };

        for(var t in transEndEventNames){
            if( el.style[t] !== undefined ){
                return transEndEventNames[t];
            }
        }
    })();

    mkdf.animationEnd = (function() {
        var el = document.createElement("animationDetector");

        var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (var t in animations){
            if (el.style[t] !== undefined){
              return animations[t];
            }
        }
    })();

    /*
     * Browser detection
     */
    function mkdfBrowserDetection() {
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
            isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
            isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
            isIE = window.navigator.userAgent.indexOf("MSIE ");

        if (isChrome) {
            mkdf.body.addClass('mkdf-chrome');
        }
        if (isSafari) {
            mkdf.body.addClass('mkdf-safari');
        }
        if (isFirefox) {
            mkdf.body.addClass('mkdf-firefox');
        }
        if (isIE > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            mkdf.body.addClass('mkdf-ms-explorer');
        }
        if (/Edge\/\d./i.test(navigator.userAgent)) {
            mkdf.body.addClass('mkdf-edge');
        }
    }
    
})(jQuery);
(function($) {
	"use strict";

	var common          = {};
	mkdf.modules.common = common;

	var windowLoaded = false;

	common.mkdfFluidVideo                = mkdfFluidVideo;
	common.mkdfEnableScroll              = mkdfEnableScroll;
	common.mkdfDisableScroll             = mkdfDisableScroll;
	common.mkdfInitParallax              = mkdfInitParallax;
	common.mkdfInitSelfHostedVideoPlayer = mkdfInitSelfHostedVideoPlayer;
	common.mkdfSelfHostedVideoSize       = mkdfSelfHostedVideoSize;
	common.mkdfStickySidebarWidget       = mkdfStickySidebarWidget;
	common.getLoadMoreData               = getLoadMoreData;
	common.setLoadMoreAjaxData           = setLoadMoreAjaxData;
	common.setFixedImageProportionSize   = setFixedImageProportionSize;
	common.mkdfInitPerfectScrollbar      = mkdfInitPerfectScrollbar;
	common.mkdfRowBackgroundText         = mkdfRowBackgroundText;

	common.mkdfOnDocumentReady = mkdfOnDocumentReady;
	common.mkdfOnWindowLoad    = mkdfOnWindowLoad;
	common.mkdfOnWindowResize  = mkdfOnWindowResize;

	$( document ).ready( mkdfOnDocumentReady );
	$( window ).on( 'load', mkdfOnWindowLoad() );
	$( window ).resize( mkdfOnWindowResize );

	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function mkdfOnDocumentReady() {
		mkdfIconWithHover().init();
		mkdfDisableSmoothScrollForMac();
		mkdfInitAnchor().init();
		mkdfInitBackToTop();
		mkdfBackButtonShowHide();
		mkdfInitSelfHostedVideoPlayer();
		mkdfSelfHostedVideoSize();
		mkdfFluidVideo();
		mkdfOwlSlider();
		mkdfPreloadBackgrounds();
		mkdfPrettyPhoto();
		mkdfSearchPostTypeWidget();
		mkdfDashboardForm();
		mkdfInitGridMasonryListLayout();
		mkdfSmoothTransition();
		mkdfRowBackgroundText();
		mkdfInitIconWithTextBoxed();
		mkdfMgItemsSection();
		mkdfScrollToContent();
	}

	/*
		All functions to be called on $(window).load() should be in this function
	*/
	function mkdfOnWindowLoad() {
		windowLoaded = true;
		mkdfInitParallax();
		mkdfStickySidebarWidget().init();
		mkdfBackToTopBehaviour();
		mkdfAppearingSection();
		mkdfElementorGlobal();
	}

	/*
		All functions to be called on $(window).resize() should be in this function
	*/
	function mkdfOnWindowResize() {
		mkdfInitGridMasonryListLayout();
		mkdfSelfHostedVideoSize();
	}

	/**
	 * Elementor Global
	 */
	function mkdfElementorGlobal() {
		$( window ).on(
			'elementor/frontend/init',
			function () {
				elementorFrontend.hooks.addAction(
					'frontend/element_ready/global',
					function () {
						mkdfInitParallax();
						mkdfRowBackgroundText();
						mkdfMgItemsSection();
					}
				);
			}
		);
	}

	/*
	 ** Disable smooth scroll for mac if smooth scroll is enabled
	 */
	function mkdfDisableSmoothScrollForMac() {
		var os = navigator.appVersion.toLowerCase();

		if (os.indexOf( 'mac' ) > -1 && mkdf.body.hasClass( 'mkdf-smooth-scroll' )) {
			mkdf.body.removeClass( 'mkdf-smooth-scroll' );
		}
	}

	function mkdfDisableScroll() {
		if (window.addEventListener) {
			window.addEventListener( 'wheel', mkdfWheel, {passive: false} );
		}

		//window.onmousewheel = document.onmousewheel = mkdfWheel;
		document.onkeydown = mkdfKeydown;
	}

	function mkdfEnableScroll() {
		if (window.removeEventListener) {
			window.removeEventListener( 'wheel', mkdfWheel, {passive: false} );
		}

		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}

	function mkdfWheel(e) {
		mkdfPreventDefaultValue( e );
	}

	function mkdfKeydown(e) {
		var keys = [37, 38, 39, 40];

		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				mkdfPreventDefaultValue( e );
				return;
			}
		}
	}

	function mkdfPreventDefaultValue(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	/*
	 **	Anchor functionality
	 */
	var mkdfInitAnchor = function() {
		/**
		 * Set active state on clicked anchor
		 * @param anchor, clicked anchor
		 */
		var setActiveState = function(anchor){
			var headers = $( '.mkdf-main-menu, .mkdf-mobile-nav, .mkdf-fullscreen-menu, .mkdf-vertical-menu' );

			headers.each(
				function(){
					var currentHeader = $( this );

					if (anchor.parents( currentHeader ).length) {
						currentHeader.find( '.mkdf-active-item' ).removeClass( 'mkdf-active-item' );
						anchor.parent().addClass( 'mkdf-active-item' );

						currentHeader.find( 'a' ).removeClass( 'current' );
						anchor.addClass( 'current' );
					}
				}
			);
		};

		/**
		 * Check anchor active state on scroll
		 */
		var checkActiveStateOnScroll = function(){
			var anchorData = $( '[data-mkdf-anchor]' ),
				anchorElement,
				siteURL    = window.location.href.split( '#' )[0];

			if (siteURL.substr( -1 ) !== '/') {
				siteURL += '/';
			}

			anchorData.waypoint(
				function(direction) {
					if (direction === 'down') {
						if ($( this.element ).length > 0) {
							anchorElement = $( this.element ).data( "mkdf-anchor" );
						} else {
							anchorElement = $( this ).data( "mkdf-anchor" );
						}

						setActiveState( $( "a[href='" + siteURL + "#" + anchorElement + "']" ) );
					}
				},
				{ offset: '50%' }
			);

			anchorData.waypoint(
				function(direction) {
					if (direction === 'up') {
						if ($( this.element ).length > 0) {
							anchorElement = $( this.element ).data( "mkdf-anchor" );
						} else {
							anchorElement = $( this ).data( "mkdf-anchor" );
						}

						setActiveState( $( "a[href='" + siteURL + "#" + anchorElement + "']" ) );
					}
				},
				{ offset: function(){
					return -($( this.element ).outerHeight() - 150);
				} }
			);
		};

		/**
		 * Check anchor active state on load
		 */
		var checkActiveStateOnLoad = function(){
			var hash = window.location.hash.split( '#' )[1];

			if (hash !== "" && $( '[data-mkdf-anchor="' + hash + '"]' ).length > 0) {
				anchorClickOnLoad( hash );
			}
		};

		/**
		 * Handle anchor on load
		 */
		var anchorClickOnLoad = function ($this) {
			var scrollAmount,
				anchor     = $( '.mkdf-main-menu a, .mkdf-mobile-nav a, .mkdf-fullscreen-menu a, .mkdf-vertical-menu a' ),
				hash       = $this,
				anchorData = hash !== '' ? $( '[data-mkdf-anchor="' + hash + '"]' ) : '';

			if (hash !== '' && anchorData.length > 0) {
				var anchoredElementOffset = anchorData.offset().top;
				scrollAmount              = anchoredElementOffset - headerHeightToSubtract( anchoredElementOffset ) - mkdfGlobalVars.vars.mkdfAddForAdminBar;

				if (anchor.length) {
					anchor.each(
						function(){
							var thisAnchor = $( this );

							if (thisAnchor.attr( 'href' ).indexOf( hash ) > -1) {
								setActiveState( thisAnchor );
							}
						}
					);
				}

				mkdf.html.stop().animate(
					{
						scrollTop: Math.round( scrollAmount )
					},
					1000,
					function () {
						//change hash tag in url
						if (history.pushState) {
							history.pushState( null, '', '#' + hash );
						}
					}
				);

				return false;
			}
		};

		/**
		 * Calculate header height to be substract from scroll amount
		 * @param anchoredElementOffset, anchorded element offset
		 */
		var headerHeightToSubtract = function (anchoredElementOffset) {

			if (mkdf.modules.stickyHeader.behaviour === 'mkdf-sticky-header-on-scroll-down-up') {
				mkdf.modules.stickyHeader.isStickyVisible = (anchoredElementOffset > mkdf.modules.header.stickyAppearAmount);
			}

			if (mkdf.modules.stickyHeader.behaviour === 'mkdf-sticky-header-on-scroll-up') {
				if ((anchoredElementOffset > mkdf.scroll)) {
					mkdf.modules.stickyHeader.isStickyVisible = false;
				}
			}

			var headerHeight = mkdf.modules.stickyHeader.isStickyVisible ? mkdfGlobalVars.vars.mkdfStickyHeaderTransparencyHeight : mkdfPerPageVars.vars.mkdfHeaderTransparencyHeight;

			if (mkdf.windowWidth < 1025) {
				headerHeight = 0;
			}

			return headerHeight;
		};

		/**
		 * Handle anchor click
		 */
		var anchorClick = function () {
			mkdf.document.on(
				"click",
				".mkdf-main-menu a, .mkdf-fullscreen-menu a, .mkdf-btn, .mkdf-anchor, .mkdf-mobile-nav a, .mkdf-vertical-menu a",
				function () {
					var scrollAmount,
					anchor     = $( this ),
					hash       = anchor.prop( "hash" ).split( '#' )[1],
					anchorData = hash !== '' ? $( '[data-mkdf-anchor="' + hash + '"]' ) : '';

					if (hash !== '' && anchorData.length > 0) {
						var anchoredElementOffset = anchorData.offset().top;
						scrollAmount              = anchoredElementOffset - headerHeightToSubtract( anchoredElementOffset ) - mkdfGlobalVars.vars.mkdfAddForAdminBar;

						setActiveState( anchor );

						mkdf.html.stop().animate(
							{
								scrollTop: Math.round( scrollAmount )
							},
							1000,
							function () {
								//change hash tag in url
								if (history.pushState) {
									history.pushState( null, '', '#' + hash );
								}
							}
						);

						return false;
					}
				}
			);
		};

		return {
			init: function () {
				if ($( '[data-mkdf-anchor]' ).length) {
					anchorClick();
					checkActiveStateOnScroll();

					$( window ).on(
						'load',
						function () {
							checkActiveStateOnLoad();
						}
					);
				}
			}
		};
	};

	/**
	* Back to Top button behaviour
	*/
	function mkdfBackToTopBehaviour(){
		var btt         = $( '#mkdf-back-to-top' ),
		   skinElements = $( '.mkdf-row-dark-btt-skin, .mkdf-row-btt-dark' ),
		   skinSet      = false,
		   skinTrigger  = new Array();

		//Control button skin
		var bttSkin = function() {
			if (skinElements.length) {
				skinElements.each(
					function(i){
						var skinElement = $( this );

						if (mkdf.scroll + btt.position().top >= skinElement.offset().top && mkdf.scroll + btt.position().top <= skinElement.offset().top + skinElement.outerHeight()) {
							skinTrigger[i] = true;
						} else {
							skinTrigger[i] = false;
						}
					}
				);

				if (jQuery.inArray( true, skinTrigger ) != -1) {
					if ( ! skinSet) {
						btt.addClass( 'mkdf-dark' );
						skinSet = true;
					}
				} else {
					if (skinSet && ! btt.hasClass( 'mkdf-back-to-top-footer' )) {
						btt.removeClass( 'mkdf-dark' );
						skinSet = false;
					}
				}
			}
		}

		if (btt.length && skinElements.length) {
			$( window ).scroll(
				function() {
					bttSkin();
				}
			);
		}
	}

	/*
	* Slide to content on scroll - one scroll to page content
	*/
	function mkdfScrollToContent() {

		var revSliderLanding    = $( ".mkdf-rev-slider-landing" ),
			isElementorEditMode = false;

		if ( typeof elementorFrontend !== 'undefined') {
			isElementorEditMode = Boolean( elementorFrontend.isEditMode() );
		};

		if (revSliderLanding.length && ! mkdf.htmlEl.hasClass( 'touch' ) && ! isElementorEditMode) {
			var sliderHolderHeight = revSliderLanding.height(),
				sliderHolderOffset = revSliderLanding.offset().top,
				sliderArea         = sliderHolderHeight - sliderHolderOffset,
				revSlider          = revSliderLanding.find( '.rev_slider' ),
				pageJump           = false,
				normalScroll       = true,
				set                = false;

			var mkdfScrollHandler = function() {
				if ($( window ).scrollTop() < sliderArea) {
					normalScroll = false;
				}

				function mkdfScrollTo() {
					pageJump = true;
					$( 'html, body' ).animate(
						{
							scrollTop: sliderArea
						},
						1000,
						'easeInOutQuint',
						function() {
							pageJump     = false;
							normalScroll = true;
						}
					);
				}

				window.addEventListener(
					'wheel',
					function(event) {
						var scroll       = event.deltaY,
						scrollingForward = false,
						reInitOneScroll  = false;

						if (scroll > 0) {
							scrollingForward = true;
						} else {
							scrollingForward = false;
						}

						if ($( window ).scrollTop() - sliderHolderOffset <= Math.round( sliderHolderHeight * 0.5 )) {
							reInitOneScroll = true;
						}

						if ( ! pageJump && ! normalScroll) {
							if (scrollingForward && ($( window ).scrollTop() < sliderArea)) {
								event.preventDefault();
								mkdfScrollTo();
							}
						} else {
							if ( ! normalScroll) {
								event.preventDefault();
							}

							if (normalScroll && ! scrollingForward && reInitOneScroll) {
								pageJump     = false;
								normalScroll = false;
								event.preventDefault();
							}
						}
					},
					{passive: false}
				);

				//scrollbar click
				$( document ).on(
					'mousedown',
					function(event){
						if ( $( window ).outerWidth() <= event.pageX ) {
							if ($( window ).scrollTop() == sliderHolderOffset) {
								event.preventDefault();
								mkdfScrollTo();
							}
						}
					}
				);
			}

			//prevent mousewheel scroll
			window.addEventListener(
				'wheel',
				function (event) {
					if ( ! set) {
						event.preventDefault();
					}
				}
			);

			//prevent scrollbar scroll
			window.addEventListener(
				'scroll',
				function () {
					if ( ! set) {
						$( window ).scrollTop( sliderHolderOffset );
					}
				}
			)

			//init
			if (revSlider.length) {
				revSlider.bind(
					'revolution.slide.onchange',
					function(e, data) {
						set = true;
						mkdfScrollHandler();
					}
				);
			} else {
				$( window ).on(
					'load',
					function(){
						set = true;
						mkdfScrollHandler();
					}
				);
			}
		}
	}

	function mkdfMgItemsSection() {
		var mgItems = $( '.mkdf-mg-item' );

		if (mgItems.length) {

			$( '.mkdf-mg-item' ).eq( 1 ).addClass( 'mkdf-mg-standard' );
			
			mgItems.each(
				function() {
					$( this ).appear(
						function() {
							$( this ).addClass( 'mkdf-mg-item-appear' );
						},
						{accX: 0, accY: -150}
					);
				}
			);
		}
	}

	function mkdfAppearingSection() {
		var appearingSection = $( '.mkdf-appearing-section, .mkdf-appearing-rev-section, .mkdf-image-behavior-custom-link, .mkdf-ss-holder' );

		if (appearingSection.length) {
			var offsetY = -400;

			if (mkdf.windowWidth < 768) {
				offsetY = 0;
			}

			if (mkdf.body.hasClass( 'elementor-editor-active' )) {
				offsetY = 0;
			}

			appearingSection.each(
				function() {
					$( this ).appear(
						function() {
							$( this ).addClass( 'mkdf-appearing-section-appear' );
						},
						{accX: 0, accY: offsetY}
					);
				}
			)
		}
	}
	common.mkdfAppearingSection = mkdfAppearingSection;

	function mkdfInitBackToTop() {
		var backToTopButton = $( '#mkdf-back-to-top' );
		backToTopButton.on(
			'click',
			function (e) {
				e.preventDefault();
				mkdf.html.animate( {scrollTop: 0}, mkdf.window.scrollTop() / 3, 'easeInOutExpo' );
			}
		);
	}

	function mkdfBackButtonShowHide() {
		mkdf.window.scroll(
			function () {
				var b = $( this ).scrollTop(),
				c     = $( this ).height(),
				d;

				if (b > 0) {
					d = b + c / 2;
				} else {
					d = 1;
				}

				if (d < 1e3) {
					mkdfToTopButton( 'off' );
				} else {
					mkdfToTopButton( 'on' );
				}
			}
		);
	}

	function mkdfToTopButton(a) {
		var b = $( "#mkdf-back-to-top" );
		b.removeClass( 'off on' );
		if (a === 'on') {
			b.addClass( 'on' );
		} else {
			b.addClass( 'off' );
		}
	}

	function mkdfInitSelfHostedVideoPlayer() {
		var players = $( '.mkdf-self-hosted-video' );

		if (players.length) {
			players.mediaelementplayer(
				{
					audioWidth: '100%'
				}
			);
		}
	}

	function mkdfSelfHostedVideoSize(){
		var selfVideoHolder = $( '.mkdf-self-hosted-video-holder .mkdf-video-wrap' );

		if (selfVideoHolder.length) {
			selfVideoHolder.each(
				function(){
					var thisVideo = $( this ),
					videoWidth    = thisVideo.closest( '.mkdf-self-hosted-video-holder' ).outerWidth(),
					videoHeight   = videoWidth / mkdf.videoRatio;

					if (navigator.userAgent.match( /(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/ )) {
						thisVideo.parent().width( videoWidth );
						thisVideo.parent().height( videoHeight );
					}

					thisVideo.width( videoWidth );
					thisVideo.height( videoHeight );

					thisVideo.find( 'video, .mejs-overlay, .mejs-poster' ).width( videoWidth );
					thisVideo.find( 'video, .mejs-overlay, .mejs-poster' ).height( videoHeight );
				}
			);
		}
	}

	function mkdfFluidVideo() {
		fluidvids.init(
			{
				selector: ['iframe'],
				players: ['www.youtube.com', 'player.vimeo.com']
			}
		);
	}

	function mkdfSmoothTransition() {

		if (mkdf.body.hasClass( 'mkdf-smooth-page-transitions' )) {

			//check for preload animation
			if (mkdf.body.hasClass( 'mkdf-smooth-page-transitions-preloader' )) {
				var loader              = $( 'body > .mkdf-smooth-transition-loader.mkdf-mimic-ajax' ),
					mainRevHolder       = $( '#mkdf-main-rev-holder' ),
					wilmerSpinner       = $( '.mkdf-wilmer-spinner' ),
					wilmerRevBottomText = $( '.mkdf-landing-bottom-rev-text' ),
					isElementorEditMode = false;

				if ( typeof elementorFrontend !== 'undefined') {
					isElementorEditMode = Boolean( elementorFrontend.isEditMode() );
				}

				if (wilmerSpinner.length) {
					loader.addClass( 'mkdf-wilmer-loader' );
					wilmerRevBottomText.appear(
						function() {
							$( this ).addClass( 'mkdf-appearing-section-appear' );
						},
						{accX: 0, accY: 100}
					);
				}

				/**
				 * Loader Fade Out function
				 *
				 * @param {number} speed - fade out duration
				 * @param {number} delay - fade out delay
				 * @param {string} easing - fade out easing function
				 */
				var fadeOutLoader = function(speed, delay, easing) {
					speed  = speed ? speed : 600;
					delay  = delay ? delay : 0;
					easing = easing ? easing : 'easeOutSine';

					loader.delay( delay ).fadeOut( speed, easing );

					if ( windowLoaded ) {
						loader.fadeOut( speed, easing );
					} else {
						$( window ).on(
							'load',
							function (event) {
								if (event.originalEvent.persisted) {
									loader.fadeOut( speed, easing );
								}
							}
						);
					}
				};

				if (mainRevHolder.length) {
					mainRevHolder.find( 'rs-module' ).on(
						'revolution.slide.onloaded',
						function () {
							if (wilmerSpinner.length) {
								setTimeout(
									function() {
										wilmerSpinner.addClass( 'mkdf-wilmer-spinner-loaded' );
									},
									100
								)
								setTimeout(
									function() {
										loader.addClass( 'mkdf-wilmer-loader-ready' );
									},
									1500
								)
							} else {
								setTimeout(
									function() {
										fadeOutLoader();
									},
									1000
								)
							}
						}
					);
				} else {
					$( window ).on(
						'load',
						function () {
							if (wilmerSpinner.length) {
								setTimeout(
									function() {
										wilmerSpinner.addClass( 'mkdf-wilmer-spinner-loaded' );
									},
									100
								)
								setTimeout(
									function() {
										loader.addClass( 'mkdf-wilmer-loader-ready' );
									},
									1500
								)
							} else {
								setTimeout(
									function() {
										fadeOutLoader();
									},
									1000
								)
							}
						}
					);
				}

				if (isElementorEditMode) {
					loader.fadeOut( 1000, 'easeOutSine' );
				}
			}

			// if back button is pressed, than reload page to avoid state where content is on display:none

			window.addEventListener(
				"pageshow",
				function ( event ) {
					var historyPath = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
					if ( historyPath ) {
						$( '.mkdf-wrapper-inner' ).show();
					}
				}
			);

			//check for fade out animation
			if (mkdf.body.hasClass( 'mkdf-smooth-page-transitions-fadeout' )) {
				var linkItem = $( 'a' );

				linkItem.on(
					'click',
					function (e) {
						var a = $( this );

						if ((a.parents( '.mkdf-shopping-cart-dropdown' ).length || a.parent( '.product-remove' ).length) && a.hasClass( 'remove' )) {
							return;
						}

						if (
						e.which === 1 && // check if the left mouse button has been pressed
						a.attr( 'href' ).indexOf( window.location.host ) >= 0 && // check if the link is to the same domain
						(typeof a.data( 'rel' ) === 'undefined') && //Not pretty photo link
						(typeof a.attr( 'rel' ) === 'undefined') && //Not VC pretty photo link
						( ! a.hasClass( 'lightbox-active' )) && //Not lightbox plugin active
						(typeof a.attr( 'target' ) === 'undefined' || a.attr( 'target' ) === '_self') && // check if the link opens in the same window
						(a.attr( 'href' ).split( '#' )[0] !== window.location.href.split( '#' )[0]) // check if it is an anchor aiming for a different page
						) {
							e.preventDefault();
							$( '.mkdf-wrapper-inner' ).fadeOut(
								600,
								'easeOutSine',
								function () {
									window.location = a.attr( 'href' );
								}
							);
						}
					}
				);
			}
		}
	}

	/*
	 *	Preload background images for elements that have 'mkdf-preload-background' class
	 */
	function mkdfPreloadBackgrounds(){
		var preloadBackHolder = $( '.mkdf-preload-background' );

		if (preloadBackHolder.length) {
			preloadBackHolder.each(
				function() {
					var preloadBackground = $( this );

					if (preloadBackground.css( 'background-image' ) !== '' && preloadBackground.css( 'background-image' ) !== 'none') {
						var bgUrl = preloadBackground.attr( 'style' );

						bgUrl = bgUrl.match( /url\(["']?([^'")]+)['"]?\)/ );
						bgUrl = bgUrl ? bgUrl[1] : "";

						if (bgUrl) {
							var backImg = new Image();
							backImg.src = bgUrl;
							$( backImg ).load(
								function(){
									preloadBackground.removeClass( 'mkdf-preload-background' );
								}
							);
						}
					} else {
						$( window ).on( 'load', function(){ preloadBackground.removeClass( 'mkdf-preload-background' ); } ); //make sure that mkdf-preload-background class is removed from elements with forced background none in css
					}
				}
			);
		}
	}

	function mkdfPrettyPhoto() {
		/*jshint multistr: true */
		var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="' + mkdfGlobalVars.vars.ppExpand + '">' + mkdfGlobalVars.vars.ppExpand + '</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">' + mkdfGlobalVars.vars.ppPrev + '</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">' + mkdfGlobalVars.vars.ppNext + '</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">' + mkdfGlobalVars.vars.ppClose + '</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';

		$( "a[data-rel^='prettyPhoto']" ).prettyPhoto(
			{
				hook: 'data-rel',
				animation_speed: 'normal', /* fast/slow/normal */
				slideshow: false, /* false OR interval time in ms */
				autoplay_slideshow: false, /* true/false */
				opacity: 0.80, /* Value between 0 and 1 */
				show_title: true, /* true/false */
				allow_resize: true, /* Resize the photos bigger than viewport. true/false */
				horizontal_padding: 0,
				default_width: 960,
				default_height: 540,
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
				hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
				wmode: 'opaque', /* Set the flash wmode attribute */
				autoplay: true, /* Automatically start videos: True/False */
				modal: false, /* If set to true, only the close button will close the window */
				overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
				keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
				deeplinking: false,
				custom_markup: '',
				social_tools: false,
				markup: markupWhole
			}
		);
	}
	common.mkdfPrettyPhoto = mkdfPrettyPhoto;

	function mkdfSearchPostTypeWidget() {
		var searchPostTypeHolder = $( '.mkdf-search-post-type' );

		if (searchPostTypeHolder.length) {
			searchPostTypeHolder.each(
				function () {
					var thisSearch = $( this ),
					searchField    = thisSearch.find( '.mkdf-post-type-search-field' ),
					resultsHolder  = thisSearch.siblings( '.mkdf-post-type-search-results' ),
					searchLoading  = thisSearch.find( '.mkdf-search-loading' ),
					searchIcon     = thisSearch.find( '.mkdf-search-icon' );

					searchLoading.addClass( 'mkdf-hidden' );

					var postType = thisSearch.data( 'post-type' ),
					keyPressTimeout;

					searchField.on(
						'keyup paste',
						function() {
							var field = $( this );
							field.attr( 'autocomplete','off' );
							searchLoading.removeClass( 'mkdf-hidden' );
							searchIcon.addClass( 'mkdf-hidden' );
							clearTimeout( keyPressTimeout );

							keyPressTimeout = setTimeout(
								function() {
									var searchTerm = field.val();

									if (searchTerm.length < 3) {
										  resultsHolder.html( '' );
										  resultsHolder.fadeOut();
										  searchLoading.addClass( 'mkdf-hidden' );
										  searchIcon.removeClass( 'mkdf-hidden' );
									} else {
										var ajaxData = {
											action: 'wilmer_mikado_search_post_types',
											term: searchTerm,
											postType: postType
										};

										$.ajax(
											{
												type: 'POST',
												data: ajaxData,
												url: mkdfGlobalVars.vars.mkdfAjaxUrl,
												success: function (data) {
													var response = JSON.parse( data );
													if (response.status === 'success') {
														  searchLoading.addClass( 'mkdf-hidden' );
														  searchIcon.removeClass( 'mkdf-hidden' );
														  resultsHolder.html( response.data.html );
														  resultsHolder.fadeIn();
													}
												},
												error: function(XMLHttpRequest, textStatus, errorThrown) {
													console.log( "Status: " + textStatus );
													console.log( "Error: " + errorThrown );
													searchLoading.addClass( 'mkdf-hidden' );
													searchIcon.removeClass( 'mkdf-hidden' );
													resultsHolder.fadeOut();
												}
											}
										);
									}
								},
								500
							);
						}
					);

					searchField.on(
						'focusout',
						function () {
							searchLoading.addClass( 'mkdf-hidden' );
							searchIcon.removeClass( 'mkdf-hidden' );
							resultsHolder.fadeOut();
						}
					);
				}
			);
		}
	}

	/**
	 * Initializes load more data params
	 * @param container with defined data params
	 * return array
	 */
	function getLoadMoreData(container){
		var dataList    = container.data(),
			returnValue = {};

		for (var property in dataList) {
			if (dataList.hasOwnProperty( property )) {
				if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
					returnValue[property] = dataList[property];
				}
			}
		}

		return returnValue;
	}

	/**
	 * Sets load more data params for ajax function
	 * @param container with defined data params
	 * @param action with defined action name
	 * return array
	 */
	function setLoadMoreAjaxData(container, action) {
		var returnValue = {
			action: action
		};

		for (var property in container) {
			if (container.hasOwnProperty( property )) {

				if (typeof container[property] !== 'undefined' && container[property] !== false) {
					returnValue[property] = container[property];
				}
			}
		}

		return returnValue;
	}

	/*
	 ** Init Icon with Text boxed behavior
	 */
	function mkdfInitIconWithTextBoxed() {
		var icons = $( '.mkdf-iwt-boxed' );

		if (icons.length) {
			icons.each(
				function () {
					var thisIcon = $( this ),
					title        = thisIcon.find( '.mkdf-iwt-title' );

					title.on(
						'mouseenter',
						function() {
							thisIcon.addClass( 'mkdf-iwt-boxed-hovered' );
						}
					);
					title.on(
						'mouseleave',
						function() {
							thisIcon.removeClass( 'mkdf-iwt-boxed-hovered' );
						}
					);
				}
			);
		}
	}

	/*
	 ** Init Masonry List Layout
	 */
	function mkdfInitGridMasonryListLayout() {
		var holder = $( '.mkdf-grid-masonry-list' );

		if (holder.length) {
			holder.each(
				function () {
					var thisHolder = $( this ),
					masonry        = thisHolder.find( '.mkdf-masonry-list-wrapper' ),
					size           = thisHolder.find( '.mkdf-masonry-grid-sizer' ).width();

					masonry.waitForImages(
						function () {
							masonry.isotope(
								{
									layoutMode: 'packery',
									itemSelector: '.mkdf-item-space',
									percentPosition: true,
									masonry: {
										columnWidth: '.mkdf-masonry-grid-sizer',
										gutter: '.mkdf-masonry-grid-gutter'
									}
								}
							);

							if (thisHolder.find( '.mkdf-fixed-masonry-item' ).length || thisHolder.hasClass( 'mkdf-fixed-masonry-items' )) {
								setFixedImageProportionSize( masonry, masonry.find( '.mkdf-item-space' ), size, true );
							}

							setTimeout(
								function () {
									mkdfInitParallax();
								},
								600
							);

							masonry.isotope( 'layout' ).css( 'opacity', 1 );
						}
					);
				}
			);
		}
	}

	common.mkdfInitGridMasonryListLayout = mkdfInitGridMasonryListLayout;

	/**
	 * Initializes size for fixed image proportion - masonry layout
	 */
	function setFixedImageProportionSize(container, item, size, isFixedEnabled) {
		if (container.hasClass( 'mkdf-masonry-images-fixed' ) || isFixedEnabled === true) {
			var padding                     = parseInt( item.css( 'paddingLeft' ), 10 ),
				newSize                     = size - 2 * padding,
				defaultMasonryItem          = container.find( '.mkdf-masonry-size-small' ),
				largeWidthMasonryItem       = container.find( '.mkdf-masonry-size-large-width' ),
				largeHeightMasonryItem      = container.find( '.mkdf-masonry-size-large-height' ),
				largeWidthHeightMasonryItem = container.find( '.mkdf-masonry-size-large-width-height' );

			defaultMasonryItem.css( 'height', newSize );
			largeHeightMasonryItem.css( 'height', Math.round( 2 * (newSize + padding) ) );

			if (mkdf.windowWidth > 680) {
				largeWidthMasonryItem.css( 'height', newSize );
				largeWidthHeightMasonryItem.css( 'height', Math.round( 2 * (newSize + padding) ) );
			} else if (mkdf.windowWidth > 480) {
				largeWidthMasonryItem.css( 'height', Math.round( newSize / 2 ) );
				if (container.hasClass( 'mkdf-masonry-gallery-holder' )) {
					largeWidthMasonryItem.css( 'height', newSize );
				};
				largeWidthHeightMasonryItem.css( 'height', newSize );
			} else {
				largeWidthMasonryItem.css( 'height', newSize );
				largeWidthHeightMasonryItem.css( 'height', newSize );
			}
		}
	}

	/**
	 * Object that represents icon with hover data
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIconWithHover = function() {
		//get all icons on page
		var icons = $( '.mkdf-icon-has-hover' );

		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if (typeof icon.data( 'hover-color' ) !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css( 'color', event.data.color );
				};

				var hoverColor    = icon.data( 'hover-color' ),
					originalColor = icon.css( 'color' );

				if (hoverColor !== '') {
					icon.on( 'mouseenter', {icon: icon, color: hoverColor}, changeIconColor );
					icon.on( 'mouseleave', {icon: icon, color: originalColor}, changeIconColor );
				}
			}
		};

		return {
			init: function() {
				if (icons.length) {
					icons.each(
						function() {
							iconHoverColor( $( this ) );
						}
					);
				}
			}
		};
	};

	/*
	 ** Init parallax
	 */
	function mkdfInitParallax(){
		var parallaxHolder = $( '.mkdf-parallax-row-holder' );

		if (parallaxHolder.length) {
			parallaxHolder.each(
				function() {
					var parallaxElement = $( this ),
					image               = parallaxElement.data( 'parallax-bg-image' ),
					speed               = parallaxElement.data( 'parallax-bg-speed' ) * 0.4,
					height              = 0;

					if (typeof parallaxElement.data( 'parallax-bg-height' ) !== 'undefined' && parallaxElement.data( 'parallax-bg-height' ) !== false) {
						height = parseInt( parallaxElement.data( 'parallax-bg-height' ) );
					}

					parallaxElement.css( {'background-image': 'url(' + image + ')'} );

					if (height > 0) {
						parallaxElement.css( {'min-height': height + 'px', 'height': height + 'px'} );
					}

					parallaxElement.parallax( '50%', speed );
				}
			);
		}
	}

	/*
	 **  Init sticky sidebar widget
	 */
	function mkdfStickySidebarWidget(){
		var sswHolder         = $( '.mkdf-widget-sticky-sidebar' ),
			headerHolder      = $( '.mkdf-page-header' ),
			headerHeight      = headerHolder.length ? headerHolder.outerHeight() : 0,
			widgetTopOffset   = 0,
			widgetTopPosition = 0,
			sidebarHeight     = 0,
			sidebarWidth      = 0,
			objectsCollection = [];

		function addObjectItems() {
			if (sswHolder.length) {
				sswHolder.each(
					function () {
						var thisSswHolder      = $( this ),
						mainSidebarHolder      = thisSswHolder.parents( 'aside.mkdf-sidebar' ),
						widgetiseSidebarHolder = thisSswHolder.parents( '.wpb_widgetised_column' ),
						sidebarHolder          = '',
						sidebarHolderHeight    = 0;

						widgetTopOffset   = thisSswHolder.offset().top;
						widgetTopPosition = thisSswHolder.position().top;
						sidebarHeight     = 0;
						sidebarWidth      = 0;

						if (mainSidebarHolder.length) {
							sidebarHeight       = mainSidebarHolder.outerHeight();
							sidebarWidth        = mainSidebarHolder.outerWidth();
							sidebarHolder       = mainSidebarHolder;
							sidebarHolderHeight = mainSidebarHolder.parent().parent().outerHeight();

							var blogHolder = mainSidebarHolder.parent().parent().find( '.mkdf-blog-holder' );
							if (blogHolder.length) {
								sidebarHolderHeight -= parseInt( blogHolder.css( 'marginBottom' ) );
							}
						} else if (widgetiseSidebarHolder.length) {
							sidebarHeight       = widgetiseSidebarHolder.outerHeight();
							sidebarWidth        = widgetiseSidebarHolder.outerWidth();
							sidebarHolder       = widgetiseSidebarHolder;
							sidebarHolderHeight = widgetiseSidebarHolder.parents( '.vc_row' ).outerHeight();
						}

						objectsCollection.push(
							{
								'object': thisSswHolder,
								'offset': widgetTopOffset,
								'position': widgetTopPosition,
								'height': sidebarHeight,
								'width': sidebarWidth,
								'sidebarHolder': sidebarHolder,
								'sidebarHolderHeight': sidebarHolderHeight
							}
						);
					}
				);
			}
		}

		function initStickySidebarWidget() {

			if (objectsCollection.length) {
				$.each(
					objectsCollection,
					function (i) {
						var thisSswHolder       = objectsCollection[i]['object'],
						thisWidgetTopOffset     = objectsCollection[i]['offset'],
						thisWidgetTopPosition   = objectsCollection[i]['position'],
						thisSidebarHeight       = objectsCollection[i]['height'],
						thisSidebarWidth        = objectsCollection[i]['width'],
						thisSidebarHolder       = objectsCollection[i]['sidebarHolder'],
						thisSidebarHolderHeight = objectsCollection[i]['sidebarHolderHeight'];

						if (mkdf.body.hasClass( 'mkdf-fixed-on-scroll' )) {
							var fixedHeader = $( '.mkdf-fixed-wrapper.fixed' );

							if (fixedHeader.length) {
								headerHeight = fixedHeader.outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar;
							}
						} else if (mkdf.body.hasClass( 'mkdf-no-behavior' )) {
							headerHeight = mkdfGlobalVars.vars.mkdfAddForAdminBar;
						}

						if (mkdf.windowWidth > 1024 && thisSidebarHolder.length) {
							var sidebarPosition = -(thisWidgetTopPosition - headerHeight),
							sidebarHeight       = thisSidebarHeight - thisWidgetTopPosition - 40; // 40 is bottom margin of widget holder

							//move sidebar up when hits the end of section row
							var rowSectionEndInViewport = thisSidebarHolderHeight + thisWidgetTopOffset - headerHeight - thisWidgetTopPosition - mkdfGlobalVars.vars.mkdfTopBarHeight;

							if ((mkdf.scroll >= thisWidgetTopOffset - headerHeight) && thisSidebarHeight < thisSidebarHolderHeight) {
								if (thisSidebarHolder.hasClass( 'mkdf-sticky-sidebar-appeared' )) {
									thisSidebarHolder.css( {'top': sidebarPosition + 'px'} );
								} else {
									thisSidebarHolder.addClass( 'mkdf-sticky-sidebar-appeared' ).css(
										{
											'position': 'fixed',
											'top': sidebarPosition + 'px',
											'width': thisSidebarWidth,
											'margin-top': '-10px'
										}
									).animate( {'margin-top': '0'}, 200 );
								}

								if (mkdf.scroll + sidebarHeight >= rowSectionEndInViewport) {
									var absBottomPosition = thisSidebarHolderHeight - sidebarHeight + sidebarPosition - headerHeight;

									thisSidebarHolder.css(
										{
											'position': 'absolute',
											'top': absBottomPosition + 'px'
										}
									);
								} else {
									if (thisSidebarHolder.hasClass( 'mkdf-sticky-sidebar-appeared' )) {
										thisSidebarHolder.css(
											{
												'position': 'fixed',
												'top': sidebarPosition + 'px'
											}
										);
									}
								}
							} else {
								thisSidebarHolder.removeClass( 'mkdf-sticky-sidebar-appeared' ).css(
									{
										'position': 'relative',
										'top': '0',
										'width': 'auto'
									}
								);
							}
						} else {
							thisSidebarHolder.removeClass( 'mkdf-sticky-sidebar-appeared' ).css(
								{
									'position': 'relative',
									'top': '0',
									'width': 'auto'
								}
							);
						}
					}
				);
			}
		}

		return {
			init: function () {
				addObjectItems();
				initStickySidebarWidget();

				$( window ).scroll(
					function () {
						initStickySidebarWidget();
					}
				);
			},
			reInit: initStickySidebarWidget
		};
	}

	/**
	 * Init Owl Carousel
	 */
	function mkdfOwlSlider() {
		var sliders = $( '.mkdf-owl-slider' );

		if (sliders.length) {
			sliders.each(
				function(){
					var slider           = $( this ),
					owlSlider            = $( this ),
					slideItemsNumber     = slider.children().length,
					numberOfItems        = 1,
					loop                 = true,
					autoplay             = true,
					autoplayHoverPause   = true,
					sliderSpeed          = 5000,
					sliderSpeedAnimation = 600,
					margin               = 0,
					responsiveMargin     = 0,
					responsiveMargin1    = 0,
					stagePadding         = 0,
					stagePaddingEnabled  = false,
					center               = false,
					autoWidth            = false,
					animateInClass       = false, // keyframe css animation
					animateOutClass      = false, // keyframe css animation
					navigation           = true,
					pagination           = false,
					thumbnail            = false,
					thumbnailSlider,
					sliderIsCPTList      = ! ! slider.hasClass( 'mkdf-list-is-slider' ),
					sliderDataHolder     = sliderIsCPTList ? slider.parent() : slider;  // this is condition for cpt to set list to be slider

					if (typeof slider.data( 'number-of-items' ) !== 'undefined' && slider.data( 'number-of-items' ) !== false && ! sliderIsCPTList) {
						numberOfItems = slider.data( 'number-of-items' );
					}
					if (typeof sliderDataHolder.data( 'number-of-columns' ) !== 'undefined' && sliderDataHolder.data( 'number-of-columns' ) !== false && sliderIsCPTList) {
						switch (sliderDataHolder.data( 'number-of-columns' )) {
							case 'one':
								numberOfItems = 1;
								break;
							case 'two':
								numberOfItems = 2;
								break;
							case 'three':
								numberOfItems = 3;
								break;
							case 'four':
								numberOfItems = 4;
								break;
							case 'five':
								numberOfItems = 5;
								break;
							case 'six':
								numberOfItems = 6;
								break;
							default :
								numberOfItems = 4;
								break;
						}
					}
					if (sliderDataHolder.data( 'enable-loop' ) === 'no') {
						loop = false;
					}
					if (sliderDataHolder.data( 'enable-autoplay' ) === 'no') {
						autoplay = false;
					}
					if (sliderDataHolder.data( 'enable-autoplay-hover-pause' ) === 'no') {
						autoplayHoverPause = false;
					}
					if (typeof sliderDataHolder.data( 'slider-speed' ) !== 'undefined' && sliderDataHolder.data( 'slider-speed' ) !== false) {
						sliderSpeed = sliderDataHolder.data( 'slider-speed' );
					}
					if (typeof sliderDataHolder.data( 'slider-speed-animation' ) !== 'undefined' && sliderDataHolder.data( 'slider-speed-animation' ) !== false) {
						sliderSpeedAnimation = sliderDataHolder.data( 'slider-speed-animation' );
					}
					if (typeof sliderDataHolder.data( 'slider-margin' ) !== 'undefined' && sliderDataHolder.data( 'slider-margin' ) !== false) {
						if (sliderDataHolder.data( 'slider-margin' ) === 'no') {
							margin = 0;
						} else {
							margin = sliderDataHolder.data( 'slider-margin' );
						}
					} else {
						if (slider.parent().hasClass( 'mkdf-huge-space' )) {
							margin = 60;
						} else if (slider.parent().hasClass( 'mkdf-large-space' )) {
							margin = 50;
						} else if (slider.parent().hasClass( 'mkdf-medium-space' )) {
							margin = 40;
						} else if (slider.parent().hasClass( 'mkdf-normal-space' )) {
							margin = 30;
						} else if (slider.parent().hasClass( 'mkdf-small-space' )) {
							margin = 20;
						} else if (slider.parent().hasClass( 'mkdf-tiny-space' )) {
							margin = 10;
						}
					}
					if (sliderDataHolder.data( 'slider-padding' ) === 'yes') {
						stagePaddingEnabled = true;
						stagePadding        = parseInt( slider.outerWidth() * 0.28 );
						margin              = 50;
					}
					if (sliderDataHolder.data( 'enable-center' ) === 'yes') {
						center = true;
					}
					if (sliderDataHolder.data( 'enable-auto-width' ) === 'yes') {
						autoWidth = true;
					}
					if (typeof sliderDataHolder.data( 'slider-animate-in' ) !== 'undefined' && sliderDataHolder.data( 'slider-animate-in' ) !== false) {
						animateInClass = sliderDataHolder.data( 'slider-animate-in' );
					}
					if (typeof sliderDataHolder.data( 'slider-animate-out' ) !== 'undefined' && sliderDataHolder.data( 'slider-animate-out' ) !== false) {
						animateOutClass = sliderDataHolder.data( 'slider-animate-out' );
					}
					if (sliderDataHolder.data( 'enable-navigation' ) === 'no') {
						navigation = false;
					}
					if (sliderDataHolder.data( 'enable-pagination' ) === 'yes') {
						pagination = true;
					}

					if (sliderDataHolder.data( 'enable-thumbnail' ) === 'yes') {
						thumbnail = true;
					}

					if (thumbnail && ! pagination) {
						/* page.index works only when pagination is enabled, so we add through html, but hide via css */
						pagination = true;
						owlSlider.addClass( 'mkdf-slider-hide-pagination' );
					}

					if (navigation && pagination) {
						slider.addClass( 'mkdf-slider-has-both-nav' );
					}

					if (slideItemsNumber <= 1) {
						loop       = false;
						autoplay   = false;
						navigation = false;
						pagination = false;
					}

					var responsiveNumberOfItems1 = 1,
					responsiveNumberOfItems2     = 2,
					responsiveNumberOfItems3     = 3,
					responsiveNumberOfItems4     = numberOfItems,
					responsiveNumberOfItems5     = numberOfItems;

					if (numberOfItems < 3) {
						responsiveNumberOfItems2 = numberOfItems;
						responsiveNumberOfItems3 = numberOfItems;
					}

					if (numberOfItems > 4) {
						responsiveNumberOfItems4 = 5;
					}

					if (numberOfItems >= 5) {
						responsiveNumberOfItems5 = 5;
					}

					if (stagePaddingEnabled || margin > 30) {
						responsiveMargin  = 20;
						responsiveMargin1 = 30;
					}

					if (margin > 0 && margin <= 30) {
						responsiveMargin  = margin;
						responsiveMargin1 = margin;
					}
					var slideOnScroll = function() {
						slider.on(
							'mousewheel',
							function (e) {
								if ( ! slider.data( 'mkdf-active' )) {
									var pos = e.deltaY;

									if (pos > 0) {
										slider.trigger( 'prev.owl.carousel' );
									} else {
										slider.trigger( 'next.owl.carousel' );
									}
								}
							}
						);
					}

					if (slider.hasClass( 'mkdf-testimonials' )) {
						responsiveNumberOfItems2 = 2;

						if ( mkdf.windowWidth <= 1024 ) {
							responsiveNumberOfItems2 = 1;
						}
					}

					if (slider.parent().parent().hasClass( 'mkdf-portfolio-fullheight-slider-holder' )) {
						responsiveNumberOfItems2 = 2;
						responsiveNumberOfItems4 = 3;

					}

					slider.waitForImages(
						function () {
							owlSlider = slider.owlCarousel(
								{
									items: numberOfItems,
									loop: loop,
									autoplay: autoplay,
									autoplayHoverPause: autoplayHoverPause,
									autoplayTimeout: sliderSpeed,
									smartSpeed: sliderSpeedAnimation,
									margin: margin,
									stagePadding: stagePadding,
									center: center,
									autoWidth: autoWidth,
									animateIn: animateInClass,
									animateOut: animateOutClass,
									dots: pagination,
									nav: navigation,
									navText: [
									mkdfGlobalVars.vars.sliderNavPrevArrow,
									mkdfGlobalVars.vars.sliderNavNextArrow
									],
									responsive: {
										0: {
											items: responsiveNumberOfItems1,
											margin: responsiveMargin,
											stagePadding: 0,
											center: false,
											autoWidth: false
										},
										681: {
											items: responsiveNumberOfItems2,
											margin: responsiveMargin1
										},
										769: {
											items:  slider.parent().parent().hasClass( 'mkdf-portfolio-fullheight-slider-holder' ) ? responsiveNumberOfItems4 : responsiveNumberOfItems2,
											margin: responsiveMargin1
										},
										1025: {
											items: slider.parent().parent().hasClass( 'mkdf-portfolio-fullheight-slider-holder' ) ? numberOfItems : responsiveNumberOfItems4,
										},
										1281: {
											items: slider.parent().parent().hasClass( 'mkdf-portfolio-fullheight-slider-holder' ) ? numberOfItems : responsiveNumberOfItems2,
										},
										1367: {
											items: numberOfItems
										}
									},
									onInitialize: function () {
										slider.css( 'visibility', 'visible' );
										mkdfInitParallax();
										slider.closest( '.mkdf-slide-on-mouse-scroll' ).length && slideOnScroll();
										if (slider.find( 'iframe' ).length || slider.find( 'video' ).length) {
											setTimeout(
												function(){
													mkdfSelfHostedVideoSize();
													mkdfFluidVideo();
												},
												500
											);
										}
										if (thumbnail) {
											thumbnailSlider.find( '.mkdf-slider-thumbnail-item:first-child' ).addClass( 'active' );
										}
									},
									onInitialized: function (e) {
										var item = slider.find( '.owl-item.active' ),
										items    = slider.find( '.owl-item' );

										if (item.length) {
											item.eq( 0 ).addClass( 'mkdf-first-active' );
										}

										items.each(
											function(){
												var thisItem = $( this );

												if ( ! thisItem.hasClass( 'mkdf-first-active' )) {
													thisItem.on(
														'mouseenter',
														function(){
															item.eq( 0 ).addClass( 'mkdf-first-active-hovered' );
														}
													);
													thisItem.on(
														'mouseleave',
														function(){
															item.eq( 0 ).removeClass( 'mkdf-first-active-hovered' );
														}
													);
												}

											}
										)

									},
									onRefreshed: function() {
										if (autoWidth === true) {
											var oldSize = parseInt( slider.find( '.owl-stage' ).css( 'width' ) );
											slider.find( '.owl-stage' ).css( 'width', (oldSize + 1) + 'px' );
										}
									},
									onTranslate: function(e) {
										var item = slider.find( '.owl-item' );

										item.removeClass( 'mkdf-first-active' );

										var index = e.item.index;

										if (item.length) {
											item.removeClass( 'mkdf-next-active' );
											item.eq( index ).addClass( 'mkdf-first-active' );
										}

										if (thumbnail) {
											var index = e.page.index + 1;
											thumbnailSlider.find( '.mkdf-slider-thumbnail-item.active' ).removeClass( 'active' );
											thumbnailSlider.find( '.mkdf-slider-thumbnail-item:nth-child(' + index + ')' ).addClass( 'active' );
										}
										slider.data( 'mkdf-active', true );

									},
									onTranslated: function() {
										var item   = slider.find( '.owl-item' ),
										activeItem = slider.find( '.owl-item.active' );

										item.each(
											function(){
												var thisItem = $( this );

												if ( ! thisItem.hasClass( 'mkdf-first-active' )) {
													thisItem.on(
														'mouseenter',
														function(){
															activeItem.eq( 0 ).addClass( 'mkdf-first-active-hovered' );
														}
													);
													thisItem.on(
														'mouseleave',
														function(){
															activeItem.eq( 0 ).removeClass( 'mkdf-first-active-hovered' );
														}
													);
												}

											}
										)

										slider.data( 'mkdf-active', false );

									},
									onDrag: function (e) {
										if (mkdf.body.hasClass( 'mkdf-smooth-page-transitions-fadeout' )) {
											var sliderIsMoving = e.isTrigger > 0;

											if (sliderIsMoving) {
												slider.addClass( 'mkdf-slider-is-moving' );
											}
										}
									},
									onDragged: function () {
										if (mkdf.body.hasClass( 'mkdf-smooth-page-transitions-fadeout' ) && slider.hasClass( 'mkdf-slider-is-moving' )) {

											setTimeout(
												function () {
													slider.removeClass( 'mkdf-slider-is-moving' );
												},
												500
											);
										}
									}
								}
							);
						}
					);

					if (thumbnail) {
						thumbnailSlider = slider.parent().find( '.mkdf-slider-thumbnail' );

						var numberOfThumbnails      = parseInt( thumbnailSlider.data( 'thumbnail-count' ) );
						var numberOfThumbnailsClass = '';

						switch (numberOfThumbnails % 6) {
							case 2 :
								numberOfThumbnailsClass = 'two';
								break;
							case 3 :
								numberOfThumbnailsClass = 'three';
								break;
							case 4 :
								numberOfThumbnailsClass = 'four';
								break;
							case 5 :
								numberOfThumbnailsClass = 'five';
								break;
							case 0 :
								numberOfThumbnailsClass = 'six';
								break;
							default :
								numberOfThumbnailsClass = 'six';
								break;
						}

						if (numberOfThumbnailsClass !== '') {
							thumbnailSlider.addClass( 'mkdf-slider-columns-' + numberOfThumbnailsClass );
						}

						thumbnailSlider.find( '.mkdf-slider-thumbnail-item' ).on(
							'click',
							function () {
								$( this ).siblings( '.active' ).removeClass( 'active' );
								$( this ).addClass( 'active' );
								owlSlider.trigger( 'to.owl.carousel', [$( this ).index(), sliderSpeedAnimation] );
							}
						);
					}
				}
			);
		}
	}

	common.mkdfOwlSlider = mkdfOwlSlider;

	function mkdfDashboardForm() {
		var forms = $( '.mkdf-dashboard-form' );

		if (forms.length) {
			forms.each(
				function () {
					var thisForm    = $( this ),
					btnText         = thisForm.find( 'button.mkdf-dashboard-form-button' ),
					updatingBtnText = btnText.data( 'updating-text' ),
					updatedBtnText  = btnText.data( 'updated-text' ),
					actionName      = thisForm.data( 'action' );

					thisForm.on(
						'submit',
						function (e) {
							e.preventDefault();
							var prevBtnText = btnText.html(),
							gallery         = $( this ).find( '.mkdf-dashboard-gallery-upload-hidden' ),
							namesArray      = [];

							btnText.html( updatingBtnText );

							//get data
							var formData = new FormData();

							//get files
							gallery.each(
								function () {
									var thisGallery = $( this ),
									thisName        = thisGallery.attr( 'name' ),
									thisRepeaterID  = thisGallery.attr( 'id' ),
									thisFiles       = thisGallery[0].files,
									newName;

									//this part is needed for repeater with image uploads
									//adding specific names so they can be sorted in regular files and files in repeater
									if (thisName.indexOf( "[" ) > -1) {
										newName = thisName.substring( 0, thisName.indexOf( "[" ) ) + '_mkdf_regarray_';

										var firstIndex = thisRepeaterID.indexOf( '[' ),
										lastIndex      = thisRepeaterID.indexOf( ']' ),
										index          = thisRepeaterID.substring( firstIndex + 1, lastIndex );

										namesArray.push( newName );
										newName = newName + index + '_';
									} else {
										newName = thisName + '_mkdf_reg_';
									}

									//if file not sent, send dummy file - so repeater fields are sent
									if (thisFiles.length === 0) {
										formData.append(
											newName,
											new File(
												[""],
												"mkdf-dummy-file.txt",
												{
													type: "text/plain"
												}
											)
										);
									}

									for (var i = 0; i < thisFiles.length; i++) {
										var allowedTypes = ['image/png','image/jpg','image/jpeg','application/pdf'];
										//security purposed - check if there is more than one dot in file name, also check whether the file type is in allowed types
										if (thisFiles[i].name.match( /\./g ).length === 1 && $.inArray( thisFiles[i].type, allowedTypes ) !== -1) {
											formData.append( newName + i, thisFiles[i] );
										}
									}
								}
							);

							formData.append( 'action', actionName );

							//get data from form
							var otherData = $( this ).serialize();
							formData.append( 'data', otherData );

							$.ajax(
								{
									type: 'POST',
									data: formData,
									contentType: false,
									processData: false,
									url: mkdfGlobalVars.vars.mkdfAjaxUrl,
									success: function (data) {
										var response;
										response = JSON.parse( data );

										// append ajax response html
										mkdf.modules.socialLogin.mkdfRenderAjaxResponseMessage( response );
										if (response.status === 'success') {
											btnText.html( updatedBtnText );
											window.location = response.redirect;
										} else {
											btnText.html( prevBtnText );
										}
									}
								}
							);

							return false;
						}
					);
				}
			);
		}
	}

	/**
	 * Init Perfect Scrollbar
	 */
	function mkdfInitPerfectScrollbar() {
		var defaultParams = {
			wheelSpeed: 0.6,
			suppressScrollX: true
		};

		var mkdfInitScroll = function (holder) {
			var ps = new PerfectScrollbar( holder[0], defaultParams );

			$( window ).resize(
				function () {
					ps.update();
				}
			);
		};

		return {
			init: function (holder) {
				if (holder.length) {
					mkdfInitScroll( holder );
				}
			}
		};
	}

	function mkdfRowBackgroundText() {
		var backgroundText = $( '.mkdf-row-background-text-holder' );

		backgroundText.each(
			function () {
				var backgroundTextInstance = $( this ),
				backgroundTextWrapper      = backgroundTextInstance.find( '.mkdf-row-background-text-wrapper' ),
				backgroundTextInner        = backgroundTextInstance.find( '.mkdf-row-background-text-wrapper-inner' ),
				row                        = backgroundTextInstance.parent().addClass( 'mkdf-row-has-background-text' );

				if (mkdf.windowWidth > 1280 && mkdf.windowWidth <= 1440) {
					if ( typeof backgroundTextInner.data( 'font-size-1440' ) !== 'undefined' && backgroundTextInner.data( 'font-size-1440' ) !== false) {
						backgroundTextInner.css( 'font-size', backgroundTextInner.data( 'font-size-1440' ) );
					}

					if ( typeof backgroundTextInner.data( 'padding-size-1440' ) !== 'undefined' && backgroundTextInner.data( 'padding-size-1440' ) !== false) {
						backgroundTextInner.css( 'padding-top', backgroundTextInner.data( 'padding-size-1440' ) );
					}

					if ( typeof backgroundTextInner.data( 'padding-left-size-1440' ) !== 'undefined' && backgroundTextInner.data( 'padding-left-size-1440' ) !== false) {
						backgroundTextInner.css( 'padding-left', backgroundTextInner.data( 'padding-left-size-1440' ) );
					}
				}

				if (mkdf.windowWidth > 1024 && mkdf.windowWidth <= 1280) {
					if ( typeof backgroundTextInner.data( 'font-size-1280' ) !== 'undefined' && backgroundTextInner.data( 'font-size-1280' ) !== false) {
						backgroundTextInner.css( 'font-size', backgroundTextInner.data( 'font-size-1280' ) );
					}

					if ( typeof backgroundTextInner.data( 'padding-size-1280' ) !== 'undefined' && backgroundTextInner.data( 'padding-size-1280' ) !== false) {
						backgroundTextInner.css( 'padding-top', backgroundTextInner.data( 'padding-size-1280' ) );
					}

					if ( typeof backgroundTextInner.data( 'padding-left-size-1280' ) !== 'undefined' && backgroundTextInner.data( 'padding-left-size-1280' ) !== false) {
						backgroundTextInner.css( 'padding-left', backgroundTextInner.data( 'padding-left-size-1280' ) );
					}
				}

				backgroundTextInstance.prev().css( 'z-index', 10 );

				//appear fx
				if (backgroundTextWrapper.hasClass( 'mkdf-row-background-text-animation' ) && ! mkdf.htmlEl.hasClass( 'touch' )) {
					var bgrndTextElements = backgroundTextInstance.find( '.mkdf-row-background-text-1, .mkdf-row-background-text-2' ),
					delay                 = 120;

					bgrndTextElements.each(
						function(i){
							var bgrndTextElement = $( this ),
							txt                  = bgrndTextElement.text(),
							newTxt               = txt.replace(
								/[^\s]/g,
								function(c){
									return '<span class="mkdf-char-mask"><span>' + c + '</span></span>';
								}
							);

							bgrndTextElement.html( newTxt );

							var showText = function() {
								backgroundTextWrapper.css( 'visibility','visible' );

								backgroundTextInstance.find( '.mkdf-char-mask > span' ).each(
									function(j){
										var bgrndChar = $( this );

										bgrndChar
										.css( 'transition-delay', j * delay + 'ms' )
										.addClass( 'mkdf-show' );
									}
								);
							}

							var isEditMode = false;

							if ( typeof elementorFrontend !== 'undefined') {
								isEditMode = Boolean( elementorFrontend.isEditMode() );
							}

							if ( isEditMode ) {
								showText();
							}
							
							backgroundTextInstance.appear(
								function(){
									showText();
								},
								{accX: 0, accY: -400}
							);
						}
					);
				}

			}
		)
	}

})( jQuery );

(function($) {
	"use strict";

    var blog = {};
    mkdf.modules.blog = blog;

    blog.mkdfOnDocumentReady = mkdfOnDocumentReady;
    blog.mkdfOnWindowLoad = mkdfOnWindowLoad;
    blog.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfInitAudioPlayer();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
	    mkdfInitBlogPagination().init();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function mkdfOnWindowScroll() {
	    mkdfInitBlogPagination().scroll();
    }

    /**
    * Init audio player for Blog list and single pages
    */
    function mkdfInitAudioPlayer() {
	    var players = $('audio.mkdf-blog-audio');
	
	    if (players.length) {
		    players.mediaelementplayer({
			    audioWidth: '100%'
		    });
	    }
    }
	
	/**
	 * Initializes blog pagination functions
	 */
	function mkdfInitBlogPagination(){
		var holder = $('.mkdf-blog-holder');
		
		var initLoadMorePagination = function(thisHolder) {
			var loadMoreButton = thisHolder.find('.mkdf-blog-pag-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisHolder);
			});
		};
		
		var initInifiteScrollPagination = function(thisHolder) {
			var blogListHeight = thisHolder.outerHeight(),
				blogListTopOffest = thisHolder.offset().top,
				blogListPosition = blogListHeight + blogListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > blogListPosition) {
				initMainPagFunctionality(thisHolder);
			}
		};
		
		var initMainPagFunctionality = function(thisHolder) {
			var thisHolderInner = thisHolder.children('.mkdf-blog-holder-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
				maxNumPages = thisHolder.data('max-num-pages');
			}
			
			if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
				thisHolder.addClass('mkdf-blog-pagination-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisHolder),
				loadingItem = thisHolder.find('.mkdf-blog-pag-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages){
				loadingItem.addClass('mkdf-showing');
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_mikado_blog_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						nextPage++;
						
						thisHolder.data('next-page', nextPage);

						var response = $.parseJSON(data),
							responseHtml =  response.html;

						thisHolder.waitForImages(function(){
							if(thisHolder.hasClass('mkdf-grid-masonry-list')){
								mkdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
								mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('article'), thisHolderInner.find('.mkdf-masonry-grid-sizer').width());
							} else {
								mkdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
							}
							
							setTimeout(function() {
								mkdfInitAudioPlayer();
								mkdf.modules.common.mkdfOwlSlider();
								mkdf.modules.common.mkdfFluidVideo();
                                mkdf.modules.common.mkdfInitSelfHostedVideoPlayer();
                                mkdf.modules.common.mkdfSelfHostedVideoSize();
								
								if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
									mkdf.modules.common.mkdfStickySidebarWidget().reInit();
								}

                                // Trigger event.
                                $( document.body ).trigger( 'blog_list_load_more_trigger' );

							}, 400);
						});
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll-started')) {
							thisHolder.removeClass('mkdf-blog-pagination-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisHolder.find('.mkdf-blog-pag-load-more').hide();
			}
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisHolderInner.append(responseHtml);
		};
		
		return {
			init: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkdf-blog-pagination-load-more')) {
							initLoadMorePagination(thisHolder);
						}
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			},
			scroll: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('mkdf-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
	"use strict";
	
	var footer = {};
    mkdf.modules.footer = footer;
	
	footer.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	 
	function mkdfOnWindowLoad() {
		uncoveringFooter();
	}
	
	function uncoveringFooter() {
		var uncoverFooter = $('body:not(.error404) .mkdf-footer-uncover');

		if (uncoverFooter.length && !mkdf.htmlEl.hasClass('touch')) {

			var footer = $('footer'),
				footerHeight = footer.outerHeight(),
				content = $('.mkdf-content');
			
			var uncoveringCalcs = function () {
				content.css('margin-bottom', footerHeight);
				footer.css('height', footerHeight);
			};


			//set
			uncoveringCalcs();
			
			$(window).resize(function () {
				//recalc
				footerHeight = footer.find('.mkdf-footer-inner').outerHeight();
				uncoveringCalcs();
			});
		}
	}
	
})(jQuery);
(function($) {
	"use strict";
	
	var header = {};
	mkdf.modules.header = header;
	
	header.mkdfSetDropDownMenuPosition     = mkdfSetDropDownMenuPosition;
	header.mkdfSetDropDownWideMenuPosition = mkdfSetDropDownWideMenuPosition;
	
	header.mkdfOnDocumentReady = mkdfOnDocumentReady;
	header.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfSetDropDownMenuPosition();
		setTimeout(function(){
			mkdfDropDownMenu();
		}, 100);
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfSetDropDownWideMenuPosition();
	}
	
	/**
	 * Set dropdown position
	 */
	function mkdfSetDropDownMenuPosition() {
		var menuItems = $('.mkdf-drop-down > ul > li.narrow.menu-item-has-children');
		
		if (menuItems.length) {
			menuItems.each(function (i) {
				var thisItem = $(this),
					menuItemPosition = thisItem.offset().left,
					dropdownHolder = thisItem.find('.second'),
					dropdownMenuItem = dropdownHolder.find('.inner ul'),
					dropdownMenuWidth = dropdownMenuItem.outerWidth(),
					menuItemFromLeft = mkdf.windowWidth - menuItemPosition;
				
				if (mkdf.body.hasClass('mkdf-boxed')) {
					menuItemFromLeft = mkdf.boxedLayoutWidth - (menuItemPosition - (mkdf.windowWidth - mkdf.boxedLayoutWidth ) / 2);
				}
				
				var dropDownMenuFromLeft; //has to stay undefined because 'dropDownMenuFromLeft < dropdownMenuWidth' conditional will be true
				
				if (thisItem.find('li.sub').length > 0) {
					dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
				}
				
				dropdownHolder.removeClass('right');
				dropdownMenuItem.removeClass('right');
				if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
					dropdownHolder.addClass('right');
					dropdownMenuItem.addClass('right');
				}
			});
		}
	}
	
	/**
	 * Set dropdown wide position
	 */
	function mkdfSetDropDownWideMenuPosition(){
		var menuItems = $(".mkdf-drop-down > ul > li.wide");
		
		if(menuItems.length) {
			menuItems.each( function(i) {
                var menuItem = $(this);

				menuItem.on('mouseenter', function() {
					var menuItemSubMenu = $(this).find('.second');

					if(menuItemSubMenu.length && !menuItemSubMenu.hasClass('mkdf-init-left') && !menuItemSubMenu.hasClass('left_position') && !menuItemSubMenu.hasClass('right_position')) {
						menuItemSubMenu.css('left', 0);

						var left_position = menuItemSubMenu.offset().left;

						if(mkdf.body.hasClass('mkdf-boxed')) {
							//boxed layout case
							var boxedWidth = $('.mkdf-boxed .mkdf-wrapper .mkdf-wrapper-inner').outerWidth();
							left_position = left_position - (mkdf.windowWidth - boxedWidth) / 2;
							menuItemSubMenu.css({'left': -left_position, 'width': boxedWidth}).addClass('mkdf-init-left');

						} else if(mkdf.body.hasClass('mkdf-wide-dropdown-menu-in-grid')) {
							//wide dropdown in grid case
							menuItemSubMenu.css({'left': -left_position + (mkdf.windowWidth - mkdf.gridWidth()) / 2, 'width': mkdf.gridWidth()}).addClass('mkdf-init-left');
						}
						else {
							//wide dropdown full width case
							menuItemSubMenu.css({'left': -left_position, 'width': mkdf.windowWidth}).addClass('mkdf-init-left');

						}
					}
				});
			});
		}
	}
	
	function mkdfDropDownMenu() {
		var menu_items = $('.mkdf-drop-down > ul > li');
		
		menu_items.each(function() {
			var thisItem = $(this);
			
			if(thisItem.find('.second').length) {
				thisItem.waitForImages(function(){
					var dropDownHolder = thisItem.find('.second'),
						dropDownHolderHeight = !mkdf.menuDropdownHeightSet ? dropDownHolder.outerHeight() : 0;
					
					if(thisItem.hasClass('wide')) {
						var tallest = 0,
							dropDownSecondItem = dropDownHolder.find('> .inner > ul > li');
						
						dropDownSecondItem.each(function() {
							var thisHeight = $(this).outerHeight();
							
							if(thisHeight > tallest) {
								tallest = thisHeight;
							}
						});
						
						dropDownSecondItem.css('height', '').height(tallest);
						
						if (!mkdf.menuDropdownHeightSet) {
							dropDownHolderHeight = dropDownHolder.outerHeight();
						}
					}
					
					if (!mkdf.menuDropdownHeightSet) {
						dropDownHolder.height(0);
					}
					
					if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						thisItem.on("touchstart mouseenter", function() {
							dropDownHolder.css({
								'height': dropDownHolderHeight,
								'overflow': 'visible',
								'visibility': 'visible',
								'opacity': '1'
							});
						}).on("mouseleave", function() {
							dropDownHolder.css({
								'height': '0px',
								'overflow': 'hidden',
								'visibility': 'hidden',
								'opacity': '0'
							});
						});
					} else {
						if (mkdf.body.hasClass('mkdf-dropdown-animate-height')) {
							var animateConfig = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('mkdf-drop-down-start').css({
											'visibility': 'visible',
											'height': '0',
											'opacity': '1'
										});
										dropDownHolder.stop().animate({
											'height': dropDownHolderHeight
										}, 400, 'easeInOutQuint', function () {
											dropDownHolder.css('overflow', 'visible');
										});
									}, 100);
								},
								timeout: 100,
								out: function () {
									dropDownHolder.stop().animate({
										'height': '0',
										'opacity': 0
									}, 100, function () {
										dropDownHolder.css({
											'overflow': 'hidden',
											'visibility': 'hidden'
										});
									});
									
									dropDownHolder.removeClass('mkdf-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(animateConfig);
						} else {
							var config = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('mkdf-drop-down-start').stop().css({'height': dropDownHolderHeight});
									}, 150);
								},
								timeout: 150,
								out: function () {
									dropDownHolder.stop().css({'height': '0'}).removeClass('mkdf-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(config);
						}
					}
				});
			}
		});
		
		$('.mkdf-drop-down ul li.wide ul li a').on('click', function(e) {
			if (e.which === 1){
				var $this = $(this);
				
				setTimeout(function() {
					$this.mouseleave();
				}, 500);
			}
		});
		
		mkdf.menuDropdownHeightSet = true;
	}
	
})(jQuery);
(function($) {
    'use strict';

    var like = {};
    
    like.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function mkdfOnDocumentReady() {
        mkdfLikes();
    }

    function mkdfLikes() {
        $(document).on('click','.mkdf-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                type;

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }

            var dataToPass = {
                action: 'wilmer_mikado_like',
                likes_id: id,
                type: type
            };

            var like = $.post(mkdfGlobalVars.vars.mkdfAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });

            return false;
        });
    }
    
})(jQuery);
(function($) {
    "use strict";

    var sidearea = {};
    mkdf.modules.sidearea = sidearea;

    sidearea.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfSideArea();
    }
	
	/**
	 * Show/hide side area
	 */
    function mkdfSideArea() {
		var wrapper = $('.mkdf-wrapper'),
			sideMenu = $('.mkdf-side-menu'),
			sideMenuButtonOpen = $('a.mkdf-side-menu-button-opener'),
			cssClass,
			//Flags
			slideFromRight = false,
			slideWithContent = false,
			slideUncovered = false;
		
		if (mkdf.body.hasClass('mkdf-side-menu-slide-from-right')) {
			$('.mkdf-cover').remove();
			cssClass = 'mkdf-right-side-menu-opened';
			wrapper.prepend('<div class="mkdf-cover"/>');
			slideFromRight = true;
		} else if (mkdf.body.hasClass('mkdf-side-menu-slide-with-content')) {
			cssClass = 'mkdf-side-menu-open';
			slideWithContent = true;
		} else if (mkdf.body.hasClass('mkdf-side-area-uncovered-from-content')) {
			cssClass = 'mkdf-right-side-menu-opened';
			slideUncovered = true;
		}
		
		$('a.mkdf-side-menu-button-opener, a.mkdf-close-side-menu').on('click', function (e) {
			e.preventDefault();
	
	        if (!sideMenuButtonOpen.hasClass('opened')) {
		        sideMenuButtonOpen.addClass('opened');
		        mkdf.body.addClass(cssClass);
		
		        if (slideFromRight) {
			        $('.mkdf-wrapper .mkdf-cover').on('click', function () {
				        mkdf.body.removeClass('mkdf-right-side-menu-opened');
				        sideMenuButtonOpen.removeClass('opened');
			        });
		        }
		
		        if (slideUncovered) {
			        sideMenu.css({
				        'visibility': 'visible'
			        });
		        }
		
		        var currentScroll = $(window).scrollTop();
		        $(window).scroll(function () {
			        if (Math.abs(mkdf.scroll - currentScroll) > 400) {
				        mkdf.body.removeClass(cssClass);
				        sideMenuButtonOpen.removeClass('opened');
				        if (slideUncovered) {
					        var hideSideMenu = setTimeout(function () {
						        sideMenu.css({'visibility': 'hidden'});
						        clearTimeout(hideSideMenu);
					        }, 400);
				        }
			        }
		        });
            } else {
	            sideMenuButtonOpen.removeClass('opened');
	            mkdf.body.removeClass(cssClass);
	
	            if (slideUncovered) {
		            var hideSideMenu = setTimeout(function () {
			            sideMenu.css({'visibility': 'hidden'});
			            clearTimeout(hideSideMenu);
		            }, 400);
	            }
            }
	
	        if (slideWithContent) {
		        e.stopPropagation();
		
		        wrapper.on('click', function () {
			        e.preventDefault();
			        sideMenuButtonOpen.removeClass('opened');
			        mkdf.body.removeClass('mkdf-side-menu-open');
		        });
	        }
        });

        if(sideMenu.length){
            mkdf.modules.common.mkdfInitPerfectScrollbar().init(sideMenu);
        }
    }

})(jQuery);

(function ($) {
	"use strict";
	
	var subscribePopup = {};
	mkdf.modules.subscribePopup = subscribePopup;
	
	subscribePopup.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfSubscribePopup();
	}
	
	function mkdfSubscribePopup() {
		var popupOpener = $('.mkdf-subscribe-popup-holder'),
			popupClose = $('.mkdf-sp-close');
		
		if (popupOpener.length) {
			var popupPreventHolder = popupOpener.find('.mkdf-sp-prevent'),
				disabledPopup = 'no';
			
			if (popupPreventHolder.length) {
				var isLocalStorage = popupOpener.hasClass('mkdf-sp-prevent-cookies'),
					popupPreventInput = popupPreventHolder.find('.mkdf-sp-prevent-input'),
					preventValue = popupPreventInput.data('value');
				
				if (isLocalStorage) {
					disabledPopup = localStorage.getItem('disabledPopup');
					sessionStorage.removeItem('disabledPopup');
				} else {
					disabledPopup = sessionStorage.getItem('disabledPopup');
					localStorage.removeItem('disabledPopup');
				}
				
				popupPreventHolder.children().on('click', function (e) {
					if ( preventValue !== 'yes' ) {
						preventValue = 'yes';
						popupPreventInput.addClass('mkdf-sp-prevent-clicked').data('value', 'yes');
					} else {
						preventValue = 'no';
						popupPreventInput.removeClass('mkdf-sp-prevent-clicked').data('value', 'no');
					}
					
					if (preventValue === 'yes') {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'yes');
						} else {
							sessionStorage.setItem('disabledPopup', 'yes');
						}
					} else {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'no');
						} else {
							sessionStorage.setItem('disabledPopup', 'no');
						}
					}
				});
			}
			
			if (disabledPopup !== 'yes') {
				if (mkdf.body.hasClass('mkdf-sp-opened')) {
					mkdf.body.removeClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfEnableScroll();
				} else {
					mkdf.body.addClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfDisableScroll();
				}
				
				popupClose.on('click', function (e) {
					e.preventDefault();
					
					mkdf.body.removeClass('mkdf-sp-opened');
					mkdf.modules.common.mkdfEnableScroll();
				});
				
				//Close on escape
				$(document).keyup(function (e) {
					if (e.keyCode === 27) { //KeyCode for ESC button is 27
						mkdf.body.removeClass('mkdf-sp-opened');
						mkdf.modules.common.mkdfEnableScroll();
					}
				});
			}
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var title = {};
    mkdf.modules.title = title;

    title.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfParallaxTitle();
	    mkdfBackgroundTextResponsive();
    }

    /*
     **	Title image with parallax effect
     */
	function mkdfParallaxTitle() {
		var parallaxBackground = $('.mkdf-title-holder.mkdf-bg-parallax');
		
		if (parallaxBackground.length > 0 && mkdf.windowWidth > 1024) {
			var parallaxBackgroundWithZoomOut = parallaxBackground.hasClass('mkdf-bg-parallax-zoom-out'),
				titleHeight = parseInt(parallaxBackground.data('height')),
				imageWidth = parseInt(parallaxBackground.data('background-width')),
				parallaxRate = titleHeight / 10000 * 7,
				parallaxYPos = -(mkdf.scroll * parallaxRate),
				adminBarHeight = mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
			
			if (parallaxBackgroundWithZoomOut) {
				parallaxBackground.css({'background-size': imageWidth - mkdf.scroll + 'px auto'});
			}
			
			//set position of background on window scroll
			$(window).scroll(function () {
				parallaxYPos = -(mkdf.scroll * parallaxRate);
				parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
				
				if (parallaxBackgroundWithZoomOut) {
					parallaxBackground.css({'background-size': imageWidth - mkdf.scroll + 'px auto'});
				}
			});
		}
	}

	function mkdfBackgroundTextResponsive(){

		var titleBgTextHolder = $('.mkdf-title-background-text');

		if(titleBgTextHolder.length){
			titleBgTextHolder.each(function(){
				var thisTitleBackgroundText = $(this),
					thisTitle = thisTitleBackgroundText.find('.mkdf-title-background-text-holder-inner');

				if( typeof(thisTitleBackgroundText.data('padding-left-1440')) !== 'undefined' && thisTitleBackgroundText.data('padding-left-1440') !== false){
					var padding1440 = thisTitleBackgroundText.data('padding-left-1440');

					if(mkdf.windowWidth <= 1440 ){
						thisTitle.css('padding-left', padding1440);
                    }
				}
			})
		}

	}

})(jQuery);

(function($) {
    'use strict';

    var woocommerce = {};
    mkdf.modules.woocommerce = woocommerce;

    woocommerce.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfInitQuantityButtons();
        mkdfInitSelect2();
	    mkdfInitSingleProductLightbox();
	    mkdfAddPaginationClasses();
    }
	
    /*
    ** Init quantity buttons to increase/decrease products for cart
    */
	function mkdfInitQuantityButtons() {
		$(document).on('click', '.mkdf-quantity-minus, .mkdf-quantity-plus', function (e) {
			e.stopPropagation();
			
			var button = $(this),
				$inputField = button.siblings('.mkdf-quantity-input'),
				step = parseFloat($inputField.data('step')),
				max = parseFloat($inputField.data('max')),
				min = parseFloat($inputField.data('min')),
				minus = false,
				inputValue = parseFloat($inputField.val()),
				newInputValue;
			
			if (button.hasClass('mkdf-quantity-minus')) {
				minus = true;
			}
			
			if (minus) {
				newInputValue = inputValue - step;
				if (newInputValue >= min) {
					$inputField.val(newInputValue);
				} else {
					$inputField.val(min);
				}
			} else {
				newInputValue = inputValue + step;
				if (max === undefined) {
					$inputField.val(newInputValue);
				} else {
					if (newInputValue >= max) {
						$inputField.val(max);
					} else {
						$inputField.val(newInputValue);
					}
				}
			}
			
			$inputField.trigger('change');
		});
	}

    /*
    ** Init select2 script for select html dropdowns
    */
	function mkdfInitSelect2() {
		var orderByDropDown = $('.woocommerce-ordering .orderby');
		if (orderByDropDown.length) {
			orderByDropDown.select2({
				minimumResultsForSearch: Infinity
			});
		}
		
		var variableProducts = $('.mkdf-woocommerce-page .mkdf-content .variations td.value select');
		if (variableProducts.length) {
			variableProducts.select2();
		}
		
		var shippingCountryCalc = $('#calc_shipping_country');
		if (shippingCountryCalc.length) {
			shippingCountryCalc.select2();
		}
		
		var shippingStateCalc = $('.cart-collaterals .shipping select#calc_shipping_state');
		if (shippingStateCalc.length) {
			shippingStateCalc.select2();
		}
		
		var defaultMonsterWidgets = $('.widget.widget_archive select, .widget.widget_categories select, .widget.widget_text select');
		if (defaultMonsterWidgets.length) {
			defaultMonsterWidgets.select2();
		}
	}
	
	/*
	 ** Init Product Single Pretty Photo attributes
	 */
	function mkdfInitSingleProductLightbox() {
		var item = $('.mkdf-woo-single-page.mkdf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image');
		
		if(item.length) {
			item.children('a').attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');
			
			if (typeof mkdf.modules.common.mkdfPrettyPhoto === "function") {
				mkdf.modules.common.mkdfPrettyPhoto();
			}
		}
	}

	function mkdfAddPaginationClasses(){
        var next 	 = $( ".woocommerce-pagination .page-numbers li a.next" );
        var previous = $( ".woocommerce-pagination .page-numbers li a.prev" );

        next.parent().addClass("mkdf-pl-pagination-next");
        previous.parent().addClass("mkdf-pl-pagination-next");

	}

})(jQuery);
(function($) {
    "use strict";

    var blogListSC = {};
    mkdf.modules.blogListSC = blogListSC;
    
    blogListSC.mkdfOnWindowLoad = mkdfOnWindowLoad;
    blogListSC.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitBlogListShortcodePagination().init();
        mkdfElementorBlogList();
    }

    /**
     * Elementor Blog List
     */
    function mkdfElementorBlogList() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_blog_list.default', function () {
                mkdf.modules.common.mkdfInitGridMasonryListLayout();
                mkdfInitBlogListShortcodePagination().init();
            });
        });
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
        mkdfInitBlogListShortcodePagination().scroll();
    }

    /**
     * Init blog list shortcode pagination functions
     */
    function mkdfInitBlogListShortcodePagination(){
        var holder = $('.mkdf-blog-list-holder');

        var initStandardPagination = function(thisHolder) {
            var standardLink = thisHolder.find('.mkdf-bl-standard-pagination li');

            if(standardLink.length) {
                standardLink.each(function(){
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;

                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }

                        initMainPagFunctionality(thisHolder, pagedLink);
                    });
                });
            }
        };

        var initLoadMorePagination = function(thisHolder) {
            var loadMoreButton = thisHolder.find('.mkdf-blog-pag-load-more a');

            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                initMainPagFunctionality(thisHolder);
            });
        };

        var initInifiteScrollPagination = function(thisHolder) {
            var blogListHeight = thisHolder.outerHeight(),
                blogListTopOffest = thisHolder.offset().top,
                blogListPosition = blogListHeight + blogListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;

            if(!thisHolder.hasClass('mkdf-bl-pag-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > blogListPosition) {
                initMainPagFunctionality(thisHolder);
            }
        };

        var initMainPagFunctionality = function(thisHolder, pagedLink) {
            var thisHolderInner = thisHolder.find('.mkdf-blog-list'),
                nextPage,
                maxNumPages;

            if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
                maxNumPages = thisHolder.data('max-num-pages');
            }

            if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                thisHolder.data('next-page', pagedLink);
            }

            if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                thisHolder.addClass('mkdf-bl-pag-infinite-scroll-started');
            }

            var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisHolder),
                loadingItem = thisHolder.find('.mkdf-blog-pag-loading');

            nextPage = loadMoreDatta.nextPage;

            if(nextPage <= maxNumPages){
                if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                    loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
                    thisHolder.addClass('mkdf-bl-pag-standard-shortcodes-animate');
                } else {
                    loadingItem.addClass('mkdf-showing');
                }

                var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_mikado_blog_shortcode_load_more');

                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                    success: function (data) {
                        if(!thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            nextPage++;
                        }

                        thisHolder.data('next-page', nextPage);

                        var response = $.parseJSON(data),
                            responseHtml =  response.html;

                        if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            mkdfInitStandardPaginationLinkChanges(thisHolder, maxNumPages, nextPage);

                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('mkdf-bl-masonry')){
                                    mkdfInitHtmlIsotopeNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    mkdfInitHtmlGalleryNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);

                                    if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                                        mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        } else {
                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('mkdf-bl-masonry')){
                                    mkdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    mkdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);

                                    if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                                        mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        }

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll-started')) {
                            thisHolder.removeClass('mkdf-bl-pag-infinite-scroll-started');
                        }
                    }
                });
            }

            if(nextPage === maxNumPages){
                thisHolder.find('.mkdf-blog-pag-load-more').hide();
            }
        };

        var mkdfInitStandardPaginationLinkChanges = function(thisHolder, maxNumPages, nextPage) {
            var standardPagHolder = thisHolder.find('.mkdf-bl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');

            standardPagNumericItem.removeClass('mkdf-pag-active');
            standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');

            standardPagPrevItem.data('paged', nextPage-1);
            standardPagNextItem.data('paged', nextPage+1);

            if(nextPage > 1) {
                standardPagPrevItem.css({'opacity': '1'});
            } else {
                standardPagPrevItem.css({'opacity': '0'});
            }

            if(nextPage === maxNumPages) {
                standardPagNextItem.css({'opacity': '0'});
            } else {
                standardPagNextItem.css({'opacity': '1'});
            }
        };

        var mkdfInitHtmlIsotopeNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.html(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
            thisHolder.removeClass('mkdf-bl-pag-standard-shortcodes-animate');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                    mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var mkdfInitHtmlGalleryNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
            thisHolder.removeClass('mkdf-bl-pag-standard-shortcodes-animate');
            thisHolderInner.html(responseHtml);
        };

        var mkdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('mkdf-showing');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof mkdf.modules.common.mkdfStickySidebarWidget === 'function') {
                    mkdf.modules.common.mkdfStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var mkdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('mkdf-showing');
            thisHolderInner.append(responseHtml);
        };

        return {
            init: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('mkdf-bl-pag-standard-shortcodes')) {
                            initStandardPagination(thisHolder);
                        }

                        if(thisHolder.hasClass('mkdf-bl-pag-load-more')) {
                            initLoadMorePagination(thisHolder);
                        }

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            },
            scroll: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('mkdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            }
        };
    }

})(jQuery);
(function($) {
    "use strict";

    var blogSliderSC = {};
    mkdf.modules.blogSliderSC = blogSliderSC;

    blogSliderSC.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorBlogSlider();
    }

    /**
     * Elementor Blog List
     */
    function mkdfElementorBlogSlider() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_blog_slider.default', function () {
                mkdf.modules.common.mkdfOwlSlider();
            });
        });
    }

})(jQuery);
(function($) {
    "use strict";

    var headerMinimal = {};
    mkdf.modules.headerMinimal = headerMinimal;
	
	headerMinimal.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfFullscreenMenu();
    }

    /**
     * Init Fullscreen Menu
     */
    function mkdfFullscreenMenu() {
	    var popupMenuOpener = $( 'a.mkdf-fullscreen-menu-opener');
	    
        if (popupMenuOpener.length) {
            var popupMenuHolderOuter = $(".mkdf-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.mkdf-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.mkdf-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.mkdf-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.mkdf-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.mkdf-fullscreen-menu ul li:not(.has_sub) a');

            //set height of popup holder and initialize perfectScrollbar
            mkdf.modules.common.mkdfInitPerfectScrollbar().init(popupMenuHolderOuter);

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(mkdf.windowHeight);
            });

            if (mkdf.body.hasClass('mkdf-fade-push-text-right')) {
                cssClass = 'mkdf-push-nav-right';
                fadeRight = true;
            } else if (mkdf.body.hasClass('mkdf-fade-push-text-top')) {
                cssClass = 'mkdf-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 400 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 400 + 'ms',
                        'animation-delay': (i+1) * 70 + 400 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('mkdf-fm-opened')) {
                    popupMenuOpener.addClass('mkdf-fm-opened');
                    mkdf.body.removeClass('mkdf-fullscreen-fade-out').addClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in');
                    mkdf.body.removeClass(cssClass);
                    mkdf.modules.common.mkdfDisableScroll();
                    
                    $(document).keyup(function(e){
                        if (e.keyCode === 27 ) {
                            popupMenuOpener.removeClass('mkdf-fm-opened');
                            mkdf.body.removeClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                            mkdf.body.addClass(cssClass);
                            mkdf.modules.common.mkdfEnableScroll();

                            $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('mkdf-fm-opened');
                    mkdf.body.removeClass('mkdf-fullscreen-menu-opened mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                    mkdf.body.addClass(cssClass);
                    mkdf.modules.common.mkdfEnableScroll();

                    $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                var thisItem = $(this),
	                thisItemParent = thisItem.parent(),
					thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');

                if (thisItemParent.hasClass('has_sub')) {
	                var submenu = thisItemParent.find('> ul.sub_menu');
	
	                if (submenu.is(':visible')) {
		                submenu.slideUp(450, 'easeInOutQuint');
		                thisItemParent.removeClass('open_sub');
	                } else {
		                thisItemParent.addClass('open_sub');
		
		                if(thisItemParentSiblingsWithDrop.length === 0) {
			                submenu.slideDown(400, 'easeInOutQuint');
		                } else {
							thisItemParent.closest('li.menu-item').siblings().find('.menu-item').removeClass('open_sub');
			                thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
				                submenu.slideDown(400, 'easeInOutQuint');
			                });
		                }
	                }
                }
                
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click', function (e) {
                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){
                    if (e.which === 1) {
                        popupMenuOpener.removeClass('mkdf-fm-opened');
                        mkdf.body.removeClass('mkdf-fullscreen-menu-opened');
                        mkdf.body.removeClass('mkdf-fullscreen-fade-in').addClass('mkdf-fullscreen-fade-out');
                        mkdf.body.addClass(cssClass);
                        $("nav.mkdf-fullscreen-menu ul.sub_menu").slideUp(200);
                        mkdf.modules.common.mkdfEnableScroll();
                    }
                } else {
                    return false;
                }
            });
        }
    }

})(jQuery);
(function ($) {
	"use strict";
	
	var headerTabbed = {};
	mkdf.modules.headerTabbed = headerTabbed;
	
	headerTabbed.mkdfInitTabbedHeaderMenu = mkdfInitTabbedHeaderMenu;
	
	headerTabbed.mkdfOnDocumentReady = mkdfOnDocumentReady;
	headerTabbed.mkdfOnWindowResize = mkdfOnWindowResize;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());
	$(window).resize(mkdfOnWindowResize);

	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function mkdfOnDocumentReady() {
        setTimeout(function(){
            mkdfInitTabbedHeaderMenu();
        }, 100);
	}

	/*
		All functions to be called on $(window).load() should be in this function
	*/
	function mkdfOnWindowLoad() {
		//mkdfInitTabbedHeaderMenu();
	}
	
	/*
		All functions to be called on $(window).resize() should be in this function
	*/
	function mkdfOnWindowResize() {
		mkdfInitTabbedHeaderMenu();
	}
	
	/**
	 * Init Tabbed Header Menu
	 */
	function mkdfInitTabbedHeaderMenu() {
		if (mkdf.body.hasClass('mkdf-header-tabbed')) {
			var header = $('.mkdf-page-header'),
				centerHeaderArea = header.find('.mkdf-position-center'),
				leftHeaderAreaWidth = header.find('.mkdf-position-left').outerWidth(),
				rightHeaderAreaWidth = header.find('.mkdf-position-right').outerWidth(),
				headerAreaPadding = parseInt(header.find('.mkdf-vertical-align-containers').css('paddingLeft'), 10) * 2;
			
			centerHeaderArea.width(mkdf.windowWidth - leftHeaderAreaWidth - rightHeaderAreaWidth - headerAreaPadding - 1);
			
			header.css('opacity', 1);
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var headerVertical = {};
    mkdf.modules.headerVertical = headerVertical;
	
	headerVertical.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfVerticalMenu().init();
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var mkdfVerticalMenu = function() {
	    var verticalMenuObject = $('.mkdf-vertical-menu-area');

	    /**
	     * Checks if vertical area is scrollable (if it has mkdf-with-scroll class)
	     *
	     * @returns {bool}
	     */
	    var verticalAreaScrollable = function () {
		    return verticalMenuObject.hasClass('mkdf-with-scroll');
	    };
	
	    /**
	     * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
	     */
	    var initNavigation = function () {
		    var verticalNavObject = verticalMenuObject.find('.mkdf-vertical-menu');

		    if (verticalNavObject.hasClass('mkdf-vertical-dropdown-below')) {
				dropdownClickToggle();
			} else if (verticalNavObject.hasClass('mkdf-vertical-dropdown-side')) {
				dropdownFloat();
			}
		
		    /**
		     * Initializes click toggle navigation type. Works the same for touch and no-touch devices
		     */
		    function dropdownClickToggle() {
			    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
			
			    menuItems.each(function () {
				    var elementToExpand = $(this).find(' > .second, > ul');
				    var menuItem = this;
				    var dropdownOpener = $(this).find('> a');
				    var slideUpSpeed = 'fast';
				    var slideDownSpeed = 'slow';
				
				    dropdownOpener.on('click tap', function (e) {
					    e.preventDefault();
					    e.stopPropagation();
					
					    if (elementToExpand.is(':visible')) {
						    $(menuItem).removeClass('open');
						    elementToExpand.slideUp(slideUpSpeed);
					    } else if (dropdownOpener.parent().parent().children().hasClass('open') && dropdownOpener.parent().parent().parent().hasClass('mkdf-vertical-menu')) {
						    $(this).parent().parent().children().removeClass('open');
						    $(this).parent().parent().children().find(' > .second').slideUp(slideUpSpeed);
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    } else {
						
						    if (!$(this).parents('li').hasClass('open')) {
							    menuItems.removeClass('open');
							    menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    if ($(this).parent().parent().children().hasClass('open')) {
							    $(this).parent().parent().children().removeClass('open');
							    $(this).parent().parent().children().find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    }
				    });
			    });
		    }


			/**
			 * Initializes click float navigation type
			 */
			function dropdownFloat() {
				var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
				var allDropdowns = menuItems.find(' > .second > .inner > ul, > ul');

				menuItems.each(function() {
					var elementToExpand = $(this).find(' > .second > .inner > ul, > ul');
					var menuItem = this;

					if(Modernizr.touch) {
						var dropdownOpener = $(this).find('> a');

						dropdownOpener.on('click tap', function(e) {
							e.preventDefault();
							e.stopPropagation();

							if(elementToExpand.hasClass('mkdf-float-open')) {
								elementToExpand.removeClass('mkdf-float-open');
								$(menuItem).removeClass('open');
							} else {
								if(!$(this).parents('li').hasClass('open')) {
									menuItems.removeClass('open');
									allDropdowns.removeClass('mkdf-float-open');
								}

								elementToExpand.addClass('mkdf-float-open');
								$(menuItem).addClass('open');
							}
						});
					} else {
						//must use hoverIntent because basic hover effect doesn't catch dropdown
						//it doesn't start from menu item's edge
						$(this).hoverIntent({
							over: function() {
								elementToExpand.addClass('mkdf-float-open');
								$(menuItem).addClass('open');
							},
							out: function() {
								elementToExpand.removeClass('mkdf-float-open');
								$(menuItem).removeClass('open');
							},
							timeout: 300
						});
					}
				});
			}
	    };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        var initVerticalAreaScroll = function() {
            if(verticalAreaScrollable()) {
                mkdf.modules.common.mkdfInitPerfectScrollbar().init(verticalMenuObject);
            }
        };

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                    initVerticalAreaScroll();
                }
            }
        };
    };

})(jQuery);
(function ($) {
	"use strict";
	
	var mobileHeader = {};
	mkdf.modules.mobileHeader = mobileHeader;
	
	mobileHeader.mkdfOnDocumentReady = mkdfOnDocumentReady;
	mobileHeader.mkdfOnWindowResize = mkdfOnWindowResize;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).resize(mkdfOnWindowResize);
	
	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function mkdfOnDocumentReady() {
		mkdfInitMobileNavigation();
		mkdfInitMobileNavigationScroll();
		mkdfMobileHeaderBehavior();
	}
	
	/*
        All functions to be called on $(window).resize() should be in this function
    */
	function mkdfOnWindowResize() {
		mkdfInitMobileNavigationScroll();
	}
	
	function mkdfInitMobileNavigation() {
		var navigationOpener = $('.mkdf-mobile-header .mkdf-mobile-menu-opener'),
			navigationHolder = $('.mkdf-mobile-header .mkdf-mobile-nav'),
			dropdownOpener = $('.mkdf-mobile-nav .mobile_arrow, .mkdf-mobile-nav h6, .mkdf-mobile-nav a.mkdf-mobile-no-link');
		
		//whole mobile menu opening / closing
		if (navigationOpener.length && navigationHolder.length) {
			navigationOpener.on('tap click', function (e) {
				e.stopPropagation();
				e.preventDefault();
				
				if (navigationHolder.is(':visible')) {
					navigationHolder.slideUp(450, 'easeInOutQuint');
					navigationOpener.removeClass('mkdf-mobile-menu-opened');
				} else {
					navigationHolder.slideDown(450, 'easeInOutQuint');
					navigationOpener.addClass('mkdf-mobile-menu-opened');
				}
			});
		}
		
		//dropdown opening / closing
		if (dropdownOpener.length) {
			dropdownOpener.each(function () {
				var thisItem = $(this),
					initialNavHeight = navigationHolder.outerHeight();
				
				thisItem.on('tap click', function (e) {
					var thisItemParent = thisItem.parent('li'),
						thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
					
					if (thisItemParent.hasClass('has_sub')) {
						var submenu = thisItemParent.find('> ul.sub_menu');
						
						if (submenu.is(':visible')) {
							submenu.slideUp(450, 'easeInOutQuint');
							thisItemParent.removeClass('mkdf-opened');
							navigationHolder.stop().animate({'height': initialNavHeight}, 300);
						} else {
							thisItemParent.addClass('mkdf-opened');
							
							if (thisItemParentSiblingsWithDrop.length === 0) {
								thisItemParent.find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
									navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							} else {
								thisItemParent.siblings().removeClass('mkdf-opened').find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
									navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							}
						}
					}
				});
			});
		}
		
		$('.mkdf-mobile-nav a, .mkdf-mobile-logo-wrapper a').on('click tap', function (e) {
			if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
				navigationHolder.slideUp(450, 'easeInOutQuint');
				navigationOpener.removeClass("mkdf-mobile-menu-opened");
			}
		});
	}
	
	function mkdfInitMobileNavigationScroll() {
		if (mkdf.windowWidth <= 1024) {
			var mobileHeader = $('.mkdf-mobile-header'),
				mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
				navigationHolder = mobileHeader.find('.mkdf-mobile-nav'),
				navigationHeight = navigationHolder.outerHeight(),
				windowHeight = mkdf.windowHeight - 100;
			
			//init scrollable menu
			var scrollHeight = mobileHeaderHeight + navigationHeight > windowHeight ? windowHeight - mobileHeaderHeight : navigationHeight;

            // in case if mobile header exists on specific page
            if(navigationHolder.length) {
                navigationHolder.height(scrollHeight);
                mkdf.modules.common.mkdfInitPerfectScrollbar().init(navigationHolder);
            }
		}
	}
	
	function mkdfMobileHeaderBehavior() {
		var mobileHeader = $('.mkdf-mobile-header'),
			mobileMenuOpener = mobileHeader.find('.mkdf-mobile-menu-opener'),
			mobileHeaderHeight = mobileHeader.length ? mobileHeader.outerHeight() : 0;
		
		if (mkdf.body.hasClass('mkdf-content-is-behind-header') && mobileHeaderHeight > 0 && mkdf.windowWidth <= 1024) {
			$('.mkdf-content').css('marginTop', -mobileHeaderHeight);
		}
		
		if (mkdf.body.hasClass('mkdf-sticky-up-mobile-header')) {
			var stickyAppearAmount,
				adminBar = $('#wpadminbar');
			
			var docYScroll1 = $(document).scrollTop();
			stickyAppearAmount = mobileHeaderHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			$(window).scroll(function () {
				var docYScroll2 = $(document).scrollTop();
				
				if (docYScroll2 > stickyAppearAmount) {
					mobileHeader.addClass('mkdf-animate-mobile-header');
				} else {
					mobileHeader.removeClass('mkdf-animate-mobile-header');
				}
				
				if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount && !mobileMenuOpener.hasClass('mkdf-mobile-menu-opened')) || (docYScroll2 < stickyAppearAmount)) {
					mobileHeader.removeClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', 0);
					
					if (adminBar.length) {
						mobileHeader.find('.mkdf-mobile-header-inner').css('top', 0);
					}
				} else {
					mobileHeader.addClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', stickyAppearAmount);
				}
				
				docYScroll1 = $(document).scrollTop();
			});
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var stickyHeader = {};
    mkdf.modules.stickyHeader = stickyHeader;
	
	stickyHeader.isStickyVisible = false;
	stickyHeader.stickyAppearAmount = 0;
	stickyHeader.behaviour = '';
	
	stickyHeader.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    if(mkdf.windowWidth > 1024) {
		    mkdfHeaderBehaviour();
	    }
    }

    /*
     **	Show/Hide sticky header on window scroll
     */
    function mkdfHeaderBehaviour() {
        var header = $('.mkdf-page-header'),
	        stickyHeader = $('.mkdf-sticky-header'),
            fixedHeaderWrapper = $('.mkdf-fixed-wrapper'),
	        fixedMenuArea = fixedHeaderWrapper.children('.mkdf-menu-area'),
	        fixedMenuAreaHeight = fixedMenuArea.outerHeight(),
            sliderHolder = $('.mkdf-slider'),
            revSliderHeight = sliderHolder.length ? sliderHolder.outerHeight() : 0,
	        stickyAppearAmount,
	        headerAppear;
        
        var headerMenuAreaOffset = fixedHeaderWrapper.length ? fixedHeaderWrapper.offset().top - mkdfGlobalVars.vars.mkdfAddForAdminBar : 0;

        switch(true) {
            // sticky header that will be shown when user scrolls up
            case mkdf.body.hasClass('mkdf-sticky-header-on-scroll-up'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfStickyHeaderHeight);
	            
                headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();
					
                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        mkdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkdf-main-menu .second').removeClass('mkdf-drop-down-start');
                        mkdf.body.removeClass('mkdf-sticky-header-appear');
                    } else {
                        mkdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkdf.body.addClass('mkdf-sticky-header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case mkdf.body.hasClass('mkdf-sticky-header-on-scroll-down-up'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-sticky-header-on-scroll-down-up';

                if(mkdfPerPageVars.vars.mkdfStickyScrollAmount !== 0){
                    mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfPerPageVars.vars.mkdfStickyScrollAmount);
                } else {
                    mkdf.modules.stickyHeader.stickyAppearAmount = parseInt(mkdfGlobalVars.vars.mkdfTopBarHeight) + parseInt(mkdfGlobalVars.vars.mkdfLogoAreaHeight) + parseInt(mkdfGlobalVars.vars.mkdfMenuAreaHeight) + parseInt(revSliderHeight);
                }

                headerAppear = function(){
                    if(mkdf.scroll < mkdf.modules.stickyHeader.stickyAppearAmount) {
                        mkdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.mkdf-main-menu .second').removeClass('mkdf-drop-down-start');
	                    mkdf.body.removeClass('mkdf-sticky-header-appear');
                    }else{
                        mkdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    mkdf.body.addClass('mkdf-sticky-header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case mkdf.body.hasClass('mkdf-fixed-on-scroll'):
                mkdf.modules.stickyHeader.behaviour = 'mkdf-fixed-on-scroll';
                var headerFixed = function(){
	
	                if(mkdf.scroll <= headerMenuAreaOffset) {
		                fixedHeaderWrapper.removeClass('fixed');
		                mkdf.body.removeClass('mkdf-fixed-header-appear');
		                header.css('margin-bottom', '0');
	                } else {
		                fixedHeaderWrapper.addClass('fixed');
		                mkdf.body.addClass('mkdf-fixed-header-appear');
		                header.css('margin-bottom', fixedMenuAreaHeight + 'px');
	                }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

})(jQuery);
(function ($) {
    "use strict";

    var searchCoversHeader = {};
    mkdf.modules.searchCoversHeader = searchCoversHeader;

    searchCoversHeader.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfSearchCoversHeader();
    }

    /**
     * Init Search Types
     */
    function mkdfSearchCoversHeader() {
        if (mkdf.body.hasClass('mkdf-search-covers-header')) {

            var searchOpener = $('a.mkdf-search-opener');

            if (searchOpener.length > 0) {
                searchOpener.each(function () {
                    var thisOpener = $(this);
                    thisOpener.on('click', function (e) {
                        e.preventDefault();

                        var thisSearchOpener = $(this),
                            searchFormHeight,
                            searchFormHeaderHolder = $('.mkdf-page-header'),
                            searchFormTopHeaderHolder = $('.mkdf-top-bar'),
                            searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.mkdf-fixed-wrapper.fixed'),
                            searchFormMobileHeaderHolder = $('.mkdf-mobile-header'),
                            searchForm = $('.mkdf-search-cover'),
                            searchFormIsInTopHeader = !!thisSearchOpener.parents('.mkdf-top-bar').length,
                            searchFormIsInFixedHeader = !!thisSearchOpener.parents('.mkdf-fixed-wrapper.fixed').length,
                            searchFormIsInStickyHeader = !!thisSearchOpener.parents('.mkdf-sticky-header').length,
                            searchFormIsInMobileHeader = !!thisSearchOpener.parents('.mkdf-mobile-header').length;

                        searchForm.removeClass('mkdf-is-active');

                        //Find search form position in header and height
                        if (searchFormIsInTopHeader) {
                            searchFormHeight = searchFormTopHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.mkdf-search-cover').addClass('mkdf-is-active mkdf-opener-in-top-header');
                            
                        } else if (searchFormIsInFixedHeader) {
                            searchFormHeight = searchFormFixedHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.mkdf-search-cover').addClass('mkdf-is-active');

                        } else if (searchFormIsInStickyHeader) {
                            searchFormHeight = searchFormHeaderHolder.find('.mkdf-sticky-header').outerHeight();
                            searchFormHeaderHolder.children('.mkdf-search-cover').addClass('mkdf-is-active');

                        } else if (searchFormIsInMobileHeader) {
                            if (searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
                                searchFormHeight = searchFormMobileHeaderHolder.children('.mkdf-mobile-header-inner').outerHeight();
                            } else {
                                searchFormHeight = searchFormMobileHeaderHolder.outerHeight();
                            }

                            searchFormMobileHeaderHolder.find('.mkdf-search-cover').addClass('mkdf-is-active');

                        } else {
                            searchFormHeight = searchFormHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.mkdf-search-cover').addClass('mkdf-is-active');
                        }

                        if (searchForm.hasClass('mkdf-is-active')) {
                            searchForm.height(searchFormHeight).stop(true).fadeIn(600).find('input[type="text"]').focus();
                        }

                        searchForm.find('.mkdf-search-close').on('click', function (e) {
                            e.preventDefault();
                            searchForm.stop(true).fadeOut(450, function () {
                                if (searchForm.hasClass('mkdf-opener-in-top-header')) {
                                    searchForm.removeClass('mkdf-opener-in-top-header');
                                }
                            });

                            searchForm.removeClass('mkdf-is-active');
                        });

                        searchForm.blur(function () {
                            searchForm.stop(true).fadeOut(450, function () {
                                if (searchForm.hasClass('mkdf-opener-in-top-header')) {
                                    searchForm.removeClass('mkdf-opener-in-top-header');
                                }
                            });

                            searchForm.removeClass('mkdf-is-active');
                        });

                        $(window).scroll(function () {
                            searchForm.stop(true).fadeOut(450, function () {
                                if (searchForm.hasClass('mkdf-opener-in-top-header')) {
                                    searchForm.removeClass('mkdf-opener-in-top-header');
                                }
                            });

                            searchForm.removeClass('mkdf-is-active');
                        });
                    });
                });
            }
        }
    }

})(jQuery);

(function($) {
    "use strict";

    var searchFullscreen = {};
    mkdf.modules.searchFullscreen = searchFullscreen;

    searchFullscreen.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfSearchFullscreen();
    }
	
	/**
	 * Init Search Types
	 */
	function mkdfSearchFullscreen() {
        if ( mkdf.body.hasClass( 'mkdf-fullscreen-search' ) ) {

            var searchOpener = $('a.mkdf-search-opener');

            if (searchOpener.length > 0) {

                var searchHolder = $('.mkdf-fullscreen-search-holder'),
                    searchClose = $('.mkdf-search-close');

                searchOpener.on('click', function (e) {
                    e.preventDefault();

                    if (searchHolder.hasClass('mkdf-animate')) {
                        mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-out');
                        mkdf.body.removeClass('mkdf-search-fade-in');
                        searchHolder.removeClass('mkdf-animate');

                        setTimeout(function () {
                            searchHolder.find('.mkdf-search-field').val('');
                            searchHolder.find('.mkdf-search-field').blur();
                        }, 300);

                        mkdf.modules.common.mkdfEnableScroll();
                    } else {
                        mkdf.body.addClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                        mkdf.body.removeClass('mkdf-search-fade-out');
                        searchHolder.addClass('mkdf-animate');

                        setTimeout(function () {
                            searchHolder.find('.mkdf-search-field').focus();
                        }, 900);

                        mkdf.modules.common.mkdfDisableScroll();
                    }

                    searchClose.on('click', function (e) {
                        e.preventDefault();
                        mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                        mkdf.body.addClass('mkdf-search-fade-out');
                        searchHolder.removeClass('mkdf-animate');

                        setTimeout(function () {
                            searchHolder.find('.mkdf-search-field').val('');
                            searchHolder.find('.mkdf-search-field').blur();
                        }, 300);

                        mkdf.modules.common.mkdfEnableScroll();
                    });

                    //Close on click away
                    $(document).mouseup(function (e) {
                        var container = $(".mkdf-form-holder-inner");

                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            e.preventDefault();
                            mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                            mkdf.body.addClass('mkdf-search-fade-out');
                            searchHolder.removeClass('mkdf-animate');

                            setTimeout(function () {
                                searchHolder.find('.mkdf-search-field').val('');
                                searchHolder.find('.mkdf-search-field').blur();
                            }, 300);

                            mkdf.modules.common.mkdfEnableScroll();
                        }
                    });

                    //Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { //KeyCode for ESC button is 27
                            mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                            mkdf.body.addClass('mkdf-search-fade-out');
                            searchHolder.removeClass('mkdf-animate');

                            setTimeout(function () {
                                searchHolder.find('.mkdf-search-field').val('');
                                searchHolder.find('.mkdf-search-field').blur();
                            }, 300);

                            mkdf.modules.common.mkdfEnableScroll();
                        }
                    });
                });

                //Text input focus change
                var inputSearchField = $('.mkdf-fullscreen-search-holder .mkdf-search-field'),
                    inputSearchLine = $('.mkdf-fullscreen-search-holder .mkdf-field-holder .mkdf-line');

                inputSearchField.focus(function () {
                    inputSearchLine.css('width', '100%');
                });

                inputSearchField.blur(function () {
                    inputSearchLine.css('width', '0');
                });
            }
        }
	}

})(jQuery);

(function($) {
    "use strict";

    var searchFullscreenWithSidebar = {};
    mkdf.modules.searchFullscreenWithSidebar = searchFullscreenWithSidebar;

    searchFullscreenWithSidebar.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
        mkdfSearchFullscreenWithSidebar();
    }
    
	/**
	 * Init Search Types
	 */
	function mkdfSearchFullscreenWithSidebar() {
        if ( mkdf.body.hasClass( 'mkdf-fullscreen-search-with-sidebar' ) ) {
            var searchOpener = $('a.mkdf-search-opener');

            if (searchOpener.length > 0) {
                var searchHolder = $('.mkdf-fullscreen-with-sidebar-search-holder'),
                    searchClose = $('.mkdf-search-close');

                mkdf.modules.common.mkdfInitPerfectScrollbar().init(searchHolder);

                searchOpener.on('click', function (e) {
                    e.preventDefault();

                    if (searchHolder.hasClass('mkdf-animate')) {
                        mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-out');
                        mkdf.body.removeClass('mkdf-search-fade-in');
                        searchHolder.removeClass('mkdf-animate');

                        setTimeout(function () {
                            searchHolder.find('.mkdf-search-field').val('');
                            searchHolder.find('.mkdf-search-field').blur();
                        }, 300);

                        mkdf.modules.common.mkdfEnableScroll();
                    } else {
                        mkdf.body.addClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                        mkdf.body.removeClass('mkdf-search-fade-out');
                        searchHolder.addClass('mkdf-animate');

                        setTimeout(function () {
                           searchHolder.find('.mkdf-search-field').focus();
                        }, 900);

                        mkdf.modules.common.mkdfDisableScroll();
                    }
                    
                    searchClose.on('click', function (e) {
                        e.preventDefault();
                        mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                        mkdf.body.addClass('mkdf-search-fade-out');
                        searchHolder.removeClass('mkdf-animate');

                        setTimeout(function () {
                            searchHolder.find('.mkdf-search-field').val('');
                            searchHolder.find('.mkdf-search-field').blur();
                        }, 300);

                        mkdf.modules.common.mkdfEnableScroll();
                    });
                    
                    //Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { //KeyCode for ESC button is 27
                            mkdf.body.removeClass('mkdf-fullscreen-search-opened mkdf-search-fade-in');
                            mkdf.body.addClass('mkdf-search-fade-out');
                            searchHolder.removeClass('mkdf-animate');

                            setTimeout(function () {
                                searchHolder.find('.mkdf-search-field').val('');
                                searchHolder.find('.mkdf-search-field').blur();
                            }, 300);

                            mkdf.modules.common.mkdfEnableScroll();
                        }
                    });
                });
            }
        }
	}

})(jQuery);

(function($) {
	"use strict";
	
	var searchSlideFromHB = {};
	mkdf.modules.searchSlideFromHB = searchSlideFromHB;
	
	searchSlideFromHB.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function mkdfOnDocumentReady() {
		mkdfSearchSlideFromHB();
	}
	
	/**
	 * Init Search Types
	 */
	function mkdfSearchSlideFromHB() {
		if ( mkdf.body.hasClass( 'mkdf-slide-from-header-bottom' ) ) {
			var searchOpener = $('a.mkdf-search-opener');
			
			if (searchOpener.length) {
				searchOpener.each(function(){
					//Check for type of search
					$(this).on('click', function (e) {
						e.preventDefault();
						
						var thisSearchOpener = $(this),
							searchIconPosition = parseInt(mkdf.windowWidth - thisSearchOpener.offset().left - thisSearchOpener.outerWidth());
						
						if (mkdf.body.hasClass('mkdf-boxed') && mkdf.windowWidth > 1024) {
							searchIconPosition -= parseInt((mkdf.windowWidth - $('.mkdf-boxed .mkdf-wrapper .mkdf-wrapper-inner').outerWidth()) / 2);
						}
						
						var searchFormHeaderHolder = $('.mkdf-page-header'),
							searchFormTopOffset = '100%',
							searchFormTopHeaderHolder = $('.mkdf-top-bar'),
							searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.mkdf-fixed-wrapper.fixed'),
							searchFormMobileHeaderHolder = $('.mkdf-mobile-header'),
							searchForm = searchFormHeaderHolder.children('.mkdf-slide-from-header-bottom-holder'),
							searchFormIsInTopHeader = !!thisSearchOpener.parents('.mkdf-top-bar').length,
							searchFormIsInFixedHeader = !!thisSearchOpener.parents('.mkdf-fixed-wrapper.fixed').length,
							searchFormIsInStickyHeader = !!thisSearchOpener.parents('.mkdf-sticky-header').length,
							searchFormIsInMobileHeader = !!thisSearchOpener.parents('.mkdf-mobile-header').length;
						
						searchForm.removeClass('mkdf-is-active');
						
						//Find search form position in header and height
						if (searchFormIsInTopHeader) {
							searchForm = searchFormTopHeaderHolder.find('.mkdf-slide-from-header-bottom-holder');
							searchForm.addClass('mkdf-is-active');
							
						} else if (searchFormIsInFixedHeader) {
							searchFormTopOffset = searchFormFixedHeaderHolder.outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar;
							searchForm.addClass('mkdf-is-active');
							
						} else if (searchFormIsInStickyHeader) {
							searchFormTopOffset = mkdfGlobalVars.vars.mkdfStickyHeaderHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar;
							searchForm.addClass('mkdf-is-active');
							
						} else if (searchFormIsInMobileHeader) {
							if (searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
								searchFormTopOffset = searchFormMobileHeaderHolder.children('.mkdf-mobile-header-inner').outerHeight() + mkdfGlobalVars.vars.mkdfAddForAdminBar;
							}
							
							searchForm = searchFormMobileHeaderHolder.find('.mkdf-slide-from-header-bottom-holder');
							searchForm.addClass('mkdf-is-active');
							
						} else {
							searchForm.addClass('mkdf-is-active');
						}
						
						if (searchForm.hasClass('mkdf-is-active')) {
							searchForm.css({
								'right': searchIconPosition,
								'top': searchFormTopOffset
							}).stop(true).slideToggle(300, 'easeOutBack');
						}
						
						//Close on escape
						$(document).keyup(function (e) {
							if (e.keyCode === 27) { //KeyCode for ESC button is 27
								searchForm.stop(true).fadeOut(0);
							}
						});
						
						$(window).scroll(function () {
							searchForm.stop(true).fadeOut(0);
						});
					});
				});
			}
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var searchSlideFromWT = {};
    mkdf.modules.searchSlideFromWT = searchSlideFromWT;

    searchSlideFromWT.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function mkdfOnDocumentReady() {
	    mkdfSearchSlideFromWT();
    }
	
	/**
	 * Init Search Types
	 */
	function mkdfSearchSlideFromWT() {
        if ( mkdf.body.hasClass( 'mkdf-search-slides-from-window-top' ) ) {
            var searchOpener = $('a.mkdf-search-opener');

            if ( searchOpener.length > 0 ) {
                var searchForm = $('.mkdf-search-slide-window-top'),
                    searchClose = $('.mkdf-search-close');

                searchOpener.on('click', function(e) {
                    e.preventDefault();

                    if ( searchForm.height() === "0") {
                        $('.mkdf-search-slide-window-top input[type="text"]').focus();
                        //Push header bottom
                        mkdf.body.addClass('mkdf-search-open');
                    } else {
                        mkdf.body.removeClass('mkdf-search-open');
                    }

                    $(window).scroll(function() {
                        if ( searchForm.height() !== '0' && mkdf.scroll > 50 ) {
                            mkdf.body.removeClass('mkdf-search-open');
                        }
                    });

                    searchClose.on('click', function(e){
                        e.preventDefault();
                        mkdf.body.removeClass('mkdf-search-open');
                    });
                });
            }
		}
	}

})(jQuery);

(function($) {
    "use strict";

    var productListCarousel = {};
    mkdf.modules.productListCarousel = productListCarousel;

    productListCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorProductListCarousel();
    }

    /**
     * Elementor Blog List
     */
    function mkdfElementorProductListCarousel() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_product_list_carousel.default', function () {
                mkdf.modules.common.mkdfOwlSlider();
            });
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var portfolio = {};
    mkdf.modules.portfolio = portfolio;

    portfolio.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad);

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfPortfolioSingleFollow().init();
	}

	var mkdfPortfolioSingleFollow = function () {
		var info = $('.mkdf-follow-portfolio-info .mkdf-portfolio-single-holder .mkdf-ps-info-sticky-holder');

		if (info.length) {

			var ofsetTop = 0;
			var ofsetBottom = 0;
			var smallImages = $(".mkdf-ps-small-images-layout");
			var smallMasonry = $(".mkdf-ps-small-masonry-layout");


			if(smallImages.length || smallMasonry.length){
				ofsetTop = 30;
			}

            if(smallImages.length){
				ofsetBottom = 30;
			}

			var infoHolder = info.parent(),
				infoHolderOffset = infoHolder.offset().top - ofsetTop,
				infoHolderHeight = infoHolder.height() + ofsetTop - ofsetBottom,
				mediaHolder = $('.mkdf-ps-image-holder'),
				mediaHolderHeight = mediaHolder.height(),
				header = $('.header-appear, .mkdf-fixed-wrapper'),
				headerHeight = (header.length) ? header.height() : 0,
				constant = 56; //30 to prevent mispositioned
		}

		var infoHolderPosition = function () {
			if (info.length && mediaHolderHeight >= infoHolderHeight) {
				if (mkdf.scroll >= infoHolderOffset - headerHeight - mkdfGlobalVars.vars.mkdfAddForAdminBar - constant) {
					var marginTop = mkdf.scroll - infoHolderOffset + mkdfGlobalVars.vars.mkdfAddForAdminBar + headerHeight + constant;
					// if scroll is initially positioned below mediaHolderHeight
					if (marginTop + infoHolderHeight > mediaHolderHeight) {
						marginTop = mediaHolderHeight - infoHolderHeight + constant - ofsetTop;
					}
					info.stop().animate({
						marginTop: marginTop
					});
				}
			}
		};

		var recalculateInfoHolderPosition = function () {
			if (info.length && mediaHolderHeight >= infoHolderHeight) {
				//Calculate header height if header appears
				if (mkdf.scroll > 0 && header.length) {
					headerHeight = header.height();
				}

				var headerMixin = headerHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar + constant;
				if (mkdf.scroll >= infoHolderOffset - headerMixin) {
					if (mkdf.scroll + infoHolderHeight + headerMixin + 2 * constant < infoHolderOffset + mediaHolderHeight) {
						info.stop().animate({
							marginTop: (mkdf.scroll - infoHolderOffset + headerMixin + ofsetTop)
						});
						//Reset header height
						headerHeight = 0;
					} else {
						info.stop().animate({
							marginTop: mediaHolderHeight - infoHolderHeight
						});
					}
				} else {
					info.stop().animate({
						marginTop: 0
					});
				}
			}
		};
		
		return {
			init: function () {
				infoHolderPosition();
				$(window).scroll(function () {
					recalculateInfoHolderPosition();
				});
			}
		};
	};

})(jQuery);
(function($) {
    'use strict';
	
	var accordions = {};
	mkdf.modules.accordions = accordions;
	
	accordions.mkdfInitAccordions = mkdfInitAccordions;
	
	
	accordions.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAccordions();
	}

    /**
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorAccordions();
    }

    /**
     * Elementor
     */
    function mkdfElementorAccordions(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_accordion.default', function() {
                mkdfInitAccordions();
            } );
        });
    }

	/**
	 * Init accordions shortcode
	 */
	function mkdfInitAccordions(){
		var accordion = $('.mkdf-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkdf-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkdf-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.mkdf-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);
						
						thisTitle.on('mouseenter mouseleave', function(){
							thisTitle.toggleClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var animatedSwitchSlider = {};
    mkdf.modules.animatedSwitchSlider = animatedSwitchSlider;

    animatedSwitchSlider.mkdfAnimatedSwitchSlider = mkdfAnimatedSwitchSlider;
    animatedSwitchSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        if ( mkdf.body.hasClass('elementor-page') ) {
            mkdfElementorAnimatedSwitchSlider();
        }
        else {
            mkdfAnimatedSwitchSlider();
        }
    }


    /**
     * Elementor
     */
    function mkdfElementorAnimatedSwitchSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_animated_switch_slider.default', function() {
                mkdfAnimatedSwitchSlider();
            } );
        });
    }
    /**
     * Init animated switch slider shortcode
     */
    function mkdfAnimatedSwitchSlider() {
        var slider = $('#mkdf-animated-switch-slider');

        if (slider.length) {
            var slides = slider.find('.mkdf-switch-slide'),
                bgTexts = slider.find('.mkdf-item-background-text'),
                overlay = slider.find('.mkdf-item-text-left'),
                bgrndImages = slider.find('.mkdf-background-images-holder'),
                paginationHolder = slider.find('.mkdf-animated-switch-slider-pagination'),
                paginationBullet = paginationHolder.find('.mkdf-animated-ss-button'),
                initialized = false;

            var fullscreenCalcs = function() {
                var heightVal = mkdf.windowHeight - slider.offset().top;

                if (mkdf.body.hasClass('mkdf-paspartu-enabled')) {
                    var passepartoutSize = parseInt($('.mkdf-wrapper').css('padding-top'));

                    heightVal -= passepartoutSize;
                }

                slider.css('height', heightVal);
            }

            var prepItems = function() {
                slides.first().addClass('mkdf-active');
                changeImage();
                headerSkin();
            }

            //slideshow logic start
            var startAnimating = function() {
                slider.addClass('mkdf-animating');
                bgTexts.each(function(){
                    $(this).fadeOut();
                })
            }

            var endAnimating = function() {
                slides.filter('.mkdf-active').one(mkdf.animationEnd,function(){
                    var activeSlide = $(this);
                    slider.removeClass('mkdf-animating');
                    bgTexts.each(function(){
                        if($(this).data('index') === activeSlide.data('index')){
                            $(this).fadeIn();
                        }
                    })
                    paginationBullet.removeClass('mkdf-active');
                    paginationBullet.eq(activeSlide.data('index') - 1).addClass('mkdf-active');
                });
            }

            var changeImage = function() {
                bgrndImages.css('z-index', 'auto');
                slides.filter('.mkdf-active').find(bgrndImages).css('z-index', 10);
            }

            var headerSkin = function() {
                if(slider.hasClass('mkdf-enabled-header-skin-change')) {
                    mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');

                    if (slides.filter('.mkdf-active').hasClass('mkdf-light-header')) {
                        mkdf.body.addClass('mkdf-light-header');
                    } else if(slides.filter('.mkdf-active').hasClass('mkdf-dark-header')){
                        mkdf.body.addClass('mkdf-dark-header');
                    }
                }
            }

            var paginationSkin = function() {
                paginationHolder.removeClass('mkdf-light-slin mkdf-dark-skin');

                if (slides.filter('.mkdf-active').find('.mkdf-item-overlay').hasClass('mkdf-dark')) {
                    paginationHolder.addClass('mkdf-dark-skin');
                } else {
                    paginationHolder.addClass('mkdf-light-skin');
                }
            }

            var nextSlide = function() {
                startAnimating();

                if (slides.filter('.mkdf-active').next().index() > 0) {
                    slides.removeClass('mkdf-remove');
                    slides.filter('.mkdf-active')
                        .removeClass('mkdf-active')
                        .addClass('mkdf-remove').next()
                        .addClass('mkdf-active');
                } else {
                    slides.removeClass('mkdf-active mkdf-remove');
                    slides.first().addClass('mkdf-active');
                    slides.last().addClass('mkdf-remove');
                }

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

                /*overlay.one(mkdf.animationEnd, function(){
                    changeImage();
                    headerSkin();
                    endAnimating();
                });*/
            }

            var prevSlide = function() {
                startAnimating();

                if (slides.filter('.mkdf-active').prev().index() < 0) {
                    slides.removeClass('mkdf-active mkdf-remove');
                    slides.first().addClass('mkdf-remove');
                    slides.last().addClass('mkdf-active');
                } else {
                    slides.removeClass('mkdf-remove');
                    slides.filter('.mkdf-active')
                        .removeClass('mkdf-active')
                        .addClass('mkdf-remove').prev()
                        .addClass('mkdf-active');
                }

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

                /*overlay.one(mkdf.animationEnd, function(){
                    changeImage();
                    headerSkin();
                    endAnimating();
                });*/
            }

            var goToSlide = function(index){
                startAnimating();

                slides.each(function(){
                    $(this).removeClass('mkdf-remove');
                })
                slides.filter('.mkdf-active').removeClass('mkdf-active').addClass('mkdf-remove');
                slides.eq(index - 1).addClass('mkdf-active');

                setTimeout( function(){
                    changeImage();
                }, 400);

                headerSkin();
                paginationSkin();
                endAnimating();

            }

            var slideshowScroll = function() {
                if (!mkdf.htmlEl.hasClass('touch')) {
                    var delta = 0;

                    slider.mousewheel(function(e) {
                        e.preventDefault();

                        if (!initialized) {
                            initialized = true;
                        }

                        if (!slider.hasClass('mkdf-animating')) {
                            if (e.deltaY < 0) {
                                delta = -1;
                            } else {
                                delta = 1;
                            }

                            if (delta == -1 ) {
                                nextSlide();

                            } else {
                                prevSlide();
                            }
                        }
                    });

                    slider.on('wheel', function() { return false; });
                }
            }

            var touchSlider = function() {
                if (mkdf.htmlEl.hasClass('touch')) {
                    var ts;

                    slider.on('touchstart', function (e){
                        if (!slider.hasClass('mkdf-animating')) {
                           ts = e.originalEvent.touches[0].clientY;
                        }
                    });

                    slider.on('touchend', function (e){
                        if (!slider.hasClass('mkdf-animating')) {
                            var te = e.originalEvent.changedTouches[0].clientY;

                            if (ts > te+5) {
                                prevSlide();
                            } else if (ts < te-5) {
                                nextSlide();
                            }
                        }
                    });
                }
            }

            var slideShowClick = function(){
                if(paginationBullet.length){
                    paginationBullet.each(function(){
                        var thisBullet = $(this);
                        thisBullet.on('click', function(){
                            goToSlide(thisBullet.data('index'));
                        })
                    })
                }
            }
            //slideshow logic end

            //init
            slider.waitForImages(function(){
                fullscreenCalcs();
                prepItems();
                slideshowScroll();
                touchSlider();
                endAnimating();
                slideShowClick();
            });

            $(window).resize(function(){
                fullscreenCalcs();
            });
        }
    }

})(jQuery);

(function($) {
	'use strict';
	
	var animationHolder = {};
	mkdf.modules.animationHolder = animationHolder;
	
	animationHolder.mkdfInitAnimationHolder = mkdfInitAnimationHolder;
	
	
	animationHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAnimationHolder();
	}
	
	/*
	 *	Init animation holder shortcode
	 */
	function mkdfInitAnimationHolder(){
		var elements = $('.mkdf-grow-in, .mkdf-fade-in-down, .mkdf-element-from-fade, .mkdf-element-from-left, .mkdf-element-from-right, .mkdf-element-from-top, .mkdf-element-from-bottom, .mkdf-flip-in, .mkdf-x-rotate, .mkdf-z-rotate, .mkdf-y-translate, .mkdf-fade-in, .mkdf-fade-in-left-x-rotate'),
			animationClass,
			animationData,
			animationDelay;
		
		if(elements.length){
			elements.each(function(){
				var thisElement = $(this);
				
				thisElement.appear(function() {
					animationData = thisElement.data('animation');
					animationDelay = parseInt(thisElement.data('animation-delay'));
					
					if(typeof animationData !== 'undefined' && animationData !== '') {
						animationClass = animationData;
						var newClass = animationClass+'-on';
						
						setTimeout(function(){
							thisElement.addClass(newClass);
						},animationDelay);
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
    'use strict';

    var button = {};
    mkdf.modules.button = button;


    button.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
    function mkdfOnDocumentReady() {
        mkdfButton().init();
    }

    /*
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorButton();
    }

    /**
     * Elementor
     */
    function mkdfElementorButton(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_button.default', function() {
                mkdfButton().init();
            } );
        });
    }

    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var mkdfButton = function () {
        //all buttons on the page
        var buttons = $('.mkdf-btn');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var buttonHoverColor = function (button) {
            if (typeof button.data('hover-color') !== 'undefined') {
                var changeButtonColor = function (event) {
                    event.data.button.css('color', event.data.color);
                };

                var originalColor = button.css('color');
                var hoverColor = button.data('hover-color');

                button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
                button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
            }
        };

        /**
         * Initializes button hover background color
         * @param button current button
         */
        var buttonHoverBgColor = function (button) {
            if (typeof button.data('hover-bg-color') !== 'undefined') {
                var changeButtonBg = function (event) {
                    event.data.button.css('background-color', event.data.color);
                };

                var originalBgColor = button.css('background-color');
                var hoverBgColor = button.data('hover-bg-color');

                button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
                button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
            }
        };

        /**
         * Initializes button border color
         * @param button
         */
        var buttonHoverBorderColor = function (button) {
            if (typeof button.data('hover-border-color') !== 'undefined') {
                var changeBorderColor = function (event) {
                    event.data.button.css('border-color', event.data.color);
                };

                var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
                var hoverBorderColor = button.data('hover-border-color');

                button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
                button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
            }
        };

        /**
         * Initializes button hover box-shadow
         * @param button current button
         */
        var buttonHoverShadow = function (button) {
            var setButtonShadow = function (event) {
                event.data.button.css('box-shadow', '0px 10px 20px 0px rgba(' + event.data.color + ')');
            }

            var resetButtonShadow = function (event) {
                event.data.button.css('box-shadow', 'none');
            }

            var rgba = button.css('background-color').match(/[.?\d]+/g);

            rgba.length == 3 && rgba.push('0.5');

            button
                .on('mouseenter', { button: button, color: rgba.toString() }, setButtonShadow)
                .on('mouseleave', { button: button }, resetButtonShadow);
        };

        return {
            init: function () {
                if (buttons.length) {
                    buttons.not('.mkdf-btn-solid').each(function () {
                        buttonHoverColor($(this));
                        buttonHoverBgColor($(this));
                        buttonHoverBorderColor($(this));
                    });
                    buttons.filter('.mkdf-btn-solid').each(function () {
                        buttonHoverColor($(this));
                        buttonHoverBorderColor($(this));
                        buttonHoverShadow($(this));
                    });
                }
            }
        };
    };
    button.mkdfButton = mkdfButton;


})(jQuery);
(function ($) {
    'use strict';

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
    function mkdfOnDocumentReady() {
    }

    /*
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorCallToAction();
    }

    /**
     * Elementor
     */
    function mkdfElementorCallToAction(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_call_to_action.default', function() {
                mkdf.modules.button.mkdfButton().init();
            } );
        });
    }

})(jQuery);
(function ($) {
	'use strict';
	
	var cardsGallery = {};
	mkdf.modules.cardsGallery = cardsGallery;
	
	
	cardsGallery.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitCardsGallery();
        mkdfElementorCardsGallery();
	}
	
	/*
	 **	Init cards gallery shortcode
	 */
	function mkdfInitCardsGallery() {
		var holder = $('.mkdf-cards-gallery');
		
		if (holder.length) {
			holder.each(function () {
				var thisHolder = $(this),
					cards = thisHolder.find('.mkdf-cg-card');
				
				cards.each(function () {
					var card = $(this);
					
					card.on('click', function () {
						if (!cards.last().is(card)) {
							card.addClass('mkdf-out mkdf-animating').siblings().addClass('mkdf-animating-siblings');
							card.detach();
							card.insertAfter(cards.last());
							
							setTimeout(function () {
								card.removeClass('mkdf-out');
							}, 200);
							
							setTimeout(function () {
								card.removeClass('mkdf-animating').siblings().removeClass('mkdf-animating-siblings');
							}, 1200);
							
							cards = thisHolder.find('.mkdf-cg-card');
							
							return false;
						}
					});
				});
				
				if (thisHolder.hasClass('mkdf-bundle-animation') && !mkdf.htmlEl.hasClass('touch')) {
					thisHolder.appear(function () {
						thisHolder.addClass('mkdf-appeared');
						thisHolder.find('img').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
							$(this).addClass('mkdf-animation-done');
						});
					}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				}
			});
		}
	}

    /**
     * Elementor
     */
    function mkdfElementorCardsGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_cards_gallery.default', function() {
                mkdfInitCardsGallery();
            } );
        });
    }
	
})(jQuery);
(function ($) {
	'use strict';
	
	var clientsCarousel = {};
	mkdf.modules.clientsCarousel = clientsCarousel;


	clientsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorClientsCarousel();
	}

    /**
     * Elementor
     */
	function mkdfElementorClientsCarousel() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_clients_carousel.default', function () {
				mkdf.modules.common.mkdfOwlSlider();
			});
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	mkdf.modules.countdown = countdown;
	
	countdown.mkdfInitCountdown = mkdfInitCountdown;
	
	
	countdown.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCountdown();
	}

    /*
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorCountdown();
    }

    /**
     * Elementor
     */
    function mkdfElementorCountdown(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_countdown.default', function() {
                mkdfInitCountdown();
            } );
        });
    }

	/**
	 * Countdown Shortcode
	 */
	function mkdfInitCountdown() {
		var countdowns = $('.mkdf-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			currentYear = date.getFullYear(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					digitFontSizeResponsive,
					labelFontSize,
					labelFontSizeResponsive;

				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
                digitFontSizeResponsive = countdown.data('digit-size-responsive');
				labelFontSize = countdown.data('label-size');
                labelFontSizeResponsive = countdown.data('label-size-responsive');

				if( currentMonth !== month || currentYear !== year ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});

				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});

					if(mkdf.windowWidth <= 680){
                        countdown.find('.countdown-amount').css({
                            'font-size' : digitFontSizeResponsive+'px',
                            'line-height' : digitFontSizeResponsive+'px'
                        });
                        countdown.find('.countdown-period').css({
                            'font-size' : labelFontSizeResponsive+'px'
                        });
					}
				}
			});
		}
	}

	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	mkdf.modules.counter = counter;
	
	counter.mkdfInitCounter = mkdfInitCounter;
	
	
	counter.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCounter();
	}

	/*
	All functions to be called on $(window).load() should be in this function
	*/

    function mkdfOnWindowLoad() {
        mkdfElementorCounter();
    }

	/**
	 * Counter Shortcode
	 */
	function mkdfInitCounter() {
		var counterHolder = $('.mkdf-counter-holder');

		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.mkdf-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');

                    if(mkdf.windowWidth <= 1440){
                        thisCounter.css('font-size',thisCounterHolder.data('responsive-font-size'));
                    }
					//Counter zero type
					if (thisCounter.hasClass('mkdf-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}

    /**
     * Elementor
     */
    function mkdfElementorCounter(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_counter.default', function() {
                mkdfInitCounter();
            } );
        });
    }

})(jQuery);
(function ($) {
	'use strict';
	
	var customFont = {};
	mkdf.modules.customFont = customFont;
	
	customFont.mkdfCustomFontResize = mkdfCustomFontResize;
	customFont.mkdfCustomFontTypeOut = mkdfCustomFontTypeOut;
	
	
	customFont.mkdfOnDocumentReady = mkdfOnDocumentReady;
	customFont.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfCustomFontResize();
	}
	
	/**
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfCustomFontTypeOut();
        mkdfElementorCustomFont();
	}

    /**
     * Elementor
     */
    function mkdfElementorCustomFont(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_custom_font.default', function() {
                mkdfCustomFontResize();
                mkdfCustomFontTypeOut();
            } );
        });
    }

	/**
	 **	Custom Font resizing style
	 */
	function mkdfCustomFontResize() {
		var holder = $('.mkdf-custom-font-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
	/*
	 * Init Type out functionality for Custom Font shortcode
	 */
	function mkdfCustomFontTypeOut() {
		var mkdfTyped = $('.mkdf-cf-typed');
		
		if (mkdfTyped.length) {
			mkdfTyped.each(function () {

                //vars
                var thisTyped = $(this),
                    typedWrap = thisTyped.parent('.mkdf-cf-typed-wrap'),
                    customFontHolder = typedWrap.parent('.mkdf-custom-font-holder'),
                    str = [],
                    string_1 = thisTyped.find('.mkdf-cf-typed-1').text(),
                    string_2 = thisTyped.find('.mkdf-cf-typed-2').text(),
                    string_3 = thisTyped.find('.mkdf-cf-typed-3').text(),
                    string_4 = thisTyped.find('.mkdf-cf-typed-4').text();

                if (string_1.length) {
                    str.push(string_1);
                }

                if (string_2.length) {
                    str.push(string_2);
                }

                if (string_3.length) {
                    str.push(string_3);
                }

                if (string_4.length) {
                    str.push(string_4);
                }
               if(str.length > 0) {
					customFontHolder.appear(function () {
						thisTyped.typed({
							strings: str,
							typeSpeed: 90,
							backDelay: 700,
							loop: true,
							contentType: 'text',
							loopCount: false,
							cursorChar: '_'
						});
					}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
            	}
			});
		}
	}


})(jQuery);
(function($) {
	'use strict';

	var elementsHolder = {};
	mkdf.modules.elementsHolder = elementsHolder;

	elementsHolder.mkdfInitElementsHolderResponsiveStyle = mkdfInitElementsHolderResponsiveStyle;


	elementsHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;

	$(document).ready(mkdfOnDocumentReady);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitElementsHolderResponsiveStyle();
	}

	/*
	 **	Elements Holder responsive style
	 */
	function mkdfInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.mkdf-elements-holder');

		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.mkdf-eh-item'),
					style = '',
					responsiveStyle = '';

				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';

					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1367-1600') !== 'undefined' && thisItem.data('1367-1600') !== false) {
						largeLaptop = thisItem.data('1367-1600');
					}
					if (typeof thisItem.data('1025-1366') !== 'undefined' && thisItem.data('1025-1366') !== false) {
						smallLaptop = thisItem.data('1025-1366');
					}
					if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
						ipadLandscape = thisItem.data('769-1024');
					}
					if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
						ipadPortrait = thisItem.data('681-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}

					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.mkdf-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.mkdf-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}

                    if (typeof mkdf.modules.common.mkdfOwlSlider === "function") { // if owl function exist
                        var owl = thisItem.find('.mkdf-owl-slider');
                        if (owl.length) { // if owl is in elements holder
                            setTimeout(function () {
                                owl.trigger('refresh.owl.carousel'); // reinit owl
                            }, 100);
                        }
                    }

				});

				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}

				if(style.length) {
					$('head').append(style);
				}

			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var expandedGallery = {};
	mkdf.modules.expandedGallery = expandedGallery;

	expandedGallery.mkdfInitExpandedGallery = mkdfInitExpandedGallery;


	expandedGallery.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitExpandedGallery();
	}

    /*
	All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorExpandedGallery();
    }

    /**
     * Elementor
     */
    function mkdfElementorExpandedGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_expanded_gallery.default', function() {
                mkdfInitExpandedGallery();
            } );
        });
    }

	/*
	 **	Init Expanded Gallery shortcode
	 */
	function mkdfInitExpandedGallery(){
		var holder = $('.mkdf-expanded-gallery');

		if(holder.length){
			holder.each(function() {
				var thisHolder = $(this),
					thisHolderImages = thisHolder.find('.mkdf-eg-image');

				thisHolder.find('.mkdf-eg-image:nth-child('+Math.ceil(thisHolderImages.length / 2)+')').addClass('mkdf-eg-middle-item');

				thisHolder.appear(function() {
					thisHolder.find('.mkdf-eg-middle-item').addClass('mkdf-eg-show');

					setTimeout(function(){
						thisHolder.find('.mkdf-eg-middle-item').prev().addClass('mkdf-eg-show');
						thisHolder.find('.mkdf-eg-middle-item').next().addClass('mkdf-eg-show');
					},250);

					if (thisHolder.hasClass('mkdf-eg-five')) {
						setTimeout(function(){
							thisHolder.find('.mkdf-eg-middle-item').prev().prev().addClass('mkdf-eg-show');
							thisHolder.find('.mkdf-eg-middle-item').next().next().addClass('mkdf-eg-show');
						},500);
					}
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var fullScreenImageSlider = {};
	mkdf.modules.fullScreenImageSlider = fullScreenImageSlider;
	
	
	fullScreenImageSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitFullScreenImageSlider();
        mkdfElementorFullScreenImageSlider();
	}


    /**
     * Elementor
     */
    function mkdfElementorFullScreenImageSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_full_screen_image_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            	mkdfInitFullScreenImageSlider();
            } );
        });
    }
	/**
	 * Init Full Screen Image Slider Shortcode
	 */
	function mkdfInitFullScreenImageSlider() {
		var holder = $('.mkdf-fsis-slider');
		
		if (holder.length) {
			holder.each(function () {
				var sliderHolder = $(this),
					mainHolder = sliderHolder.parent(),
					prevThumbNav = mainHolder.children('.mkdf-fsis-prev-nav'),
					nextThumbNav = mainHolder.children('.mkdf-fsis-next-nav'),
					maskHolder = mainHolder.children('.mkdf-fsis-slider-mask');
				
				mainHolder.addClass('mkdf-fsis-is-init');
				
				mkdfImageBehavior(sliderHolder);
				mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, -1); // -1 is arbitrary value because 0 can be index of item
				
				sliderHolder.on('drag.owl.carousel', function () {
					setTimeout(function () {
						if (!maskHolder.hasClass('mkdf-drag') && !mainHolder.hasClass('mkdf-fsis-active')) {
							maskHolder.addClass('mkdf-drag');
						}
					}, 200);
				});
				
				sliderHolder.on('dragged.owl.carousel', function () {
					setTimeout(function () {
						if (maskHolder.hasClass('mkdf-drag')) {
							maskHolder.removeClass('mkdf-drag');
						}
					}, 300);
				});
				
				sliderHolder.on('translate.owl.carousel', function (e) {
					mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, e.item.index);
				});
				
				sliderHolder.on('translated.owl.carousel', function () {
					mkdfImageBehavior(sliderHolder);
					
					setTimeout(function () {
						maskHolder.removeClass('mkdf-drag');
					}, 300);
				});
			});
		}
	}
	
	function mkdfImageBehavior(sliderHolder) {
		var activeItem = sliderHolder.find('.owl-item.active'),
			imageHolder = sliderHolder.find('.mkdf-fsis-item');
		
		imageHolder.removeClass('mkdf-fsis-content-image-init');
		
		mkdfResetImageBehavior(sliderHolder);
		
		if (activeItem.length) {
			var activeImageHolder = activeItem.find('.mkdf-fsis-item'),
				activeItemImage = activeImageHolder.children('.mkdf-fsis-image');
			
			setTimeout(function () {
				activeImageHolder.addClass('mkdf-fsis-content-image-init');
			}, 100);
			
			activeItemImage.off().on('mouseenter', function () {
				activeImageHolder.addClass('mkdf-fsis-image-hover');
			}).on('mouseleave', function () {
				activeImageHolder.removeClass('mkdf-fsis-image-hover');
			}).on('click', function () {
				if (activeImageHolder.hasClass('mkdf-fsis-active-image')) {
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkdf-fsis-active');
					activeImageHolder.removeClass('mkdf-fsis-active-image');
				} else {
					sliderHolder.trigger('stop.owl.autoplay');
					sliderHolder.parent().addClass('mkdf-fsis-active');
					activeImageHolder.addClass('mkdf-fsis-active-image');
				}
			});
			
			//Close on escape
			$(document).keyup(function (e) {
				if (e.keyCode === 27) { //KeyCode for ESC button is 27
					sliderHolder.trigger('play.owl.autoplay');
					sliderHolder.parent().removeClass('mkdf-fsis-active');
					activeImageHolder.removeClass('mkdf-fsis-active-image');
				}
			});
		}
	}
	
	function mkdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, itemIndex) {
		var activeItem = itemIndex === -1 ? sliderHolder.find('.owl-item.active') : $(sliderHolder.find('.owl-item')[itemIndex]),
			prevItemImage = activeItem.prev().find('.mkdf-fsis-image').css('background-image'),
			nextItemImage = activeItem.next().find('.mkdf-fsis-image').css('background-image');
		console.log(prevItemImage);
		console.log(nextItemImage);
		if (prevItemImage.length) {
			prevThumbNav.css({'background-image': prevItemImage});
		}
		
		if (nextItemImage.length) {
			nextThumbNav.css({'background-image': nextItemImage});
		}
	}
	
	function mkdfResetImageBehavior(sliderHolder) {
		var imageHolder = sliderHolder.find('.mkdf-fsis-item');
		
		if (imageHolder.length) {
			imageHolder.removeClass('mkdf-fsis-active-image');
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var frameSlider = {};
	mkdf.modules.frameSlider = frameSlider;


	frameSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorFrameSlider();
	}


    /**
     * Elementor
     */
    function mkdfElementorFrameSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_frame_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            } );
        });
    }
	
})(jQuery);
(function($) {
	'use strict';
	
	var fullScreenSections = {};
	mkdf.modules.fullScreenSections = fullScreenSections;
	
	fullScreenSections.mkdfInitFullScreenSections = mkdfInitFullScreenSections;
	
	
	fullScreenSections.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitFullScreenSections();
	}

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorFullScreenSections();
    }


    /**
     * Elementor
     */
    function mkdfElementorFullScreenSections(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_full_screen_sections.default', function() {
                mkdfInitFullScreenSections();
            } );
        });
    }

    /**
	 **	Init full screen sections shortcode
	 */
	function mkdfInitFullScreenSections(){
		var fullScreenSections = $('.mkdf-full-screen-sections');
		
		if(fullScreenSections.length){
			fullScreenSections.each(function() {
				var thisFullScreenSections = $(this),
					fullScreenSectionsWrapper = thisFullScreenSections.children('.mkdf-fss-wrapper'),
					fullScreenSectionsItems = fullScreenSectionsWrapper.children('.mkdf-fss-item'),
					fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
					fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('mkdf-fss-item-has-style'),
					enableContinuousVertical = false,
					enableNavigationData = '',
					enablePaginationData = '';
				
				var defaultHeaderStyle = '';
				if (mkdf.body.hasClass('mkdf-light-header')) {
					defaultHeaderStyle = 'light';
				} else if (mkdf.body.hasClass('mkdf-dark-header')) {
					defaultHeaderStyle = 'dark';
				}
				
				if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
					enableContinuousVertical = true;
				}
				if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
					enableNavigationData = thisFullScreenSections.data('enable-navigation');
				}
				if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
					enablePaginationData = thisFullScreenSections.data('enable-pagination');
				}
				
				var enableNavigation = enableNavigationData !== 'no',
					enablePagination = enablePaginationData !== 'no';
				
				fullScreenSectionsWrapper.fullpage({
					sectionSelector: '.mkdf-fss-item',
					scrollingSpeed: 1200,
					verticalCentered: false,
					continuousVertical: enableContinuousVertical,
					navigation: enablePagination,
					onLeave: function(index, nextIndex, direction){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
						}
					},
					afterRender: function(){
                        $(this).addClass('mkdf-initialized');
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
							thisFullScreenSections.children('.mkdf-fss-nav-holder').css('visibility','visible');
						}
						
						fullScreenSectionsWrapper.css('visibility','visible');
					}
				});
				
				setResposniveData(thisFullScreenSections);
				
				if(enableNavigation) {
					thisFullScreenSections.find('#mkdf-fss-nav-up').on('click', function() {
						$.fn.fullpage.moveSectionUp();
						return false;
					});
					
					thisFullScreenSections.find('#mkdf-fss-nav-down').on('click', function() {
						$.fn.fullpage.moveSectionDown();
						return false;
					});
				}
			});
		}
	}
	
	function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
	function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index){
		var thisHolder = thisFullScreenSections,
			thisHolderArrowsUp = thisHolder.find('#mkdf-fss-nav-up'),
			thisHolderArrowsDown = thisHolder.find('#mkdf-fss-nav-down'),
			enableContinuousVertical = false;
		
		if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
			enableContinuousVertical = true;
		}
		
		if (index === 1 && !enableContinuousVertical) {
			thisHolderArrowsUp.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(index !== fullScreenSectionsItemsNumber){
				thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(fullScreenSectionsItemsNumber === 2){
				thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else {
			thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
		}
	}
	
	function setResposniveData(thisFullScreenSections) {
		var fullScreenSections = thisFullScreenSections.find('.mkdf-fss-item'),
			responsiveStyle = '',
			style = '';
		
		fullScreenSections.each(function(){
			var thisSection = $(this),
				itemClass = '',
				imageLaptop = '',
				imageTablet = '',
				imagePortraitTablet = '',
				imageMobile = '';
			
			if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
				itemClass = thisSection.data('item-class');
			}
			if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
				imageLaptop = thisSection.data('laptop-image');
			}
			if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
				imageTablet = thisSection.data('tablet-image');
			}
			if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
				imagePortraitTablet = thisSection.data('tablet-portrait-image');
			}
			if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
				imageMobile = thisSection.data('mobile-image');
			}
			
			if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
				
				if (imageLaptop.length) {
					responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
				}
				if (imageTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
				}
				if (imagePortraitTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
				}
				if (imageMobile.length) {
					responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
				}
			}
		});
		
		if (responsiveStyle.length) {
			style = '<style type="text/css">' + responsiveStyle + '</style>';
		}
		
		if (style.length) {
			$('head').append(style);
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var galleryBlocks = {};
	mkdf.modules.galleryBlocks = galleryBlocks;


    galleryBlocks.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorGlleryBlocks();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorGlleryBlocks() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_gallery_blocks.default', function () {
                mkdf.modules.common.mkdfPrettyPhoto();
            });
        });
    }
	
})(jQuery);
(function($) {
	'use strict';
	
	var googleMap = {};
	mkdf.modules.googleMap = googleMap;
	
	googleMap.mkdfShowGoogleMap = mkdfShowGoogleMap;

	// All functions that google maps are initialized in
	$( document ).on(
		'mkdfGoogleMapsCallbackEvent',
		function () {
			mkdfShowGoogleMap();
		}
	);

	$( window ).on(
		'elementor/frontend/init',
		function () {
			elementorFrontend.hooks.addAction(
				'frontend/element_ready/mkdf_google_map.default',
				function () {
					mkdfShowGoogleMap();
				}
			);
		}
	);

	/*
	 **	Show Google Map
	 */
	function mkdfShowGoogleMap(){
		var googleMap = $('.mkdf-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var snazzyMapStyle = false;
				var snazzyMapCode  = '';
				if(typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
					snazzyMapStyle = true;
					var snazzyMapHolder = element.parent().find('.mkdf-snazzy-map'),
						snazzyMapCodes  = snazzyMapHolder.val();
					
					if( snazzyMapHolder.length && snazzyMapCodes.length ) {
						snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
					}
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "mkdf-map-"+ uniqueId;
				
				mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(snazzyMapStyle && snazzyMapCode.length) {
			mapStyles = snazzyMapCode;
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(snazzyMapStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'mkdf-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		wheel = wheel === 'yes';
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkdf-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId,
			mapId: "MIKADO_MAP_ID",
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkdf-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			mkdfInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function mkdfInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var pinImg = document.createElement( 'img' );
				pinImg.src = pin;

				var marker = new google.maps.marker.AdvancedMarkerElement({
					map: map,
					position: results[0].geometry.location,
					content: pinImg,
					title: data['store_title']
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});

				window.addEventListener(
					'resize',
					function () {
						map.setCenter(results[0].geometry.location);
					}
				);
			}
		});
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var timeline = {};
	mkdf.modules.timeline = timeline;
	
	timeline.mkdfInitHorizontalTimeline = mkdfInitHorizontalTimeline;
	
	
	timeline.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

	/**
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitHorizontalTimeline().init();
	}


    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorHorizontalTimeline();
    }

    /**
     * Elementor
     */
    function mkdfElementorHorizontalTimeline(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_horizontal_timeline.default', function() {
                mkdfInitHorizontalTimeline().init();
            } );
        });
    }
	
	function mkdfInitHorizontalTimeline() {
		var timelines = $('.mkdf-horizontal-timeline'),
			eventsMinDistance;
		
		function initTimeline(timelines) {
			timelines.each(function () {
				var timeline = $(this),
					timelineComponents = {};
				
				eventsMinDistance = timeline.data('distance');
				
				//cache timeline components
				timelineComponents['timelineNavWrapper'] = timeline.find('.mkdf-ht-nav-wrapper');
				timelineComponents['timelineNavWrapperWidth'] = timelineComponents['timelineNavWrapper'].width();
				timelineComponents['timelineNavInner'] = timelineComponents['timelineNavWrapper'].find('.mkdf-ht-nav-inner');
				timelineComponents['fillingLine'] = timelineComponents['timelineNavInner'].find('.mkdf-ht-nav-filling-line');
				timelineComponents['timelineEvents'] = timelineComponents['timelineNavInner'].find('a');
				timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
				timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
				timelineComponents['timelineNavigation'] = timeline.find('.mkdf-ht-nav-navigation');
				timelineComponents['timelineEventContent'] = timeline.find('.mkdf-ht-content');
				
				//select initial event
				timelineComponents['timelineEvents'].first().addClass('mkdf-selected');
				timelineComponents['timelineEventContent'].find('li').first().addClass('mkdf-selected');
				
				//assign a left postion to the single events along the timeline
				setDatePosition(timelineComponents, eventsMinDistance);
				
				//assign a width to the timeline
				var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
				
				//the timeline has been initialize - show it
				timeline.addClass('mkdf-loaded');
				
				//detect click on the next arrow
				timelineComponents['timelineNavigation'].on('click', '.mkdf-next', function (e) {
					e.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'next');
				});
				
				//detect click on the prev arrow
				timelineComponents['timelineNavigation'].on('click', '.mkdf-prev', function (e) {
					e.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'prev');
				});
				
				//detect click on the a single event - show new event content
				timelineComponents['timelineNavInner'].on('click', 'a', function (e) {
					e.preventDefault();
					
					var thisItem = $(this);
					
					timelineComponents['timelineEvents'].removeClass('mkdf-selected');
					thisItem.addClass('mkdf-selected');
					
					updateOlderEvents(thisItem);
					updateFilling(thisItem, timelineComponents['fillingLine'], timelineTotWidth);
					updateVisibleContent(thisItem, timelineComponents['timelineEventContent']);
				});
				
				var mq = checkMQ();
				
				//on swipe, show next/prev event content
				timelineComponents['timelineEventContent'].on('swipeleft', function(){
					( mq === 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
				});
				timelineComponents['timelineEventContent'].on('swiperight', function(){
					( mq === 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
				});
				
				//keyboard navigation
				$(document).keyup(function (event) {
					if (event.which === '37' && elementInViewport(timeline.get(0))) {
						showNewContent(timelineComponents, timelineTotWidth, 'prev');
					} else if (event.which === '39' && elementInViewport(timeline.get(0))) {
						showNewContent(timelineComponents, timelineTotWidth, 'next');
					}
				});
			});
		}
		
		function updateSlide(timelineComponents, timelineTotWidth, string) {
			//retrieve translateX value of timelineComponents['timelineNavInner']
			var translateValue = getTranslateValue(timelineComponents['timelineNavInner']),
				wrapperWidth = Number(timelineComponents['timelineNavWrapper'].css('width').replace('px', ''));
			//translate the timeline to the left('next')/right('prev')
			if(string === 'next') {
				translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth);
			} else {
				translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
			}
		}
		
		function showNewContent(timelineComponents, timelineTotWidth, string) {
			//go from one event to the next/previous one
			var visibleContent = timelineComponents['timelineEventContent'].find('.mkdf-selected'),
				newContent = (string === 'next') ? visibleContent.next() : visibleContent.prev();
			
			if (newContent.length > 0) { //if there's a next/prev event - show it
				var selectedDate = timelineComponents['timelineNavInner'].find('.mkdf-selected'),
					newEvent = (string === 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
				
				updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent(newEvent, timelineComponents['timelineEventContent']);
				
				newEvent.addClass('mkdf-selected');
				selectedDate.removeClass('mkdf-selected');
				
				updateOlderEvents(newEvent);
				updateTimelinePosition(string, newEvent, timelineComponents);
			}
		}
		
		function updateTimelinePosition(string, event, timelineComponents) {
			//translate timeline to the left/right according to the position of the mkdf-selected event
			var eventStyle = window.getComputedStyle(event.get(0), null),
				eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
				timelineWidth = Number(timelineComponents['timelineNavWrapper'].css('width').replace('px', '')),
				timelineTotWidth = Number(timelineComponents['timelineNavInner'].css('width').replace('px', '')),
				timelineTranslate = getTranslateValue(timelineComponents['timelineNavInner']);
			
			if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
				translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
			}
		}
		
		function translateTimeline(timelineComponents, value, totWidth) {
			var timelineNavInner = timelineComponents['timelineNavInner'].get(0);
			
			value = (value > 0) ? 0 : value; //only negative translate value
			value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
			
			setTransformValue(timelineNavInner, 'translateX', value + 'px');
			
			//update navigation arrows visibility
			(value === 0) ? timelineComponents['timelineNavigation'].find('.mkdf-prev').addClass('mkdf-inactive') : timelineComponents['timelineNavigation'].find('.mkdf-prev').removeClass('mkdf-inactive');
			(value === totWidth) ? timelineComponents['timelineNavigation'].find('.mkdf-next').addClass('mkdf-inactive') : timelineComponents['timelineNavigation'].find('.mkdf-next').removeClass('mkdf-inactive');
		}
		
		function updateFilling(selectedEvent, filling, totWidth) {
			//change .mkdf-ht-nav-filling-line length according to the mkdf-selected event
			var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
				eventLeft = eventStyle.getPropertyValue("left"),
				eventWidth = eventStyle.getPropertyValue("width");
			
			eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
			
			var scaleValue = eventLeft / totWidth;
			
			setTransformValue(filling.get(0), 'scaleX', scaleValue);
		}
		
		function setDatePosition(timelineComponents, min) {
			for (var i = 0; i < timelineComponents['timelineDates'].length; i++) {
				var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
					distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
				
				timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
			}
		}
		
		function setTimelineWidth(timelineComponents, width) {
			var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
				timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
				timeSpanNorm = Math.round(timeSpanNorm) + 4,
				totalWidth = timeSpanNorm * width;
			
			if (totalWidth < timelineComponents['timelineNavWrapperWidth']) {
				totalWidth = timelineComponents['timelineNavWrapperWidth'];
			}
			
			timelineComponents['timelineNavInner'].css('width', totalWidth + 'px');
			
			updateFilling(timelineComponents['timelineNavInner'].find('a.mkdf-selected'), timelineComponents['fillingLine'], totalWidth);
			updateTimelinePosition('next', timelineComponents['timelineNavInner'].find('a.mkdf-selected'), timelineComponents);
			
			return totalWidth;
		}
		
		function updateVisibleContent(event, timelineEventContent) {
			var eventDate = event.data('date'),
				visibleContent = timelineEventContent.find('.mkdf-selected'),
				selectedContent = timelineEventContent.find('[data-date="' + eventDate + '"]'),
				selectedContentHeight = selectedContent.height(),
				classEnetering = 'mkdf-selected mkdf-enter-left',
				classLeaving = 'mkdf-leave-right';
		
			if (selectedContent.index() > visibleContent.index()) {
				classEnetering = 'mkdf-selected mkdf-enter-right';
				classLeaving = 'mkdf-leave-left';
			}
			
			selectedContent.attr('class', classEnetering);
			
			visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
				visibleContent.removeClass('mkdf-leave-right mkdf-leave-left');
				selectedContent.removeClass('mkdf-enter-left mkdf-enter-right');
			});
			
			timelineEventContent.css('height', selectedContentHeight + 'px');
		}
		
		function updateOlderEvents(event) {
			event.parent('li').prevAll('li').children('a').addClass('mkdf-older-event').end().end().nextAll('li').children('a').removeClass('mkdf-older-event');
		}
		
		function getTranslateValue(timeline) {
			var timelineStyle = window.getComputedStyle(timeline.get(0), null),
				timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") || timelineStyle.getPropertyValue("-moz-transform") || timelineStyle.getPropertyValue("-ms-transform") || timelineStyle.getPropertyValue("-o-transform") || timelineStyle.getPropertyValue("transform"),
				translateValue = 0;
			
			if (timelineTranslate.indexOf('(') >= 0) {
				var timelineTranslate = timelineTranslate.split('(')[1];
				
				timelineTranslate = timelineTranslate.split(')')[0];
				timelineTranslate = timelineTranslate.split(',');
				
				translateValue = timelineTranslate[4];
			}
			
			return Number(translateValue);
		}
		
		function setTransformValue(element, property, value) {
			element.style["-webkit-transform"] = property + "(" + value + ")";
			element.style["-moz-transform"] = property + "(" + value + ")";
			element.style["-ms-transform"] = property + "(" + value + ")";
			element.style["-o-transform"] = property + "(" + value + ")";
			element.style["transform"] = property + "(" + value + ")";
		}
		
		//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
		function parseDate(events) {
			var dateArrays = [];
			
			events.each(function () {
				var singleDate = $(this),
					dateCompStr = new String(singleDate.data('date')),
					dayComp = ['2000', '0', '0'],
					timeComp = ['0', '0'];
				
				if ( dateCompStr.length === 4 ) { //only year
					dayComp = [dateCompStr, '0', '0'];
				} else {
					var dateComp = dateCompStr.split('T');
					
					dayComp = dateComp[0].split('/'); //only DD/MM/YEAR
					
					if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
						dayComp = dateComp[0].split('/');
						timeComp = dateComp[1].split(':');
					} else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
						timeComp = dateComp[0].split(':');
					}
				}
				
				var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
				
				dateArrays.push(newDate);
			});
			
			return dateArrays;
		}
		
		function daydiff(first, second) {
			return Math.round((second - first));
		}
		
		function minLapse(dates) {
			//determine the minimum distance among events
			var dateDistances = [];
			
			for (var i = 1; i < dates.length; i++) {
				var distance = daydiff(dates[i - 1], dates[i]);
				dateDistances.push(distance);
			}
			
			return Math.min.apply(null, dateDistances);
		}
		
		/*
		 How to tell if a DOM element is visible in the current viewport?
		 http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
		 */
		function elementInViewport(el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;
			
			while (el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}
			
			return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
			);
		}
		
		function checkMQ() {
			//check if mobile or wilmertop device
			return window.getComputedStyle(document.querySelector('.mkdf-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
		}
		
		return {
			init: function () {
				(timelines.length > 0) && initTimeline(timelines);
			}
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	mkdf.modules.icon = icon;
	
	
	icon.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfIcon().init();
	}

    /*
	 All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorIcon();
    }

    /**
     * Elementor
     */
    function mkdfElementorIcon(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon.default', function() {
                mkdfIcon().init();
            } );
        });
    }

	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIcon = function() {
		var icons = $('.mkdf-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkdf-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkdf-icon-animation-holder').addClass('mkdf-icon-animation-show');
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.mkdf-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};
				
				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('borderTopColor');
				
				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});
				}
			}
		};
	};

    icon.mkdfIcon = mkdfIcon;
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	mkdf.modules.iconListItem = iconListItem;
	
	iconListItem.mkdfInitIconList = mkdfInitIconList;
	
	
	iconListItem.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitIconList().init();
	}


    /*
 All functions to be called on $(window).load() should be in this function
*/
    function mkdfOnWindowLoad() {
        mkdfElementorIconList();
    }

    /**
     * Elementor
     */
    function mkdfElementorIconList(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon_list_item.default', function() {
                mkdfInitIconList().init();
            } );
        });
    }

	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var mkdfInitIconList = function() {
		var iconList = $('.mkdf-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('mkdf-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function ($) {
    'use strict';

    var iconWithText = {};
    mkdf.modules.iconWithText = iconWithText;

    iconWithText.mkdfInitIconWithText = mkdfInitIconWithText;


    iconWithText.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitIconWithText().init();
    }

    /**
    All functions to be called on $(window).load() should be in this function
    */
    function mkdfOnWindowLoad() {
        mkdfElementorIconWithText();
    }

    /**
     * Elementor
     */
    function mkdfElementorIconWithText(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_icon_with_text.default', function() {
                mkdf.modules.icon.mkdfIcon().init();
                mkdfInitIconWithText().init();
            } );
        });
    }


    /**
     * Button object that initializes whole button functionality
     * @type {Function}
     */
    var mkdfInitIconWithText = function () {
        //all buttons on the page
        var icons = $('.mkdf-iwt');

        /**
         * Initializes button hover color
         * @param button current button
         */
        var iwtHoverColor = function (icon) {
            if (typeof icon.data('title-hover-color') !== 'undefined') {
                var iconTitle = icon.find('.mkdf-iwt-title a'),
                    originalColor = icon.data('title-color'),
                    hoverColor = icon.data('title-hover-color');

                iconTitle.on('mouseenter', function(){
                    $(this).css('color', hoverColor);
                });

                iconTitle.on('mouseleave', function(){
                    $(this).css('color', originalColor);
                });
            }
        };

        return {
            init: function () {
                if (icons.length) {
                    icons.each(function () {
                        iwtHoverColor($(this));
                    });
                }
            }
        };
    };

})(jQuery);
(function ($) {
	'use strict';
	
	var imageGallery = {};
	mkdf.modules.imageGallery = imageGallery;


	imageGallery.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorImageGallery();
	}

    /**
     * Elementor
     */
	function mkdfElementorImageGallery() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_image_gallery.default', function () {
				mkdf.modules.common.mkdfOwlSlider();
				mkdf.modules.common.mkdfInitGridMasonryListLayout();
			});
		});
	}
	
})(jQuery);
(function($) {
    'use strict';
    
    var imageMarquee = {};
    mkdf.modules.imageMarquee = imageMarquee;
    
    imageMarquee.mkdfImageMarquee = mkdfImageMarquee;
    
    imageMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfImageMarquee();
    }

    /**
	 All functions to be called on $(window).load() should be in this function
	*/
    function mkdfOnWindowLoad() {
        mkdfElementorImageMarquee();
    }

    /**
     * Elementor
     */
    function mkdfElementorImageMarquee(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_image_marquee.default', function() {
                mkdfImageMarquee();
            } );
        });
    }

    /**
     * Init Image Marquee Shortcode
     */
    function mkdfImageMarquee() {
        var imageMarqueeShortcodes = $('.mkdf-image-marquee');

        if (imageMarqueeShortcodes.length) {
            imageMarqueeShortcodes.each(function(){
                var imageMarqueeShortcode = $(this),
                    marqueeElements = imageMarqueeShortcode.find('.mkdf-image'),
                    originalItem = marqueeElements.filter('.mkdf-original'),
                    auxItem = marqueeElements.filter('.mkdf-aux');

                var marqueeEffect = function () {
                	var delta = 1, //pixel movement
                	    speedCoeff = 0.5, // below 1 to slow down, above 1 to speed up
                	    currentPos,
                	    marqueeWidth,
                	    resizing = false;

                	var marqueeReset = function() {
                	    marqueeWidth = originalItem.width();
                	    currentPos = 0; 
                	    originalItem.css({
                	        'left': 0
                	    });
                	    auxItem.css({
                	        'width': marqueeWidth, //same width as the original marquee element
                	        'left': marqueeWidth //set to the right of the original marquee element
                	    });
                	}

               		marqueeReset();
	                mkdfRequestAnimationFrame();

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this);

                        //movement loop
                        var mkdfMarqueeSequence = function() {
                            currentPos -= delta;

                            //reset marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            //move marquee element
                            if (!resizing) {
                            	marqueeElement.css({
                            	    'transform': 'translate3d('+speedCoeff*currentPos+'px,0,0)'
                            	});
                            }

                            //fix overlap issue if occurs
                            if (Math.abs(originalItem.position().left - auxItem.position().left) < marqueeWidth - 1) {
                                marqueeReset();
                            }
                        
                            //repeat
                            requestNextAnimationFrame(mkdfMarqueeSequence);
                        }; 
                            
                        mkdfMarqueeSequence();
                    });

                    var intialOrientation = mkdf.windowHeight > mkdf.windowWidth ? 'portrait' : 'landscape';
	                //reset marquee on resize end
	                $(window).resize(function(){
                        var newOrientation = mkdf.windowHeight > mkdf.windowWidth ? 'portrait' : 'landscape';

                        //check if resize is real resize on touch devices since on mobile scrolling will trigger resize when sticky address bar appears/hides
						if( newOrientation !== intialOrientation && mkdf.html.hasClass('touch')) {
                            if (!resizing) {
                                resizing = true;
                                imageMarqueeShortcode.stop().animate({opacity: 0}, 200, function () {
                                    marqueeReset();
                                    resizing = false;
                                    imageMarqueeShortcode.delay(200).animate({opacity: 1}, 200);
                                });
                            }
                        }
	                });
                };

            	//init
                imageMarqueeShortcode.waitForImages(function(){
	                marqueeEffect();
	            });
            });
        }
    }
    
    /*
     * Request Animation Frame shim
     */
	function mkdfRequestAnimationFrame() {
		window.requestNextAnimationFrame =
			(function () {
				var originalWebkitRequestAnimationFrame = undefined,
					wrapper = undefined,
					callback = undefined,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;
				
				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function
				
				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper
					
					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}
						
						self.callback(time);
					};
					
					// Make the switch
					
					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
					
					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;
						
						// Browser calls the wrapper and wrapper calls the callback
						
						originalWebkitRequestAnimationFrame(wrapper, element);
					};
				}
				
				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.
				
				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.
					
					index = userAgent.indexOf('rv:');
					
					if (userAgent.indexOf('Gecko') != -1) {
						geckoVersion = userAgent.substr(index + 3, 3);
						
						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.
							
							window.mozRequestAnimationFrame = undefined;
						}
					}
				}
				
				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					
					function (callback, element) {
						var start,
							finish;
						
						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();
							
							self.timeout = 1000 / 60 - (finish - start);
							
						}, self.timeout);
					};
				}
			)();
	}

})(jQuery);
(function ($) {
	'use strict';
	
	var imageWithText = {};
	mkdf.modules.imageWithText = imageWithText;


	imageWithText.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorImageWithText();
	}

    /**
     * Elementor
     */
	function mkdfElementorImageWithText() {
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_image_with_text.default', function () {
				mkdf.modules.common.mkdfAppearingSection();
			});
		});
	}
	
})(jQuery);
(function($) {
    'use strict';

    var interactiveLinkShowcase = {};
    mkdf.modules.interactiveLinkShowcase = interactiveLinkShowcase;

    interactiveLinkShowcase.mkdfInitInteractiveLinkShowcase = mkdfInitInteractiveLinkShowcase;
    interactiveLinkShowcase.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());


    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitInteractiveLinkShowcase();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorInteractiveLinkShowcase();
    }

    /**
     * Elementor
     */
    function mkdfElementorInteractiveLinkShowcase(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_interactive_link_showcase.default', function() {
                mkdfInitInteractiveLinkShowcase();
            } );
        });
    }

    /**
     * Init item showcase shortcode
     */
    function mkdfInitInteractiveLinkShowcase() {
        var interactiveLinkShowcase = $('.mkdf-ils-holder');
	
	    if (interactiveLinkShowcase.length) {
		    interactiveLinkShowcase.each(function(){
			    var thisInteractiveLinkShowcase = $(this),
				    singleImage = thisInteractiveLinkShowcase.find('.mkdf-ils-item-image'),
				    singleLink  = thisInteractiveLinkShowcase.find('.mkdf-ils-item-link');
			    
			    singleImage.eq(0).addClass('mkdf-active');
			    thisInteractiveLinkShowcase.find('.mkdf-ils-item-link[data-index="0"]').addClass('mkdf-active');
			
			    singleLink.children().on('touchstart mouseenter', function() {
				    var thisLink = $(this).parent(),
					    index = parseInt( thisLink.data('index'), 10 );
				
				    singleImage.removeClass('mkdf-active').eq(index).addClass('mkdf-active');
				    singleLink.removeClass('mkdf-active');
				    thisInteractiveLinkShowcase.find('.mkdf-ils-item-link[data-index="'+index+'"]').addClass('mkdf-active');
			    });
		    });
	    }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var itemShowcase = {};
	mkdf.modules.itemShowcase = itemShowcase;
	
	itemShowcase.mkdfInitItemShowcase = mkdfInitItemShowcase;
	
	
	itemShowcase.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitItemShowcase();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorItemShowcase();
    }

    /**
     * Elementor
     */
    function mkdfElementorItemShowcase(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_item_showcase.default', function() {
                mkdfInitItemShowcase();
            } );
        });
    }

	/**
	 * Init item showcase shortcode
	 */
	function mkdfInitItemShowcase() {
		var itemShowcase = $('.mkdf-item-showcase-holder');
		
		if (itemShowcase.length) {
			itemShowcase.each(function(){
				var thisItemShowcase = $(this),
					leftItems = thisItemShowcase.find('.mkdf-is-left'),
					rightItems = thisItemShowcase.find('.mkdf-is-right'),
					itemImage = thisItemShowcase.find('.mkdf-is-image');
				
				//logic
				leftItems.wrapAll( "<div class='mkdf-is-item-holder mkdf-is-left-holder' />");
				rightItems.wrapAll( "<div class='mkdf-is-item-holder mkdf-is-right-holder' />");
				thisItemShowcase.animate({opacity:1},200);
				
				setTimeout(function(){
					thisItemShowcase.appear(function(){
						itemImage.addClass('mkdf-appeared');
						thisItemShowcase.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
							function(e) {
								if(mkdf.windowWidth > 1200) {
									itemAppear('.mkdf-is-left-holder .mkdf-is-item');
									itemAppear('.mkdf-is-right-holder .mkdf-is-item');
								} else {
									itemAppear('.mkdf-is-item');
								}
							});
					},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				},100);
				
				//appear animation trigger
				function itemAppear(itemCSSClass) {
					thisItemShowcase.find(itemCSSClass).each(function(i){
						var thisListItem = $(this);
						setTimeout(function(){
							thisListItem.addClass('mkdf-appeared');
						}, i*150);
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var pieChart = {};
	mkdf.modules.pieChart = pieChart;
	
	pieChart.mkdfInitPieChart = mkdfInitPieChart;
	
	
	pieChart.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitPieChart();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorPieChart();
    }

    /**
     * Elementor
     */
    function mkdfElementorPieChart(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_pie_chart.default', function() {
                mkdfInitPieChart();
            } );
        });
    }


    /**
	 * Init Pie Chart shortcode
	 */
	function mkdfInitPieChart() {
		var pieChartHolder = $('.mkdf-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.mkdf-pc-percentage'),
					barColor = '#22365c',
					trackColor = '#f2f3f5',
					lineWidth = 5,
                    size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: false,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.mkdf-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	mkdf.modules.process = process;
	
	process.mkdfInitProcess = mkdfInitProcess;
	
	
	process.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProcess()
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorProcess();
    }

    /**
     * Elementor
     */
    function mkdfElementorProcess(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_pie_chart.default', function() {
                mkdfInitProcess();
            } );
        });
    }


    /**
	 * Inti process shortcode on appear
	 */
	function mkdfInitProcess() {
		var holder = $('.mkdf-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('mkdf-process-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	mkdf.modules.progressBar = progressBar;
	
	progressBar.mkdfInitProgressBars = mkdfInitProgressBars;
	
	
	progressBar.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProgressBars();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorProgressBars();
    }

    /**
     * Elementor
     */
    function mkdfElementorProgressBars(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_progress_bar.default', function() {
                mkdfInitProgressBars();
            } );
        });
    }


    /*
     **	Horizontal progress bars shortcode
     */
	function mkdfInitProgressBars() {
		var progressBar = $('.mkdf-progress-bar');
		
		if (progressBar.length) {
			progressBar.each(function () {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.mkdf-pb-content'),
					progressBar = thisBar.find('.mkdf-pb-percent'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function () {
					mkdfInitToCounterProgressBar(progressBar, percentage);
					
					thisBarContent.css('width', '0%').animate({'width': percentage + '%'}, 2000);
					
					if (thisBar.hasClass('mkdf-pb-percent-floating')) {
						progressBar.css('left', '0%').animate({'left': percentage + '%'}, 2000);
					}
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdfInitToCounterProgressBar(progressBar, percentageValue){
		var percentage = parseFloat(percentageValue);
		
		if(progressBar.length) {
			progressBar.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var roadmap = {};
	mkdf.modules.roadmap = roadmap;

	roadmap.mkdfInitRoadmap = mkdfInitRoadmap;

	roadmap.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitRoadmap();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorRoadmap();
    }

    /**
     * Elementor
     */
    function mkdfElementorRoadmap(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_roadmap.default', function() {
                mkdfInitRoadmap();
            } );
        });
    }


    function mkdfInitRoadmap() {
		var roadmap = $('.mkdf-roadmap');
		
		if (roadmap.length) {
			roadmap.each(function () {
				var thisRoadmap = $(this),
					roadMapHolder = thisRoadmap.find('.mkdf-roadmap-holder'),
					roadmapItemsHolder = thisRoadmap.find('.mkdf-roadmap-inner-holder'),
					roadmapItems = thisRoadmap.find('.mkdf-roadmap-item'),
					visibleItems = 5,
					roadmapInitalWidth = thisRoadmap.width(),
					roadmapHolderWidth = 0,
					itemsWidth,
					itemsHeight = 0,
					itemReached = roadmapItems.filter('.mkdf-roadmap-reached-item').last(),
					prevArrow = thisRoadmap.find('.mkdf-rl-arrow-left'),
					nextArrow = thisRoadmap.find('.mkdf-rl-arrow-right'),
					firstActive,
					lastActive,
					translateCurrent = 0,
					moving = false;

				itemReached.siblings().remove('mkdf-roadmap-reached-item');
				itemReached.prevAll().addClass('mkdf-roadmap-passed-item');

				//set width for items and holder, also set classes and first and last active items
				var setWidths = function(){
					roadmapInitalWidth = thisRoadmap.width();

					if (mkdf.windowWidth > 1024) {
						visibleItems = 5;
					} else if (mkdf.windowWidth > 680) {
						visibleItems = 3;
					} else {
						visibleItems = 1;
					}

					itemsWidth = roadmapInitalWidth/visibleItems;

					roadmapItems.each(function () {
						var thisItem = $(this),
							thisItemHeight;

						thisItem.width(itemsWidth);
						roadmapHolderWidth += itemsWidth;

						//needs to be here in order to calculate height right because of the width
						thisItemHeight = thisItem.find('.mkdf-roadmap-item-content-holder').outerHeight();

						if (itemsHeight < thisItemHeight){
							itemsHeight = thisItemHeight;
						}
					});

					roadmapItemsHolder.width(roadmapHolderWidth);
					thisRoadmap.css({'paddingTop': itemsHeight + 70, 'paddingBottom' : itemsHeight + 70});

					//if firstactive set change them accordingly
					if (typeof firstActive != 'undefined') {
						roadmapItems.removeClass('mkdf-roadmap-active-item');
						firstActive.addClass('mkdf-roadmap-active-item');
						for (var i = 0; i < visibleItems - 1; i++) {
							firstActive.nextAll().eq(i).addClass('mkdf-roadmap-active-item');
						}
						lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();
					} else {
						roadmapItems.eq(visibleItems).prevAll().addClass('mkdf-roadmap-active-item');
						firstActive = roadmapItems.filter('.mkdf-roadmap-active-item').first();
						lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();
					}
				};

				//movement for provided step (> 0 to the right, < 0 to the left)
				var moveRoadmap = function(step, timeout){
					var nextItem;
					//prevent multiple clicks while animating with moving  var
					if (!moving) {
						//grab item to be moved to
						if (step >= 1) {
							nextItem = lastActive.nextAll().eq(step - 1);
						} else {
							nextItem = firstActive.prevAll().eq(Math.abs(step) - 1);
						}
						if (nextItem.length) {
							moving = true;

							//adjust classes according to currently moved to item
							roadmapItems.removeClass('mkdf-roadmap-active-item');
							nextItem.addClass('mkdf-roadmap-active-item');
							if (step >= 1) {
								for (var i = 0; i < visibleItems - 1; i++) {
									nextItem.prevAll().eq(i).addClass('mkdf-roadmap-active-item');
								}
							} else {
								for (var i = 0; i < visibleItems - 1; i++) {
									nextItem.nextAll().eq(i).addClass('mkdf-roadmap-active-item');
								}
							}

							//set new first and last active items
							firstActive = roadmapItems.filter('.mkdf-roadmap-active-item').first();
							lastActive = roadmapItems.filter('.mkdf-roadmap-active-item').last();

							//move holder and set var moving to false
							translateCurrent -= step*itemsWidth;
							roadmapItemsHolder.css({'transform': 'translateX(' + translateCurrent + 'px)'});
							setTimeout(function () {
								moving = false;
							}, timeout);
						}
					}
				};

				//move holder to provided item
				var moveTo = function(item){
					var firstActiveIndex = firstActive.index(),
						lastActiveIndex = lastActive.index(),
						goToIndex = item.index(),
						moveStep = 0,
						middle;

					middle = (firstActiveIndex + lastActiveIndex) / 2;

					//if first or second item, go to third item
					//else if last or one before, go to third form the back
					//else go to the desired
					if ( goToIndex < Math.floor(visibleItems/2)) {
						moveStep = firstActiveIndex - 2;
					} else if (goToIndex > roadmapItems.length - 1 - Math.floor(visibleItems/2)) {
						moveStep = roadmapItems.length - 1 - lastActiveIndex;
					} else {
						moveStep = goToIndex - middle;
					}
					moveRoadmap(moveStep, 0);
				}

				//adjust translate so it wouldn't be stopped in the middle of items
				var resizeTranslateAdj = function(){
					var adjustment = firstActive.index()*itemsWidth;

					translateCurrent = -adjustment;
					roadmapItemsHolder.css({'transform': 'translateX(' + translateCurrent + 'px)'});
				}

				//inital set of widths and items
				setWidths();

				//move to reached item
				moveTo(itemReached);

				//bind movement for prev and next arrow
				nextArrow.on("click", function () {
					moveRoadmap(1, 200); //init movement to to right
				});
				prevArrow.on("click", function () {
					moveRoadmap(-1, 200); //init movement to to right
				});

				//adjustments on resize
				$(window).resize(function(){
					setWidths();
					resizeTranslateAdj();
				});

                $('.mkdf-roadmap-item-content-holder').css('opacity', 0);
                $('.mkdf-roadmap-item-above .mkdf-roadmap-item-content-holder').css('transform', 'translateY(20px)');
                $('.mkdf-roadmap-item-below .mkdf-roadmap-item-content-holder').css('transform', 'translateY(-20px)');
			});


			roadmap.appear(function () {
				$('.mkdf-roadmap-item-content-holder').each(function(i) {
					var fadeInTime = .2 + i/5;

					$(this).css({
						'opacity' : 1,
						'transform': 'translateY(0)',
                        'transition':'transform .25s ease-in-out '+ fadeInTime +'s, opacity .25s ease-in-out '+ fadeInTime +'s '
					})
				})
			})

        }


	}
	
})(jQuery);
(function($) {
    'use strict';

    var splitSection = {};
    mkdf.modules.splitSection = splitSection;

    splitSection.mkdfInitSSAppearFX = mkdfInitSSAppearFX;

    splitSection.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitSSAppearFX();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorSSAppearFX();
    }

    /**
     * Elementor
     */
    function mkdfElementorSSAppearFX(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_split_section.default', function() {
                mkdfInitSSAppearFX();
                mkdf.modules.common.mkdfAppearingSection();
            } );
        });
    }


    function mkdfInitSSAppearFX() {
        var splitSection = $('.mkdf-ss-holder');

        if(splitSection.length){
            splitSection.each(function () {
                var thisSplitSection = $(this),
                    backgroundColorHolder = thisSplitSection.find('.mkdf-ss-background-holder'),
                    contentHolder = thisSplitSection.find('.mkdf-ss-content');

                thisSplitSection.appear(function() {
                    thisSplitSection.addClass('mkdf-appeared');
                    backgroundColorHolder.addClass('mkdf-appeared');
                    contentHolder.addClass('mkdf-appeared');
                },{accX: 0, accY:-400});
            })
        }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var stackedImages = {};
	mkdf.modules.stackedImages = stackedImages;

	stackedImages.mkdfInitItemShowcase = mkdfInitStackedImages;


	stackedImages.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitStackedImages();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorStackedImages();
    }

    /**
     * Elementor
     */
    function mkdfElementorStackedImages(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_stacked_images.default', function() {
                mkdfInitStackedImages();
            } );
        });
    }

	/**
	 * Init item showcase shortcode
	 */
	function mkdfInitStackedImages() {
		var stackedImages = $('.mkdf-stacked-images-holder');

		if (stackedImages.length) {
			stackedImages.each(function(){
				var thisStackedImages = $(this),
					itemImage = thisStackedImages.find('.mkdf-si-images');

				//logic
				thisStackedImages.animate({opacity:1},200);

				setTimeout(function(){
					thisStackedImages.appear(function(){
						itemImage.addClass('mkdf-appeared');
					},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
				},100);
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	mkdf.modules.tabs = tabs;
	
	tabs.mkdfInitTabs = mkdfInitTabs;
	
	
	tabs.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitTabs();
	}

    /**
    All functions to be called on $(window).load() should be in this function
   */
    function mkdfOnWindowLoad() {
        mkdfElementorInitTabs();
    }

    /**
     * Elementor
     */
    function mkdfElementorInitTabs(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_tabs.default', function() {
                mkdfInitTabs();
            } );
        });
    }

	/*
	 **	Init tabs shortcode
	 */
	function mkdfInitTabs(){
		var tabs = $('.mkdf-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.mkdf-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkdf-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.mkdf-tabs a.mkdf-external-link').off('click');
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var teamCarousel = {};
	mkdf.modules.teamCarousel = teamCarousel;


    teamCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorTeamCarousel();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorTeamCarousel() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_team_carousel.default', function () {
                mkdf.modules.common.mkdfOwlSlider();
            });
        });
    }
	
})(jQuery);
(function($) {
    'use strict';
    
    var textMarquee = {};
    mkdf.modules.textMarquee = textMarquee;
    
    textMarquee.mkdfInitTextMarquee = mkdfInitTextMarquee;
	textMarquee.mkdfTextMarqueeResize = mkdfTextMarqueeResize;
    
    textMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTextMarqueeResize();
        mkdfInitTextMarquee();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementoreTextMarquee();
    }

    /**
     * Elementor
     */
    function mkdfElementoreTextMarquee(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_text_marquee.default', function() {
                mkdfTextMarqueeResize();
                mkdfInitTextMarquee();
            } );
        });
    }

    /**
     * Init Text Marquee effect
     */
    function mkdfInitTextMarquee() {
        var textMarqueeShortcodes = $('.mkdf-text-marquee');

        if (textMarqueeShortcodes.length) {
            textMarqueeShortcodes.each(function(){
                var textMarqueeShortcode = $(this),
                    marqueeElements = textMarqueeShortcode.find('.mkdf-marquee-element'),
                    originalText = marqueeElements.filter('.mkdf-original-text'),
                    auxText = marqueeElements.filter('.mkdf-aux-text');

                var calcWidth = function(element) {
                    var width;

                    if (textMarqueeShortcode.outerWidth() > element.outerWidth()) {
                        width = textMarqueeShortcode.outerWidth();
                    } else {
                        width = element.outerWidth();
                    }

                    return width;
                };

                var marqueeEffect = function () {
	                mkdfRequestAnimationFrame();
	                
                    var delta = 1, //pixel movement
                        speedCoeff = 0.8, // below 1 to slow down, above 1 to speed up
                        marqueeWidth = calcWidth(originalText);
                    marqueeElements.css({'width':marqueeWidth}); // set the same width to both elements
                    auxText.css('left', marqueeWidth); //set to the right of the initial marquee element

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this),
                            currentPos = 0;

                        var mkdfInfiniteScrollEffect = function() {
                            currentPos -= delta;

                            //move marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            marqueeElement.css('transform','translate3d('+speedCoeff*currentPos+'px,0,0)');
	
	                        requestNextAnimationFrame(mkdfInfiniteScrollEffect);

                            $(window).resize(function(){
                                marqueeWidth = calcWidth(originalText);
                                currentPos = 0;
                                originalText.css('left',0);
                                auxText.css('left', marqueeWidth); //set to the right of the inital marquee element
                            });
                        }; 
                            
                        mkdfInfiniteScrollEffect();
                    });
                };

                marqueeEffect();
            });
        }
    }
    
    /*
     * Request Animation Frame shim
     */
	function mkdfRequestAnimationFrame() {
		window.requestNextAnimationFrame =
			(function () {
				var originalWebkitRequestAnimationFrame = undefined,
					wrapper = undefined,
					callback = undefined,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;
				
				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function
				
				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper
					
					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}
						
						self.callback(time);
					};
					
					// Make the switch
					
					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
					
					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;
						
						// Browser calls the wrapper and wrapper calls the callback
						originalWebkitRequestAnimationFrame(wrapper, element);
					};
				}
				
				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.
				
				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.
					
					index = userAgent.indexOf('rv:');
					
					if (userAgent.indexOf('Gecko') !== -1) {
						geckoVersion = userAgent.substr(index + 3, 3);
						
						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.
							
							window.mozRequestAnimationFrame = undefined;
						}
					}
				}
				
				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					
					function (callback, element) {
						var start,
							finish;
						
						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();
							
							self.timeout = 1000 / 60 - (finish - start);
							
						}, self.timeout);
					};
				}
			)();
	}

	/*
	 **	Text Marquee resizing style
	 */
	function mkdfTextMarqueeResize() {
		var holder = $('.mkdf-text-marquee');

		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';

				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}

				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}

				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}

				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {

					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-text-marquee." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-text-marquee." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-text-marquee." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-text-marquee." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}

				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}

				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var tripleFrameImageHighlight = {};
    mkdf.modules.tripleFrameImageHighlight = tripleFrameImageHighlight;

    tripleFrameImageHighlight.mkdfOnDocumentReady = mkdfOnDocumentReady;
    tripleFrameImageHighlight.mkdfTripleFrameImageHighlight = mkdfTripleFrameImageHighlight;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTripleFrameImageHighlight();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementoreTripleFrameImageHighlight();
    }

    /**
     * Elementor
     */
    function mkdfElementoreTripleFrameImageHighlight(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_triple_frame_image_highlight.default', function() {
                mkdfTripleFrameImageHighlight();
            } );
        });
    }


    /**
     * Triple Frame Image Highlight
     */
    function mkdfTripleFrameImageHighlight() {
        var tfihShortcodes = $('.mkdf-triple-frame-image-highlight');

        if (tfihShortcodes.length) {
            var initClasses = function(c, l, r) {
                c.addClass('mkdf-c');
                l.addClass('mkdf-l');
                r.addClass('mkdf-r');
            }

            var resetIndexes = function(c, l, r) {
                c.css('z-index', 30);
                l.css('z-index', 20);
                r.css('z-index', 20);
            }

            var setTriggerSize = function(holder,inner) {
                holder.find('div[class*="trigger"]').width(Math.round(inner.position().left));
            }

            var setPositioning = function(holder, inner) {
                var left = holder.find('.mkdf-l'),
                    right = holder.find('.mkdf-r'),
                    centered = holder.find('.mkdf-c');

                var xOffset = inner.position().left;

                if (holder.parent().hasClass('mkdf-tfih-with-frame')) {
                    left.css({
                        'visibility': 'visible',
                        'transform-origin': '0% 50%',
                        'transform': 'matrix(0.8,0,0,0.8,-'+xOffset+',0)'
                    });
                    right.css({
                        'visibility': 'visible',
                        'transform-origin': '100% 50%',
                        'transform': 'matrix(0.8,0,0,0.8,'+xOffset+',0)'
                    });
                    centered.css({
                        'transform': 'matrix(1, 0, 0, 1, 0, 0)'
                    });
                } else {
                    left.css({
                        'visibility': 'visible',
                        'transform-origin': '0% 50%',
                        'transform': 'matrix(0.6,0,0,0.6,-'+xOffset+',0)'
                    });
                    right.css({
                        'visibility': 'visible',
                        'transform-origin': '100% 50%',
                        'transform': 'matrix(0.6,0,0,0.6,'+xOffset+',0)'
                    });
                    centered.css({
                        'transform': 'matrix(1, 0, 0, 1, 0, 0)'
                    });
                }
            }

            var rotateAnimation = function(holder, inner, direction) {
                holder.data('animating', true);

                if (direction == 'left') {
                    var toFront = holder.find('.mkdf-l'),
                        toBack = holder.find('.mkdf-c'),
                        toPrep = holder.find('.mkdf-r');

                    toPrep.removeClass('mkdf-r').addClass('mkdf-l');
                    toBack.removeClass('mkdf-c').addClass('mkdf-r');
                    toFront.removeClass('mkdf-l').addClass('mkdf-c');
                } else {
                    var toFront = holder.find('.mkdf-r'),
                        toBack = holder.find('.mkdf-c'),
                        toPrep = holder.find('.mkdf-l');

                    toPrep.removeClass('mkdf-l').addClass('mkdf-r');
                    toBack.removeClass('mkdf-c').addClass('mkdf-l');
                    toFront.removeClass('mkdf-r').addClass('mkdf-c');
                }

                toPrep.css({
                    'z-index': 15,
                    'transform-origin': '0% 50%',
                    'transition': 'transform .5s, transform-origin .5s'
                });
                toBack.css({
                    'z-index': 25,
                    'transform-origin': '100% 50%',
                    'transition': 'transform 1s cubic-bezier(0.19, 1, 0.22, 1) .2s, \
                                    transform-origin 1s cubic-bezier(0.19, 1, 0.22, 1) .2s, \
                                    box-shadow .3s'
                });
                toFront.css({
                    'z-index': 20,
                    'transform-origin': '50% 50%',
                    'transition': 'transform .75s cubic-bezier(0.86, 0, 0.07, 1) .5s, \
                                    transform-origin .75s cubic-bezier(0.86, 0, 0.07, 1) .5s, \
                                    box-shadow .3s'
                });

                holder.find('a').css('pointer-events', 'none');
                setTimeout(function() {
                    holder.find('a').css('pointer-events', 'auto');
                    resetIndexes(toFront, toPrep, toBack);
                }, 500);

                toFront.one(mkdf.transitionEnd, function() {
                    holder.data('animating', false);
                    clearInterval(holder.data('autoplay'));
                    holder.data('autoplay', setInterval(function() {
                        navigate(holder, inner);
                    }, 3000));
                })
            }

            var navigate = function(holder, inner, event) {
                var direction,
                    linkActive = false;

                if (typeof event !== 'undefined') {
                    switch(event.target.className) {
                        case 'mkdf-tfih-left-trigger':
                            direction = 'left';
                            break;
                        case 'mkdf-tfih-right-trigger':
                            direction = 'right';
                            break;
                        case 'mkdf-tfih-link':
                            linkActive = true;
                            holder.data('animating', false);
                            clearInterval(holder.data('autoplay'));
                            break;
                    }
                } else {
                    direction = 'right';
                }

                if (!linkActive) {
                    rotateAnimation(holder, inner, direction)
                    setPositioning(holder, inner);
                }
            }

            tfihShortcodes.each(function() {
                var holder = $(this),
                    inner = holder.find('.mkdf-tfih-inner'),
                    centeredH = holder.find('.mkdf-tfih-centered-image-holder'),
                    leftH = holder.find('.mkdf-tfih-left-image-holder'),
                    rightH = holder.find('.mkdf-tfih-right-image-holder');

                //state
                holder
                    .data('animating', false)
                    .data('autoplay', false);

                initClasses(centeredH, leftH, rightH);
                resetIndexes(centeredH, leftH, rightH);
                setTriggerSize(holder, inner);

                holder.waitForImages(function() {
                    holder.appear(function() {
                        holder.css('visibility', 'visible');
                        setPositioning(holder, inner);
                        holder.data('autoplay', setInterval(function() {
                            navigate(holder, inner);
                        }, 3000));
                    }, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
                });

                holder.on('click', function(event) {
                    if (!holder.data('animating')) {
                        clearInterval(holder.data('autoplay'));
                        navigate(holder, inner, event);
                    }
                });

                if (holder.parent().hasClass('mkdf-tfih-with-nav')) {
                    var left = holder.parent().find('.mkdf-tfih-left'),
                        right = holder.parent().find('.mkdf-tfih-right');

                    left.on('click', function() {
                        if (!holder.data('animating')) {
                            rotateAnimation(holder, inner, 'left')
                            setPositioning(holder, inner);
                        }
                    });

                    right.on('click', function() {
                        if (!holder.data('animating')) {
                            rotateAnimation(holder, inner, 'right')
                            setPositioning(holder, inner);
                        }
                    });
                }

                $(window).on('resize', function() {
                    setPositioning(holder, inner);
                    setTriggerSize(holder, inner);
                    inner.find('>div').css('transition', 'none');
                })
            });
        }
    }
})(jQuery);

(function($) {
    'use strict';

    var uncoveringSections = {};
    mkdf.modules.uncoveringSections = uncoveringSections;

    uncoveringSections.mkdfInitUncoveringSections = mkdfInitUncoveringSections;


    uncoveringSections.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitUncoveringSections();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorUncoveringSections();
    }

    /**
     * Elementor
     */
    function mkdfElementorUncoveringSections(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_uncovering_sections.default', function() {
                mkdfInitUncoveringSections();
            } );
        });
    }

    /*
     **	Init full screen sections shortcode
     */
    function mkdfInitUncoveringSections(){
        var uncoveringSections = $('.mkdf-uncovering-sections');

        if(uncoveringSections.length){
            uncoveringSections.each(function() {
                var thisUS = $(this),
                    thisCurtain = uncoveringSections.find('.curtains'),
                    curtainItems = thisCurtain.find('.mkdf-uss-item'),
                    curtainShadow = uncoveringSections.find('.mkdf-fss-shadow');
                var body = mkdf.body;
                var defaultHeaderStyle = '';
                if (body.hasClass('mkdf-light-header')) {
                    defaultHeaderStyle = 'light';
                } else if (body.hasClass('mkdf-dark-header')) {
                    defaultHeaderStyle = 'dark';
                }

                body.addClass('mkdf-uncovering-section-on-page');
                if(mkdfPerPageVars.vars.mkdfHeaderVerticalWidth > 0 && mkdf.windowWidth > 1024) {
                    curtainItems.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });

                    curtainShadow.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });
                }

                thisCurtain.curtain({
                    scrollSpeed: 400,
                    nextSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle); },
                    prevSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);}
                });

                checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);
                setResposniveData(thisCurtain);

                thisUS.addClass('mkdf-loaded');
            });
        }
    }

    function checkFullScreenSectionsItemForHeaderStyle(thisUncoveringSections, default_header_style) {
        var section_header_style = thisUncoveringSections.find('.current').data('header-style');
        if (section_header_style !== undefined && section_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
        } else {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
        }
    }

    function setResposniveData(thisUncoveringSections) {
        var uncoveringSections = thisUncoveringSections.find('.mkdf-uss-item'),
            responsiveStyle = '',
            style = '';

        uncoveringSections.each(function(){
            var thisSection = $(this),
                thisSectionImage = thisSection.find('.mkdf-uss-image-holder'),
                itemClass = '',
                imageLaptop = '',
                imageTablet = '',
                imagePortraitTablet = '',
                imageMobile = '';

            if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
                itemClass = thisSection.data('item-class');
            }

            if (typeof thisSectionImage.data('laptop-image') !== 'undefined' && thisSectionImage.data('laptop-image') !== false) {
                imageLaptop = thisSectionImage.data('laptop-image');
            }
            if (typeof thisSectionImage.data('tablet-image') !== 'undefined' && thisSectionImage.data('tablet-image') !== false) {
                imageTablet = thisSectionImage.data('tablet-image');
            }
            if (typeof thisSectionImage.data('tablet-portrait-image') !== 'undefined' && thisSectionImage.data('tablet-portrait-image') !== false) {
                imagePortraitTablet = thisSectionImage.data('tablet-portrait-image');
            }
            if (typeof thisSectionImage.data('mobile-image') !== 'undefined' && thisSectionImage.data('mobile-image') !== false) {
                imageMobile = thisSectionImage.data('mobile-image');
            }


            if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {

                if (imageLaptop.length) {
                    responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url(" + imageLaptop + ") !important; } }";
                }
                if (imageTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageTablet + ") !important; } }";
                }
                if (imagePortraitTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imagePortraitTablet + ") !important; } }";
                }
                if (imageMobile.length) {
                    responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageMobile + ") !important; } }";
                }
            }
        });

        if (responsiveStyle.length) {
            style = '<style type="text/css">' + responsiveStyle + '</style>';
        }

        if (style.length) {
            $('head').append(style);
        }
    }

})(jQuery);
(function($) {
	'use strict';
	
	var verticalSplitSlider = {};
	mkdf.modules.verticalSplitSlider = verticalSplitSlider;
	
	verticalSplitSlider.mkdfInitVerticalSplitSlider = mkdfInitVerticalSplitSlider;
	
	
	verticalSplitSlider.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitVerticalSplitSlider();
	}

	/**
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfElementorVerticalSplitSlider();
	}

	/**
	 * Elementor
	 */
	function mkdfElementorVerticalSplitSlider(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_vertical_split_slider.default', function() {
				mkdfInitVerticalSplitSlider();
			} );
		});
	}

	/**
	 **	Vertical Split Slider
	 */
	function mkdfInitVerticalSplitSlider() {
		var slider = $('.mkdf-vertical-split-slider'),
			progressBarFlag = true;
		
		if (slider.length) {
			if (mkdf.body.hasClass('mkdf-vss-initialized')) {
				mkdf.body.removeClass('mkdf-vss-initialized');
				$.fn.multiscroll.destroy();
			}
			
			slider.height(mkdf.windowHeight).animate({opacity: 1}, 300);
			
			var defaultHeaderStyle = '';
			if (mkdf.body.hasClass('mkdf-light-header')) {
				defaultHeaderStyle = 'light';
			} else if (mkdf.body.hasClass('mkdf-dark-header')) {
				defaultHeaderStyle = 'dark';
			}
			
			slider.multiscroll({
				scrollingSpeed: 700,
				easing: 'easeInOutQuart',
				navigation: true,
				useAnchorsOnLoad: false,
				sectionSelector: '.mkdf-vss-ms-section',
				leftSelector: '.mkdf-vss-ms-left',
				rightSelector: '.mkdf-vss-ms-right',
				afterRender: function () {
					mkdfCheckVerticalSplitSectionsForHeaderStyle($('.mkdf-vss-ms-left .mkdf-vss-ms-section:first-child').data('header-style'), defaultHeaderStyle);
					mkdf.body.addClass('mkdf-vss-initialized');
					
					var contactForm7 = $('div.wpcf7 > form');
					if (contactForm7.length) {
						contactForm7.each(function(){
							var thisForm = $(this);
							
							thisForm.find('.wpcf7-submit').off().on('click', function(e){
								e.preventDefault();
								wpcf7.submit(thisForm);
							});
						});
					}
					
					//prepare html for smaller screens - start //
					var verticalSplitSliderResponsive = $('<div class="mkdf-vss-responsive"></div>'),
						leftSide = slider.find('.mkdf-vss-ms-left > div'),
						rightSide = slider.find('.mkdf-vss-ms-right > div');
					
					slider.after(verticalSplitSliderResponsive);
					
					for (var i = 0; i < leftSide.length; i++) {
						verticalSplitSliderResponsive.append($(leftSide[i]).clone(true));
						verticalSplitSliderResponsive.append($(rightSide[leftSide.length - 1 - i]).clone(true));
					}
					
					//prepare google maps clones
					var googleMapHolder = $('.mkdf-vss-responsive .mkdf-google-map');
					if (googleMapHolder.length) {
						googleMapHolder.each(function () {
							var map = $(this);
							map.empty();
							var num = Math.floor((Math.random() * 100000) + 1);
							map.attr('id', 'mkdf-map-' + num);
							map.data('unique-id', num);
						});
					}
					
					if (typeof mkdf.modules.animationHolder.mkdfInitAnimationHolder === "function") {
						mkdf.modules.animationHolder.mkdfInitAnimationHolder();
					}
					
					if (typeof mkdf.modules.button.mkdfButton === "function") {
						mkdf.modules.button.mkdfButton().init();
					}
					
					if (typeof mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle === "function") {
						mkdf.modules.elementsHolder.mkdfInitElementsHolderResponsiveStyle();
					}
					
					if (typeof mkdf.modules.googleMap.mkdfShowGoogleMap === "function") {
						mkdf.modules.googleMap.mkdfShowGoogleMap();
					}
					
					if (typeof mkdf.modules.icon.mkdfIcon === "function") {
						mkdf.modules.icon.mkdfIcon().init();
					}
					
					if (progressBarFlag && typeof mkdf.modules.progressBar.mkdfInitProgressBars === "function" && ($('.mkdf-vss-ms-left .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length || $('.mkdf-vss-ms-right .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length)){
						mkdf.modules.progressBar.mkdfInitProgressBars();
						progressBarFlag = false;
					}
				},
				onLeave: function (index, nextIndex) {
					if (progressBarFlag && typeof mkdf.modules.progressBar.mkdfInitProgressBars === "function" && ($('.mkdf-vss-ms-left .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length || $('.mkdf-vss-ms-right .mkdf-vss-ms-section.active').find('.mkdf-progress-bar').length)){
						setTimeout(function(){
							mkdf.modules.progressBar.mkdfInitProgressBars();
						},700); // scrolling speed is 700

						progressBarFlag = false;
					}

					mkdfIntiScrollAnimation(slider, nextIndex);
					mkdfCheckVerticalSplitSectionsForHeaderStyle($($('.mkdf-vss-ms-left .mkdf-vss-ms-section')[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
				}
			});
			
			if (mkdf.windowWidth <= 1024) {
				$.fn.multiscroll.destroy();
			} else {
				$.fn.multiscroll.build();
			}
			
			$(window).resize(function () {
				if (mkdf.windowWidth <= 1024) {
					$.fn.multiscroll.destroy();
				} else {
					$.fn.multiscroll.build();
				}
			});
		}
	}
	
	function mkdfIntiScrollAnimation(slider, nextIndex) {
		
		if (slider.hasClass('mkdf-vss-scrolling-animation')) {
			
			if (nextIndex > 1 && !slider.hasClass('mkdf-vss-scrolled')) {
				slider.addClass('mkdf-vss-scrolled');
			} else if (nextIndex === 1 && slider.hasClass('mkdf-vss-scrolled')) {
				slider.removeClass('mkdf-vss-scrolled');
			}
		}
	}
	
	/*
	 **	Check slides on load and slide change for header style changing
	 */
	function mkdfCheckVerticalSplitSectionsForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var videoButton = {};
	mkdf.modules.videoButton = videoButton;


    videoButton.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad());
	
	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnWindowLoad() {
        mkdfElementorVideoButton();
	}


    /**
     * Elementor Team Carousel
     */
    function mkdfElementorVideoButton() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/mkdf_video_button.default', function () {
                mkdf.modules.common.mkdfPrettyPhoto();
            });
        });
    }
	
})(jQuery);
(function($) {
	'use strict';
	
	var workflow = {};
	mkdf.modules.workflow = workflow;

    workflow.mkdfWorkflow = mkdfWorkflow;


    workflow.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/**
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
        mkdfWorkflow();
	}

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorWorkflow();
    }

    /**
     * Elementor
     */
    function mkdfElementorWorkflow(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_workflow.default', function() {
                mkdfWorkflow();
            } );
        });
    }

    function mkdfWorkflow() {
        var workflowShortcodes = $('.mkdf-workflow');
        if (workflowShortcodes.length) {
            workflowShortcodes.each(function () {
                var workflowShortcode = $(this);
                if (workflowShortcode.hasClass('mkdf-workflow-animate')) {
                    var workflowItems = workflowShortcode.find('.mkdf-workflow-item');

                    workflowShortcode.appear(function () {
                        workflowShortcode.addClass('mkdf-appeared');
                        setTimeout(function () {
                            workflowItems.each(function (i) {
                                var workflowItem = $(this);
                                setTimeout(function () {
                                    workflowItem.addClass('mkdf-appeared');
                                }, 350 * i);
                            });
                        }, 350);
                    }, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});

                }
            });
        }
    }
	
})(jQuery);
(function($) {
    'use strict';

    var portfolioFullheightSlider = {};
    mkdf.modules.portfolioFullheightSlider = portfolioFullheightSlider;

    portfolioFullheightSlider.mkdfOnDocumentReady = mkdfOnDocumentReady;
    portfolioFullheightSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;
    portfolioFullheightSlider.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);
    

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {

    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfportfolioFullheightSliderInitMouseWheel();
        mkdfElementorPortfolioFullheightSlider();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {

    }

    /**
     * Elementor
     */
    function mkdfElementorPortfolioFullheightSlider(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_fullheight_slider.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
                mkdf.modules.common.mkdfPrettyPhoto();
                mkdfportfolioFullheightSliderInitMouseWheel();
            } );
        });
    }

    function mkdfportfolioFullheightSliderInitMouseWheel(){

        var portfolioFullheightSlider = $('.mkdf-portfolio-fullheight-slider-holder');

        if(portfolioFullheightSlider.length && portfolioFullheightSlider.hasClass('mkdf-slide-on-mouse-scroll')){
            portfolioFullheightSlider.each(function(){
                var sliders = $(this).find('.mkdf-owl-slider');

                if (sliders.length) {
                    sliders.each(function() {

                        var slider = $(this);

                        slider.on('mousewheel', '.owl-stage', function (e) {
                            if (!slider.data('mkdf-active')) {
                                var curr = $(this);
                                if (e.deltaY < 0) {
                                    curr.trigger('next.owl');
                                } else {
                                    curr.trigger('prev.owl');
                                }
                                e.preventDefault();
                            }
                        });

                    })
                }
            })
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var portfolioList = {};
    mkdf.modules.portfolioList = portfolioList;

    portfolioList.mkdfOnWindowLoad = mkdfOnWindowLoad;
    portfolioList.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad());
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitPortfolioFilter();
        mkdfInitPortfolioListAnimation();
	    mkdfInitPortfolioPagination().init();
		mkdfElementorPortfolioList();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
	    mkdfInitPortfolioPagination().scroll();
    }

	/**
	 * function that scrolls the page to the top of the list when page in portfolio list navigation is changed
	 */
    function scrollToTopOnPortfolioListReload() {
			$('html, body').animate({
				scrollTop: $('.mkdf-portfolio-list-holder').offset().top - 120
			}, 400);
	}

	/**
	 * Elementor
	 */
	function mkdfElementorPortfolioList(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_list.default', function() {
				var isElementorEditMode = false;
				if( typeof elementorFrontend !== 'undefined' ){
					isElementorEditMode = elementorFrontend.isEditMode();
				}

				if( isElementorEditMode ) {
					mkdf.modules.common.mkdfInitGridMasonryListLayout();
					mkdfInitPortfolioFilter();
					mkdfInitPortfolioListAnimation();
					mkdfInitPortfolioPagination().init();
				}
			} );
		});
	}

    /**
     * Initializes portfolio list article animation
     */
    function mkdfInitPortfolioListAnimation(){
        var portList = $('.mkdf-portfolio-list-holder.mkdf-pl-has-animation');

        if(portList.length){
            portList.each(function(){
                var thisPortList = $(this).children('.mkdf-pl-inner');

                thisPortList.children('article').each(function(l) {
                    var thisArticle = $(this);

                    thisArticle.appear(function() {
                        thisArticle.addClass('mkdf-item-show');

                        setTimeout(function(){
                            thisArticle.addClass('mkdf-item-shown');
                        }, 1000);
                    },{accX: 0, accY: 0});
                });
            });
        }
    }

    /**
     * Initializes portfolio masonry filter
     */
    function mkdfInitPortfolioFilter(){
        var filterHolder = $('.mkdf-portfolio-list-holder .mkdf-pl-filter-holder');

        if(filterHolder.length){
            filterHolder.each(function(){
                var thisFilterHolder = $(this),
                    thisPortListHolder = thisFilterHolder.closest('.mkdf-portfolio-list-holder'),
                    thisPortListInner = thisPortListHolder.find('.mkdf-pl-inner'),
                    portListHasLoadMore = thisPortListHolder.hasClass('mkdf-pl-pag-load-more') ? true : false;

                thisFilterHolder.find('.mkdf-pl-filter:first').addClass('mkdf-pl-current');
	            
	            if(thisPortListHolder.hasClass('mkdf-pl-gallery')) {
		            thisPortListInner.isotope();
	            }

                thisFilterHolder.find('.mkdf-pl-filter').on('click', function(){
                    var thisFilter = $(this),
                        filterValue = thisFilter.attr('data-filter'),
                        filterClassName = filterValue.length ? filterValue.substring(1) : '',
	                    portListHasArticles = thisPortListInner.children().hasClass(filterClassName) ? true : false;

                    thisFilter.parent().children('.mkdf-pl-filter').removeClass('mkdf-pl-current');
                    thisFilter.addClass('mkdf-pl-current');
	
	                if(portListHasLoadMore && !portListHasArticles && filterValue.length) {
		                mkdfInitLoadMoreItemsPortfolioFilter(thisPortListHolder, filterValue, filterClassName);
	                } else {
		                filterValue = filterValue.length === 0 ? '*' : filterValue;
                   
                        thisFilterHolder.parent().children('.mkdf-pl-inner').isotope({ filter: filterValue });
	                    mkdf.modules.common.mkdfInitParallax();
                    }
                });
            });
        }
    }

    /**
     * Initializes load more items if portfolio masonry filter item is empty
     */
    function mkdfInitLoadMoreItemsPortfolioFilter($portfolioList, $filterValue, $filterClassName) {
        var thisPortList = $portfolioList,
            thisPortListInner = thisPortList.find('.mkdf-pl-inner'),
            filterValue = $filterValue,
            filterClassName = $filterClassName,
            maxNumPages = 0;

        if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
            maxNumPages = thisPortList.data('max-num-pages');
        }

        var	loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisPortList),
            nextPage = loadMoreDatta.nextPage,
	        ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_core_portfolio_ajax_load_more'),
            loadingItem = thisPortList.find('.mkdf-pl-loading');

        if(nextPage <= maxNumPages) {
            loadingItem.addClass('mkdf-showing mkdf-filter-trigger');
            thisPortListInner.css('opacity', '0');

            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                success: function (data) {
                    nextPage++;
                    thisPortList.data('next-page', nextPage);
                    var response = $.parseJSON(data),
                        responseHtml = response.html;

                    thisPortList.waitForImages(function () {
                        thisPortListInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
                        var portListHasArticles = !!thisPortListInner.children().hasClass(filterClassName);

                        if(portListHasArticles) {
                            setTimeout(function() {
	                            mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
                                thisPortListInner.isotope('layout').isotope({filter: filterValue});
                                loadingItem.removeClass('mkdf-showing mkdf-filter-trigger');

                                setTimeout(function() {
                                    thisPortListInner.css('opacity', '1');
                                    mkdfInitPortfolioListAnimation();
	                                mkdf.modules.common.mkdfInitParallax();
                                }, 150);
                            }, 400);
                        } else {
                            loadingItem.removeClass('mkdf-showing mkdf-filter-trigger');
                            mkdfInitLoadMoreItemsPortfolioFilter(thisPortList, filterValue, filterClassName);
                        }
                    });
                }
            });
        }
    }
	
	/**
	 * Initializes portfolio pagination functions
	 */
	function mkdfInitPortfolioPagination(){
		var portList = $('.mkdf-portfolio-list-holder');
		
		var initStandardPagination = function(thisPortList) {
			var standardLink = thisPortList.find('.mkdf-pl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisPortList, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisPortList) {
			var loadMoreButton = thisPortList.find('.mkdf-pl-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisPortList);
			});
		};
		
		var initInifiteScrollPagination = function(thisPortList) {
			var portListHeight = thisPortList.outerHeight(),
				portListTopOffest = thisPortList.offset().top,
				portListPosition = portListHeight + portListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisPortList.hasClass('mkdf-pl-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > portListPosition) {
				initMainPagFunctionality(thisPortList);
			}
		};
		
		var initMainPagFunctionality = function(thisPortList, pagedLink) {
			var thisPortListInner = thisPortList.find('.mkdf-pl-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
				maxNumPages = thisPortList.data('max-num-pages');
			}
			
			if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
				thisPortList.data('next-page', pagedLink);
			}
			
			if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
				thisPortList.addClass('mkdf-pl-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisPortList),
				loadingItem = thisPortList.find('.mkdf-pl-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages || maxNumPages === 0){
				if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
					loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
					thisPortList.addClass('mkdf-pl-pag-standard-animate');
				} else {
					loadingItem.addClass('mkdf-showing');
				}
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wilmer_core_portfolio_ajax_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						if(!thisPortList.hasClass('mkdf-pl-pag-standard')) {
							nextPage++;
						}
						
						thisPortList.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
							mkdfInitStandardPaginationLinkChanges(thisPortList, maxNumPages, nextPage);
							
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('mkdf-pl-masonry')){
									mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else if (thisPortList.hasClass('mkdf-pl-gallery') && thisPortList.hasClass('mkdf-pl-has-filter')) {
									mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
									mkdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('mkdf-pl-masonry')){
								    if(pagedLink === 1) {
                                        mkdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    }
								} else if (thisPortList.hasClass('mkdf-pl-gallery') && thisPortList.hasClass('mkdf-pl-has-filter') && pagedLink !== 1) {
									mkdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
								    if (pagedLink === 1) {
                                        mkdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendGalleryNewContent(thisPortListInner, loadingItem, responseHtml);
                                    }
								}
							});
						}
						
						if(thisPortList.hasClass('mkdf-pl-infinite-scroll-started')) {
							thisPortList.removeClass('mkdf-pl-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisPortList.find('.mkdf-pl-load-more-holder').hide();
			}
		};
		
		var mkdfInitStandardPaginationLinkChanges = function(thisPortList, maxNumPages, nextPage) {
			var standardPagHolder = thisPortList.find('.mkdf-pl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');
			
			standardPagNumericItem.removeClass('mkdf-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var mkdfInitHtmlIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.find('article').remove();
            thisPortListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisPortList.removeClass('mkdf-pl-pag-standard-animate');
			scrollToTopOnPortfolioListReload();

			setTimeout(function() {
				thisPortListInner.isotope('layout');
				mkdfInitPortfolioListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitHtmlGalleryNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisPortList.removeClass('mkdf-pl-pag-standard-animate');
			thisPortListInner.html(responseHtml);
			mkdfInitPortfolioListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
			scrollToTopOnPortfolioListReload();
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisPortListInner.isotope('layout');
				mkdfInitPortfolioListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisPortListInner.append(responseHtml);
			mkdfInitPortfolioListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		return {
			init: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('mkdf-pl-pag-standard')) {
							initStandardPagination(thisPortList);
						}
						
						if(thisPortList.hasClass('mkdf-pl-pag-load-more')) {
							initLoadMorePagination(thisPortList);
						}
						
						if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
			scroll: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('mkdf-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
            getMainPagFunction: function(thisPortList, paged) {
                initMainPagFunctionality(thisPortList, paged);
            }
		};
	}

})(jQuery);

(function($) {
    'use strict';

    var portfolioSlider = {};
    mkdf.modules.portfolioSlider = portfolioSlider;

	portfolioSlider.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());


    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
		mkdfElementorPortfolioSlider();
    }

	/**
	 * Elementor
	 */
	function mkdfElementorPortfolioSlider(){
		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_slider.default', function() {
				mkdf.modules.common.mkdfOwlSlider();
				mkdf.modules.common.mkdfPrettyPhoto();
			} );
		});
	}

})(jQuery);
(function($) {
    'use strict';

    var portfolioVerticalLoop = {};
    mkdf.modules.portfolioVerticalLoop = portfolioVerticalLoop;

    portfolioVerticalLoop.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    function mkdfOnDocumentReady() {
        mkdfInitPortfolioVerticalLoop();
    }

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorPortfolioVerticalLoop();
    }

    /**
     * Elementor
     */
    function mkdfElementorPortfolioVerticalLoop(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_portfolio_vertical_loop.default', function() {
                mkdfInitPortfolioVerticalLoop();
            } );
        });
    }

    function mkdfInitPortfolioVerticalLoop(){
        var portfolioVerticalLoopHolder = $('.mkdf-portfolio-vertical-loop-holder');

        if(portfolioVerticalLoopHolder.length) {
            portfolioVerticalLoopHolder.each(function() {
                var thisPortfolioVerticalLoop = $(this),
                    header = $('.mkdf-page-header'),
                    mobileHeader = $('.mkdf-mobile-header'),
                    headerAddition,
                    normalHeaderAddition,
                    headerHeight = header.outerHeight(),
                    paspartuWidth = mkdf.body.hasClass('mkdf-paspartu-enabled') ? parseInt($('.mkdf-paspartu-enabled .mkdf-wrapper').css('padding-left')) : 0;

                if (mkdf.body.hasClass('mkdf-content-is-behind-header')) {
                    normalHeaderAddition = 0;
                } else {
                    normalHeaderAddition = headerHeight;
                }

                var click = true;

                var container = $('.mkdf-pvl-inner');
                $(mkdf.body).on('click', '.mkdf-pvli-content-holder .mkdf-pvli-content-link', function (e) {
                    e.preventDefault();
                    if (click) {
                        click = false;
                        var thisLink = $(this);

                        //check for mobile header
                        if (mkdf.windowWidth < 1000) {
                            headerAddition = mobileHeader.outerHeight();
                        } else {
                            headerAddition = normalHeaderAddition;
                        }

                        var scrollTop = mkdf.window.scrollTop(),
                            elementOffset = thisLink.closest('article').offset().top,
                            distance = (elementOffset - scrollTop) - headerAddition - paspartuWidth;

                        container.find('article:eq(0)').addClass('fade-out');
                        thisLink.closest('article').addClass('move-up').removeClass('next-item').css('transform', 'translateY(-' + distance + 'px)');
                        setTimeout(function () {
                            mkdf.window.scrollTop(0);
                            container.find('article:eq(0)').remove();
                            thisLink.closest('article').removeAttr('style').removeClass('move-up');
                        }, 450);

                        var loadMoreData = mkdf.modules.common.getLoadMoreData(thisPortfolioVerticalLoop);

                        var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more');

                        $.ajax({
                            type: 'POST',
                            data: ajaxData,
                            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
                            success: function (data) {

                                var response = $.parseJSON(data),
                                    responseHtml = response.html,
                                    nextItemId = response.next_item_id;
                                thisPortfolioVerticalLoop.data('next-item-id', nextItemId);

                                var nextItem = $(responseHtml).find('.mkdf-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                                container.append(nextItem);
                                click = true;
                            }
                        });

                        // load navigation
                        mkdfPortfolioVerticalLoopNavigation(thisPortfolioVerticalLoop);
                    }
                    else {
                        return false;
                    }
                });

                //load next item on page load
                mkdfPortfolioVerticalLoopNextItem(thisPortfolioVerticalLoop, container);

            });
        }
    }

    function mkdfPortfolioVerticalLoopNextItem(portfolioVerticalLoopHolder, container){
        var navHolder = portfolioVerticalLoopHolder.find('.mkdf-pvl-navigation-holder'),
            navigation = navHolder.find('.mkdf-pvl-navigation');

        if (typeof navHolder.data('id') !== 'undefined' && navHolder.data('id') !== false) {
            var navItemId = navHolder.data('id');
        }

        if (typeof navHolder.data('next-item-id') !== 'undefined' && navHolder.data('next-item-id') !== false) {
            var navNextItemId = navHolder.data('next-item-id');
        }


        if (typeof portfolioVerticalLoopHolder.data('id') == 'undefined' || portfolioVerticalLoopHolder.data('id') !== false) {
            portfolioVerticalLoopHolder.data('id', navItemId);
        }

        if (typeof portfolioVerticalLoopHolder.data('next-item-id') == 'undefined' || portfolioVerticalLoopHolder.data('next-item-id') == false) {
            portfolioVerticalLoopHolder.data('next-item-id', navNextItemId);
        }

        var loadMoreInitialData = mkdf.modules.common.getLoadMoreData(portfolioVerticalLoopHolder),
            ajaxInitialData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreInitialData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more');

        $.ajax({
            type: 'POST',
            data: ajaxInitialData,
            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
            success: function (data) {
                var response = $.parseJSON(data),
                    responseHtml = response.html,
                    nextItemId = response.next_item_id;
                portfolioVerticalLoopHolder.data('next-item-id', nextItemId);

                var nextItem = $(responseHtml).find('.mkdf-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                container.append(nextItem);
            }
        });
    }

    function mkdfPortfolioVerticalLoopNavigation(portfolioVerticalLoopHolder){
        var navHolder = portfolioVerticalLoopHolder.find('.mkdf-pvl-navigation-holder'),
            navigation = navHolder.find('.mkdf-pvl-navigation'),
            loadMoreNavData = mkdf.modules.common.getLoadMoreData(navHolder);

        var ajaxDataNav = mkdf.modules.common.setLoadMoreAjaxData(loadMoreNavData, 'wilmer_core_portfolio_vertical_loop_ajax_load_more_navigation');

        $.ajax({
            type: 'POST',
            data: ajaxDataNav,
            url: mkdfGlobalVars.vars.mkdfAjaxUrl,
            success: function (data) {
                var response = $.parseJSON(data),
                    responseHtml = response.html,
                    nextItemId = response.next_item_id;

                navHolder.data('next-item-id', nextItemId);

                navHolder.html(responseHtml);
            }
        });
    }

})(jQuery);
(function($) {
    'use strict';
	
	var masonryGalleryList = {};
	mkdf.modules.masonryGalleryList = masonryGalleryList;

    masonryGalleryList.mkdfInitMasonryGallery = mkdfInitMasonryGallery;

    masonryGalleryList.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad());

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitMasonryGallery().init();
	}

    /**
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorMasonryGallery();
    }


    /**
     * Elementor
     */
    function mkdfElementorMasonryGallery(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_masonry_gallery.default', function() {
                mkdfInitMasonryGallery().init();
            } );
        });
    }

	/**
	 * Masonry gallery, init masonry and resize pictures in grid
	 */
	function mkdfInitMasonryGallery() {
		var holder = $('.mkdf-masonry-gallery-holder');
		
		var initMasonryGallery = function (thisHolder, size) {
			thisHolder.waitForImages(function () {
				var masonry = thisHolder.children();
				
				masonry.isotope({
					layoutMode: 'packery',
					itemSelector: '.mkdf-mg-item',
					percentPosition: true,
					packery: {
						gutter: '.mkdf-mg-grid-gutter',
						columnWidth: '.mkdf-mg-grid-sizer'
					}
				});
				
				mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
				
				setTimeout(function () {
					mkdf.modules.common.mkdfInitParallax();
				}, 600);
				
				masonry.isotope( 'layout').css('opacity', '1');
			});
		};
		
		var reInitMasonryGallery = function (thisHolder, size) {
			mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
			
			thisHolder.children().isotope('reloadItems');
		};
		
		return {
			init: function () {
				if (holder.length) {
					holder.each(function () {
						var thisHolder = $(this),
							size = thisHolder.find('.mkdf-mg-grid-sizer').outerWidth();
						
						initMasonryGallery(thisHolder, size);
						
						$(window).resize(function () {
							reInitMasonryGallery(thisHolder, size);
						});
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
    'use strict';

    var testimonialsCarousel = {};
    mkdf.modules.testimonialsCarousel = testimonialsCarousel;

    testimonialsCarousel.mkdfInitTestimonials = mkdfInitTestimonialsCarousel;


    testimonialsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitTestimonialsCarousel();
        mkdfElementorTestimonialsCarousel();
    }

    /**
     * Elementor
     */
    function mkdfElementorTestimonialsCarousel(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_testimonials.default', function() {
                mkdf.modules.common.mkdfOwlSlider();
            } );
        });
    }

    /**
     * Init testimonials shortcode elegant type
     */
    function mkdfInitTestimonialsCarousel(){
        var testimonial = $('.mkdf-testimonials-holder.mkdf-testimonials-carousel');

        if(testimonial.length){
            testimonial.each(function(){
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.mkdf-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.mkdf-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false,
                    items = 2;

                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if(mkdf.windowWidth < 680){
                    mouseDrag = true;
                }

                if (mainTestimonialsSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: items,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        responsive: {
                            0: {
                                items: 1,
                                margin: 0,
                                stagePadding: 0,
                                center: false,
                                autoWidth: false
                            },
                            681: {
                                items: 1,
                                margin: 0
                            },
                            769: {
                                items: 1,
                                margin: 0
                            }
                        },
                        onInitialize: function () {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });

                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function () {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });

                    imagePagSlider.find('.owl-item').on('click touchpress', function (e) {
                        e.preventDefault();

                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;

                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });

                }
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var testimonialsVertical = {};
    mkdf.modules.mkdfInitTestimonialsVertical = mkdfInitTestimonialsVertical;

    testimonialsVertical.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    $(window).on('load', mkdfOnWindowLoad());

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitTestimonialsVertical();
    }

    /**
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfElementorTestimonialsVertical();
    }

    /**
     * Elementor
     */
    function mkdfElementorTestimonialsVertical(){
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/mkdf_testimonials.default', function() {
                mkdfInitTestimonialsVertical();
            } );
        });
    }

    /**
     * Initializes testimonials vertical logic
     */

    function mkdfInitTestimonialsVertical() {
        var holders = $('.mkdf-testimonials-holder.mkdf-testimonials-vertical-scroll');

        if(holders.length) {
            holders.each(function(){
                var holder = $(this),
                    swiperInstance = holder.find('.swiper-container'),
                    singleItem = holder.find('.mkdf-testimonial-content'),
                    maxHeight = 0,
                    dataHolder = holder.find('.mkdf-testimonials'),
                    loop = true,
                    delay = 5000,
                    speed = 300,
                    navigation = false,
                    pagination = false;

                var calcHeight = function() {
                    singleItem.each(function(){
                        var ofset = 70;
                        var thisImgHeight = $(this).find('.mkdf-testimonial-image').height();
                        var thisTextHeight = $(this).find('.mkdf-testimonial-text-holder').height();
                        if (thisImgHeight > thisTextHeight) {
                            if(thisImgHeight > maxHeight) {
                                maxHeight = thisImgHeight + ofset;
                            }
                        } else {
                            if(thisTextHeight > maxHeight) {
                                maxHeight = thisTextHeight + ofset;
                            }
                        }
                        if(mkdf.windowWidth <= 768){
                            maxHeight = thisImgHeight + thisTextHeight + ofset;
                        }
                        $('.swiper-container-vertical').css('height', maxHeight, 'important');
                    });

                    return maxHeight;
                }
                
                var wrapperHeight = function () {
                    swiperInstance.css('height', calcHeight());
                }
                wrapperHeight();

                if( typeof(dataHolder.data('enable-loop')) !== 'undefined' && dataHolder.data('enable-loop') !== false ){
                    if(dataHolder.data('enable-loop') === 'no'){
                        loop = false;
                    }
                }

                if( typeof(dataHolder.data('slider-speed')) !== 'undefined' && dataHolder.data('slider-speed') !== false){
                    delay = dataHolder.data('slider-speed');
                }

                if( typeof(dataHolder.data('enable-autoplay')) !== 'undefined' && dataHolder.data('enable-autoplay') !== false){
                    if(dataHolder.data('enable-autoplay') === 'no'){
                        delay = 1000000;
                    }
                }

                if( typeof(dataHolder.data('slider-speed-animation')) !== 'undefined' && dataHolder.data('slider-speed-animation') !== false){
                    speed = dataHolder.data('slider-speed-animation');
                }

                if( dataHolder.data('enable-navigation') === 'yes'){
                    navigation = {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    };
                }
                if( dataHolder.data('enable-pagination') === 'yes'){
                    pagination = {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    };
                }


                var swiperSlider = new Swiper (swiperInstance, {
                    loop: loop,
                    autoplay: {
                        delay: delay,
                    },
                    direction: 'vertical',
                    slidesPerView: 1,
                    speed: speed,
                    pagination: pagination,
                    navigation: navigation,
                    autoHeight: true,
                    // slideToClickedSlide: true,
                    // Responsive breakpoints
                    // breakpoints: {
                    //     // when window width is <= 768px

                    //     768: {
                    //         slidesPerView: 1,
                    //     },
                    // },
                    init: false
                });

                swiperSlider.on('slideChange', function() {
                });

                swiperSlider.on('transitionEnd', function() {
                });


                holder.waitForImages(function() {
                    swiperSlider.init();
                });

                $(window).on('resize', function() {
                });
            });
        }
    }

})(jQuery);