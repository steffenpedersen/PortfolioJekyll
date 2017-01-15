// When the site is loaded - to be sure
$( document ).ready(function() {

$(function() {
	smoothScroll(600);
	workBelt();
  workLoad();
	projectAnimation();
	textVal();
	$("#preloader .name").fitText(1, { minFontSize: '72px', maxFontSize: '92px' });
	$("#intro h1").fitText(1, { minFontSize: '72px', maxFontSize: '92px' });
	$("h2.project-title").fitText(1, { minFontSize: '42px', maxFontSize: '52px' });
	menu();
});

});
/******************
Adds The Preloader
******************/
window.addEventListener('load', function(){
	setTimeout(function(){
	  $('#preloader').fadeOut('slow', function () {
	  });
	},600);
});
/******************************
This Is The Left Hamburger Menu
It Also Adds No Scroll
******************************/
function menu() {

	$(".js-toggleSidebar").click(function(event){
			$(".header-menu").toggleClass("menu-closed");
			$("html").toggleClass("no-scroll");
			$(".menu-overlay").fadeToggle(320);
			$('.bar').toggleClass('animate');
			event.preventDefault();
	});
	$(".menu-overlay").click(function(event){
			$(".header-menu").toggleClass("menu-closed");
			$("html").toggleClass("no-scroll");
			$(".menu-overlay").fadeToggle(320);
			$('.bar').toggleClass('animate');
			event.preventDefault();
	});

}
/************************
This Is For Smooth Scrool
************************/
function smoothScroll (duration) {

	$('a[href^="#"]').on('click', function(event) {
	    var target = $( $(this).attr('href') ); // this specific object

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});

}
/***************************************
This Adds Scroll/Slide At The Projects
***************************************/
function workBelt() {

  $(".trigger").remove();
  $(".return").remove();

  $('.thumb-container ul li .thumb-unit').click(function() {
    $('.work-belt').addClass("slided");
    $('.work-container').show();
		window.location.replace('#work');
  });

  $('.work-return').click(function() {
    $('.work-belt').removeClass("slided");
    $('.work-container').hide(800);
  });

}
/*********************************
This Loads The Projects With AJAX
*********************************/
function workLoad() {

  $.ajaxSetup({ cache: false });

  $('.thumb-container li').click(function() {
    var $this = $(this), // this specific object
				newNumber = $this.find('span.number').text(),
        newTitle = $this.find('span.title').text(),
        newFolder = $this.find('.thumb-unit').data('folder'),
        spinner = '<div class="loader">Loading...</div>',
        newHTML = 'work/'+ newFolder + '.html',
				newColor = $this.find('.thumb-unit').data('color');

    $('.project-load').html(spinner).load(newHTML);
		$('.project-title span.title').text(newTitle);
    $('.project-title span.number').text(newNumber);
		$('.project-title span.number').css('color', '#' + newColor);
		$('.work-return').css('border-color', '#' + newColor);
  });

}

/************************************
This Is Text Validation For The Form
************************************/

function textVal() {

  $('.contact-form .input-group input, .contact-form .input-group textarea').focusout(function(){
    var text_val = $(this).val();

    if(text_val === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }

  });
}

/************************************
Just A Small Animation With Timeout
************************************/
function projectAnimation() {

	$('.fadeOpacity').each(function(i){
		setTimeout(function(){
			$('.fadeOpacity').eq(i).addClass('is-visible');
		}, 125 * i); // milliseconds
	});

}
/************************************
*************************************
*************************************
************** FitText **************
*************************************
*************************************
************************************/
(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
/************************************
*************************************
*************************************
**** Checks If Element Is In View ***
*************************************
*************************************
************************************/
(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function(event) {

  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });

});
