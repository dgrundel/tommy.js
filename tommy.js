window.tommy = (function($){
	var enabled = false;

	function comeAtMeBro() {
		enabled = true;
	}

	function okIGiveUp() {
		enabled = false;
	}

	function randomPercent() {
		return (Math.random() * 100).toString().substr(0, 5) + '%';
	}

	function wrap(name, newFunction) {
		var original = jQuery.fn[name];
		jQuery.fn[name] = function() {
			var newResult = true;
			if(enabled) {
				newResult = newFunction.apply( this, arguments );
			}
			if(newResult !== false) {
				return original.apply( this, arguments );
			}
			return newResult;
		};
	}
	
	var jQueryInit = $.fn.init;
	$.fn.init = function(arg1, arg2, rootjQuery){
	    if(enabled) {
		    if(typeof arg1 === 'string') {
			    if(arg1.indexOf(' ') !== -1) {
			    	console.warn(arg1 + ': Multiple selectors!? Use jQuery.find()');
			    }
		    	if(arg1.indexOf('#') !== 0) {
			    	console.warn(arg1 + ': Not using an ID!!!!!1111 What the heck are you thinking?! An ID selector would have been ' + randomPercent() + ' faster.');
			    }
		    }
	    }

	    return new jQueryInit(arg1, arg2, rootjQuery);
	};

	wrap('each', function(){
		console.warn('Seriously, $.each? Use a for loop, n00b.');
	});

	wrap('hide', function(){
		console.warn('Hide!? Are you kidding me? Have you ever heard of element.style.display = "none"?');
	});

	wrap('val', function(){
		console.warn('Probably could have used element.value. Just saying.');
	});

	wrap('attr', function(){
		console.warn('element.' + arguments[0] + ' would have been ' + randomPercent() + ' faster.');
	});

	return {
		comeAtMeBro: comeAtMeBro,
		okIGiveUp: okIGiveUp
	};

})(jQuery);