const dataContacto = [
  {img:"7-llamanos.png", text:"Llamanos al <strong>411-1000 anexo 1860</strong>", alt:"imagen teléfono"},
  {img:"7-whatsapp.png", text:"Envianos un Whatsapp al <strong>957-228-859</strong>", alt:"imagen Whatsapp"},
  {img:"7-chat.png", text:"Chatea con nosotros.", alt:"imagen chat"}
];
$(() => {
  const Contacto = () => {
    const container = $(`<div></div>`);
    dataContacto.forEach(item => {
      const itemContacto = $(`<div class="col-xs-12 item-cobertura">
                                  <div class="col-xs-4">
                                    <img class="img-responsive" src="./img/7-contactanos/${item.img}" alt="${item.alt}">
                                  </div>
                                  <div class="col-xs-8 text-cobertura">
                                    <p>${item.text}</p>
                                  </div></div>`);

      container.append(itemContacto);
    });
    return container;
  }
  $('#contacto').append(Contacto());
});
