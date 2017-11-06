const dataCobertura = [
  {img:"2-gastos.png", text:"Gastos del accidente al 100% sin pagos adicionales en la atención.", alt:"imagen gastos"},
  {img:"2-clinicas.png", text:"Atención en clínicas privadas afiliadas <a class='link-red' href='#'>más info</a>.", alt:"imagen clinicas"},
  {img:"2-medicinas-recetadas.png", text:"Medicinas recetadas al 100%.", alt:"imagen medicinas"},
  {img:"2-hospitalizacion-tiempo.png", text:"Hospitalización al 100% por el tiempo que sea necesario.", alt:"imagen hospital"},
  {img:"2-laboratorios-imagenes.png", text:"Laboratorio e imágenes al 100%.", alt:"imagen laboratorio"},
  {img:"2-cirugias.png", text:"Cirugías, operaciones y rehabilitación al 100%.", alt:"imagen cirugía"},
  {img:"2-atenciones-medicas.png", text:"Atenciones médicas al 100%.", alt:"imagen atención médica"},
  {img:"2-rehabilitacion.png", text:"Rehabilitación al 100%.", alt:"imagen rehabilitación"}
];
$( () => {
  const Coberturas = () => {
    const container = $(`<div></div>`);
    dataCobertura.forEach(item => {
      const itemCobertura = $(`<div class="col-xs-12 col-md-6 item-cobertura">
                                  <div class="col-xs-4">
                                    <img class="img-responsive" src="./img/2-que-cubre/${item.img}" alt="${item.alt}">
                                  </div>
                                  <div class="col-xs-8 text-cobertura">
                                    <p>${item.text}</p>
                                  </div></div>`);

      container.append(itemCobertura);
    });
    return container;
  }
  $('#coberturas').append(Coberturas());
});
