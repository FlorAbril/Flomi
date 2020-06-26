const cuadro = document.getElementById("area_de_dibujo");
const papel = cuadro.getContext("2d");
const contenedorColores = document.querySelector(".colores");
const grosorInput = document.getElementById("grosor");
const colorEnUso = document.getElementById("colorEnUso");
let x_dibujo; //donde comienza el trazo de dibujo
let y_dibujo;
let dibujando = false;
const boton_borrar_todo = document.getElementById("boton_borrar_todo");
const boton_borrar = document.getElementById("boton_borrar");
const boton_dibujar = document.getElementById("boton_dibujar");
const boton_balde = document.getElementById("boton_balde");
const descargarDibujo = document.getElementById("descargarDibujo");
const boton_guardar = document.getElementById("guardar");
const boton_plus = document.getElementById("plus");
const selectorColor = document.getElementById("selectorColor");
const boton_linea = document.getElementById("boton_linea");
const botones = [boton_borrar_todo, boton_borrar, boton_dibujar, boton_balde, boton_guardar,boton_linea];
//Para convertir las strings de los colores a hexa
const coloresNombres = "aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue,blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk,crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgrey,darkgreen,darkkhaki,darkmagenta,darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,darkslateblue,darkslategray,darkslategrey,darkturquoise,darkviolet,deeppink,deepskyblue,dimgray,dimgrey,dodgerblue,firebrick,floralwhite,forestgreen,fuchsia,gainsboro,ghostwhite,gold,goldenrod,gray,grey,green,greenyellow,honeydew,hotpink,indianred,indigo,ivory,khaki,lavender,lavenderblush,lawngreen,lemonchiffon,lightblue,lightcoral,lightcyan,lightgoldenrodyellow,lightgray,lightgrey,lightgreen,lightpink,lightsalmon,lightseagreen,lightskyblue,lightslategray,lightslategrey,lightsteelblue,lightyellow,lime,limegreen,linen,magenta,maroon,mediumaquamarine,mediumblue,mediumorchid,mediumpurple,mediumseagreen,mediumslateblue,mediumspringgreen,mediumturquoise,mediumvioletred,midnightblue,mintcream,mistyrose,moccasin,navajowhite,navy,oldlace,olive,olivedrab,orange,orangered,orchid,palegoldenrod,palegreen,paleturquoise,palevioletred,papayawhip,peachpuff,peru,pink,plum,powderblue,purple,rebeccapurple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna,silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,tomato,turquoise,violet,wheat,white,whitesmoke,yellow,yellowgreen".split(",");
const coloresHexa = ['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32'];

//cuando se clickee un boton su fondo cambiara, y el de los demás quedará en blanco
botones.map(botonClickeado => {
    botonClickeado.addEventListener("click", () => {
        botones.map(boton => boton.style.background = "")
        botonClickeado.style.background = "#a5b0f3";
    })
})

const estadoLapiz = {
    herramientaActual: "dibujar",
    colorActual: "black",
    grosorActual: 10,
    formaActual: "round"
}
const estadoGoma = {
    herramientaActual: "dibujar",
    colorActual: "white",
    grosorActual: 100,
    formaActual: "round"
}
const estadoBalde = {
    herramientaActual: "rellenar",
    colorActual: "white",
    grosorActual: false,
    formaActual: false
}

let estadoActual = estadoLapiz;


grosorInput.onkeypress = (evento) => { isNaN(evento.key) && evento.preventDefault(); }
grosorInput.oninput = () => { estadoActual.grosorActual = parseInt(grosorInput.value) }


cuadro.width = innerWidth * 0.75;
cuadro.height = innerHeight * 0.9;

/////// boton de borrar todo
boton_borrar_todo.onclick = borrarTodo;

//////////boton de borrar
boton_borrar.onclick = borrar;

/////////// boton de dibujar 
boton_dibujar.onclick = dibujar;

// boton balde
boton_balde.onclick = rellenar;

// boton añadir color
boton_plus.onclick = añadirColor;
// // boton linea
// boton_linea.onclick = crearLinea;

cuadro.onmousedown = dibujoActivo;

boton_guardar.onclick = () => {
    const dibujoCanvas = cuadro.toDataURL("image/jpg");
    descargarDibujo.href = dibujoCanvas;
    descargarDibujo.click();
}

cuadro.addEventListener("mousemove", dibujarOBorrarConMouse);
document.addEventListener("mouseup", dibujoOBorradorInactivo);

dibujar();


function rellenar() {
    // papel.fillStyle = estadoActual.colorActual;
    // papel.fillRect(0, 0, cuadro.width, cuadro.height);
    const colorViejo = estadoActual.colorActual;
    estadoActual = estadoBalde;
    estadoActual.colorActual = colorViejo
    colorEnUso.style.backgroundColor = estadoActual.colorActual;
}
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
        if(estadoActual.herramientaActual === "rellenar")rellenarColor(evento.offsetX, evento.offsetY, colorAArray(estadoActual.colorActual))
        else{
        dibujarLineas(x_dibujo, y_dibujo, evento.offsetX, evento.offsetY);
        x_dibujo = evento.offsetX;
        y_dibujo = evento.offsetY;
        }
    }
}

