/*************************************************************************************************************
 autor: JAVIER RODRÍGUEZ SOLER.
 V 0.1
 08/2015
**************************************************************************************************************/


/*********COMPROBACIÓN CARGA DE LIBRERIA ***************************************************************/

console.log('Librería cargada.');


/*************************CONTROLLER**********************************************************************/
var controlador = {

	_$Botton_login : $('#button_login'),
	_inicializarUI : function() {
		var self = this;
	 	this._$Botton_login.click(function(evt) {
           console.log('login');
	 	});
	}
}


/******************************INICIO*******************************************************************/
$(document).ready(function () {

	controlador._inicializarUI();

});


