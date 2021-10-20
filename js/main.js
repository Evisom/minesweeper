const gameParams = {
    width: 10,
    height: 10,
    bombs: 10
}
const map = generateMap(gameParams.width , gameParams.height, gameParams.bombs)
let playerMap = createEmptyMap(gameParams.width , gameParams.height , -1)

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

printMap(map)
console.log("\n")
printMap(playerMap)
openCells(2, 2)
console.log("\n")
printMap(playerMap)