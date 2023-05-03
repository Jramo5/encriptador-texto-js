/**
 * Esta constante almacena todas las letras que se utilizaran para cifrar o decifrar texto
 * @type {Array<String>}
 */
const VOCALES = ["e", "i", "a", "o", "u"]
/**
 * La constante DICCIONARIO almacena todas las palabras que se utilizaran para decifrar o cifrar el texto
 * @type {Array<String>}
 */
const DICIONARIO = ["enter", "imes", "ai", "ober", "ufat"];
const TEXT = document.getElementById("text");
const BTN_ENCRIPTAR = document.getElementById("btn-encriptar");
const BTN_DESENCRIPTAR = document.getElementById("btn-desencriptar");
const RESULTADO_TEXTO = document.getElementById("texto-encriptado");
const BTN_COPIAR = document.getElementById("btn-copiar");
const MENSAJE_NO_ENCONTRADO = document.getElementById("ningun-mensaje")
const MENSAJE_ERROR = document.getElementById("modal-error");

let LETRAS_PERMITAS = /^[a-z,.\s\t]+$/

/**
 * Esta funcion valida el texto enviado desde la consulta de decifrar o cifrar texto
 * @param {String} texto    Recibe la cadena de texto del text area 
 * @returns {String} Returna el texto si cumple con las condiciones de la constante LETRAS_PERMITIDAS
 */
function validadorTexto(texto) {
    texto = texto.value.toLowerCase().trim();
    if (!LETRAS_PERMITAS.test(texto)) {
        return false;
    } else {
        return texto;
    }
}

/**
 * Si se desea cifrar texto, la funcion cifrador recibe los array VOCALES Y DICCIONARIO y viceversa si se desea
 * decifrar texto
 * @param {Array} condicion Recibe el array DICCIONARIO O VOCALES
 * @param {Array} condicion2 Recibe el array VOCALES o DICCIONARIO
 * @param {String} text Recibe el texto enviado desde el textarea 
 * @returns {String} Devuelve el texto cifrado o decifrado
 */
function cifrador(condicion, condicion2, text) {
    let caracteresDivididos = condicion.join("|");
    let expReg = new RegExp(caracteresDivididos, "g");
    let texto = "";
    try {
        texto = text.replace(expReg, function (result) {
            return condicion2[condicion.indexOf(result)];
        });
    } catch (error) {
        MENSAJE_ERROR.style.display = "block"
        BTN_COPIAR.style.display = "none";
    }
    return texto;
}

function btnCopiarTxt() {
    /**
     * Valida si el textarea donde se muestra el texto cifrado o decifrado no se encuentre
     * vacio, para mostrar el boton para copiar el texto
     */
    if (RESULTADO_TEXTO.value !== "") {
        MENSAJE_NO_ENCONTRADO.style.display = "none";
        BTN_COPIAR.style.display = "flex";
    }
}

    /**
     * Se escucha un evento de click en el boton BTN_COPIAR para mostrar los mensajes u errores.
     */

    BTN_COPIAR.addEventListener('click', () => {
        let clipboard = document.getElementById("clipboard")
        let textCopiar = document.getElementById("text-copiar");
        let clipboardCheck = document.getElementById("clipboard-check")

        // Copia el texto al portapapeles
        navigator.clipboard.writeText(RESULTADO_TEXTO.value);

        clipboard.style.display = "none"
        clipboardCheck.classList.remove("bi-clipboard-check");
        BTN_COPIAR.classList.remove("btn-copiarText");
        BTN_COPIAR.classList.add("btn-copiado");
        textCopiar.innerHTML = "¡Copiado!"

        modalMensajeCopiado()

        /**
         * Despues de haber pasado 1.8s de haber hecho click en BTN_COPIAR, se quitan los estilos 
         * al boton de copiar para devolverlo a su estado original con su texto e icono.
         */
        setTimeout(function () {
            clipboard.style.display = "flex"
            clipboardCheck.classList.add("bi-clipboard-check");
            BTN_COPIAR.classList.add("btn-copiarText");
            BTN_COPIAR.classList.remove("btn-copiado");
            textCopiar.innerHTML = "Copiar"
        }, 1800);
    });

function modalMensajeCopiado() {
    let mensajeCopiadoEntrada = document.getElementById("modal-mensaje-copiado");

    mensajeCopiadoEntrada.style.display = "block"

    /**
     * Despues de haber pasado 1.53s de haber hecho click en BTN_COPIAR se muestra una ventana 
     * modal que notifica que se ha copiado el texto al portapapeles, añadiendo efectos establecidos en clases
     * en el css
     */
    setTimeout(() => {
        mensajeCopiadoEntrada.classList.remove("mensaje-copiado-entrada");
        mensajeCopiadoEntrada.classList.add("mensaje-copiado-salida")
    }, 1530);

    /**
     * Despues de haber pasado 1.8s de haber hecho click en BTN_COPIAR se devuelve a la ventana modal 
     * a sus propiedades originales
     */
    setTimeout(() => {
        mensajeCopiadoEntrada.classList.add("mensaje-copiado-entrada");
        mensajeCopiadoEntrada.classList.remove("mensaje-copiado-salida")
        mensajeCopiadoEntrada.style.display = "none"
    }, 1800);
}

/**
 * Al hacer clic en el boton BTN_ENCRIPTAR se ejecuta una funcion anonima, que primero valida el texto
 * recibido del text area y luego lo envia a cifrar almacenando su resultado en una nueva variable.
 * Luego se llama a la funcion btnCopiarText, que habilita el boton para copiar el texto
 */
BTN_ENCRIPTAR.onclick = function () {
    let texto = validadorTexto(TEXT);
    RESULTADO_TEXTO.value = cifrador(VOCALES, DICIONARIO, texto)
    TEXT.value = ""
    btnCopiarTxt();
};

/**
 * Al hacer clic en el boton BTN_DESENCRIPTAR se ejecuta una funcion anonima, que primero valida el texto
 * recibido del text area y luego lo envia a descifrar almacenando su resultado en una nueva variable.
 * Luego se llama a la funcion btnCopiarText, que habilita el boton para copiar el texto
 */
BTN_DESENCRIPTAR.onclick = function () {
    let texto = validadorTexto(TEXT);
    RESULTADO_TEXTO.value = cifrador(DICIONARIO, VOCALES, texto)
    btnCopiarTxt();
    TEXT.value = ""
};

// Se cierra la ventana de mensaje error cuando se le haga click en el boton

/**
 * Se crea una variable y se le asigna un evento de click en un boton que cierra el modal de error mostrado si
 * al momento de cifrar un texto ha ocurrido un error.
 */
let mensajeErrorBtn = document.getElementById("mensaje-error").addEventListener("click", () => {
    MENSAJE_ERROR.classList.remove("modalTextError");
    MENSAJE_ERROR.classList.add("modalTextErrorClose");

    /**
     * Se devuelve al modal a su estado original devolviendole sus efectos originales previamente establecidos
     * en el css, y se oculta el modal.
     */
    setTimeout(() => {
        MENSAJE_ERROR.classList.add("modalTextError");
        MENSAJE_ERROR.classList.remove("modalTextErrorClose")
        MENSAJE_ERROR.style.display = "none";
    }, 400);

})

/**
 * Se cierra el modal mostrado la informacion de @jramo5
 */

let cerrarVentana = document.getElementById("cerrar").addEventListener("click", function () {
    let modal = document.getElementById("modal");
    modal.style.display = "none"
});

