function slider(t,speed,start,e) {
	t.find('.container').empty();
	t.find('.prev, .next, .pagination').remove();
	t.find('.container').html(t.find('.temp').html());
	t.find('.container, .container > div').width(t.width());
	t.slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: e,
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		fadeSpeed: 250,
		play: speed,
		pause: 2500,
		autoHeight: false,
		start: start
	});
	t.bind('swipeleft', function() {
		t.find('.next').trigger('click');
	});
	t.bind('swiperight', function() {
		t.find('.prev').trigger('click');
	});
	t.find('.text').css({
		'padding-top': (t.height()-t.find('.text').innerHeight())/2+'px'
	});
}
function tableScroll() {
	var t = $('.vitrina .table');
	var table = t.find('table');
	var prev = t.find('.prev');
	var next = t.find('.next');
	var diff = table.width()-t.width();
	if ( diff < t.width() ) {
		var step = diff;
	} else {
		var step = t.width();
	}
	/*table.css({
		'margin-left': '0'
	});
	table.find('.pic').css({
		'-webkit-transform': 'translateX(0)',
		'transform': 'translateX(0)'
	});*/
	t.removeClass('to-left').addClass('to-left').removeClass('to-right');
	var mleft = 0;
	function pos(c) {
		var a = table.find('th:first-child').width()+parseInt(table.find('td:nth-child(2)').css('padding-left'));
		if ( c > a ) {
			var x = c-a;
			table.find('.pic').css({
				'-webkit-transform': 'translateX('+x+'px)',
				'transform': 'translateX('+x+'px)'
			});
		} else {
			table.find('.pic').css({
				'-webkit-transform': 'translateX(0)',
				'transform': 'translateX(0)'
			});
		}
	}
	next.on('click', function() {
		mleft = mleft+step;
		t.removeClass('to-left');
		if ( mleft >= diff ) {
			mleft = diff;
			t.addClass('to-right');
		}
		table.stop().animate({
			'margin-left': -mleft+'px'
		}, 0);
		pos(mleft);
	});
	prev.on('click', function() {
		mleft = mleft-step;
		t.removeClass('to-right');
		if ( mleft <= 0 ) {
			mleft = 0;
			t.addClass('to-left');
		}
		table.stop().animate({
			'margin-left': -mleft+'px'
		}, 0);
		pos(mleft);
	});
	t.swipe({
		allowPageScroll: 'auto',
		threshold: 20,
		swipeStatus: function(event, phase, direction, distance) {
			if ( phase == 'move' && direction == 'left' ) {
				t.removeClass('to-left');
				var templeft = mleft+distance;
				if ( templeft >= diff ) {
					templeft = diff;
					t.addClass('to-right');
				}
				table.css({
					'margin-left': -templeft+'px'
				});
				pos(templeft);
			}
			if ( phase == 'end' && direction == 'left' ) {
				mleft = mleft+distance;
				if ( mleft >= diff ) {
					mleft = diff;
				}
			}
			if ( phase == 'move' && direction == 'right' ) {
				t.removeClass('to-right');
				var tempright = mleft-distance;
				if ( tempright <= 0 ) {
					tempright = 0;
					t.addClass('to-left');
				}
				table.css({
					'margin-left': -tempright+'px'
				});
				pos(tempright);
			}
			if ( phase == 'end' && direction == 'right' ) {
				mleft = mleft-distance;
				if ( mleft <= 0 ) {
					mleft = 0;
				}
			}
		}
	});
}
function swapBlocks() {
	if ( $('.menu-mini').is(':hidden') ) {
		$('.about-i ul').detach().insertBefore('.about-i h4');
		$('.card-b .delivery').detach().insertAfter('.card-b .preview');
		$('.card-b .history').insertAfter('.card-b .desc');
	} else {
		$('.about-i ul').detach().insertAfter('.about-i h4');
		$('.card-b .delivery').detach().insertAfter('.card-b .history');
		$('.card-b .history').insertAfter('.card-b .bid');
	}
}
function bigLink() {
	$('a.big-link').each(function() {
		$(this).height($(this).width());
	});
}
$(function() {
	$('input.price').keyup(function() {
		$(this).attr('data-val',$(this).val().replace(/\s/g, ''));
		$(this).val($(this).attr('data-val').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	});
	$('input.price').trigger('keyup');
	bigLink();
	$(window).on('resize load', function() {
		bigLink();
		slider($('.slider-i'),20000,1,'fade');
		$('.form-e .tip').each(function() {
			var m = (42-$(this).outerHeight())/2;
			$(this).css({
				'margin-top': m+'px'
			});
		});
		if ( $('.sub-nav').length > 0 ) {
			$('.sub-nav .arrow').css({
				'left': $('header nav ul li.active').offset().left+$('header nav ul li.active').outerWidth()/2-$('.sub-nav').offset().left+'px'
			});
		}
		tableScroll();
		swapBlocks();
	});
	//$(window).trigger('resize');
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.like-icon').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$('.view-switch li').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('select').selectmenu();
	$('.vitrina .table table th span').on('click', function(e) {
		e.preventDefault();
		if ( $(this).hasClass('ascending') ) {
			$(this).removeClass().addClass('descending');
		} else {
			$(this).removeClass().addClass('ascending');
		}
		$(this).parent().siblings().find('span').removeClass();
	});
	$('.vitrina .table table th:first-child span').addClass('ascending');
	$('.button.add').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active').text('в моих лотах');
		} else {
			$(this).removeClass('active').text('в мои лоты');
		}
	});
	$('.help-e ul li > div h5 a').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parent().siblings('div');
		if ( t.is(':hidden') ) {
			t.stop().slideDown(200);
			if ( $('.help-e ul li > div.active').length > 0 ) {
				$('.help-e ul li > div.active').find('h5').addClass('old');
			}
			t.parent().addClass('active');
		} else {
			t.stop().slideUp(200);
			t.parent().removeClass('active');
			if ( $('.help-e ul li > div.active').length < 2 ) {
				$('.help-e ul li > div.active').find('h5').removeClass('old');
			}
			$(this).parent().removeClass('old');
		}
	});
	$('.file-upload input[type="text"], .file-upload .attach').on('click', function() {
		$(this).siblings('input[type="file"]').trigger('click');
	});
	$('.file-upload input[type="file"]').on('change', function() {
		if ( $(this).val().length > 0 ) {
			$(this).siblings('input[type="text"]').val($(this).val().substr($(this).val().lastIndexOf('\\') + 1));
			$(this).siblings('.attach').hide().siblings('.remove').show();
		}
	});
	$('.file-upload i.remove').on('click', function() {
		$(this).siblings('input[type="text"]').val('');
		$(this).hide().siblings('.attach').show();
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$('header .user-drop').hide();
		$('header .user a.drop').removeClass('active');
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(500);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < $(window).scrollTop()+120 ) {
			h = $(window).scrollTop()+60;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
	});
	$('.fade, .modal .close').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	$('.photo-open').fancybox({
		padding: 0,
		margin: 0,
		width: $(window).width(),
		height: $(window).height(),
		helpers: {
			overlay: {
				locked: false
			},
			title: {
				type : 'over'
			}
		},
		beforeShow : function() {
			this.title = (this.title ? '' + this.title + '' : '') + (this.index + 1) + ' из ' + this.group.length;
		} 
	});
	$('header .menu-mini li span.profile').on('click', function(e) {
		e.preventDefault();
		$('.menu-mini-show').hide();
		$('.user-mini').stop().slideDown(0);
		$('.wrapper').css({
			'min-height': '0'
		});
		$('.wrapper header').siblings().hide();
		$('footer').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('header .menu-mini li span.menu').on('click', function(e) {
		e.preventDefault();
		$('.user-mini').hide();
		$('.menu-mini-show').stop().slideDown(0);
		$('.wrapper header').siblings().hide();
		$('.wrapper').css({
			'min-height': '0'
		});
		$('footer').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.menu-mini-show .close, .user-mini .close').on('click', function(e) {
		e.preventDefault();	
		$(this).parent().stop().slideUp(0);
		$('.wrapper').css({
			'min-height': '100%'
		});
		$('.wrapper header').siblings().show();
		$('footer').show();
		$('header .menu-mini li').removeClass('active');
	});
	$('.menu-mini-show .main > li > ul').parent('li').children('a').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('ul').stop().slideDown(0);
		$(this).parent().siblings('li').stop().slideUp(0);
		$(this).parents('ul').siblings('ul').stop().slideUp(0);
		$('.menu-mini-show .back').show();
		$('header .menu-mini li').removeClass('active');
	});
	$('.menu-mini-show .back').on('click', function(e) {
		e.preventDefault();
		$('.menu-mini-show .sub').stop().slideDown(0);
		$('.menu-mini-show .main > li').stop().slideDown(0);
		$('.menu-mini-show .main > li > ul').stop().slideUp(0);
		$(this).hide();
	});
	$('.card-b .form p input').on('mouseenter', function() {
		if ( $('.menu-mini').is(':hidden') ) {
			$(this).siblings('strong').show();
		}
	});
	$('.card-b .form p input').on('mouseleave', function() {
		if ( $('.menu-mini').is(':hidden') ) {
			$(this).siblings('strong').hide();
		}
	});
	$('.card-b .form p input').on('focus', function() {
		var t = $(this).siblings('strong');
		if ( $('.menu-mini').is(':visible') ) {
			t.show();
			setTimeout(function() {
				t.hide();
			}, 5000);
		}
	});
	$('.card-b .form p input').on('blur', function() {
		$(this).siblings('strong').hide();
	});
	$('.card-b .form p input').on('keyup blur', function() {
		if ( $('.menu-mini').is(':visible') ) {
			$(this).siblings('strong').hide();
		}
	});
	$('.card-b .bid .total strong a').on('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $('.card-b .history').offset().top+'px'
		}, 500);
	});
	$('select').on('selectmenuopen', function(event,ui) {
		var t = $(this).siblings('.ui-selectmenu-button').attr('aria-activedescendant');
		var str = $(this).attr('id').toString()+'-button';
		var e = $('[aria-labelledby="'+str+'"]');
		e.find('.ui-menu-item-wrapper').removeClass('current');
		e.find('div#'+t).addClass('current');
	});
	$('.lc .preview li').on('click', function() {
		var t = $(this).parents('.card-b').find('.big img[data-b="'+eval($(this).attr('data-p'))+'"]');
		if ( !t.is(':visible') ) {
			$(this).parents('.card-b').find('.big img').stop().fadeOut(0);
			t.stop().fadeIn(0);
			$(this).addClass('active').siblings().removeClass('active');
		}
	}).filter(':first').click();
	$('.filter-e .search-e input[type="submit"]').on('click', function(e) {
		e.preventDefault();
		if ( $('.menu-mini').is(':visible') ) {
			if ( $(this).siblings('input[type="text"]').is(':hidden') ) {
				$('.filter-e .sort, .filter-e .search-e').stop().animate({
					'width': $('.filter-e').width()*0.5-5+'px'
				}, 200);
				$(this).siblings('input[type="text"]').show();
			} else {
				$('.filter-e .sort').stop().animate({
					'width': $('.filter-e').width()-40+'px'
				}, 200);
				$('.filter-e .search-e').stop().animate({
					'width': '30px'
				}, 200);
				$(this).siblings('input[type="text"]').hide();
			}
		}
	});
	$('.form-e button, .ask-e').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('input,textarea').each(function() {
			if ( $(this).val() == 0 && $(this).parents('p').find('input[type="file"]').length == 0 ) {
				if ( !$(this).parent().is('.warning-wrap') ) {
					$(this).wrap('<span class="warning-wrap"></span>');
					$(this).parent().prepend('<em class="text"><em>Неверный формат</em></em><em class="icon"></em>');
					$(this).siblings('em').outerHeight($(this).outerHeight());
				}
				var t = $(this).parent();
				t.find('em').show();
				t.find('em.text').css({
					'width': '100%'
				});
				setTimeout(function() {
					t.find('.text > em').hide();
					t.find('.text').animate({
						'width': t.find('.icon').width()+'px'
					}, 300).dequeue();
				}, 1000);
			} else {
				$(this).siblings('em').hide();
			}
		});
	});
	$(window).on('resize', function() {
		$('.form-e .warning-wrap > em').each(function() {
			$(this).outerHeight($(this).siblings('input,textarea').outerHeight($(this).outerHeight()));
		});
	});
	$('body').delegate('.warning-wrap .icon', 'mouseenter', function() {
		var t = $(this).siblings('.text');
		t.stop().animate({
			'width': '100%',
		}, 300, function() {
			$(this).find('em').show();
		});
	});
	$('body').delegate('.warning-wrap .icon', 'mouseleave', function() {
		var t = $(this).siblings('.text');
		t.find('em').hide();
		t.stop().animate({
			'width': '0',
		}, 300);
	});
});