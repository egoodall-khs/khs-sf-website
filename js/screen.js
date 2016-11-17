jQuery.noConflict();

jQuery(document).ready(function() {

	/* Font Replacement */
	Cufon.replace('h1, h2:not(.post-title), h3, h4, h5, h6, .meta, .dropcap, .dropcap-bg, .question, .commenter, .button-big, .button-big-unselected, .bar-info-box', { hover: true });
	Cufon.replace('#sub-header-content h2, .title, .portfolio-browse, .post-title, .related-posts-title', { fontFamily: 'Sansation Light', hover: true });	


	/* Dropdown menu using superfish */
	jQuery('.nav').supersubs({
		minWidth: 12,
		maxWidth: 25,
		extraWidth: 1
	}).superfish({
		delay: 1000,
		animation: { opacity: 'show', height: 'show' },
		speed: 'fast',
		autoArrows: false 
	})
	.find('ul')
	.bgIframe({ 
		opacity: false 
	});


	/* Quicksand animation and filtering of the Portfolio */
	var $data = jQuery(".portfolio1-list").clone();

	jQuery('.portfolio-filters li').click(function(e) {

		jQuery(".portfolio-filters li a").addClass("button-unselected");
		jQuery(".portfolio-filters li a").removeClass("button");	

		jQuery(".portfolio1-list span.lightbox-image").remove();	
		jQuery(".portfolio1-list span.lightbox-video").remove();	

		var filterClass = jQuery(this).attr('class');

		if (filterClass == 'all') {
			var $filteredData = $data.find('.portfolio-item');
		} else {
			var $filteredData = $data.find('.portfolio-item[data-type=' + filterClass + ']');
		}

		jQuery('.portfolio1-list').quicksand($filteredData, {
			duration: 800,
			easing: 'easeInOutQuad',
			adjustHeight: 'dynamic',
			enhancement: function() {
				if(jQuery.browser.mozilla || jQuery.browser.opera) {
					// FIX for FF and Opera rounded corners
					jQuery('.portfolio-item img').addClass('rounded-top');

					// FF and Opera rounded corners of images
					jQuery('.portfolio-item img.rounded-top').rounded();
				}
			}
		}, function(){
			// end callback
			SetLightbox(true);
		});

		jQuery(this).children('a').removeClass("button-unselected");
		jQuery(this).children('a').addClass("button");

		return false;
	});


	/* Ajax Contact form validation and submit */
	jQuery('form#contactForm').submit(function() {
		jQuery('form#contactForm .error').remove();
		var hasError = false;
		jQuery('.requiredField').each(function() {
			if(jQuery.trim(jQuery(this).val()) == '') {
				jQuery(this).addClass('input-error');
				hasError = true;
			} else if(jQuery(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(jQuery.trim(jQuery(this).val()))) {
					jQuery(this).addClass('input-error');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			jQuery('form#contactForm #submit').fadeOut('normal', function() {
				jQuery('.sending-message').show('normal');
			});
			var formInput = jQuery(this).serialize();
			jQuery.ajax({
				type: "POST",
				url: jQuery(this).attr('action'),
				data: formInput,
				success: function(data){
					jQuery('#contact-form').fadeOut("normal", function() {
						jQuery('.success-sending-message').show('normal');
					});
				},
				error: function(data){
					jQuery('#contact-form').fadeOut("normal", function() {
						jQuery('.error-sending-message').show('normal');
					});
				}
			});
		}
		
		return false;
		
	});
	
	jQuery('.requiredField').blur(function() {
		if(jQuery.trim(jQuery(this).val()) != '' && !jQuery(this).hasClass('email')) {
			jQuery(this).removeClass('input-error');
		} else {
			jQuery(this).addClass('input-error');
		}
	});
	
	jQuery('.email').blur(function() {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(emailReg.test(jQuery.trim(jQuery(this).val()))) {
			jQuery(this).removeClass('input-error');
		} else {
			jQuery(this).addClass('input-error');
		} 
	});	
		
	
	/* Search Watermark */
	var watermark = "search...";
	if (jQuery("#sub-header-search .search").val() == "") {
		jQuery("#sub-header-search .search").val(watermark);
	}
	
	jQuery("#sub-header-search .search")
		.focus(	function() {
			if (this.value == watermark) {
				this.value = "";
			}
		})
		.blur(function() {
			if (this.value == "") {
				this.value = watermark;
			}
		});

});


/* After the page has loaded... */
jQuery(window).load(function() {
	
	/* Home page slider */
	jQuery('#slider').nivoSlider({
		effect:'random', //Specify sets like: 'fold,fade,sliceDown'
		slices:3,
		animSpeed:500,
		pauseTime:8000,
		startSlide:0, //Set starting Slide (0 index)
		directionNav:false, //Next & Prev
		directionNavHide:true, //Only show on hover
		controlNav:true, //1,2,3...
		controlNavThumbs:false, //Use thumbnails for Control Nav
		controlNavThumbsFromRel:false, //Use image rel for thumbs
		controlNavThumbsSearch: '.jpg', //Replace this with...
		controlNavThumbsReplace: '_thumb.jpg', //...this in thumb Image src
		keyboardNav:true, //Use left & right arrows
		pauseOnHover:true, //Stop animation while hovering
		manualAdvance:false, //Force manual transitions
		captionOpacity:1, //Universal caption opacity
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){} //Triggers after all slides have been shown
		
	});
	
	/* Inner page sliders */
	jQuery('.slider').nivoSlider({
		effect:'random', //Specify sets like: 'fold,fade,sliceDown'
		slices:10,
		animSpeed:500,
		pauseTime:6000,
		startSlide:0, //Set starting Slide (0 index)
		directionNav:false, //Next & Prev
		directionNavHide:true, //Only show on hover
		controlNav:false, //1,2,3...
		controlNavThumbs:false, //Use thumbnails for Control Nav
		controlNavThumbsFromRel:false, //Use image rel for thumbs
		controlNavThumbsSearch: '.jpg', //Replace this with...
		controlNavThumbsReplace: '_thumb.jpg', //...this in thumb Image src
		keyboardNav:false, //Use left & right arrows
		pauseOnHover:true, //Stop animation while hovering
		manualAdvance:false, //Force manual transitions
		captionOpacity:1, //Universal caption opacity
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){} //Triggers after all slides have been shown
		
	});
	
	/* Insert the footer of the inner page sliders using javascript */
	jQuery('.slider').after('<div class="slider-footer"></div>');
	
	/* Rounded images for FF and Opera */
	jQuery('img.rounded-all, img.rounded-top, img.rounded-bottom').rounded();	
	
	/* Apply lightbox */
	SetLightbox(false);
	
});


function SetLightbox($load) {
	
	/* Display a open icon when mouse hover lightbox images */
	jQuery("a[rel^='lightbox'] img").each( function() {   
		
		if ($load) {
			jQuery(this).load(function() {
				SetPlayIcon(jQuery(this));
			});
		} else {
			SetPlayIcon(jQuery(this));			
		}
		
	});

	/* PrettyPhoto */
	jQuery("a[rel^='lightbox']").prettyPhoto({
		theme: 'light_rounded'
	});
	
	
	/* Reduce opacity when mouse hover lightbox images */
	jQuery("a[rel^='lightbox'] img").hover(function() {
		jQuery(this).stop().fadeTo("normal", 0.5); // This sets the opacity to 60% on hover
	},function(){
		jQuery(this).stop().fadeTo("normal", 1.0); // This sets the opacity back to 100% on mouseout
	});
	

	/* FF and Opera mouse over of SPAN instead of a IMG */	
	jQuery("a[rel^='lightbox'] span.rounded-all, a[rel^='lightbox'] span.rounded-top, a[rel^='lightbox'] span.rounded-bottom").live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			jQuery(this).stop().fadeTo("normal", 0.5); // This sets the opacity to 60% on hover
		} else {
			jQuery(this).stop().fadeTo("normal", 1.0); // This sets the opacity back to 100% on mouseout
		}
	});

}

