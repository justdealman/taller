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
}
$(function() {
	$('input.price').keyup(function() {
		$(this).attr('data-val',$(this).val().replace(/\s/g, ''));
		$(this).val($(this).attr('data-val').toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	});
	$('input.price').trigger('keyup');
	slider($('.slider-i'),10000,1,'fade');
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
	if ( $('.sub-nav').length > 0 ) {
		$('.sub-nav .arrow').css({
			'left': $('header nav ul li.active').offset().left+$('header nav ul li.active').outerWidth()/2-$('.sub-nav').offset().left+'px'
		});
	}
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
	$('header .user a.drop, .user-drop, .file-upload').on('click', function(e) {
		e.stopPropagation();
	});
	$('.form-e .tip').each(function() {
		$(this).css({
			'margin-top': (52-$(this).outerHeight())/2+'px'
		});
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
	$('.photo-open').fancybox({
		padding: 0,
		margin: 0,
		width: $(window).width(),
		height: $(window).height(),
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
});