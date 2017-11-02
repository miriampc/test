const dataComoComprar = [
  {img:"6-formulario.png", text:"Llena el formulario aquí.", alt:"imagen formulario", imgFlecha:"6-flecha.png", altFlecha:"imagen flecha"},
  {img:"6-forma-pago.png", text:"Elige la forma de pago.", alt:"imagen forma de pago", imgFlecha:"6-flecha.png", altFlecha:"imagen flecha"},
  {img:"6-informacion-mail.png", text:"Recibe el mail de información de compra.", alt:"imagen información email", imgFlecha:"6-flecha.png", altFlecha:"imagen flecha"},
  {img:"6-poliza.png", text:"Recibe tu póliza física 15 días después.", alt:"imagen poliza", imgFlecha:"", altFlecha:""}
];
$( () => {
  const ComoComprar = () => {
    const container = $(`<div></div>`);
    dataComoComprar.forEach(item => {
      const itemNoCobertura = $(`<div class="col-xs-12">
                                    <div class="col-xs-4 col-md-2">
                                      <img class="img-responsive" src="./img/6-como-comprar/${item.img}" alt="${item.alt}">
                                    </div>
                                    <div class="col-xs-8 col-md-6 text-no-cobertura bg-box-radius">
                                      <p>${item.text}</p>
                                    </div>
                                    <div class="col-xs-6 col-xs-offset-6 col-md-8 col-md-offset-4">
                                      <img class="img-responsive" src="./img/6-como-comprar/${item.imgFlecha}" alt="${item.altFlecha}">
                                    </div>
                                  </div>`);

      container.append(itemNoCobertura);
    });
    return container;
  }
  $('#comocomprar').append(ComoComprar());
});
