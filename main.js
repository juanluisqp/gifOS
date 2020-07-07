const temas = ["sailorDay", "sailorNight"];

const temaElegido = document.querySelector("#colorTheme");
const temaDia = document.getElementById("temaDia");
const temaNoche = document.getElementById("temaNoche");
const logo = document.querySelector(".logo");



temaDia.onclick = () => {
    temaElegido.setAttribute("href", "sailorDay.css");
    logo.setAttribute("src", "imagenes/gifOF_logo.png");
}

temaNoche.onclick = () => {
    temaElegido.setAttribute("href", "sailorNight.css")
    logo.setAttribute("src", "imagenes/gifOF_logo_dark.png");
    
}
   



