$(window).load(function() {

	var hidePrevControl = function(thisId) {
		$("#" + thisId).find(".flex-prev").hide();
		$("#" + thisId).find(".flex-next").css("left", "0")
		$("#" + thisId).find(".flex-next").css("width", "100%")
	}
	
	var showPrevControl = function(thisId) {
		$("#" + thisId).find(".flex-prev").show();
        $("#" + thisId).find(".flex-next").css("left", "50%")
		$("#" + thisId).find(".flex-next").css("width", "50%")
	}
		
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: false,
		controlNav: false,
		touch: false,
		prevText: "",
		nextText: "",
        start: function(slider) { // Fires when the slider loads the first slide
          var slide_count = slider.count - 1;
          var parentId = $(slider).parent().attr('id');

		  hidePrevControl(parentId);
		  
          $(slider)
            .find('img.lazy:eq(0)')
            .each(function() {
              var src = $(this).attr('data-src');
              $(this).attr('src', src).removeAttr('data-src');
            });
        },
                before: function(slider) { // Fires asynchronously with each slider animation
                  	var parentId = $(slider).parent().attr('id');
			//console.log($('#' + parentId).hasClass('wasSeen'))
                  	if (slider.animatingTo === 0 && $('#' + parentId).hasClass('wasSeen') == false) {                	
                  		hidePrevControl(parentId);
                  	} else {
                  		showPrevControl(parentId);
				  }
                  	var slides     = slider.slides,
                      	index      = slider.animatingTo,
                      	$slide     = $(slides[index]),
                      	$img       = $slide.find('img[data-src]'),
                      	current    = index + slider.cloneOffset,
                      	nxt_slide  = current + 1,
                      	prev_slide = current - 1;
			if(current == 19) {
				$('#' + parentId).addClass('wasSeen');
			}
                  	$slide
                    		.parent()
                    		.find('img.lazy:eq(' + current + '), img.lazy:eq(' + prev_slide + '), img.lazy:eq(' + nxt_slide + ')')
                    		.each(function() {
                      		  	var src = $(this).attr('data-src');
                      		  	$(this).attr('src', src).removeAttr('data-src');
                    	    	});
                }
	});
	
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				//$('html,body').scrollTop(target.offset().top);
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					$('#nav-trigger').trigger('click');
					$('#navigation').stop().animate({ width: 0}, 200);
					$('#site-wrap').stop().animate({ left: 0}, 200);
					$('#nav-trigger').removeClass('open');
				});
			}
		}
	});
	
});

$(document).ready(function() {
	
	$('.nav-item').hover(function() {
		$(this).find('span').stop().animate({width: '100%'}, 200);
	}, function() {
		$(this).find('span').stop().animate({width: '0%'}, 200);
	});
	
	$('#nav-trigger').click(function() {
		var toggleWidth = $("#navigation").width() == 0 ? "340px" : "0px";
		$('#navigation').stop().animate({ width: toggleWidth }, 200);
		$('#site-wrap').stop().animate({ left: toggleWidth }, 200);
		$(this).toggleClass('open');
	});
	
});