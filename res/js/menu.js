var Menu = {

	toggle: function(){

		if($('body').hasClass('menu-open')){

			Menu.close();

		} else{
			Menu.open();
		}

	},

	open: function(){

		$('body').addClass('menu-open');

	},

	close: function(){

		$('body').removeClass('menu-open');

	}

}