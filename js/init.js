head.js('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js', function() {
		if ($('input[type=checkbox]').length > 0) {
			head.js('https://code.jquery.com/ui/1.10.2/jquery-ui.js')
				.js('js/ui.checkbox.js', function() {
					$('input[type=checkbox]').checkBox({
						'change': function() {
							if ($(this).is(':checked')) {
								$(this).parents('td').find('input[type=checkbox]').checkBox('changeCheckStatus', true);
							} else {
								$(this).parents('td').find('input[type=checkbox]').checkBox('changeCheckStatus', false);
							}
						}
					});
				});	
		}
	})
	.js('https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js')
	.js('js/main.js');

if (head.browser.ie && parseFloat(head.browser.version) < 9) {
    head.js('https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js')
    	.js('https://cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js')
    	.js('https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js');
}
