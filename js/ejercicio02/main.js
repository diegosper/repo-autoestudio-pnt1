function asignarClase(clase){
let div  = document.getElementById('boxEstilos');

div.className = clase;

}

function agregarClase(clase){
    let div = document.getElementById('boxEstilos');

    div.classList.add(clase);
}