/* global console */
/* globals $:false */

'use strict';
var freezeVp = function(e) {
	e.preventDefault();
};

function stopViewportScrolling (bool) {
	if (bool === true) {
		document.body.addEventListener("touchmove", freezeVp, false);
	} else {
		document.body.removeEventListener("touchmove", freezeVp, false);
	}
}

// function isValidMail( email) {
// 	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(email);
// }

function isValidName( str ) {
	if( str.match( /[0-9]/ ) || str.length < 2 ) return false;
	return true;
}

var SliderFull = function( el ) {
	var that = this;
	var slider = el;
	var slides = slider.find('.slide');
	var mask = slider.find('.mask1');
	var mask2 = slider.find('.mask2');
	// var nbSlides = slides.length;
	var puces =  slider.find('.puces .puce');
	var currentIndex = 0;

	puces.click(function() {
		if( !$(this).hasClass('active') ) {
			that.setSlide($(this).data('index'));
		}
	});

	that.resizeSlideImg = function( slide ) {
		var container = slide.find('.image');
		if( !container.hasClass('coverImg') ) {
			return;
		}
		var cw = slider.width();
		var ch = slider.height();
		
		var img = container.find('img');
		var ratioImg = img[0].naturalWidth / img[0].naturalHeight;
		var ratioContainer = cw / ch;

		if( ratioContainer > ratioImg ) {
			var height = cw / ratioImg;
			img.css({ height: height, width : cw, x: 0, y: ( ch - height ) / 2  });
		} else {
			var width = ch * ratioImg;
			img.css({ height: ch, width : width, x: ( cw - width ) / 2 , y: 0 });
		}
	};

	this.setSlide = function( index ) {
		
		if( index > currentIndex ) {
			
			slides.eq( currentIndex ).stop(true).transition({ x: "-10%" }, 500, "easeInQuad" );
			mask2.css({ x: '100%'}).stop(true).transition({ x: 0, delay: 100 }, 400, "easeInQuad", function() {
				slides.eq( currentIndex ).hide();
				slides.eq( index ).show().css({ x: "10%"}).stop(true).transition({ x: 0 }, 600, "easeOutQuart" );
				that.resizeSlideImg( slides.eq( index ) );
				currentIndex = index;
				puces.filter('.active').removeClass('active');
				puces.eq(index).addClass('active');
				mask.css({ x: 0}).transition({ x: '-100%', delay: 70 }, 400, "easeOutQuad");
				mask2.transition({ x: '-100%' , delay: 0 }, 400, "easeOutQuad");		
			});
			
		} else {

			slides.eq( currentIndex ).stop(true).transition({ x: "10%" }, 500, "easeInQuad" );
			mask2.css({ x: '-100%'}).stop(true).transition({ x: 0, delay: 100 }, 400, "easeInQuad", function() {
				slides.eq( currentIndex ).hide();
				slides.eq( index ).show().css({ x: "-10%"}).stop(true).transition({ x: 0 }, 600, "easeOutQuart" );
				that.resizeSlideImg( slides.eq( index ) );
				puces.filter('.active').removeClass('active');
				puces.eq(index).addClass('active');
				currentIndex = index;
				mask.css({ x: 0}).transition({ x: '100%', delay: 70 }, 400, "easeOutQuad");
				mask2.transition({ x: '100%' , delay: 0 }, 400, "easeOutQuad");		
			});

		}
	};
};

var ZoomSlider = function( title_str, list, index ) {
	var that = this;
	var el = $('#zoomSlider').clone();
	el.find('.title').html( title_str );
	var slider = el.find('.slider').empty();
	var close = el.find('.close');
	var currentIndex = index || 0;
	var prevBtn = el.find('.arrow.left');
	var nextBtn = el.find('.arrow.right');
	var processing = false;

	close.click( function() {
		el.fadeOut( function() {
			el.remove();
			$('body').css({ overflow: 'auto'});
			stopViewportScrolling(false);
		});
	});

	$(list).each(function(index, item) {
		var slide = $('<div class="slide"></div>').appendTo(slider);
		var legend = $('<div class="legend">'+ item.legend +'</div>').appendTo(slide);
		var visu = $('<div class="visu"></div>').appendTo(slide);
		visu.css({ "background-image" : "url('"+item.visu+"')" });
		slide.css({x: ((index==currentIndex)?0:100)+'%' });
	});

	var slides = slider.find('.slide');

	this.setIndex = function( index, toLeft ) {

		if( processing ) {
			return;
		}
		processing = true;

		if( !toLeft && index >= slides.length ) {
			index = 0;
		}
		else if ( toLeft && index < 0 ) {
			index = slides.length - 1;
		}

		if( toLeft ) {
			slides.eq(currentIndex).stop(true).transition({ x: '100%'}, 700, 'easeInOutQuart');
			slides.eq(index).css({ x: '-100%' }).stop(true).transition({ x: 0 }, 700, 'easeInOutQuart');
		} else {
			slides.eq(currentIndex).stop(true).transition({ x: '-100%'}, 700, 'easeInOutQuart');
			slides.eq(index).css({ x: '100%' }).stop(true).transition({ x: 0 }, 700, 'easeInOutQuart');
		}

		setTimeout( function() {
			processing = false;
		}, 750 );

		currentIndex = index;
	};

	if( list.length > 1 ){
		el.find('.arrow').mouseover( function() {
			$(this).addClass('over');
		}).mouseout( function() {
			$(this).removeClass('over');
		}).click( function() {
			if( $(this).hasClass('right') ) {
				that.setIndex(currentIndex + 1, false);
			}
			else {
				that.setIndex(currentIndex - 1, true);
			}
		});
	} else {
		prevBtn.hide();
		nextBtn.hide();
	}

	el.appendTo( $('body') );
	$('body').css({ overflow: 'hidden'});
	stopViewportScrolling(true);
	el.fadeIn();
};


