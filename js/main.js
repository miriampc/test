$(function() {
    $('.navbar-default .navbar-nav>li>a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 52}, 800, 'linear');
    });
});
var Main = (function($) {

    var init = function() {
        console.log("Init");

        /** Iniciando campos C.E*/
        $('div#form_otro_numero_div').slideUp();
        for(var i = 1 ; i <= 6 ; i++){ var hijo = ("_hijo"+i); $('div#form_otro_numero_div'+hijo).slideUp(); }
        /* Inic Correo Contactenos */

        $('#campos_obligatorios').hide();
    	$('#campos_correo').hide();
        $('#campos_nombre').hide();
        $('#campos_telefono').hide();

        $('#btn-contactenos').click(function(){
            $('#campos_obligatorios').hide();
    	 	$('#campos_correo').hide();
            $('#campos_nombre').hide();
            $('#campos_telefono').hide();
            irEnviarCorreo();
        });

        function irEnviarCorreo(){
	        if(validacionCampos()){
	            callServerPOST("correoContactenos.do", 
				{
					contacto_nombre		: $('#contacto_nombre').val(),
					contacto_correo		: $('#contacto_correo').val(),
					contacto_mensaje	: $('#contacto_mensaje').val(),
					contacto_telefono	: $('#contacto_telefono').val()
				}
				, {stringParams: false},  
					function(rsp) {  
						popupCorreoEnviado();
						$('#contacto_nombre').val("");
						$('#contacto_correo').val("");
						$('#contacto_mensaje').val("");
						$('#contacto_telefono').val("");
						
						$('#campos_obligatorios').hide();
						$('#campos_correo').hide();
						$('#campos_nombre').hide();
						$('#campos_telefono').hide();
					}, 
					function(xhr, ajaxOptions, thrownError) {}
				);  
 	        }		
        }
  
        function validacionCampos(){
            $('#campos_obligatorios').hide();
            $('#campos_correo').hide();
            $('#campos_nombre').hide();
            $('#campos_telefono').hide();
            
            if($('#contacto_nombre').val() == "" || $('#contacto_mensaje').val()=="" || $('#contacto_telefono').val() == ""){
                    $('#campos_obligatorios').show();
                    $('#campos_obligatorios').html("(*)Ingrese los campos obligatorios");
                    return false;
            }            
            if($('#contacto_correo').val()!=""){
                var re =   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
                if(!re.test($('#contacto_correo').val())){
                    $('#campos_correo').show();
                    $('#campos_correo').html("*Ingrese un email válido");
                    return false;
                }                  
            }            
            if($('#contacto_nombre').val() != ""){
                var texto = /^[\s-\’-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]+$/;
                if(!texto.test($('#contacto_nombre').val())){
                    $('#campos_nombre').show();
                    $('#campos_nombre').html("*Ingrese solo letras en el campo nombre");
                    return false;
                }
            }                                
            if($('#contacto_telefono').val() != ""){
                var movil = $('#contacto_telefono').val();
                if (!(/^[0-9]*$/.test($('#contacto_telefono').val()))) {
                    $('#campos_telefono').show();
                    $('#campos_telefono').html("*Ingrese solo números en el campo teléfono");
                    return false;
                }                
                if(movil.length > 9){
                    $('#campos_telefono').show();
                    $('#campos_telefono').html("*Ingrese máximo 9 dígitos");
                    return false;
                }
            }            
            return true;
        }
            
        /* Fin Correo Contactenos */


        $.validator.addMethod("validadorfecha",  validarFormatoFecha  , "Debe ser menor de 25 años");   
        $.validator.addMethod("validadormail",  validateEmail  , "Ingrese un email válido");   
        $.validator.addMethod("validadorFechaRango", validadorFechaRango , "Debe ser mayor de edad");
        jQuery.validator.addMethod("lettersonly", function(value, element) {
		    return this.optional(element) || /^[\s-\’-a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]+$/i.test(value); 
            }, "Ingrese solo letras");
                          
        $.validator.addMethod("validaDniRepetido",  validaDniAsegurado, "(*) No se puede ingresar 2 numeros de DNI iguales");   
        
    function validaDniAsegurado(){
        ///$("#form_dni_hijo"+i).val();
        var cantidad =$("#form_nro_hijos").val();
        var indice;
        indice=cantidad;
        for(i=1;i<=cantidad;i++){
            for(j=i-1;j>0;j--){
            if($('input#form_dni_numero_hijo'+i).val()!=""&& $('input#form_dni_numero_hijo'+j).val()!=""){	
                if($('input#form_dni_numero_hijo'+i).val()==$('input#form_dni_numero_hijo'+j).val()){
                    return false;
                }	
            }	
        }
            
            if(cantidad==i){
                return true;
            }
        }
    }
    
        
    function validateEmail(value , element, params) {
   	  var re =   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
   	  return re.test(value);
   	}
    
    function calcularEdad(fecha) {
   	   var hoy = new Date();
   	   var cumpleanos = new Date(fecha);
   	   var edad = hoy.getFullYear() - cumpleanos.getFullYear();
   	   var m = hoy.getMonth() - cumpleanos.getMonth();

   	   if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
   	       edad--;
   	   }
   	   return edad;
   	};
   	
    //hijo
    function validarFormatoFecha(value , element, params){
        var id = element;
        var campo = value;
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4,4}$/;
        var isOk = true;
       if ((campo.match(RegExPattern))) {
            var fechaf = campo.split("/");
            var day = fechaf[0];
            var month = fechaf[1];
            var year = fechaf[2];
            var date = new Date(month+'/'+day+'/'+year); //fecha_nacimiento

            if(date == 'Invalid Date' ) {
            	isOk = false;
            }else{
            	var hoy = new Date();
            	if(hoy < date){
            		isOk = false;
            	}else{
	            	var edad_hijo = calcularEdad(month+'/'+day+'/'+year);
	                if (edad_hijo > $('#validacion_edad').val()/*25*/){
	                	isOk = false;
	                }
            	}       
            }
        } else {
        	isOk = false;
        }
       return isOk;
    };
    
    //padre
    function validadorFechaRango(value , element, params){
        var campo = value;
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4,4}$/;
        var isOk = true;
       if ((campo.match(RegExPattern))) {
            var fechaf = campo.split("/");
            var day = fechaf[0];
            var month = fechaf[1];
            var year = fechaf[2];
            var date = new Date(month+'/'+day+'/'+year); //fecha_nacimiento

            if(date == 'Invalid Date' ) {
            	isOk = false;
            }else{
            	var hoy = new Date();
            	if(hoy < date){
            		isOk = false;
            	}else{
	            	var edad_apoderado = calcularEdad(month+'/'+day+'/'+year);
	            	
	                if (edad_apoderado < 18){
	                	isOk = false;
	                }
	                if (edad_apoderado > 90){
	                	isOk = false;
	                }
            	}       
            }
        } else {
        	isOk = false;
        }
       return isOk;
    };
    
			
			 

        /* Inic Validate formulario*/
        (function FormStepValidation(){
            console.log('Form step validation initialized'); 
            var $form = $('#formUserData');

            var formsStepValidationSettings = {
                debug:false,
                        rules: {
                form_dni: {
                    required: false,
                },
                form_dni_numero: {
                    required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8
                },
                form_otro_numero: {
                	required: true,
                	minlength : 8,
                	maxlength : 12,
                },
                form_nombres: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno: {
                    required: true,
                    lettersonly: true,
                },
                form_ap_materno: {
                    required: true,
                    lettersonly: true,
                },
                form_celular: {
                    required: true,
                    digits: true
                },
                form_email: {
                    required: true,
                    email: true,
                    validadormail : true
                },
                form_fecha_nacimiento: {
                	required: true,
                	validadorFechaRango: true
                },
                form_genero:{
                	required: true
                },
                form_nro_hijos: {
                    required: true,
                    digits: true,
                    max: 10,
                    min: 1
                },
                form_dni_hijo1: {
                    required: true
                },
                form_dni_numero_hijo1: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8
                },
                form_nombres_hijo1: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo1: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo1: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo1: {
                    required: true,
                    validadorfecha: true
                    
                },
                form_genero_hijo1: {
                    required: true,
                },

                form_dni_hijo2: {
                    required: true
                },
                form_dni_numero_hijo2: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido: true
                },
                form_nombres_hijo2: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo2: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo2: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo2: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo2: {
                    required: true,
                },

                form_dni_hijo3: {
                    required: true
                },
                form_dni_numero_hijo3: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo3: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo3: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo3: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo3: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo3: {
                    required: true,
                },

                form_dni_hijo4: {
                    required: true
                },
                form_dni_numero_hijo4: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo4: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo4: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo4: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo4: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo4: {
                    required: true,
                },

                form_dni_hijo5: {
                    required: true
                },
                form_dni_numero_hijo5: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo5: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo5: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo5: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo5: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo5: {
                    required: true,
                },

                form_dni_hijo6: {
                    required: true
                },
                form_dni_numero_hijo6: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo6: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo6: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo6: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo6: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo6: {
                    required: true,
                },

                form_dni_hijo7: {
                    required: true
                },
                form_dni_numero_hijo7: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo7: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo7: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo7: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo7: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo7: {
                    required: true,
                },

                form_dni_hijo8: {
                    required: true
                },
                form_dni_numero_hijo8: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo8: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo8: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo8: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo8: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo8: {
                    required: true,
                    
                },

                form_dni_hijo9: {
                    required: true
                },
                form_dni_numero_hijo9: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo9: {
                    required: true,
                    lettersonly : true
                },
                form_ap_paterno_hijo9: {
                    required: true,
                    lettersonly : true
                },
                form_ap_materno_hijo9: {
                    required: true,
                    lettersonly : true
                },
                form_fecha_naci_hijo9: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo9: {
                    required: true,
                },

                form_dni_hijo10: {
                    required: true
                },
                form_dni_numero_hijo10: {
                	required: true,
                    digits: true,
                    minlength : 8,
                    maxlength : 8,
                    validaDniRepetido:true
                },
                form_nombres_hijo10: {
                    required: true
                },
                form_ap_paterno_hijo10: {
                    required: true
                },
                form_ap_materno_hijo10: {
                    required: true,
                },
                form_fecha_naci_hijo10: {
                    required: true,
                    validadorfecha: true
                },
                form_genero_hijo10: {
                    required: true,
                },

                form_politica: {
                    required: true,
                },
                form_distrito: {
                    required: true,
                },
                form_provincia: {
                    required: true,
                },
                form_departamento: {
                    required: true,
                },
                form_direccion: {
                    required: true,
                    minlength : 6,
                },
                form_telefono: {
                    required: true,
                    digits: true,
                    maxlength: 9,
                },
                form_preferencia_pago: {
                    required: true,
                },
                form_otro_numero_hijo1: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo2: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo3: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo4: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo5: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo6: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo7: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo8: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo9: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                form_otro_numero_hijo10: {
                	required: true,
                    minlength: 8,
                    maxlength: 12
                },
                popupGeneroHijos1:{
                	required: true,
                },
                popupGeneroHijos2:{
                	required: true,
                },
                popupGeneroHijos3:{
                	required: true,
                },
                popupGeneroHijos4:{
                	required: true,
                },
                popupGeneroHijos5:{
                	required: true,
                },
                popupGeneroHijos6:{
                	required: true,
                },
                popupGeneroHijos7:{
                	required: true,
                },
                popupGeneroHijos8:{
                	required: true,
                },
                popupGeneroHijos9:{
                	required: true,
                },

            },
                 messages: {
                    form_dni: {
                        required: 'Seleccione el tipo de documento', 
                    },
                    form_dni_numero: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_otro_numero: {
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos',
                    },
                    form_nombres: {
                        required: 'Ingrese sus nombres',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno: {
                        required: 'Ingrese su apellido paterno'
                    },
                    form_ap_materno: {
                        required: 'Ingrese su apellido materno'
                    },
                    form_email: {
                        required: 'Ingrese su correo electrÃ³nico',
                        email: 'Ingrese un email vÃ¡lido'
                    },
                    form_genero: {
                        required: 'Ingrese el gÃ©nero'
                    },
                    form_nro_hijos: {
                        required: 'Ingrese el nÃºmero de hijo(s)',
                        digits: 'Debe ingresar solo nÃºmero',
                        max: 'Es un mÃ¡ximo de 10 hijos',
                        min: 'Debe ingresar 1 hijo como mÃ­nimo'
                    },
                    form_celular: {
                        required: 'Ingrese su nÃºmero de celular',
                        digits: 'Ingrese solo nÃºmeros'
                    },
                    form_fecha_nacimiento: {
                        required: 'Ingresar fecha de nacimiento',
                    },
                    form_dni_hijo1: {
                        required: 'Elija el tipo de documento',
                        
                    },
                    form_dni_numero_hijo1: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo1: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo1: {
                        required: 'Ingrese el apellido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo1: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo1: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo1: {
                        required: 'Ingrese el gÃ©nero',
                    },

                    form_dni_hijo2: {
                        required: 'Elija el tipo de documento',
                    },
                    form_dni_numero_hijo2: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo2: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo2: {
                        required: 'Ingrese el apllido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo2: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo2: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo2: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo3: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo3: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo3: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo3: {
                        required: 'Ingrese el apllido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo3: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo3: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo3: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo4: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo4: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo4: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo4: {
                        required: 'Ingrese el apllido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo4: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo4: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo4: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo5: {
                        required: 'Elija el tipo de documento',
                        
                    },
                    form_dni_numero_hijo5: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo5: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo5: {
                        required: 'Ingrese el apellido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo5: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo5: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo5: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo6: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo6: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo6: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo6: {
                        required: 'Ingrese el apllido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo6: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo6: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo6: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo7: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo7: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo7: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo7: {
                        required: 'Ingrese el apellido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo7: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo7: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo7: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo8: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo8: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo8: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo8: {
                        required: 'Ingrese el apellido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo8: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo8: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo8: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo9: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo9: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo9: {
                        required: 'Ingrese el nombre',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_paterno_hijo9: {
                        required: 'Ingrese el apellido paterno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_ap_materno_hijo9: {
                        required: 'Ingrese el apellido materno',
                        lettersonly: 'Ingrese solo letras',
                    },
                    form_fecha_naci_hijo9: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo9: {
                        required: 'Ingrese el gÃ©nero'
                    },

                    form_dni_hijo10: {
                        required: 'Elija el tipo de documento'
                    },
                    form_dni_numero_hijo10: {
                        required: 'Ingrese el nÃºmero de su DNI',
                        digits : 'Ingrese solo nÃºmeros',
                        minlength: 'Se requieren 8 dÃ­gitos para el DNI',
                        maxlength: 'Se requieren 8 dÃ­gitos para el DNI'
                    },
                    form_nombres_hijo10: {
                        required: 'Ingrese el nombre'
                    },
                    form_ap_paterno_hijo10: {
                        required: 'Ingrese el apellido paterno'
                    },
                    form_ap_materno_hijo10: {
                        required: 'Ingrese el apellido materno'
                    },
                    form_fecha_naci_hijo10: {
                        required: 'Ingresar fecha de nacimiento'
                    },
                    form_genero_hijo10: {
                        required: 'Ingrese el gÃ©nero'
                    },
                    
                    form_politica: {
                        required: 'Debes aceptar las polÃ­ticas sobre protecciÃ³n de datos'
                    },
                    form_distrito: {
                        required: 'Seleccione su distrito'
                    },
                    form_provincia: {
                        required: 'Seleccione su provincia'
                    },
                    form_departamento: {
                        required: 'Seleccione su departamento'
                    },
                    form_direccion: {
                        required: 'Ingrese su direcciÃ³n',
                        minlength : 'Ingrese mÃ­nimo 6 dÃ­gitos'
                    },
                    form_telefono: {
                        required: 'Ingrese su telÃ©fono',
                        digits: 'Ingrese solo nÃºmeros',
                        maxlength : 'Ingrese mÃ¡ximo 9 dÃ­gitos'
                    },
                    form_preferencia_pago: {
                        required: 'Elija su preferencia de pago'
                    },
                    form_otro_numero_hijo1:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos'
                    },
                    form_otro_numero_hijo2:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 digitos'
                    },
                    form_otro_numero_hijo3:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos'
                    },
                    form_otro_numero_hijo4:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos'
                    },
                    form_otro_numero_hijo5:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos'
                    },
                    form_otro_numero_hijo6:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos',
                    },
                    form_otro_numero_hijo7:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos',
                    },
                    form_otro_numero_hijo8:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos',
                    },
                    form_otro_numero_hijo9:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos',
                    },
                    form_otro_numero_hijo10:{
                        required: 'Ingrese el nÃºmero de documento',
                        minlength: 'Se requieren mÃ­nimo 8 dÃ­gitos',
                        maxlength: 'Se requieren mÃ¡ximo 12 dÃ­gitos'
                    },
                    popupGeneroHijos1:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos2:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos3:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos4:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos5:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos6:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos7:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos8:{
                        required: 'Ingrese el gÃ©nero',
                    },
                    popupGeneroHijos9:{
                        required: 'Ingrese el gÃ©nero',
                    },
                }
            };

            function validateSteps(e) {
                e.preventDefault();
                if ( $form.valid() ) {
                    switch( e.data.currentStep ) {
                        case 1:
                            nextPaso2();                            
                            break;
                        case 2:
                            nextPaso3();
                            break;
                        case 3:
                            nextPaso4();
                            break;
                        case 4:
                            // nextPaso5();
                            break;
                        case 'submit':
                            // $form.submit();
                            break;
                    }
                } else {
                    console.log('Form is not valid', $form.valid());
                }
            }

            $form.validate(formsStepValidationSettings);

            $('#btn-paso1').on('click', {currentStep: 1}, validateSteps);
            $('#btn-paso2').on('click', {currentStep: 2}, validateSteps);
            $('#btn-paso3').on('click', {currentStep: 3}, validateSteps);
            $('#btn-paso4').on('click', {currentStep: 4}, validateSteps);
            $('#btn-paso5').on('click', {currentStep: 'submit'}, validateSteps);

        })();

        campoHijos = function(){
            var nrohijos = Number($('select.ingreso-hijos').val());
            var $allChild = $('.campo_hijo');
            $allChild.hide();

            // Si el numero de hijos ingresado es mayor a 0 
            // Muestra los campos de hijos
            if (nrohijos > 0) {
                // Hace un loop por el array de elementos
                $allChild.each(function(i){
                    // Si el indice i es mayor o igual
                    // al numero de hijos ingresado hace un return para detener el loop
                    if ( i >= nrohijos) return;
                    // muestra el elemento actual del loop
                    $(this).fadeIn('fast');
                    // if(nrohijos != i){
                    //     $(this).fadeOut('fast')
                    // }
                });
            // Si el numero de hijos no es mayor a cero
            } else {
                // Oculta todos los campos de hijos
                $allChild.fadeOut('fast');
            }
            
        };


        changeTipoDocumento = function(case_hijo){
            var hijo = "";
            if(case_hijo > 0){
                hijo = "_hijo"+case_hijo;
            }

            var tipodoc = $('select#form_dni'+hijo).val();
            var campo_dni = $('div#form_dni_numero_div'+hijo);
            var campo_otro = $('div#form_otro_numero_div'+hijo);

            if(tipodoc == '1'){                
                campo_otro.slideUp();
                campo_dni.slideDown();
            }else if(tipodoc == '2'){
                campo_dni.slideUp();
                campo_otro.slideDown();
            }
        }


        mostrarCampos = function(e){
            
            var otro_documento = $('input.otro-doc-ingresado').val();
            var tipodoc = $('select.tipo-doc').val();
            var campos = $('.field-invisible');

            if (tipodoc === '2' && otro_documento.length>=8 && otro_documento.length <= 12 ) {
                campos.slideDown();
                console.log("Despliega campos");
            }else {
                campos.slideUp();
                console.log("Oculta campos");
            }

        };

        nextPaso2 = function(){
            $('#registro').fadeOut('fast');
            $('#direccion').fadeIn('fast').animate({
                right: '0',
                opacity: 1
            },300).css({'position':'relative', 'top':'0px'});
        };
        nextPaso3 = function(){
            $('#direccion').fadeOut('fast');
            $('#hijos').fadeIn('fast').animate({
                right: '0',
                opacity: 1
            },300).css({'position':'relative', 'top':'0px'});

        };
        nextPaso4 = function(){
            $('#hijos').fadeOut('fast');
            $('#culqi').fadeIn('fast').animate({
                right: '0',
                opacity: 1
                
            },300).css({'position':'relative', 'top':'0px'});
            // $.LoadingOverlay("hide");
        };
        
        prevPaso1 = function(){
            $('#registro').fadeIn('slow');
            $('#direccion').animate({
                right: '-100%',
                opacity: 0
            },300).fadeOut('fast').css({'position':'relative', 'top':'-422px'});
            
        };
        prevPaso2 = function(){
            $('#direccion').fadeIn('slow');
            $('#hijos').animate({
                right: '-100%',
                opacity: 0
                
            },300).fadeOut('fast').css({'position':'relative', 'top':'-388px'});
        };
        prevPaso3 = function(){
            $('#hijos').fadeIn('slow');
            $('#culqi').animate({
                right: '-100%',
                opacity: 0
                
            },300).fadeOut('fast').css({'position':'relative', 'top':'-388px'});
        };
        

        $('#btn-prev-paso1').on('click' , prevPaso1);
        $('#btn-prev-paso2').on('click' , prevPaso2);
        $('#btn-prev-paso3').on('click' , prevPaso3)
        $('#formUserData').on('input', mostrarCampos);
        $('#form_nro_hijos').on('change',campoHijos);


        /**Datepicker */
        
        //Datepicker hijos 
        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miï¿½rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Miï¿½', 'Juv', 'Vie', 'SÃ¡b'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'SÃ¡'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            minDate: '-26Y',
            maxDate: '0',
            yearRange: "-26Y:+0",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };

        
        // Nuevo
        $.datepicker.setDefaults($.datepicker.regional['es']);
        
        $('.datepicker').datepicker({
            //yearRange: "1992:2017", // Se cambio el rango de aÃ±Ã±os (1992:2017) 
            changeMonth: true,
            changeYear: true
        });
        
        //Apoderado
        $(".datepickerApoderado").datepicker({ 
        	closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miï¿½rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Miï¿½', 'Juv', 'Vie', 'SÃ¡b'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'SÃ¡'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            maxDate: '-18Y',
            minDate: '-90Y',
            yearRange: "-90Y:-18Y",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
        	changeMonth: true,
            changeYear: true
        });
        
        /* Fin Validate formulario*/

    }

    return {
        init: init()
    };

})(jQuery);
