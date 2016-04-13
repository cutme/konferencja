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
		var v = $('html, body'),
			topbarH = $('.c-topbar').height(), trigger = $('.c-nav-trigger');
			
		if (trigger.hasClass('is-active')) {
			trigger.removeClass('is-active');
			$('.c-nav-primary').hide();
		}
		var buffor = ($(window).width()<=480) ? 40 : 60;
		
		v.animate({
			scrollTop: target - topbarH - buffor
		}, {
			duration: 500,
			easing: 'easeOutCubic'
		});
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
					is_error, _t = $(this),
					fields = $('.c-form__fields'),
					thanks = $('.c-form__thanks'), offset;

				submit.on('click', function(e) {
					e.preventDefault();			
					is_error = validateStart(_t);
					submit.attr('disabled', true);
					offset = $('#register').offset().top;
					
					function sendAjax(data) {
						$.ajax({
							type: "POST",
							cache: false,
							url: el.attr('action'),
							data: data,
							success: function(msg) {
								if (msg === 'ok') {
									goToTarget(offset);
									fields.hide();
									thanks.fadeIn(2000);
								} else {
									thanks.hide();
								}
							},
							error: function() {
								submit.removeAttr("disabled");
							}
						});
					}
					if (is_error === 1) {
						goToTarget(offset);
					} else {
						var name = $("input[name='Name']").val(),
							email = $("input[name='Email']").val(),
							diet = $("textarea[name='Diet']").val(),
							institution = $("input[name='Institution']").val(),
							app1 = $("input[name='App1']").prop('checked'),
							app2 = $("input[name='App2']").prop('checked'),
							app3 = $("input[name='App3']").prop('checked'),
							dataString = 'name=' + name + '&email=' + email + '&diet=' + diet + '&institution=' + institution + '&app1=' + app1 + '&app2=' + app2 + '&app3=' + app3;
						sendAjax(dataString);
						return true;
					}
				});
			});
		},
		init: function() {
			//exist('.js-mfp') && L.magnific();
			L.validate();	
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
					offset = $(target).offset().top;
				$('.goto.is-active').removeClass('is-active');
				$(this).addClass('is-active');								
				goToTarget(offset);
			});
		}
	}
	$(document).ready(function() {
		L.init();
		N.init();
	});
});