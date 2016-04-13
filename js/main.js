/*jshint expr:true */

function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}
jQuery(function($) {
	function goToTarget(target) {
		var v = $('html, body');
		console.log(target);
		v.animate({
			scrollTop: target
		}, 500);
	}

	function window_smaller_than(n) {
		var d = ($(window).width() < n) ? true : false;
		return d;
	}

	function exist(o) { /* exist('.js-bigcaro') && S.bigcaro(); */
		d = ($(o).length > 0) ? true : false;
		return d;
	}
	var L = {
		validate: function() {
			var el = $('form'),
				error = 0,
				errorClass = 'has-error',
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

			function checkField(o) {
				error = 0;
				if ($(o).val() == '') {
					$(o).parent().addClass(errorClass);
					error = 1;
				}
				return error;
			}
			var validateStart = function(o) {
					error = 0;
					el.find('.has-error').removeClass(errorClass);
					$('[type=text], [type=tel], [type=password], [type=date], textarea', o).each(function() {
						$(this).prop('required') === true && checkField(this);
					});
					$('[type=email], [type=text], [type=password]', o).on('keydown', function() {
						$(this).parent().removeClass(errorClass);
					});
					$('[type=email]', o).each(function() {
						if ($(this).prop('required')) {
							var email = $(this).val();
							if (email === '') {
								$(this).parent().addClass(errorClass);
								error = 1;
							} else if (reg.test(email) === false) {
								$(this).parent().addClass(errorClass);
								error = 1;
							} else {
								$(this).parent().removeClass(errorClass);
							}
						}
					});
					$('[type=checkbox]', o).each(function() {
						if ($(this).prop('required')) {
							if (!$(this).prop('checked')) {
								$(this).parent().addClass(errorClass);
								error = 1;
							} else {
								$(this).parent().removeClass(errorClass);
							}
						}
					});
					return error;
				};
			el.each(function() {
				var submit = $('.submit', this),
					is_error, _t = $(this);
				$('input, textarea, select', this).each(function() {
					if ($(this).prop('required')) {
						$(this).prev('.o-form__lead').append(' <i class="o-form__required">*</i>');
					}
				});
				submit.on('click', function(e) {
					e.preventDefault();
					is_error = validateStart(_t);
					if (is_error === 1) {
						$('html, body').animate({
							scrollTop: 0
						}, 1500);
					} else {
						_t.submit();
						return true;
					}
				});
			});
		},
		init: function() {
			//exist('.js-mfp') && L.magnific();
			//L.validate();			
		}
	};
	var N = {
		mobileNav: function() {
			function shTrigger() {
				var t = $('.c-nav-trigger'),
					n = $('.c-nav-primary'),
					status = false;

				function init() {
					n.addClass('is-mobile');
					status = true;
				}
				t.on('click', function(e) {
					e.preventDefault();
					$(this).toggleClass('is-active');
					n.slideToggle();
				});
				$(window).resize(debouncer(function(e) {
					if (window_smaller_than(901)) {
						if (status === false) {
							init();
						}
					} else {
						if (status === true) {
							t.removeClass('is-active');
							n.removeClass('is-mobile').attr('style', '');
							status = false;
						}
					}
				}));
				if (window_smaller_than(901)) {
					init();
				}
			}
			shTrigger();
		},
		init: function() {
			N.mobileNav();
			$('.goto').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr('href'),
					offset = $(target).offset().top,
					topbarH = $('.c-topbar').height(),
					trigger = $('.c-nav-trigger');
				$('.goto.is-active').removeClass('is-active');
				$(this).addClass('is-active');
				if (trigger.hasClass('is-active')) {
					trigger.removeClass('is-active');
					$('.c-nav-primary').hide();
				}
				goToTarget(offset - topbarH - 60);
			});
		}
	}
	$(document).ready(function() {
		L.init();
		N.init();
	});
});