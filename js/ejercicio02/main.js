function asignarClase(clase){
let div  = document.getElementById('boxEstilos');

div.className = clase;
}

function agregarClase(clase){
    let div = document.getElementById('boxEstilos');

    div.classList.add(clase);
}

function agregarFila (id){
    let tabla = document.getElementById(id);

    let tr = document.createElement("tr");
    tr.className = "row";
    tr.innerText = "NUEVA FILA"

    tabla.append(tr);
}