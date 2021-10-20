let mapElement = document.getElementById("map")
let cells = document.getElementsByClassName("cell")

let bombSymbol = '<i class="fa fa-bomb"></i>'
let flagSymbol = '<i class="fa fa-flag"></i>'

let flags = document.getElementById('flags')

let gameParams = {
    width: 10,
    height: 10,
    bombs: 10
}
let map = generateMap(gameParams.width , gameParams.height, gameParams.bombs)
let playerMap = createEmptyMap(gameParams.width , gameParams.height , -1)
if (!map[0]) {
    alert(map[1])
}
const open = (x, y) => {
    playerMap[x][y] = map[x][y]
}

const openCells = (x, y) => {
    if (map[x][y] == 9) {
        open(x,y)
        return false
    }
    if (map[x][y] != 0) {
        // console.log(map[x][y])
        open(x,y)
        return
    }
    if (map[x][y] == 0) {
        open(x, y)
        if (x-1>=0 && y-1>=0 && playerMap[x-1][y-1] == -1) {
            // console.log(map[x-1][y-1])
            if (map[x-1][y-1] != 0) {
                open(x-1, y-1)
            } else {
                openCells(x-1, y-1)
            }
        }
        if (x-1>=0 && playerMap[x-1][y] == -1) {
            // console.log(map[x-1][y])
            if (map[x-1][y] != 0) {
                open(x-1, y)
            } else {
                openCells(x-1, y)
            }
        }
        if (x-1>=0 && y+1<map[0].length && playerMap[x-1][y+1] == -1) {
            // console.log(map[x-1][y+1])
            if (map[x-1][y+1] != 0) {
                open(x-1, y+1)
            } else {
                openCells(x-1, y+1)
            }
        }

        if (y-1>=0 && playerMap[x][y-1] == -1) {
            // console.log(map[x][y-1])
            if (map[x][y-1] != 0) {
                open(x, y-1)
            } else {
                openCells(x, y-1)
            }
        }
        if (y+1<map[0].length && playerMap[x][y+1] == -1) {
            // console.log(map[x][y+1])
            if (map[x][y+1] != 0) {
                open(x, y+1)
            } else {
                openCells(x, y+1)
            }
        }

        if (x+1<map.length && y-1>=0 && playerMap[x+1][y-1] == -1) {
            // console.log(map[x+1][y-1])
            if (map[x+1][y-1] != 0) {
                open(x+1, y-1)
            } else {
                openCells(x+1, y-1)
            }
        }
        if (x+1<map.length && playerMap[x+1][y] == -1) {
            // console.log(map[x+1][y])
            if (map[x+1][y] != 0) {
                open(x+1, y)
            } else {
                openCells(x+1, y)
            }
        }
        if (x+1<map.length && y+1<map[0].length && playerMap[x+1][y+1] == -1) {
            // console.log(map[x+1][y+1])
            if (map[x+1][y+1] != 0) {
                open(x+1, y+1)
            } else {
                openCells(x+1, y+1)
            }
        }
    }
}

const createMap = () => {
    mapElement.innerHTML = ''
    for (let i=0; i < gameParams.width*gameParams.height; i++) {
        mapElement.innerHTML += '<div class="cell" id="c'+i + '"></div>'
    }
    mapElement.setAttribute('style', 'grid-template-columns: repeat('+ gameParams.width + ' , 1fr);');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => cellClick(i), false)
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('contextmenu', (event) => rightClick(event, i), true)
    }
}
createMap()

const defeat = () => {
    for (let i = 0; i<map.length; i++) {
        for (let j = 0; j<map[i].length; j++) {
            if (map[i][j] == 9) {
                id = 'c' + (i*gameParams.width+j)
                document.getElementById(id).innerHTML = bombSymbol
                document.getElementById(id).className += ' cell-bomb'
            }
        }
    }
    mapElement.innerHTML+= '<div class="defeat"></div>'
    document.getElementById("newgame").innerHTML = '<i class="far fa-frown"></i>'
    clearInterval(interval)
    return 0
}

const winCheck = () => {
    for (let i = 0; i<map.length; i++) {
        for (let j = 0; j<map[i].length; j++) {
            if (playerMap[i][j] == -1 && map[i][j] != 9) {
                return
            }
        }
    }
    document.getElementById("newgame").innerHTML = '<i class="far fa-grin-stars"></i>'
    clearInterval(interval)
    mapElement.innerHTML+= '<div class="defeat"></div>'
}

const renderMap = () => {
    for (let i = 0; i < playerMap.length; i++) {
        for (let j = 0; j < playerMap[i].length; j++) {
            id = 'c' + (i*gameParams.width+j)
            if (playerMap[i][j] == 0) {
                // document.getElementById(id).innerHTML = 0
                document.getElementById(id).className = 'cell cell-open'
            } else if (playerMap[i][j] == 9) {
                return defeat()
            } else if (playerMap[i][j] > 0) {
                document.getElementById(id).innerHTML = playerMap[i][j]
                document.getElementById(id).className = 'cell cell-open cell' + playerMap[i][j]
            } else if (playerMap[i][j] == 'f') {
                document.getElementById(id).innerHTML = flagSymbol
            } else {
                document.getElementById(id).innerHTML = ''
                document.getElementById(id).className = 'cell'
            }
        }
    }
}
let interval
let time = document.getElementById('time')
let isFirstClick = true
const cellClick = (id) => {
    if (isFirstClick) {
        sec = 0
        min = 0
        interval = setInterval(function() {
            if (sec == 60) {
                min ++
                sec = 0
            }
            if (min == 0) {
                if (sec < 10) {
                    time.innerHTML = '0' + sec;
                } else {
                    time.innerHTML = sec;
                }
            } else {
                if (sec < 10) {
                    time.innerHTML = min + ':' + '0' + sec;
                } else {
                    time.innerHTML = min + ':' + sec;
                }
            }
            sec++
        }, 1000);
        isFirstClick = false
    }
    cellX = Math.floor(id/gameParams.width)
    cellY = id % gameParams.width
    openCells(cellX, cellY)
    // printMap(playerMap)
    renderMap()
    winCheck()
}

flags.innerHTML = gameParams.bombs
const rightClick = (event, id) => {
    event.preventDefault();
    let cell = document.getElementById('c' + id)
    cellX = Math.floor(id/gameParams.width)
    cellY = id % gameParams.width
    if (!cell.innerHTML && playerMap[cellX][cellY] != 0) {
        playerMap[cellX][cellY] = 'f'
        cell.innerHTML = flagSymbol
        flags.innerHTML -= 1
    } else if (cell.innerHTML == flagSymbol) {
        playerMap[cellX][cellY] = '-1'
        cell.innerHTML = ''
        flags.innerHTML -= (-1)
    }
}

document.getElementById("newgame").onclick = () => {
    isFirstClick = true
    flags.innerHTML = gameParams.bombs
    time.innerHTML = '00'
    w = document.getElementById("width").value
    h = document.getElementById("height").value
    b = document.getElementById("bombs").value
    if (w && h && b) {
        if (w >= 4 && h > 4 && w*h > b) {
            gameParams = {
                width: w,
                height: h,
                bombs: b
            }
        } else {
            alert("Invalid parameters. Used default")
        }
    }
    mapElement = document.getElementById("map")
    map = generateMap(gameParams.width , gameParams.height, gameParams.bombs)
    playerMap = createEmptyMap(gameParams.width , gameParams.height , -1)
    createMap()
    renderMap()
    // printMap(map)
    document.getElementById("newgame").innerHTML = '<i class="far fa-smile"></i>'
}
