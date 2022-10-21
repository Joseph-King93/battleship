const smallShip = 2
const medShip = 3
const largeShip = 4
const superMegaShip = 5
const shipSizes = [smallShip, medShip, largeShip]
let tiles = document.getElementsByClassName("allTile")
let playerTiles = document.getElementsByClassName("allPlayerTile")
let startButton = document.getElementsByClassName("startButton")
let turnCounter = 0
let tileArray = []
let newRandom = null

function gameStartReset() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style["background-color"] = "lightblue";
        playerTiles[i].style["background-color"] = "lightblue";
        tiles[i].classList.remove("enemyShip")
    }
    placeAllBotShipLoop(shipSizes, makeNewRandom())
    placeAllPlayerShipLoop(shipSizes, makeNewRandom())
}

for (let i = 0; i < tiles.length; i++) {
    tileArray.push(i)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function botTurn(randNum) {
    if (playerTiles[randNum].style["background-color"] == "green") {
        playerTiles[randNum].style["background-color"] = "red";
        turnCounter = turnCounter + 1
    } else if (tiles[randNum].style["background-color"] == "lightblue") {
        playerTiles[randNum].style["background-color"] = "blue";
        turnCounter = turnCounter + 1
    }
}
// Here is logic to test whether choice is a hit or miss
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
        if (tiles[i].classList.contains("enemyShip")) {
            tiles[i].style["background-color"] = "red";
            tiles[i].classList.remove("enemyShip");
            turnCounter = turnCounter + 1
            botTurn(makeNewRandom())
        } else if (tiles[i].style["background-color"] == "lightblue") {
            tiles[i].style["background-color"] = "blue";
            turnCounter = turnCounter + 1
            botTurn(makeNewRandom())
        }
        isShipOnBoard()
    })
}

function isShipOnBoard() {
    let trueFalseArray = []
    for (let i = 0; i < tiles.length; i++) {
        trueFalseArray.push(tiles[i].classList.contains("enemyShip"))
        if (trueFalseArray.includes(true)) {
            break
        }
    }
    if (trueFalseArray.includes(true)) {
        console.log("still ship left")
    } else { alert("Hooray, you fended off all those dinghies!") }
}

function randomGrey() {
    // randomTileSelect chooses random tile from grid
    let randomTileSelect = getRandomIntInclusive(0, tileArray.length - 1)
    return randomTileSelect
}

function makeNewRandom() {
    newRandom = randomGrey()
    return newRandom
}

// placeAllShipsForBot(shipSizes)
function placeAllShipsForBot(array, startTile) {
    for (i = 0; i < array.length; i++) {
        startTile = makeNewRandom()
        if (getRandomIntInclusive(0, 1) === 0) {
            if (placeHorizontalShipBySize(array[i], startTile) === true) {
                i = i - 1
            }
        } else {
            if (placeVerticalShipBySize(array[i], startTile) === true) {
                i = i - 1
            }
        }
    }
}
// placeAllShipsForBot(shipSizes, newRandom)


// This function tests space above and below randomly selected tile
function verticalSelectLogic(tileBeingTested) {
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
        let newTileFromVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        return undefined
    } else {
        let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
        return tiles[newTileFromVertLogic]
    }
}

// This function tests space to the left and right of randomly selected tile
function horizontalSelectLogic(tileBeingTested) {
    // Test if randomly selected tile is the last tile in row or not 
    let newTileFromHorizLogic = null
    if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        newTileFromHorizLogic = tileBeingTested - 1;
        return undefined
    } else {
        newTileFromHorizLogic = tileBeingTested + 1;
        return tiles[newTileFromHorizLogic]
    }
}

function placeAllBotShipLoop(array, value) {
    placeAllShipsForBot(array, value) ? placeAllBotShipLoop(shipSizes, makeNewRandom()) : console.log("Bot ships placed!")
}

function placeHorizontalShipBySize(shipSize, originalTileBeingTested) {
    let tileBeingTested = originalTileBeingTested
    if (isTileTakenTest(tileBeingTested) === true) {
        console.log("this came back true which is bad")
        return true
    }
    let shipArray = []
    shipArray.push(tiles[originalTileBeingTested])
    for (let i = 0; i < (shipSize - 1); i++) {
        if (isTileTakenTest(tileBeingTested + 1) === true) {
            return true
        } else {
            shipArray.push(horizontalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + 1
        }
        if (shipArray.includes(undefined)) {
            if (isTileTakenTest(originalTileBeingTested - 1)) {
                return true
            } else {
                shipArray.pop()
                shipArray.push(horizontalSelectLogic(originalTileBeingTested - 2))
                tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - 1
            }
        }
    }
    makePlacement(shipArray)
    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            shipArray[i].classList.add("enemyShip");
        }
    }
}

