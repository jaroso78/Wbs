/*************************************************************************************************************
 autor: JAVIER RODRÍGUEZ SOLER.
 V 0.1
 08/2015
**************************************************************************************************************/


/*********COMPROBACIÓN CARGA DE LIBRERIA ***************************************************************/

console.log('Librería cargada.');



var servicioGraficas = {
	self : this,
	myPie : null,
	myLine : null,
	data: null,
	_graficaPie : function(){


			var pieData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Grey"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Dark Grey"
				}
			];

		var ctx = $('#chart-area').get(0).getContext("2d");

		 self.myPie = new Chart(ctx).Pie(pieData);






		 /*var ctx = document.getElementById("chart-area").getContext("2d");
		 window.myPie = new Chart(ctx).Pie(pieData);*/
	},

	_graficaLinea :function(){
		self = this;

    data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

		var ctx1 = $('#chart-line').get(0).getContext("2d");

		 self.myLine = new Chart(ctx1).Line(data);
},


	//Function for controller carousel an charge the diferents graphs.
	_controladorCarrousel : function(){

		$('#Carousel-graficas').on('slide.bs.carousel', function (e) {

			if (self.myLine == null){
				console.log('es nula');
			self.myPie.destroy();
			} else{

			var ctx1 = $('#chart-line').get(0).getContext("2d");
		    myLine = new Chart(ctx1).Line(data);
			}
   		});
		$('#carousel-left').click(function (evt){
			$("#Carousel-graficas").carousel('prev');
		});
		$('#carousel-right').click(function (evt){
			$("#Carousel-graficas").carousel('next');
		});
	},
}

/*************************CONTROLLER**********************************************************************/
var controlador = {
	self: this,
	_$Ventana_principal: $('.principal'),
	_$Botton_login: $('#button_login'),
	_$Secundaria: $('.segundaria'),
	_$Botton_comparador: $('#btn_comparador'),
	_$Comparador: $('#comparador'),
	_$Botton_home : $('#icon_house'),
	_$Botton_detailhome : $('#boton1_vivienda'),
	_$Detail_home : $('#detail_home'),
	_$Detail_principal: $('#Wrapper_intern'),
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
		this._$Botton_comparador.click(function (evt){
			self._mostrarPantalla(self._$Comparador);
			$("#Carousel-graficas").carousel('pause');
			servicioGraficas._controladorCarrousel();
		});
		this._$Botton_home.click(function (evt){
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);

		});
		this._$Botton_detailhome .click(function (evt){
			console.log('pulsado detalle');
			self._mostrarDetalle(self._$Detail_home);
		});

	},
	_mostrarPantalla: function ($pantallaDestino) {
		var self = this;
		var $pantallaOrigen = $('.activa');
		$pantallaOrigen.fadeOut(function () {
			$pantallaOrigen.removeClass('activa');
			$pantallaDestino.fadeIn(function () {
				$pantallaDestino.addClass('activa');
				if ($pantallaDestino == self._$Comparador){
					servicioGraficas._graficaLinea();
					servicioGraficas._graficaPie();

				}
			});
		});
	},
	_mostrarDetalle: function($detalleDestino){
	var self = this;
		var $detalleOrigen = $('.detalle_activo');
		$detalleOrigen.fadeOut(function () {
			$detalleOrigen.removeClass('detalle_activo');
			$detalleOrigen.addClass('detalle_inactivo');
			$detalleDestino.fadeIn(function () {
				$detalleDestino.addClass('detalle_activo');
				$detalleDestino.removeClass('detalle_inactivo');
				/*servicioGraficas._graficaPie();*/
			});
		});

	},

}



/******************************INICIO*******************************************************************/
$(document).ready(function () {
	//Definición Menu login lateral




	/*servicioGraficas._graficaPie();*/


	controlador._inicializarUI();


});
