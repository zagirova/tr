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