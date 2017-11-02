const dataNoCobertura = [
  {img:"3-no-accidente.png", text:"Todo lo que no sea a consecuencia de un accidente.", alt:"imagen accidente"},
  {img:"3-clinicas-no-afiliadas.png", text:"Atenciones en clínicas no afiliadas.", alt:"imagen clinicas no afiliadas"},
  {img:"3-insolacion.png", text:"Insolación.", alt:"imagen insolación"},
  {img:"3-intoxicacion.png", text:"Intoxicación.", alt:"imagen intoxicación"},
  {img:"3-equipos-ortopedicos.png", text:"Equipos ortopédicos, prótesis y audifonos.", alt:"imagen equipos ortopédicos"},
  {img:"3-transplante.png", text:"Transplante de órganos así sean derivados de un accidente.", alt:"imagen transplante"}
];
$( () => {
  const NoCoberturas = () => {
    const container = $(`<div></div>`);
    dataNoCobertura.forEach(item => {
      const itemNoCobertura = $(`<div class="col-xs-12 col-md-6 item-no-cobertura">
                                  <div class="col-xs-4">
                                    <img class="img-responsive" src="./img/3-que-no-cubrimos/${item.img}" alt="${item.alt}">
                                  </div>
                                  <div class="col-xs-8 text-no-cobertura bg-box-radius">
                                    <p>${item.text}</p>
                                  </div></div>`);

      container.append(itemNoCobertura);
    });
    return container;
  }
  $('#nocoberturas').append(NoCoberturas());
});
