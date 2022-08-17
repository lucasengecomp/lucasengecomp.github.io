// ES5 para manter a compatibilidade com navegadores antigos

var Slider = {

	model: {

		uuid: null,

		delay:       2000,
		heightDelay: 1000,
		changeDelay: 500,
		index:       -1,
		restoreDelay: 5000,
		holder:      null,
		elms:        [],

	},

	holders: [],

	start: function(holder, elms, btns, uuid){

		if(typeof uuid == 'undefined'){

			uuid = new Date().getTime() + '_' + Math.random().toString();

		}

		elms.each(function(k){

			if(k === 0){

				$(this).addClass('visible');
				$(holder).css('height', $(this).outerHeight());

			}

		});

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

				clearTimeout(slider.timeout);
				slider.timeout = setTimeout(slider.update, slider.delay);

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

	}

}