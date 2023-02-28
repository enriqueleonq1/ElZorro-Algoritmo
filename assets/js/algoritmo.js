
let tableroInicial =
[
    [0,-1,0,-1,0,-1,0,-1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

let tablero = 
[
    [0,-1,0,-1,0,-1,0,-1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

const COLUMS_NUMBER = 7
const ROWS_NUMBER = 7

let blackCells = document.querySelectorAll('.black-cell')
let punteroIZorro = 7
let punteroJZorro = 0
let turnoUsuario = false

//Mensajes
let mensajeVictoria = document.querySelector('#mensaje-victoria')
let mensajeDerrota = document.querySelector('#mensaje-derrota')
let mensajeIniciar = document.querySelector('#mensaje-iniciar')


//Funcion que guarda el ID del elemento, que se envia al momento de hazer el drop event
function drag(dragevent) {
    dragevent.dataTransfer.setData('id', dragevent.target.id);
    dragevent.dataTransfer.setData('data-cell', dragevent.target.parentNode.getAttribute('data-cell'));
}


//Agregando eventos de drop a las celdas celdas
blackCells.forEach( blackCell => {

    blackCell.addEventListener('dragover',e => {
        e.preventDefault()
    })

    blackCell.addEventListener('drop', (event) => {
        let dropedID = event.dataTransfer.getData('id')
        let dropedCell = event.dataTransfer.getData('data-cell') //Celda Actual
        let newCell = event.target.getAttribute('data-cell') //Celda Nueva

        if(turnoUsuario) {
            if( dropedCell[1] >= 0 && dropedCell[1] < 8 && newCell[0] - dropedCell[0] == 1){
                tablero[dropedCell[0]][dropedCell[1]] = 0
                tablero[newCell[0]][newCell[1]] = -1
                event.target.appendChild( document.getElementById(dropedID) )
                turnoUsuario = false
                moverZorro()
            }
        }else {
            mensajeIniciar.style.display = 'flex'
        }            
    })
})

function pintarZorro() {
    let idZorroCell = `${punteroIZorro}${punteroJZorro}`
    let cell = document.querySelectorAll(`[data-cell="${idZorroCell}"]`)
    let zorroImg = document.querySelector('#zorro')
    cell[0].appendChild(zorroImg)
}

function mostrarMensajeVictoria() {
    mensajeVictoria.style.display = 'flex'
}

function mostrarMensajeDerrota() {
    mensajeDerrota.style.display = 'flex'
}

//Los 3 se deben modificar por una variable constante que indique el numero maximo de columnas
function verificarDiagonalArribaIzquierda() {
    if(punteroIZorro - 1 >= 0 && punteroJZorro - 1>= 0 )
        return true
    return false
}

function verificarDiagonalArribaDerecha() {
    if( punteroIZorro - 1 >= 0 && punteroJZorro + 1 <= COLUMS_NUMBER)
        return true
    return false
}

function verificarRetrocesoAbajoDerecha() {
    if(punteroIZorro + 1 <= ROWS_NUMBER && punteroJZorro + 1 <= COLUMS_NUMBER && tablero[punteroIZorro + 1][punteroJZorro + 1 ] !== -1)
        return true
    return false
}

function verificarRetrocesoAbajoIzquierda() {
    if(punteroIZorro + 1 <= ROWS_NUMBER && punteroJZorro - 1 >= 0 && tablero[punteroIZorro + 1][punteroJZorro - 1 ] !== -1)
        return true
    return false
}


function verificarMovimientoArribaIzquierda() {
    if(tablero[punteroIZorro-1][punteroJZorro-1]!==-1)
        return true
    return false
}

function verificarMovimientoArribaDerecha() {
    if(tablero[punteroIZorro-1][punteroJZorro+1]!==-1)
        return true 
    return false
}


function moverZorro() {
    let randomSelection = Math.floor(Math.random() * 2)

    if( randomSelection === 1 ) {
        if(verificarDiagonalArribaDerecha()){
            if(verificarMovimientoArribaDerecha()) { 
                punteroIZorro = punteroIZorro - 1
                punteroJZorro = punteroJZorro + 1
                pintarZorro()
            }else if(verificarDiagonalArribaIzquierda()) {
                if(verificarMovimientoArribaIzquierda()) {
                    punteroIZorro = punteroIZorro - 1 
                    punteroJZorro = punteroJZorro - 1
                    pintarZorro()
                }else if(verificarRetrocesoAbajoIzquierda()) {
                    punteroIZorro = punteroIZorro + 1
                    punteroJZorro = punteroJZorro - 1
                    pintarZorro()
                }else if(verificarRetrocesoAbajoDerecha()) {
                    punteroIZorro = punteroIZorro + 1
                    punteroJZorro = punteroJZorro + 1   
                    pintarZorro()    
                }
                else {
                    mostrarMensajeVictoria()
                }
            }else if(verificarRetrocesoAbajoDerecha()) {
                punteroIZorro = punteroIZorro + 1
                punteroJZorro = punteroJZorro + 1   
                pintarZorro()    
            }
            else {
                mostrarMensajeVictoria()
            }
        }else if(verificarDiagonalArribaIzquierda()) {
            if(verificarMovimientoArribaIzquierda()) {
                punteroIZorro = punteroIZorro - 1 
                punteroJZorro = punteroJZorro - 1
                pintarZorro()
            }else if(verificarRetrocesoAbajoIzquierda()) {
                punteroIZorro = punteroIZorro + 1
                punteroJZorro = punteroJZorro - 1
                pintarZorro()
            }else {
                mostrarMensajeVictoria()
            }
        }
    
        if(punteroIZorro === 0 ) {
            pintarZorro()
            mostrarMensajeDerrota()
        } 
        turnoUsuario = true
    }else {
        if(verificarDiagonalArribaIzquierda()){
            if(verificarMovimientoArribaIzquierda()) { 
                punteroIZorro = punteroIZorro - 1
                punteroJZorro = punteroJZorro - 1
                pintarZorro()
            }else if(verificarDiagonalArribaDerecha()) {
                if(verificarMovimientoArribaDerecha()) {
                    punteroIZorro = punteroIZorro - 1 
                    punteroJZorro = punteroJZorro + 1
                    pintarZorro()
                }else if(verificarRetrocesoAbajoDerecha()) {
                    punteroIZorro = punteroIZorro + 1
                    punteroJZorro = punteroJZorro + 1
                    pintarZorro()
                }else if(verificarRetrocesoAbajoIzquierda()) {
                    punteroIZorro = punteroIZorro + 1
                    punteroJZorro = punteroJZorro - 1   
                    pintarZorro()    
                }else {
                    mostrarMensajeVictoria()
                }
            }else if(verificarRetrocesoAbajoIzquierda()) {
                punteroIZorro = punteroIZorro + 1
                punteroJZorro = punteroJZorro - 1   
                pintarZorro()    
            }
            else {
                mostrarMensajeVictoria()
            }
        }else if(verificarDiagonalArribaDerecha()) {
            if(verificarMovimientoArribaDerecha()) {
                punteroIZorro = punteroIZorro - 1 
                punteroJZorro = punteroJZorro + 1
                pintarZorro()
            }else if(verificarRetrocesoAbajoDerecha()) {
                punteroIZorro = punteroIZorro + 1
                punteroJZorro = punteroJZorro + 1
                pintarZorro()
            }else {
                mostrarMensajeVictoria()
            }
        }
    
        if(punteroIZorro === 0 ) {
            pintarZorro()
            mostrarMensajeDerrota()
        } 
        turnoUsuario = true
    }
}


//Boton eventListener
let startGame = document.querySelector('#startGame')
startGame.addEventListener('click', iniciarPartida)

let restartGame = document.querySelector('#restartGame')
restartGame.addEventListener('click', reiniciarPartida)


function agregarZorro() {
    punteroIZorro = COLUMS_NUMBER
    let randomInitialPosition = Math.floor(Math. random() * 4) * 2;
    punteroJZorro = randomInitialPosition
    let zorroImg = document.createElement('img')
    zorroImg.setAttribute('draggable',false)
    zorroImg.setAttribute('id','zorro')
    zorroImg.setAttribute('src','assets/images/zorro.png')
    tablero[punteroIZorro][punteroJZorro] = 1
    let idZorroCell = `${punteroIZorro}${punteroJZorro}`
    let cell = document.querySelectorAll(`[data-cell="${idZorroCell}"]`)
    cell[0].appendChild(zorroImg)
}

function iniciarPartida() {
    turnoUsuario = true
    startGame.style.display = 'none'
    restartGame.style.display = 'block'
    mensajeIniciar.style.display = 'none'
    agregarZorro()
}


function reiniciarPartida() {
    //Reiniciando mensajes
    mensajeDerrota.style.display = 'none'
    mensajeIniciar.style.display = 'none'
    mensajeVictoria.style.display = 'none'

    //Obteniendo nodes de cazadores
    let cazador1 = document.getElementById('cazador1')
    let cazador2 = document.getElementById('cazador2')
    let cazador3 = document.getElementById('cazador3')
    let cazador4 = document.getElementById('cazador4')

    //Eliminando ultima posicion del zorro
    let idZorroCell = `${punteroIZorro}${punteroJZorro}`
    let cell = document.querySelectorAll(`[data-cell="${idZorroCell}"]`)
    cell[0].removeChild(cell[0].firstElementChild)

    //Obteniendo celdas iniciales donde van los cazadores
    let cellCazador1 = document.querySelectorAll(`[data-cell="01"]`)
    let cellCazador2 = document.querySelectorAll(`[data-cell="03"]`)
    let cellCazador3 = document.querySelectorAll(`[data-cell="05"]`)
    let cellCazador4 = document.querySelectorAll(`[data-cell="07"]`)

    //Insertando a los cazadores en sus celdas originales
    cellCazador1[0].appendChild(cazador1)
    cellCazador2[0].appendChild(cazador2)
    cellCazador3[0].appendChild(cazador3)
    cellCazador4[0].appendChild(cazador4)

    //Volviendo el tablero a su forma original
    tablero = tableroInicial

    //Colocando a zorro en el tablero
    agregarZorro()
}