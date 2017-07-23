/* globals $:false, SliderFull */

$(document).ready(function() {
	new SliderFull($(".home .sliderFull"));

	$('#testimony .cta').click( function() {
		$('.popin_testimony').fadeIn();
		$('body').css({ overflow :'hidden'}) ;
		$(window).resize();
	});

	$('.popin_testimony .close').click( function() {
		$('.popin_testimony').fadeOut( function() {
			$('body').css({ overflow :''}) ;
		});
	});

	$('.popin_testimony .bloc_content').scroll(function() {
		var scrollValue = $(this).scrollTop();
		$(this).find('.float1').css({ y: -scrollValue/15 });
		$(this).find('.float2').css({ y: (scrollValue -800 )/20 });
	});
});