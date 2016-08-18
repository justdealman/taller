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
		start: start,
		animationComplete: function() {
			console.log(t);
			if ( t.selector = '.slider-types, .slider-portfolio' ) {
				setTimeout(function() {
					var h = $(window).scrollTop()+($(window).height()-t.parents('.modal').outerHeight())/2;
					console.log(h);
					if ( h < $(window).scrollTop() ) {
						h = $(window).scrollTop();
					}
					t.parents('.modal').stop().animate({
						'top': h+'px'
					}, 500);
				}, 500);
			}
		}
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
	var step = 100;
	table.css({
		'margin-left': '0'
	});
	t.removeClass('to-left').addClass('to-left').removeClass('to-right');
	var mleft = 0;
	next.on('click', function() {
		mleft = mleft+step;
		t.removeClass('to-left');
		if ( mleft >= diff ) {
			mleft = diff;
			t.addClass('to-right');
		}
		table.stop().animate({
			'margin-left': -mleft+'px'
		}, 200);
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
		}, 200);
	});
	t.swipe({
		allowPageScroll: 'vertical',
		swipeStatus:function(event, phase, direction, distance) {
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
	} else {
		$('.about-i ul').detach().insertAfter('.about-i h4');
		$('.card-b .delivery').detach().insertAfter('.card-b .history');
	}
}
$(function() {
	$('input.price').keyup(function() {
		$(this).attr('data-val',$(this).val().replace(/\s/g, ''));
		$(this).val($(this).attr('data-val').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	});
	$('input.price').trigger('keyup');
	$(window).on('resize', function() {
		slider($('.slider-i'),10000,1,'fade');
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
	$(window).trigger('resize');
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
			t.parent().addClass('active');
		} else {
			t.stop().slideUp(200);
			t.parent().removeClass('active');
		}
	});
	$('header .user a.drop').on('click', function(e) {
		e.preventDefault();
		var t = $('header .user-drop');
		if ( t.is(':hidden') ) {
			t.stop().fadeIn(200);
			$(this).addClass('active');
		} else {
			t.stop().fadeOut(200);
			$(this).removeClass('active');
		}
	});
	$('html, body').on('click', function(e) {
		e.preventDefault();
		$('header .user-drop').hide();
		$('header .user a.drop').removeClass('active');
	});
	$('header .user a.drop, .user-drop, .file-upload, label, .checker, .radio').on('click', function(e) {
		e.stopPropagation();
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
			'min-height': 'auto'
		});
		$('.wrapper header').siblings().hide();
		$('footer').hide();
	});
	$('header .menu-mini li span.menu').on('click', function(e) {
		e.preventDefault();
		$('.user-mini').hide();
		$('.menu-mini-show').stop().slideDown(0);
		$('.wrapper').css({
			'min-height': 'auto'
		});
		$('.wrapper header').siblings().hide();
		$('footer').hide();
	});
	$('.menu-mini-show .close, .user-mini .close').on('click', function(e) {
		e.preventDefault();	
		$(this).parent().stop().slideUp(0);
		$('.wrapper').css({
			'min-height': '100%'
		});
		$('.wrapper header').siblings().show();
		$('footer').show();
	});
	$('.menu-mini-show .main > li > ul').parent('li').children('a').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('ul').stop().slideDown(0);
		$(this).parent().siblings('li').stop().slideUp(0);
		$(this).parents('ul').siblings('ul').stop().slideUp(0);
		$('.menu-mini-show .back').show();
	});
	$('.menu-mini-show .back').on('click', function(e) {
		e.preventDefault();
		$('.menu-mini-show .sub').stop().slideDown(0);
		$('.menu-mini-show .main > li').stop().slideDown(0);
		$('.menu-mini-show .main > li > ul').stop().slideUp(0);
		$(this).hide();
	});
});