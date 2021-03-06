const isUnique = (array , element) => { // function to check is bomb position unique
    for (let i = 0; i < array.length; i ++) {
        if (array[i][0] == element[0] && array[i][1] == element[1]) {
            return false
        }
    }
    return true
}

const printMap = (arr) => { // function that prints map in an understandable way
    for (let i = 0; i < arr.length; i++) {
        let row = i + " | "
        for (let j = 0; j < arr[i].length; j++) {
            row += " " + arr[i][j] + " "
        }
        console.log(row)
    }
}

const createEmptyMap = (w, h, s) => {
    let map = []
    for (let i = 0; i < h; i++) { // create empty map
        map.push([])
        for (let j = 0; j < w; j++) {
            map[i].push(s)
        }
    }
    return map
}

const generateMap = (width, height, bombs) => {
    let map = createEmptyMap(width, height, 0)

    let bombsPositions = []
    for (let i = 0; i < bombs; i++) { // generate unique bomb positions
        let unique = true
        let pos = [Math.floor(Math.random() * width) , Math.floor(Math.random() * height)]
        while (unique) {
            if (isUnique(bombsPositions , pos)) {
                bombsPositions.push(pos)
                unique = false
            } else {
                pos = [Math.floor(Math.random() * width) , Math.floor(Math.random() * height)]
            }
        }
    }

    for (let i = 0; i < bombsPositions.length; i++) { // place bombs on their places
        let pos = bombsPositions[i]
        map[pos[1]][pos[0]] = 9
    }

    for (let i = 0; i < map.length; i++ ) { // place number of bombs in cells
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] != 9) {
                let bombsAround = 0

                if (i-1 >= 0 && j-1 >= 0) {
                    if (map[i-1][j-1] == 9) bombsAround++
                }
                if (i-1 >= 0) {
                    if (map[i-1][j] == 9) bombsAround++
                }
                if (i-1 >= 0 && j+1 < map[i].length) {
                    if (map[i-1][j+1] == 9) bombsAround++
                }
                if (j-1 >= 0) {
                    if (map[i][j-1] == 9) bombsAround++
                }
                if (j+1 < map[i].length) {
                    if (map[i][j+1] == 9) bombsAround++
                }
                if (i+1 < map.length && j-1 >= 0) {
                    if (map[i+1][j-1] == 9) bombsAround++
                }
                if (i+1 < map.length) {
                    if (map[i+1][j] == 9) bombsAround++
                }
                if (i+1 < map.length && j+1 < map[i].length) {
                    if (map[i+1][j+1] == 9) bombsAround++
                }

                map[i][j] = bombsAround
            }
        }
    }
    return map
}

// printMap(generateMap(20 , 10, 10))

try { // fix this later
    module.exports.gm = generateMap
} catch {}
