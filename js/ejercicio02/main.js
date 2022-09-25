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
    let cantFilas = tabla.getElementsByTagName("tr").length;
    let tr = document.createElement("tr");
    
    let td1 = document.createElement("td");
    td1.innerText = "Celda{" + (cantFilas+1) + ",1}"
    
    let td2 = document.createElement("td");
    td2.innerText = "Celda{" + (cantFilas+1) + ",2}"
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tabla.appendChild(tr);
    
    
    console.log(cantFilas);
}