
function modificarEstilos(color, tamañoFuente, tipoFuente) /*,tamañoFuente,tipoFuente)*/{
    let div = document.getElementById('textColor');

    div.style.color=color;
    div.style.fontSize=tamañoFuente;
    div.style.fontFamily=tipoFuente;

}
