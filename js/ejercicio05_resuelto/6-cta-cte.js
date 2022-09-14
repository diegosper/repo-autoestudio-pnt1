const opExtraer = "Extraer";
const opDepositar = "Depositar";
const decimalSep = navigator.language;//"en-US";//"es-AR";//
const hoy = new Date(new Date().setUTCHours(0,0,0,0));
const ops = [opDepositar,opExtraer]
const tituloError = "ERROR!!!"
const tituloAdv = "Cuidado!!!"
const tituloEjemplo = "-Ejemplo-"
const opSeleccionada = document.querySelector("#operacion");
const tBody = document.querySelector("tbody");
const balance = document.querySelector("div.alert.alert-warning span");
const fechaEntrada = document.querySelector("#inputFecha");
const montoEntrada = document.querySelector("#inputMonto");
const tabla = document.querySelector("table");

//Para ejecutar estas funciones al finalizar la creación del documento.
window.onload = function(){
    console.log('Se cargó toda la página');
};

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('Se cargó toda la estructura del documento.');
    InicializarSelectorOperacion();
    InicializarCalendar();
    InicializarMonto();
    InicializarBalance();
});

//Se puede usar window.onload y jquery, pero este, es más rapido, dado que no 


//Inicialización
function InicializarSelectorOperacion() {
    var opSel = opSeleccionada;

    for (i = 0; i < ops.length; i++) {
        var opNew = CrearElemento("option");
        opNew.value = ops[i];
        SetInnerText(opNew,ops[i]);        
        opSel.appendChild(opNew);
    }
}

function InicializarCalendar() {
    fechaEntrada.valueAsDate = hoy;
}

function InicializarMonto() {    
    SetInputMonto(undefined);
}

function InicializarBalance(){
    if(tBody.childElementCount > 0){
        //obtengo el ultimo valor
        var ultimoSaldo = tabla.querySelector("tbody > tr:last-Child").querySelector("td:last-Child").innerText
        
        SetBalanceTotal(
            RemoverMoneda(ultimoSaldo)
        );
    }
    else{
        //inicializo en 0.
        SetBalanceTotal(0);
    }
}

function SetDefault() {    
    InicializarCalendar();
    InicializarMonto();
}


///////////////////////

function ejecutarOperacion() {
    //En este caso solo valido el monto, pero podria estar realizando otras validaciones en el mismo momento.    
    if (MontoEsValido() && FechaValida()) {
        var newBalance = CalcularBalance();

        tBody.appendChild(
            NewFila(
                NewCelda(GetInputFecha()),
                NewCeldaFormateada(AgregarMoneda(GetMontoConSigno())),
                NewCelda(AgregarMoneda(newBalance))
            )
        )
        SetBalanceTotal(newBalance);
    }
    else if(!FechaValida()){
        MostrarMensaje("La fecha no es válida",tituloError);
    }
    else{
        // alert("El monto no puede ser negativo");
        MostrarMensaje("El monto no puede ser negativo",tituloAdv);
    }
    SetDefault();   
}

function NewFila(td1, td2, td3) {
    var tr = CrearElemento("tr");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    return tr;
}

function NewCelda(val) {
    var td = CrearElemento("td");
    SetInnerText(td,val);        
    return td;
}

function NewCeldaFormateada(val) {
    var td = CrearElemento("td");
    td.innerText = val;
    if(GetInputOperacion() == opExtraer){
        td.classList.add("text-danger");
    }
    else{
        td.classList.add("text-success");                
    }
    return td;
}

function GetInputMonto() {
    var inMonto = montoEntrada.value

    if (!inMonto) {
        return parseFloat(0, 10).toFixed(2);
    } else {        
        return parseFloat(inMonto, 10).toFixed(2);
    }
}

function SetInputMonto(valor){
    montoEntrada.value = valor;
}

function GetMontoConSigno(){
    var monto = GetInputMonto();
    
    if( monto != 0){
        if(GetInputOperacion() == opExtraer){
            //Extraccion
            return Number(-monto).toFixed(2);
        }   
    }
    return monto
}

function MontoEsValido(){
    var inMonto = GetInputMonto();

    if(inMonto == 0){
        MostrarMensaje("Mostrar un mensjae, no deberia estar acá, pero Monto = 0 no debería estar permitido tampoco.",tituloEjemplo);
    }    

    if (!inMonto) {
        return true;
    } else {
        if (inMonto < 0) {            
            return false;
        }
        return true;
    }
}

function FechaValida(){    
    return fechaEntrada.valueAsDate >= hoy;  //Se podria validar también la del utlimo movimiento adicionalmente.  
}

function GetInputFecha() { 
    //El input con tipo Date, hace una entrada de fecha con UTC - osea la zona horaria central.
    //En argentina por ejemplo somos GMT -03:00 horas, osea, 180 minutos.
    //Ver el valor de la fecha, como si fuese date, la muestra correctamente, pero las 0 horas del día x, 
    //para nosotros es el día anterior, porque faltan 3 horas, para llegar a las 0.
    //Por esto, podemos hacer un calculo, independientemente de la configuración regional del equipo donde se ejecute.

    fechaEn3 = new Date (fechaEntrada.valueAsDate.setUTCHours(0,fechaEntrada.valueAsDate.getTimezoneOffset(),0,0));
    return fechaEn3.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });    
}

function GetFechaUltimoMovimiento(){
    var cantFilas = tBody.querySelectorAll("tr").length;

    var ultimaFecha = GetInnerText(tBody.querySelector("tr:nth-child("+ cantFilas+ ") > td:nth-child(1)"));
    return ultimaFecha;
}

function GetInputOperacion() {
    return document.querySelector("#operacion").value;
}

function GetBalanceTotal() {
    var montoBalance = GetInnerText(balance);    
    return RemoverMoneda( montoBalance.replace(",", GetDecimalSeparator(decimalSep)) );
}

function SetBalanceTotal(numb) {
    SetInnerText(balance,AgregarMoneda(numb));    
}

function CalcularBalance() {
    if (GetInputOperacion() == opExtraer) {
        //extracción
        return (Number(GetBalanceTotal()) - Number(GetInputMonto())).toFixed(2);
    } else if (GetInputOperacion() == opDepositar) {
        //Deposito
        return (Number(GetBalanceTotal()) + Number(GetInputMonto())).toFixed(2);
    }
    else{
        // alert("La operación solicitada no es válida");
        MostrarMensaje("La operación solicitada no es válida",tituloError);
        throw new Error("La operación solicitada no es válida");
    }
}

function GetDecimalSeparator(locale) {
    const numberWithDecimalSeparator = 1.1;
    return Intl.NumberFormat(locale)
        .formatToParts(numberWithDecimalSeparator)
        .find(part => part.type === 'decimal')
        .value;
}

function MostrarMensaje(mensaje,titulo){
    var modalMsg = document.querySelector(".modal-body");
    var modalTit = document.querySelector("#miModalTitulo");
    modalMsg.innerText = mensaje;
    modalTit.innerText = titulo;
    $('#miModal').modal('show')
}

function RemoverMoneda(monto) {
    return monto.replace("$", "");
}

function AgregarMoneda(monto) {
    return monto[0] == "$" ? monto : "$" + monto
}

function CrearElemento(tagname){
    return document.createElement(tagname);
}

function SetInnerText(elemento,valor){
    elemento.innerText = valor;
}

function GetInnerText(elemento){
    return elemento.innerText;
}