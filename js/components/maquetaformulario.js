const formulario = () => {
  const form = $();

}

const MaquetaFormulario = (data,state) => {
  const row = $('<div class="row"></div>');
  const body = $(`<div class="col-xs-12 text-center title-section">
                    <img src="./img/${data.img}" alt="imagen numero">
                    <img src="./img/${data.img}" alt="imagen numero">
                    <img src="./img/${data.img}" alt="imagen numero">
                    <img src="./img/${data.img}" alt="imagen numero">
                  </div>`);
  const imgLeft = $(`<div class="col-md-6 col-md-offset-2 hidden-xs">
                       <img src="./img/${}" alt="${}">
                     </div>`);
  const form = $(`<div class="col-xs-12 col-md-4"></div>`);

  container.append(body);
  container.append(imgLeft);
  container.append(form);
  return row;
}
// index.js ejecutar cada form 9-13
const FormRegistro = Formulario(dataForm.registro, state);