function dibujoOBorradorInactivo(evento) {
    if (dibujando === true) {
        if(estadoActual.herramientaActual === "rellenar")rellenarColor(evento.offsetX, evento.offsetY, colorAArray(estadoActual.colorActual))
        else {
        dibujarLineas(x_dibujo, y_dibujo, evento.offsetX, evento.offsetY);
        x_dibujo = 0;
        y_dibujo = 0;
        }
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




const crearColor = (colorName) => {
    const color = document.createElement('div');
    color.className = "color"
    color.style.background = colorName
    color.title = colorName
    color.onclick = () => {
        estadoActual.colorActual = colorName
        colorEnUso.style.background = estadoActual.colorActual;
    };
    contenedorColores.appendChild(color);

}

const colores = ["blue", "green", "red", "orange", "yellow", "pink",
    "purple", "black", "white", "grey", "brown", "violet",
    "teal", "lightblue", "darkblue", "turquoise", "lightgreen",
    "darkgreen", "lavender", "magenta", "fuchsia", "lime", "coral",
    "gold", "silver", "beige", "cyan", "maroon", "salmon", "tan",
    "aquamarine", "crimson", "#7485e2", "#8fd84b"];

colores.map((color) => crearColor(color));

function añadirColor(){
    let color = selectorColor.value ;
    crearColor(color);
}



// dibujar una linea
function dibujarLineas(xinicial, yinicial, xfinal, yfinal) {
    papel.beginPath();
    papel.strokeStyle = estadoActual.colorActual;
    papel.lineWidth = estadoActual.grosorActual;
    papel.lineCap = "round";
    papel.moveTo(xinicial, yinicial);
    papel.lineTo(xfinal, yfinal);
    papel.stroke();
    papel.closePath();  
}

function rellenarColor(x, y, color) {
    const { width, height } = cuadro
    const imgd = papel.getImageData(0, 0, width, height);
    const data = imgd.data
    const posActual = (y * width + x) * 4
    //creo una matriz con los puntos
    const matrizDeIguales = []
    const colorSeleccionado = [data[posActual], data[posActual + 1], data[posActual + 2], data[posActual + 3]]
    for (yActual = 0; yActual < height ;yActual++){
        const filaActual= []
        for (xActual = 0; xActual < width ;xActual++){
            if(pixelEsIgual(data, xActual, yActual, colorSeleccionado)) {
                filaActual.push({esIgual: true,distancia: Infinity ,x:xActual,y:yActual,fueVisitado:false})
            }
            else{
                filaActual.push({esIgual: false,distancia: Infinity ,x:xActual,y:yActual,fueVisitado:false})
            }
        }
        matrizDeIguales.push(filaActual)
    }
    esAdyacente(matrizDeIguales[y][x], matrizDeIguales, data, color)
    papel.putImageData(imgd, 0, 0)
}

function cambiarPixel(data, x, y, color) {
    const posActual = (y * cuadro.width + x) * 4
    data[posActual] = color[0]
    data[posActual + 1] = color[1]
    data[posActual + 2] = color[2]
    data[posActual + 3] = color[3]
    if (y > cuadro.height) console.log("mayor")
}

function pixelEsIgual(data, x, y, color) {
    const posActual = (y * cuadro.width + x) * 4
    return data[posActual] === color[0] && data[posActual + 1] === color[1] && data[posActual + 2] === color[2] && data[posActual + 3] === color[3]
}

function esAdyacente(puntoInicial, matrizDePosiciones, data, color){
    const nodoInicial = matrizDePosiciones[puntoInicial.y][puntoInicial.x]
    nodoInicial.distancia = 0
    const nodosNoVisitados = []
    vecinosSinVisitar(puntoInicial, matrizDePosiciones, nodosNoVisitados);
    while (!!nodosNoVisitados.length) {
    const nodoMasCercano = nodosNoVisitados.pop();
    cambiarPixel(data, nodoMasCercano.x, nodoMasCercano.y, color) 
    nodoMasCercano.fueVisitado = true;
    vecinosSinVisitar(nodoMasCercano, matrizDePosiciones, nodosNoVisitados);
  }
  }

function vecinosSinVisitar(node, grid,nodosNoVisitados) {
    const neighbors = [];
    const {x,y} = node;
    if (y > 0) neighbors.push(grid[y - 1][x]);
    if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);
    if (x > 0) neighbors.push(grid[y][x - 1]);
    if (x < grid[0].length - 1) {neighbors.push(grid[y][x + 1])}
    if (y > 0 && x > 0 ) neighbors.push(grid[y - 1][x -1]);
    if (y > 0 && x < grid[0].length - 1 ) neighbors.push(grid[y - 1][x + 1]);
    if (y > grid.length - 1 && x > 0 ) neighbors.push(grid[y + 1][x -1]);
    if (y > grid.length - 1 && x < grid[0].length + 1 ) neighbors.push(grid[y - 1][x + 1]);
    vecinosFiltrados = neighbors.filter(neighbor => !neighbor.fueVisitado && neighbor.esIgual );
    vecinosFiltrados.map(vecino => nodosNoVisitados.push(vecino))
  }



function colorAArray(color){
    let colorManipulable
    if(color.startsWith('#')){
        colorManipulable = color.slice(1);} 
    else {
        const indice = coloresNombres.findIndex((str)=>str === color)
        colorManipulable = coloresHexa[indice]
    }
    const array = [colorManipulable.slice(0,2), colorManipulable.slice(2,4), colorManipulable.slice(4) , "FF"]
    const respuesta = array.map(e => parseInt(e, 16))
    return respuesta
}