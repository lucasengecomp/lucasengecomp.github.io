// ES5 para manter a compatibilidade com navegadores antigos

var Slider = {

	model: {

		uuid: null,

		delay:         10000,
		heightDelay:   1000,
		changeDelay:   500,
		index:         -1,
		restoreDelay:  5000,
		heightEnabled: false,
		holder:        null,
		elms:          [],
		first:         false,
		firstDelay:    2000

	},

	holders: [],

	start: function(holder, elms, btns, uuid){

		if(typeof uuid == 'undefined'){

			uuid = new Date().getTime() + '_' + Math.random().toString();

		}

		var max = 0;

		elms.each(function(k){

			if(k === 0) $(this).addClass('visible');

			console.log($(this).outerHeight());

			if($(this).outerHeight() > max){

				max = $(this).outerHeight();

			}

		});

		$(holder).css('height', max);

		// Copia do model
		let slider = JSON.parse(JSON.stringify(Slider.model));

		slider.elms    = elms;
		slider.holder  = holder;
		slider.btns    = btns;
		slider.uuid    = uuid;
		slider.restore = null;

		slider.elms.each(function(index){

			var btn = $('<div class="slider-btn"></div>');

			btn.on('click', function(){

				slider.block = true;

				clearTimeout(slider.restore);
				slider.restore = setTimeout(function(){

					slider.block = false;
					slider.slide();

				}, slider.restoreDelay);

				slider.index = index;
				slider.hide().then(function(){
					return slider.changeHeight();
				}).then(function(){

					return slider.show();

				}).then(slider.slide);

			});

			btns.append(btn);

		});

		slider.hide = function(){

			$(slider.holder).find('.visible').removeClass('visible');

			return Promise.resolve();

		}

		slider.changeHeight = function(){

			return new Promise(function(resolve){

				setTimeout(resolve, slider.heightDelay);

			}).then(function(){

				if(!slider.heightEnabled) return Promise.resolve();

				var newHeight = $(slider.elms[slider.index]).outerHeight();

				slider.holder.css('height', newHeight);

			});

		}

		slider.show = function(){

			$(slider.elms[slider.index]).addClass('visible');

			slider.btns.find('.slider-btn.visible').removeClass('visible');
			slider.btns.find('.slider-btn').eq(slider.index).addClass('visible')

			return Promise.resolve();

		}

		slider.block = false;

		slider.slide = function(){

			if(slider.block) return Promise.resolve();

			return new Promise(function(resolve){

				var delay = slider.delay;

				if(slider.first) delay = slider.firstDelay || slider.delay;

				slider.first = false;

				clearTimeout(slider.timeout);
				slider.timeout = setTimeout(slider.update, delay);

			});

		}

		slider.update = function(){

			if(slider.block) return;

			slider.index++;

			if(slider.index > slider.elms.length - 1) slider.index = 0;

			return slider.hide().then(function(){

				return slider.changeHeight();

			}).then(function(){

				return slider.show();

			}).then(function(){

				return slider.slide();

			});

		}

		slider.update();

		Slider.holders[uuid] = slider;

		return slider;

	},

	loop: function(){

		return new Promise(function(resolve){

			Slider.update();

			setTimeout(resolve, Slider.delay);

		}).then(Slider.loop);

	},

	helpers: {

	    // Uma versão alternativa ao snapScrollLeft
	    snapScrollSide: function(elm, divisors, f){

	        var divWidth = divisors.outerWidth(true);

	        var timeout = null;

	        elm.off('scroll');
	        elm.on('scroll', function(event){

	            // Impede um scroll vindo do .animate
	            if($(this).is(':animated')) return;

	            clearTimeout(timeout);

	            timeout = setTimeout(function(){

	                var index = Math.round(elm.get(0).scrollLeft / divWidth);

	                elm.animate({
	                    scrollLeft: index * divWidth
	                }, 100);

	                f(index);

	            }, 100);

	        });

	    },

	    snapScrollTop: function(elm, divisors, f){

	        var timeout = null;

	        elm.off('scroll');
	        elm.on('scroll', function(event){

	            // Impede um scroll vindo do .animate
	            if($(this).is(':animated')) return;

	            clearTimeout(timeout);

	            timeout = setTimeout(function(){

	                var divHeight = divisors.outerHeight(true);
	                var ratio = Math.round(elm.get(0).scrollTop / divHeight);

	                elm.animate({
	                    scrollTop: ratio * divHeight
	                }, 200);

	                f(ratio);

	            }, 400);

	        });

	    },

	    forceScroll: function (elm, divisors, next) {

	        return new Promise(function (resolve) {

	            var divSize = divisors.outerWidth(true);
	            var nextPos = Math.round(elm[0].scrollLeft / divSize) * divSize + (next ? divSize : divSize * -1);

	            elm.css('overflow', 'hidden');

	            setTimeout(function () { elm.css('overflow', 'auto'); resolve(); }, 200);

	            elm.animate({ 'scrollLeft': nextPos }, 200);

	        });

	    },

	    instantSnap: function (elm, divisors, orientation) {

	        var animateDelay = 200;

	        if (typeof orientation === 'undefined') orientation = 'height';

	        var scrollOrientation = 'scrollLeft';
	        var measureFunction = 'outerWidth';

	        if (orientation === 'height') {

	            scrollOrientation = 'scrollTop';
	            measureFunction = 'outerHeight';

	        }

	        var divSize = divisors[measureFunction](true);
	        var ratio = Math.round(elm.get(0)[scrollOrientation] / divSize);

	        elm.css('overflow', 'hidden');

	        setTimeout(function () { elm.css('overflow', 'auto'); }, animateDelay);

	        var objAnimate = {};

	        objAnimate[scrollOrientation] = ratio * divSize;

	        elm.animate(objAnimate, animateDelay);

	    },

	    snapScrollLeft: function(elm, divisors, animate, delay){

	        var timeout = null;

	        if(typeof animate === 'undefined') animate = 200;
	        if(typeof delay   === 'undefined') delay   = 400;

	        elm.off('scroll');

	        elm.on('scroll', function(){

	            clearTimeout(timeout);

	            timeout = setTimeout(function(){

	                Slider.helpers.instantSnap(elm, divisors, 'width');

	            }, delay);

	        });

	    }

	}

}