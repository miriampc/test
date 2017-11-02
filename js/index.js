const render = (root)=>{
    root.empty();
    const section = $('<section class="container"></section>');

    if(state.nextPage == null){
        section.append(Registro(() => render(root)));
    }else{
        section.append(state.nextPage(() => render(root)));
    };
    root.append(section);
};
const state = {
    nextPage : null
}
$( () => {
        const root =$('#formulario');
        render(root);
})
