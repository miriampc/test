const dataComoComprar = [
  {img:"6-formulario.png", text:"Llena los datos para afiliación <a class='link-red' href='#'>aquí</a>.", alt:"imagen formulario"},
  {img:"6-forma-pago.png", text:"Realiza el pago usando el medio de tu preferencia.", alt:"imagen forma de pago"},
  {img:"6-informacion-mail.png", text:"Recibe el email de confirmación de compra.", alt:"imagen información email"},
  {img:"6-poliza.png", text:"Recibe la póliza física 15 días después.", alt:"imagen poliza"}
];
$( () => {
  const ComoComprar = () => {
    const container = $(`<div></div>`);
    let offset2 = 2;
    dataComoComprar.forEach(item => {
      const itemNoCobertura = $(`<div class="col-xs-12 col-sm-8 item-como-comprar col-sm-offset-${offset2-1} col-md-offset-${offset2}">
                                    <div class="col-xs-4 col-sm-3 col-md-2">
                                      <img class="img-responsive" src="./img/6-como-comprar/${item.img}" alt="${item.alt}">
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-md-6 text-no-cobertura bg-box-radius">
                                      <p>${item.text}</p>
                                    </div>
                                  </div>`);

      container.append(itemNoCobertura);
      offset2++;
    });
    return container;
  }
  $('#comocomprar').append(ComoComprar());
});
