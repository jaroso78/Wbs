/*************************************************************************************************************
 autor: JAVIER RODRÍGUEZ SOLER.
 V 0.1
 08/2015
**************************************************************************************************************/


/*********COMPROBACIÓN CARGA DE LIBRERIA ***************************************************************/

console.log('Librería cargada.');


/*************************CONTROLLER**********************************************************************/
var controlador = {
	self: this,
	_$Botton_login: $('#button_login'),
	_$Secundaria: $('.segundaria'),
	_inicializarUI: function () {
		var self = this;
		this._$Botton_login.click(function (evt) {
			$(this).toggleClass('open');
			if ($('#login').css('display') == 'none') {
				$('#login').animate({
					'width': 'show'}, 300, function () {
					$('.segundaria').addClass('activa');
					$('.segundaria').fadeIn();
				});
			} else {
				$('.segundaria').fadeOut(100, function () {
					$('.segundaria').removeClass('activa');
					$('#login').animate({'width': 'hide'}, 300);
				});
			}
		});
	},
	_mostrarPantalla: function ($pantallaDestino) {
		var self = this;
		var $pantallaOrigen = $('.activa');
		/*console.log($pantallaDestino);*/
		$pantallaOrigen.fadeOut(function () {
			$pantallaOrigen.removeClass('activa');
			$pantallaDestino.fadeIn(function () {
				$pantallaDestino.addClass('activa');
			});
		});
	},



}



/******************************INICIO*******************************************************************/
$(document).ready(function () {
	//Definición Menu login lateral




	controlador._inicializarUI();

});
