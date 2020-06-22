const cuadro = document.getElementById("area_de_dibujo");
const papel = cuadro.getContext("2d");
const boton_borrar_todo = document.getElementById("boton_borrar_todo");
const boton_borrar = document.getElementById("boton_borrar");
const boton_dibujar = document.getElementById("boton_dibujar");
const contenedorColores = document.querySelector(".colores");
const grosorInput = document.getElementById("grosor");
let x_dibujo; //donde comienza el trazo de dibujo
let y_dibujo;
let dibujando = false;

const estadoLapiz = {
    colorActual : "black",
    grosorActual : 10,
    formaActual: "round"
}
grosorInput.value = estadoLapiz.grosorActual;
grosorInput.oninput = (evento) => {
    estadoLapiz.grosorActual = parseInt(grosorInput.value);
}

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
    estadoLapiz.colorActual = "white";
}
function dibujar() {
    cuadro.onmousedown = dibujoActivo;
}


function dibujoActivo(evento) {
    x_dibujo = evento.offset;
    y_dibujo = evento.offsetY;
    dibujando = true;
}


function dibujarOBorrarConMouse(evento) {
    if (dibujando === true) {
        dibujarLineas( x_dibujo, y_dibujo, evento.offsetX, evento.offsetY);
        x_dibujo = evento.offsetX;
        y_dibujo = evento.offsetY;
    }
}

function dibujoOBorradorInactivo(evento) {
    if (dibujando === true) {
        dibujarLineas(x_dibujo, y_dibujo, evento.offsetX, evento.offsetY);
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
    color.onclick = ()=> estadoLapiz.colorActual = colorName;
    contenedorColores.appendChild(color);
}

const colores = ["blue","green","red","orange","yellow","pink","purple","black","white","grey","brown","violet","teal","lightblue","darkblue","turquoise","lightgreen","darkgreen","lavender","magenta","fuchsia","lime","coral","gold","silver","beige	","cyan","maroon","salmon","tan","aquamarine","crimson"];

colores.map((color)=>crearColor(color))

// dibujar una linea
function dibujarLineas(xinicial, yinicial, xfinal, yfinal) {

    papel.beginPath();
    papel.strokeStyle = estadoLapiz.colorActual;
    papel.lineWidth = estadoLapiz.grosorActual;
    papel.lineCap= "round";
    // papel.lineJoin="round"
    papel.moveTo(xinicial, yinicial);
    papel.lineTo(xfinal, yfinal);
    papel.stroke();
    papel.closePath();
}

