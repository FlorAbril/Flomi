const cuadro = document.getElementById("area_de_dibujo");
const papel = cuadro.getContext("2d");
const boton_borrar_todo = document.getElementById("boton_borrar_todo");
const boton_borrar = document.getElementById("boton_borrar");
const boton_dibujar = document.getElementById("boton_dibujar");
const contenedorColores = document.querySelector(".colores");
let x_dibujo; //donde comienza el trazo de dibujo
let y_dibujo;
let dibujando = false;
let borrando = false;
let colorActual = "black";
let formaActual = "round";

cuadro.width = innerWidth * 0.75;
cuadro.height = innerHeight * 0.9;

/////// boton de borrar todo
boton_borrar_todo.onclick = borrarTodo;

//////////boton de borrar
boton_borrar.onclick = borrar;

/////////// boton de dibujar 
boton_dibujar.onclick = dibujar;

cuadro.addEventListener("mousemove", dibujarOBorrarConMouse);
document.addEventListener("mouseup", dibujoOBorradorInactivo);

dibujar();

function borrar() {
    // cuadro.onmousedown = borradorActivo;
    colorActual = "white";
    formaActual = "butt"
}
function dibujar() {
    cuadro.onmousedown = dibujoActivo;
}

// function borradorActivo(evento) {
//     papel.clearRect(evento.offsetX, evento.offsetY, 30, 30);
//     borrando = true;
//     dibujando = false;
// }
function dibujoActivo(evento) {
    x_dibujo = evento.offset;
    y_dibujo = evento.offsetY;
    dibujando = true;
    // borrando = false;
}


function dibujarOBorrarConMouse(evento) {
    if (dibujando === true) {
        dibujarLineas(colorActual, x_dibujo, y_dibujo, evento.offsetX, evento.offsetY, papel);
        x_dibujo = evento.offsetX;
        y_dibujo = evento.offsetY;
    }
    // if (borrando === true) {
    //     papel.clearRect(evento.offsetX, evento.offsetY, 20, 20);
    // }
}

function dibujoOBorradorInactivo(evento) {
    // if (borrando === true) {
    //     papel.clearRect(evento.offsetX, evento.offsetY, 20, 20);
    //     borrando = false;
    // }
    if (dibujando === true) {
        dibujarLineas(colorActual, x_dibujo, y_dibujo, evento.offsetX, evento.offsetY, papel, formaActual);
        x_dibujo = 0;
        y_dibujo = 0;
        dibujando = false;
    }
}

function borrarTodo() {
    let m = confirm("Quiere borrar el dibujo?");

    if (m) {
        papel.clearRect(0, 0, cuadro.width, cuadro.height
            );

    }
}

const crearColor = (colorName) =>{
    const color = document.createElement('div');
    color.className = "color"
    color.style.background = colorName
    color.onclick = ()=> colorActual = colorName;
    contenedorColores.appendChild(color);
}

const colores = ["blue","green","red","orange","yellow","pink","purple","black","white","grey","brown","violet","teal","lightblue","darkblue","turquoise","lightgreen","darkgreen","lavender","magenta","fuchsia","lime","coral","gold","silver","beige	","cyan","maroon","salmon","tan","aquamarine","crimson"];

colores.map((color)=>crearColor(color))

// dibujar una linea
function dibujarLineas(color, xinicial, yinicial, xfinal, yfinal, lienzo, forma) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 12;
    lienzo.lineCap= "round";
    // lienzo.lineJoin="round"
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