var photoZoom = function( title_str, image, legend  ) {
	var that = this;
	var el = $('#zoomSlider').clone();
	el.find('.title').html( title_str );
	var slider = el.find('.slider').empty();
	var close = el.find('.close');
	var prevBtn = el.find('.arrow.left').hide();
	var nextBtn = el.find('.arrow.right').hide();

	close.click( function() {
		el.fadeOut( function() {
			el.remove();
			$('body').css({ overflow: 'auto'});
			stopViewportScrolling(false);
		});
	});
	
	var slide = $('<div class="slide"></div>').appendTo(slider);
	var legend = $('<div class="legend">'+legend+'</div>').appendTo(slide);
	var visu = $('<div class="visu"></div>').appendTo(slide);
	visu.css({ "background-image" : "url('"+image+"')" });

	
	el.appendTo( $('body') );
	$('body').css({ overflow: 'hidden'});
	stopViewportScrolling(true);
	el.fadeIn();
};

function sort_blocks(a, b){
	return ($(b).data('top')) > ($(a).data('top')) ? -1 : 1;	
}

$(document).ready( function() {

	var w = $(window);
	var	ww, wh;

	$('body').on( 'mouseover', '.rollable', function() {
		$(this).addClass('over');
	}).on( 'mouseout', '.rollable', function() {
		$(this).removeClass('over');
	});

	$('header .langs').click(function(e) {
		$(this).toggleClass('opened');
	});

	$('#visio .toggleBtn').click(function() {
		$(this).parent().toggleClass('opened');
	})

	$('#visio .trashBtn').click(function() {
		$.ajax({
            url: "_ws.php",
            data: { action : "trashVisio" },
            type: 'POST',
            success: function(response) {
               if( response == 'OK' ) {
               		$('#visio .content .medias').empty();
               		$('#visio').removeClass('opened');
               } 
            }
        });
	})

	$('body').on( 'click', '#visio .medias .media .removeBtn', function() {
		var media = $(this).parent();
		var fileId = media.data('id');
		
		var data = {
            'picture': fileId,
            'action': 'removeItem'
        };

        $.ajax({
            url: "_ws.php",
            data: data,
            type: 'POST',
            success: function(response) {
               if( response == 'OK' ) {
               		media.remove();
               } 
            }
        });
	});

	// $('#newsletter #newsform .cta').click(function() {
	// 	var email = $('#newsletter #newsform input[name=email]').val();
	// 	var name = $('#newsletter #newsform input[name=lastname]').val();
    //
	// 	if( name != '' ) {
	// 		return;
	// 	}
    //
	// 	if( !isValidMail( email ) ){
	// 		$('#newsletter #newsform input[name=email]').addClass('error');
	// 		$('#newsletter #newsform .message.wrong').show();
	// 	} else {
	// 		$('#newsletter #newsform input[name=email]').removeClass('error');
	// 		$('#newsletter #newsform .message.wrong').hide();
	// 		$('#newsletter #newsform .cta').unbind('click').css({ opacity: .2 });
	// 	}
	// });

	var hiddenBlocks = $('.hiddenBlock');
	var hasHiddenBlocks = false;
	var scrollables = $('.bg-scroll');

	w.scroll(function(e) {

		var scrollValue = w.scrollTop();
		
		// SHOW HIDDEN BLOCKS
		if( hiddenBlocks.length > 0 ) {
			var keepShowing = true;
			var count = 0;
			while( keepShowing ) {
				if( hiddenBlocks.length > 0 && hiddenBlocks.first().data( 'top' ) - scrollValue - wh < 0 ) {
					hiddenBlocks.first().addClass('visible');
					hiddenBlocks.splice(0,1);					
				} else {
					keepShowing = false;
				}
			}
		}

		if( !hasHiddenBlocks ) {
			hiddenBlocks.addClass('hidden');
			hasHiddenBlocks = true;
		}
		
		// SHOW HIDDEN BLOCKS
		if( scrollables.length > 0 ) {
			for( var i = 0; i< scrollables.length; ++i ){
				var scrollable = scrollables.eq(i);
				var Stop = scrollable.data('top');
				var Sheight = scrollable.data('height');

				if( scrollValue > Stop - wh && scrollValue < Stop - wh + Sheight + wh ) {
					var ratio = ( scrollValue - Stop + wh ) / ( wh + Sheight );
					scrollable.find('.bg').css({ y: ratio * 20 +"%" });
				}
			}			
		}

	});

	$(window).click( function() {
		$(window).trigger('clickOut');
	});

	$('.menu-drop').each( function() {
		var container = $(this);
		var drop = container.find('.dropbox');		
		var list = drop.find('.sublinks');	

		drop.click(function(event) {
			event.stopPropagation();
		});

		var btn = container.find('a');
		var opened = false;
				
		btn.click(function(event) {			
			if( opened ) {
				$(window).trigger('clickOut');
				event.stopPropagation();
				opened = false;
				container.removeClass('opened');
				drop.hide();
			} else {
				$(window).trigger('clickOut');
				event.stopPropagation();
				opened = true;
				container.addClass('opened');
				drop.show();
			}
		});

		$(window).on('clickOut', function() {
			if( opened ) {
				drop.hide();
				opened = false;
				container.removeClass('opened');
			}
		});
	});

	$('.modele-drop').each( function() {
		var btn = $(this);
		var data = btn.data('dropbox');
		var drop = $('header .modele-dropbox[data-dropbox='+data+']');		

		drop.click(function(event) {
			event.stopPropagation();
		});

		var opened = false;
				
		btn.click(function(event) {			
			if( opened ) {
				$(window).trigger('clickOut');
				event.stopPropagation();
				opened = false;
				btn.removeClass('opened');
				drop.removeClass('visible');
				$('body').css({ overflow: ''});
				stopViewportScrolling(false);
			} else {
				$(window).trigger('clickOut');
				event.stopPropagation();
				opened = true;
				btn.addClass('opened');
				drop.addClass('visible');
				$('body,html').animate({ scrollTop: 0 });
				$('body').css({ overflow: 'hidden'});
				stopViewportScrolling(true);
			}
		});

		$(window).on('clickOut', function() {
			if( opened ) {
				opened = false;
				btn.removeClass('opened');
				drop.removeClass('visible');
				$('body').css({ overflow: ''});
				stopViewportScrolling(false);
			}
		});
	});

	$('header .mobileBtn').click(function() {
		$('#navMobile').addClass('visible');
		$('body').css({ overflow: 'hidden'});
		stopViewportScrolling(true);
	});

	$('#navMobile .close').click(function() {
		$('#navMobile').removeClass('visible');
		$('body').css({ overflow: ''});
		stopViewportScrolling(false);
	});

	$('#navMobile .modeleBtn').click(function() {
		if( $(this).hasClass('sail') ){
			$('#navMobile .modeles.sail').addClass('visible');
		}else {
			$('#navMobile .modeles.motor').addClass('visible');
		}
	});

	$('#navMobile .modeles .back').click(function() {
		$('#navMobile .modeles').removeClass('visible');
	});


	$('header .search').click(function() {
		$("#searchLayer").fadeIn();
		$('body').css({ overflow: 'hidden'});
		stopViewportScrolling(true);		
	});

	$('#searchLayer .close').click(function() {
		$("#searchLayer").fadeOut();
		$('body').css({ overflow: ''});
		stopViewportScrolling(false);		
	});

	var coverImg = $('.coverImg');

	var resizeImagesTimeout;
	var resizeImages = function() {
		coverImg.each( function( index, item ){
			var container = $(item);
			var cw = container.width();
			var ch = container.height();
			
			var img = container.find('img');
			var ratioImg = img[0].naturalWidth / img[0].naturalHeight;
			var ratioContainer = cw / ch;


			if( ratioContainer > ratioImg ) {
				var height = cw / ratioImg;
				img.css({ height: height, width : cw, x: 0, y: ( ch - height ) / 2  });
			} else {
				var width = ch * ratioImg;
				img.css({ height: ch, width : width, x: ( cw - width ) / 2 , y: 0 });
			}
		});
	};

	w.resize(function(){ 
		ww = w.width();
		wh = w.height();
		
		hiddenBlocks.each( function( index, item ){
			$(item).data('top', $(item).offset().top );
		});

		hiddenBlocks.sort( sort_blocks );


		scrollables.each( function( index, item ){
			$(item).data('top', $(item).offset().top );
			$(item).data('height', $(item).height() );
		});

		scrollables.sort( sort_blocks );
		
		clearTimeout( resizeImagesTimeout );
		resizeImages();
		resizeImagesTimeout = setTimeout( resizeImages, 1000 );

		w.scroll();
	});

	var page_loaded = false;

	w.load( function() {
		page_loaded = true;
		w.resize();
	});

	w.resize();

	var loading_Int = setInterval( function() {
		if( page_loaded ) {
			clearInterval( loading_Int );
			return;
		}
		w.resize();
	}, 1000);


	

});
