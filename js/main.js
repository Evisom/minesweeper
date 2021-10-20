let mapElement = document.getElementById("map")
let cells = document.getElementsByClassName("cell")

let gameParams = {
    width: 10,
    height: 10,
    bombs: 5
}
let map = generateMap(gameParams.width , gameParams.height, gameParams.bombs)
let playerMap = createEmptyMap(gameParams.width , gameParams.height , -1)
if (map[0] == false) {
    alert(map[1])
}
const open = (x, y) => {
    playerMap[x][y] = map[x][y]
}

const openCells = (x, y) => {
    if (map[x][y] == 9) {
        console.log("bomb")
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
}
createMap()

const defeat = () => {
    for (let i = 0; i<map.length; i++) {
        for (let j = 0; j<map[i].length; j++) {
            if (map[i][j] == 9) {
                id = 'c' + (i*gameParams.width+j)
                document.getElementById(id).innerHTML = 9
                document.getElementById(id).className += ' cell-bomb'
            }
        }
    }
    mapElement.innerHTML+= '<div class="defeat"></div>'
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
    alert("You win!")
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
                document.getElementById(id).className = 'cell cell-open'
            } else {
                document.getElementById(id).innerHTML = ''
                document.getElementById(id).className = 'cell'
            }
        }
    }
}

const cellClick = (id) => {
    cellX = Math.floor(id/gameParams.width)
    cellY = id % gameParams.width
    openCells(cellX, cellY)
    printMap(playerMap)
    renderMap()
    winCheck()
}

document.getElementById("newgame").onclick = () => {
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
    printMap(map)
}

printMap(map)