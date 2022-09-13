
function modificarEstilos(color, tamañoFuente, tipoFuente) /*,tamañoFuente,tipoFuente)*/{
    let div = document.getElementById('textColor');
    let resultado = preguntar('¿Está seguro que desea modificar el estilo?');

    if (resultado) {
        div.style.color=color;
        div.style.fontSize=tamañoFuente;
        div.style.fontFamily=tipoFuente;
        
    }

}

function preguntar(text){
    return confirm(text);
}
