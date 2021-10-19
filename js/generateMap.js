const isUnique = (array , element) => { // function to check is bomb position unique
    for (let i = 0; i < array.length; i ++) {
        if (array[i][0] == element[0] && array[i][1] == element[1]) {
            return false
        }
    }
    return true
}

const generateMap = (width, height, bombs) => {
    if (width < 4) { // check values
        return "[ERR] width can not be less than 4"
    }
    if (height < 4) {
        return "[ERR] height can not be less than 4"
    }
    if (bombs <= 0) {
        return "[ERR] you need at least one bomb"
    }
    if (width*height <= bombs) {
        return "[ERR] too much bombs"
    }

    let map = []
    for (let i = 0; i < height; i++) { // create empty map
        map.push([])
        for (let j = 0; j < width; j++) {
            map[i].push(0)
        }
    }

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
        map[pos[0]][pos[1]] = 9
    }

    console.log(bombsPositions)
    return map
}

console.log(generateMap(6 , 6, 10))

try { // fix this later
    module.exports.gm = generateMap
} catch {}