function SetPlayIcon($element){
	
	var $lightbox = $element.parent("a[rel^='lightbox']");
	var $image = $element;
	
	/* FF and Opera image parent may be a SPAN tag to apply rounded corners */
	if ($lightbox.length == 0) {
		$lightbox = $element.parent().parent("a[rel^='lightbox']");
		$image = $element.parent();
	}
	
	$image.css("position", "relative");

	var $class = '';

	if($lightbox.attr('href').match(/(jpg|gif|jpeg|png|tif)/)) {
		$class = 'lightbox-image';
	} else {
		$class = 'lightbox-video';
	}

	if ($image.length > 0) {
		var $span = jQuery("<span class='" + $class + "'></span>").appendTo($lightbox);

		$image.bind('mouseenter', function(){
			$height = $image.height();
			$width = $image.width();
			$pos =  $image.position();
			$span.css({
				height:$height,
				width:$width,
				top:$pos.top,
				left:$pos.left
			});
		});
	}
}


/* This applies rounded corners to images in FF and Opera (FF 4.0 won't need this hack) */
(function($){  
	$.fn.extend({   
	
		rounded: function() {  

			return this.each(function() {  
	
				var $element = $(this);
				var _class = $(this).attr('class');
				
				$element.show();
				
				if($.browser.mozilla || $.browser.opera) {
					$element.wrap(function() {
						return '<span style="background-image:url(' + $element.attr('src') + '); height: ' + $element.height() + 'px; width: ' + $element.width() + 'px;" class="' + _class + '" />';
					}).hide();
				}
			});
		}
	});
})(jQuery);  