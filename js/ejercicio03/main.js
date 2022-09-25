let textoAComparar = document.getElementById("captcha").innerText;
let resultado = document.getElementById("resultado");
let inputTexto = document.getElementById("inputTexto");

inputTexto.onkeyup = function () {
    if (inputTexto.value === textoAComparar) {
        resultado.innerText = "Coincide";
        resultado.style.color = "green";
    } else {
        resultado.innerText = "No coincide";
        resultado.style.color = "red";
    }




}