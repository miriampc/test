var Main = (function($) {

    var init = function() {
        console.log("Init");

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
                    contacto_nombre     : $('#contacto_nombre').val(),
                    contacto_correo     : $('#contacto_correo').val(),
                    contacto_mensaje    : $('#contacto_mensaje').val(),
                    contacto_telefono   : $('#contacto_telefono').val()
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
        /* Inic Validate formulario*/
        (function FormStepValidation(){
            console.log('Form step validation initialized');
            var $form = $('#formUserData');

            var formsStepValidationSettings = {
                debug:false,
                rules: {
                    form_dni: {
                        required: true
                    },
                    form_dni_numero: {
                        required: true,
                        digits: true
                    },
                    form_nombres: {
                        required: true
                    }
                },
                messages: {
                    form_dni: {
                        required: 'Seleccione el tipo de documento',
                    },
                    form_dni_numero: {
                        required: 'Ingrese el número de su DNI',
                        digits: 'Ingrese solo números'
                    },
                    form_nombres: {
                        required: 'Ingrese sus nombres'
                    }
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
                            nextPaso5();
                            break;
                        case 'submit':
                            $form.submit();
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


        /* Fin Validate formulario*/
    }

    return {
        init: init()
    };

})(jQuery);
