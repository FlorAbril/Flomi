const cuadro = document.getElementById("area_de_dibujo");
const papel = cuadro.getContext("2d");
const boton_borrar_todo = document.getElementById("boton_borrar_todo");
const boton_borrar = document.getElementById("boton_borrar");
const boton_dibujar = document.getElementById("boton_dibujar");
const contenedorColores = document.querySelector(".colores");
const grosorInput = document.getElementById("grosor");
const colorEnUso = document.getElementById("colorEnUso");
const boton_balde = document.getElementById("boton_balde");
let x_dibujo; //donde comienza el trazo de dibujo
let y_dibujo;
let dibujando = false;

const estadoLapiz = {
    colorActual : "black",
    grosorActual : 10,
    formaActual: "round"
}
const estadoGoma = {
    colorActual : "white",
    grosorActual : 10,
    formaActual: "round"
}

let estadoActual = estadoLapiz;


grosorInput.onkeypress = (evento) => {isNaN(evento.key) && evento.preventDefault();}
grosorInput.oninput = () => {estadoActual.grosorActual = parseInt(grosorInput.value)}    


cuadro.width = innerWidth * 0.75;
cuadro.height = innerHeight * 0.9;

/////// boton de borrar todo
boton_borrar_todo.onclick =  borrarTodo;

//////////boton de borrar
boton_borrar.onclick = borrar;

/////////// boton de dibujar 
boton_dibujar.onclick = dibujar;

// boton balde
boton_balde.onclick = pintar;

cuadro.onmousedown = dibujoActivo;

cuadro.addEventListener("mousemove", dibujarOBorrarConMouse);
document.addEventListener("mouseup", dibujoOBorradorInactivo);

dibujar();



function borrar() {
    estadoActual = estadoGoma;
    grosorInput.value = estadoActual.grosorActual;
    colorEnUso.style.backgroundColor = estadoActual.colorActual;
   
    
}
function dibujar() {
    estadoActual = estadoLapiz;
    grosorInput.value = estadoActual.grosorActual;
    colorEnUso.style.backgroundColor = estadoActual.colorActual;


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

function pintar(){
    papel.fillStyle= estadoActual.colorActual;
    papel.fillRect(0,0,cuadro.width,cuadro.height);
}

const crearColor = (colorName) =>{
    const color = document.createElement('div');
    color.className = "color"
    color.style.background = colorName
    color.title = colorName
    color.onclick = ()=> {
        estadoActual.colorActual = colorName
        colorEnUso.style.background = estadoActual.colorActual;
    };
    contenedorColores.appendChild(color);

}

const colores = ["blue","green","red","orange","yellow","pink",
                "purple","black","white","grey","brown","violet",
                "teal","lightblue","darkblue","turquoise","lightgreen",
                "darkgreen","lavender","magenta","fuchsia","lime","coral",
                "gold","silver","beige","cyan","maroon","salmon","tan",
                "aquamarine","crimson","#7485e2", "#8fd84b"]; 

colores.map((color)=>crearColor(color));

// dibujar una linea
function dibujarLineas(xinicial, yinicial, xfinal, yfinal) {
    papel.beginPath();
    papel.strokeStyle = estadoActual.colorActual;
    papel.lineWidth = estadoActual.grosorActual;
    papel.lineCap= "round";
    // papel.lineJoin="round"
    papel.moveTo(xinicial, yinicial);
    papel.lineTo(xfinal, yfinal);
    papel.stroke();
    papel.closePath();
}

