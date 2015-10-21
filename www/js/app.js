/*************************************************************************************************************
 autor: JAVIER RODRÍGUEZ SOLER.
 V 0.1
 08/2015
**************************************************************************************************************/


/*********COMPROBACIÓN CARGA DE LIBRERIA ***************************************************************/

console.log('Librería cargada.');


/**********************APLICACIÓN APP DE CORDOVA INICIO DE LA MISMA UNA VEZ SE INICIA EL DISPOSITIVO******/
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("backbutton", function(e){

}, false);
		app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


        console.log('Received Event: ' + id);
    }
}


/****************************************SERVICIO DE FECHAS*************************************************/

//Lee la fecha inicial del dispositivo para dibujarlo en pantalla.
var servicioFecha={
	self: this,
	_$Ventana_principal: $('.principal'),
     meses : new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"),
	_fecha: function(){
	var f=new Date();
    this._$Ventana_principal.find('#fecha').text(f.getDate() +" "+ this.meses[f.getMonth()] +" "+ f.getFullYear());
	}
}


/****************************************SERVICIO DE GRÁFICAS.*************************************************/
var servicioGraficas = {
	self: this,
	//Definición de las diversas gráficas.
	myPie: null,
	myLine: null,
	myLine1: null,
	myLine2: null,
	myLine3:null,
	myBar: null,
	//Definición de los contextos de las gráficas.
	ctx: null,
	ctx1: null,
	ctx2: null,
	ctx3: null,
	ctx4: null,
	data: null,

	//Dibujando la gráfica de Barras.
	_graficaBarra : function (){
		var data = {
    	labels: ["Enero", "Marzo", "Mayo", "Julio", "Septi", "Novie"],
    	datasets: [
        {
            label: "Luz",
            fillColor: "rgba(250,187,220,0.5)",
            strokeColor: "rgba(250,187,220,0.8)",
            highlightFill: "rgba(250,187,220,0.75)",
            highlightStroke: "rgba(250,187,220,1)",
            data: [524.11, 329.95, 234.18, 203.08, 236.82, 380.58]
        },
        {
            label: "Gas",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [219.35, 211.15, 73.91, 34.76, 26.51, 34.51]
        }
    	]
		};
		var options_bar ={
			 multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
		};
			self.ctx3 = $('#chart-bar').get(0).getContext("2d");

			self.myBar = new Chart(self.ctx3).Bar(data,options_bar);
			$("#chart-bar").css({
				'width': '250',
				'height': '211'
			});

	},

	//Dibujando la gráfica de Pastel.
	_graficaPie: function (destruimos) {


		var pieData = [
			{
				value: 2663.77,
				color: "#F7464A",
				highlight: "#FF5A5E",
				label: "Luz",
				},
			{
				value: 600.19,
				color: "#46BFBD",
				highlight: "#5AD3D1",
				label: "Gas"
				},
			{
				value: 1218.08,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "Agua"
				},
			{
				value: 1210.43,
				color: "#949FB1",
				highlight: "#A8B3C5",
				label: "Telecom"
				}
			];


		//Definición para mostrar el valor de los datos de la Gráfica.
		var options =
    	{
        	tooltipTemplate: "<%=label %> <%= value %>",
			onAnimationComplete: function()
        	{
            	this.showTooltip(this.segments, true);
        	},
            tooltipEvents: [],
           showTooltips: true
    	}

		if (destruimos == true) {
			self.ctx.restore();
			self.myPie.destroy();
		} else {
			self.ctx = $('#chart-area').get(0).getContext("2d");

			self.myPie = new Chart(self.ctx).Pie(pieData,options);
			$("#chart-area").css({
				'width': '250',
				'height': '250'
			});
		}
	},

	//Gráfica de líneas.
	_graficaLinea: function (destruimos) {
		self = this;

		var data = {
			labels: ["Enero", "Marzo", "Mayo", "Julio","Septiem","Noviem"],
			datasets: [
				{
					label: "Electricidad.",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: [524.11, 329.95, 234.18, 203.08, 236.82, 380.58]
        },
				{
					label: "Gas.",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: [219.35, 211.15, 73.91, 34.76, 26.51, 34.51]
        }
    	]};

		var options_line ={
			 multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
		}

		if (destruimos == true) {
			self.ctx1.restore();
			self.myLine = null;



		} else {

			self.ctx1 = $('#chart-line').get(0).getContext("2d");
			self.ctx2 = $('#chart-line1').get(0).getContext("2d");
			self.ctx4 = $('#chart-line3').get(0).getContext("2d");
			self.myLine = new Chart(self.ctx1).Line(data, options_line);
			self.myLine2= new Chart(self.ctx2).Line(data, options_line);
			self.myLine3 = new Chart(self.ctx4).Line(data, options_line);
			$("#chart-line").css({
				'width': '250',
				'height': '250'
			});
			$("#chart-line1").css({
				'width': '250',
				'height': '250'
			});
			$("#chart-line3").css({
				'width': '250',
				'height': '250'
			});


		}
		//legend(document.getElementById("legend_chart_line"), data);
		//legend(document.getElementById("legend_chart_line2"), data);
		//$('.legend_chart_line').append(self.myLine.generateLegend());
	},


	//Function for controller carousel an charge the diferents graphs.
	_controladorCarrousel: function () {

		$('#Carousel-graficas').on('slide.bs.carousel', function (e) {


		});
		$('#carousel-left').click(function (evt) {
			$("#Carousel-graficas").carousel('prev');
			servicioGraficas._graficaPie();
			servicioGraficas._graficaLinea();
			servicioGraficas._graficaBarra();
		});
		$('#carousel-right').click(function (evt) {
			$("#Carousel-graficas").carousel('next');
			servicioGraficas._graficaLinea();
			servicioGraficas._graficaPie();
			servicioGraficas._graficaBarra();
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
	_$Botton_home: $('#icon_house'),
	_$Botton_detailhome: $('#boton1_vivienda'),
	_$Detail_home: $('#detail_home'),
	_$Detail_principal: $('#Wrapper_intern'),
	_$Botton_detailreturn: $('#boton2_vivienda'),
	_$Recomendaciones_detalle : $('#recomendaciones_detalle'),
	_$Botton_recomendaciones: $('.recomendaciones'),
	_$Botton_pag_Elect: $('#icon_elec'),
	_$Vista_pag_Elect: $('.principal_electricidad'),
	_$Botton_modalBox: $('.glyphicon-ok-circle'),
	_$Botton_pag_Euros: $('#icon_euro'),
	_$Vista_pag_Euros : $('.principal_euros'),
	_$Bottom_recomendacion_detalle : $('#bottom_recomendaciones_detallada'),
	_$Vista_pag_recomendaciones_detalle : $('.principal_recomendaciones'),
	_$ScrollDetalle : $('#wrapper'),
	_$Botton_contratar1: $('#boton_contratar1'),
	_$Botton_contratar2: $('#boton_contratar2'),
	_$Botton_salir: $('#iconexit'),
	_$Botton_info: $('#iconinfo'),
	_$Botton_detailelec : $('#boton1_electricidad'),
	_$Vista_detailelec : $('#detail_elec'),
	_$Botton_detailelec_return : $('#boton2_electricidad'),
	_$Botton_login_facebook: $('#facebook-login'),
	_$Botton_login_google: $('#google-login'),
	_$Botton_entrada_login: $('#botton_login'),
	_$Botton_login_twitter: $('#twitter-login'),
	_inicializarUI: function () {
		var self = this;
		document.addEventListener("backbutton", function(e){
    		self._mostrarDetalle(self._$Detail_principal);
	    	self._mostrarPantalla(self._$Ventana_principal);
		}, false);
		servicioFecha._fecha();
		this._$Botton_login.click(function (evt) {

			$(this).toggleClass('open');

			if ($('#login').css('display') == 'none') {
				$('#login').animate({
					'width': 'show'
				}, 300, function () {
					$('.segundaria').addClass('activa');
					$('.segundaria').fadeIn();

				});

			} else {
				$('.segundaria').fadeOut(100, function () {
					$('.segundaria').removeClass('activa');
					$('#login').animate({
						'width': 'hide'
					}, 300);
				});
			}
		});
		this._$Botton_comparador.click(function (evt) {
			self._mostrarPantalla(self._$Comparador);
			$("#Carousel-graficas").carousel('pause');
			servicioGraficas._controladorCarrousel();
		});
		this._$Botton_home.click(function (evt) {
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);
		});
		this._$Botton_detailhome.click(function (evt) {
			self._mostrarDetalle(self._$Detail_home);

		});
		this._$Botton_detailreturn.click(function (evt) {
			self._mostrarDetalle(self._$Detail_principal);
			servicioGraficas._graficaLinea(true);
		});
		this._$Botton_recomendaciones.click(function (evt){
			self._mostrarPantalla(self._$Recomendaciones_detalle);
			Custombox.open({
        		target: '#modal3',
				effect: 'fadein',
				overlayColor: '#f000',
			});
		});
		this._$Botton_pag_Elect.click(function (evt){
			self._mostrarPantalla(self._$Ventana_principal);
			self._mostrarDetalle(self._$Vista_pag_Elect);

		});

		//Boton de detalle del apartado eléctrico.
		this._$Botton_detailelec.click(function (evt){

			self._mostrarDetalle(self._$Vista_detailelec);

		});

		//Botor de return a electricidad desde el detalle.
		this._$Botton_detailelec_return.click(function (evt){
		    self._mostrarDetalle(self._$Vista_pag_Elect);
			servicioGraficas._graficaLinea(true);

		});
		this._$Botton_modalBox.click(function(evt){

			Custombox.open({
        		target: '#modal',
				effect: 'fadein',
				overlayColor: '#f000',
			});


		});
		this._$Botton_pag_Euros.click(function(evt){
			self._mostrarPantalla(self._$Ventana_principal);
			self._mostrarDetalle(self._$Vista_pag_Euros);
		});

		this._$Bottom_recomendacion_detalle.click(function(evt){


			self._mostrarPantalla(self._$Vista_pag_recomendaciones_detalle);
			self._cargarScroll(self._$ScrollDetalle);

			/*self._mostrarPantalla(self._$Ventana_principal);*/



		});

		this._$Botton_contratar1.click(function(evt){

			self._abrirNavegador('http://www.audaxenergia.com');

		});
		this._$Botton_contratar2.click(function(evt){

			self._abrirNavegador('http://www.eresenergia.com');

		});

				$('#Carousel-graficas').swipe({allowPageScroll:"none"});
		$('#Carousel-graficas').swipe({

			swipe:function(event, direction, distance,duration,fingerCount,fingerData){
				if ((direction)=='left'){
					$("#Carousel-graficas").carousel('next');
					servicioGraficas._graficaPie();
					servicioGraficas._graficaLinea();
					servicioGraficas._graficaBarra();
				}
				if ((direction)=='right'){
					$("#Carousel-graficas").carousel('prev');
					servicioGraficas._graficaPie();
					servicioGraficas._graficaLinea();
					servicioGraficas._graficaBarra();
				}
			}
		});

		this._$Botton_salir.click(function(evt){




			navigator.notification.confirm(
              '¿Seguro que quieres cerrar la aplicación?', // mensaje a mostrar
              self._exitFromApp, // callback a invocar cuando el botón es presionado
              'Salir', // titulo de la ventana
              'Cancelar,Si' // etiquetas de los botones
           );




		});

		this._$Botton_info.click(function(evt){

		  /*alertDismissed: function {
            // do something
           };

			navigator.notification.alert(
			'WbS ver: 0.5 Versión de Prueba',
				alertDismissed,
				'Información",
				'Done'
			);
		*/
		});

		//Boton login de entrada -> Abre la pantalla home.
		this._$Botton_entrada_login.click(function (evt){
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);
			Custombox.open({
        		target: '#modal2',
				effect: 'fadein',
				overlayColor: '#f000',
			});

		});
		//Boton login del facebook ->Abre la pantalla home.
		this._$Botton_login_facebook.click(function (evt){
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);
			Custombox.open({
        		target: '#modal2',
				effect: 'fadein',
				overlayColor: '#f000',
			});

		});
		//Boton login del Google+ -> Abre la pantalla home.
		this._$Botton_login_google.click(function(evt){
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);
			Custombox.open({
        		target: '#modal2',
				effect: 'fadein',
				overlayColor: '#f000',
			});

		});
		//Boton login de Twitter -> Abre la pantalla home.
		this._$Botton_login_twitter.click(function(evt){
			self._mostrarDetalle(self._$Detail_principal);
			self._mostrarPantalla(self._$Ventana_principal);
			console.log('Pulsado twitter');
			Custombox.open({
        		target: '#modal2',
				effect: 'fadein',
				overlayColor: '#f000',
			});

		});

	},



	_cargarScroll: function($scrollDestino)
	{
		var Wrapper = new IScroll('#wrapper',{
  zprobeType:  3,
    mouseWheel: true,
    scrollbars: true,
    bounce: true,
    keyBindings: true,
     click: true,});
		window.document.addEventListener('touchmove', function(e) {
    e.preventDefault();
			console.log('Scroll activo');
}, false);

        //document.addEventListener('DOMContentLoaded', loaded, false);

	},


	_mostrarPantalla: function ($pantallaDestino) {
		var self = this;
		var $pantallaOrigen = $('.activa');
		$pantallaOrigen.fadeOut(function () {
			$pantallaOrigen.removeClass('activa');
			$pantallaDestino.fadeIn(function () {
				$pantallaDestino.addClass('activa');
				if ($pantallaDestino == self._$Comparador) {
					servicioGraficas._graficaLinea();
					servicioGraficas._graficaPie();
					servicioGraficas._graficaBarra();

				}
			});
		});
		 /*self._navegar($pantallaDestino);*/
	},
	_mostrarDetalle: function ($detalleDestino) {
		var self = this;
		var $detalleOrigen = $('.detalle_activo');
		$detalleOrigen.fadeOut(function () {
			$detalleOrigen.removeClass('detalle_activo');
			$detalleOrigen.addClass('detalle_inactivo');
			$detalleDestino.fadeIn(function () {
				$detalleDestino.addClass('detalle_activo');
				$detalleDestino.removeClass('detalle_inactivo');
				servicioGraficas._graficaLinea(false);
			});
		});

	},

	/***************FUNCIÓN NAVEGAR********************************/
	_navegar : function($pantalla) {
        /*var id = $pantalla.attr('id');
        var titulo = 'SI o NO :: ' + id;
        var url = id;*/

        /*History.pushState($pantalla, 'prueba', $pantalla);*/
    },


	/*********************FUNCIÓN ABRIR NAVEGADOR*******************************/
	_abrirNavegador : function ($pagina){

		window.open(encodeURI($pagina),'_system','location=yes');

	},

	/********************FUNCIÓN SALIR DE LA APLICACIÓN *****************************/
	_exitFromApp: function ($buttonIndex){
            if ($buttonIndex==2){
				navigator.app.exitApp();
				}
     }


}


/******************************INICIO*******************************************************************/
$(document).ready(function () {


	app.initialize();
	controlador._inicializarUI();


});