function placeVerticalShipBySize(shipSize, originalTileBeingTested) {
    let tileBeingTested = originalTileBeingTested
    if (isTileTakenTest(tileBeingTested) === true) {
        return true
    }
    let shipArray = []
    shipArray.push(tiles[originalTileBeingTested])
    for (let i = 0; i < (shipSize - 1); i++) {
        if (isTileTakenTest(tileBeingTested + Math.sqrt(tileArray.length)) === true) {
            return true
        } else {
            shipArray.push(verticalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + Math.sqrt(tileArray.length)
        }
        if (shipArray.includes(undefined)) {
            if (isTileTakenTest(originalTileBeingTested - Math.sqrt(tileArray.length))) {
                return true
            } else {
                shipArray.pop()
                shipArray.push(verticalSelectLogic(originalTileBeingTested - Math.sqrt(tileArray.length) * 2))
                originalTileBeingTested = originalTileBeingTested - Math.sqrt(tileArray.length)
                tileBeingTested = tileBeingTested - (Math.sqrt(tileArray.length))
            }
        }
    }
    makePlacement(shipArray)
    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            shipArray[i].classList.add("enemyShip");
        }
    }
}

function isTileTakenTest(tileBeingTested) {
    if (tiles[tileBeingTested] === undefined) {
        return undefined
    } else if (tiles[tileBeingTested].style["background-color"] === "purple") {
        return true
    } else if (tiles[tileBeingTested].style["background-color"] === "pink") {
        return true
    }
}

function placeAllShipsForPlayer(array, startTile) {
    for (i = 0; i < array.length; i++) {
        startTile = makeNewRandom()
        if (getRandomIntInclusive(0, 1) === 0) {
            if (placePlayerHorizontalShipBySize(array[i], startTile) === true) {
                i = i - 1
            }
        } else {
            if (placePlayerVerticalShipBySize(array[i], startTile) === true) {
                i = i - 1
            }
        }
    }
}



// This function tests space above and below randomly selected tile
function playerVerticalSelectLogic(tileBeingTested) {
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
        let newTileFromVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        return undefined
    } else {
        let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
        return playerTiles[newTileFromVertLogic]
    }
}

// This function tests space to the left and right of randomly selected tile
function playerHorizontalSelectLogic(tileBeingTested) {
    // Test if randomly selected tile is the last tile in row or not 
    let newTileFromHorizLogic = null
    if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        newTileFromHorizLogic = tileBeingTested - 1;
        return undefined
    } else {
        newTileFromHorizLogic = tileBeingTested + 1;
        return playerTiles[newTileFromHorizLogic]
    }
}

function placeAllPlayerShipLoop(array, value) {
    placeAllShipsForPlayer(array, value) ? placeAllPlayerShipLoop(shipSizes, makeNewRandom()) : console.log("Player ships placed!")
}

function placePlayerHorizontalShipBySize(shipSize, originalTileBeingTested) {
    let tileBeingTested = originalTileBeingTested
    if (isPlayerTileTakenTest(tileBeingTested) === true) {
        return true
    }
    let shipArray = []
    shipArray.push(playerTiles[originalTileBeingTested])
    for (let i = 0; i < (shipSize - 1); i++) {
        if (isPlayerTileTakenTest(tileBeingTested + 1) === true) {
            return true
        } else {
            shipArray.push(playerHorizontalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + 1
        }
        if (shipArray.includes(undefined)) {
            if (isPlayerTileTakenTest(originalTileBeingTested - 1)) {
                return true
            } else {
                shipArray.pop()
                shipArray.push(playerHorizontalSelectLogic(originalTileBeingTested - 2))
                tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - 1
            }
        }
    }
    makePlacement(shipArray)
    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            shipArray[i].style["background-color"] = "green";
        }
    }
}

function placePlayerVerticalShipBySize(shipSize, originalTileBeingTested) {
    let tileBeingTested = originalTileBeingTested
    if (isPlayerTileTakenTest(tileBeingTested) === true) {
        return true
    }
    let shipArray = []
    shipArray.push(playerTiles[originalTileBeingTested])
    for (let i = 0; i < (shipSize - 1); i++) {
        if (isPlayerTileTakenTest(tileBeingTested + Math.sqrt(tileArray.length)) === true) {
            return true
        } else {
            shipArray.push(playerVerticalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + Math.sqrt(tileArray.length)
        }
        if (shipArray.includes(undefined)) {
            if (isPlayerTileTakenTest(originalTileBeingTested - Math.sqrt(tileArray.length))) {
                return true
            } else {
                shipArray.pop()
                shipArray.push(playerVerticalSelectLogic(originalTileBeingTested - Math.sqrt(tileArray.length) * 2))
                originalTileBeingTested = originalTileBeingTested - Math.sqrt(tileArray.length)
                tileBeingTested = tileBeingTested - (Math.sqrt(tileArray.length))
            }
        }
    }
    makePlacement(shipArray)
    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            shipArray[i].style["background-color"] = "green";
        }
    }
}

function isPlayerTileTakenTest(tileBeingTested) {
    if (playerTiles[tileBeingTested] === undefined) {
        return undefined
    } else if (playerTiles[tileBeingTested].style["background-color"] === "green") {
        return true
    }
}