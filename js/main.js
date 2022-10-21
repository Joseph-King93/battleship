// const board = document.getElementById("board");

// function createBoard(rows, cols) {
    //   board.style.setProperty('--board-rows', rows);
    //   board.style.setProperty('--board-cols', cols);
    //   for (i = 0; i < (rows * cols); i++) {
        //     let divTile = document.createElement("div");
        //     divTile.innerText = "";
        //     board.appendChild(divTile).className = "tile";
        //   };
        // };


// createBoard(12, 12);
const smallShip = 2
const medShip = 3
const largeShip = 4
const superMegaShip = 5
const shipSizes = [smallShip, medShip, largeShip]
let tiles = document.getElementsByClassName("allTile")
let playerTiles = document.getElementsByClassName("allPlayerTile")
let startButton = document.getElementsByClassName("startButton")
let turnCounter = 0

console.log(startButton)

function gameStartReset() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style["background-color"] = "lightblue";
        playerTiles[i].style["background-color"] = "lightblue";
        tiles[i].classList.remove("enemyShip")
    }
    placeAllBotShipLoop(shipSizes, makeNewRandom())
    placeAllPlayerShipLoop(shipSizes, makeNewRandom())
}

let tileArray = []
let newRandom = null
for (let i = 0; i < tiles.length; i++) {
    tileArray.push(i)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function botTurn(randNum) {
    // console.log(randNum)
    // console.log(playerTiles[randNum])
    if (playerTiles[randNum].style["background-color"] == "green") {
        playerTiles[randNum].style["background-color"] = "red";
        // playerTiles[randNum].classList.remove("enemyShip");
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

// tiles[4].style["background-color"] = "yellow";
// tiles[17].style["background-color"] = "purple";

function isShipOnBoard() {
    let trueFalseArray = []
    for (let i = 0; i < tiles.length; i++) {
        trueFalseArray.push(tiles[i].classList.contains("enemyShip"))
        // console.log(trueFalseArray)
        if (trueFalseArray.includes(true)) {
            break
        }
    }
    // console.log(trueFalseArray)
    if (trueFalseArray.includes(true)) {
        console.log("still ship left")
    } else { alert("Hooray, you fended off all those dinghies!") }
}


function randomGrey() {

    // randomTileSelect chooses random tile from grid
    let randomTileSelect = getRandomIntInclusive(0, tileArray.length - 1)
    // console.log(randomTileSelect + " is random tile")
    // let random1 = horizontalSelectLogic(randomTileSelect)
    // tiles[randomTileSelect].style["background-color"] = "yellow";
    return randomTileSelect
}

function makeNewRandom() {
    // console.log("makeNewRandom start")
    newRandom = randomGrey()
    // console.log(newRandom)
    return newRandom
}

// placeAllShipsForBot(shipSizes)
function placeAllShipsForBot(array, startTile) {
    // console.log("Place all started")
    // console.log(startTile)
    for (i = 0; i < array.length; i++) {
        // console.log(i)
        startTile = makeNewRandom()
        if (getRandomIntInclusive(0, 1) === 0) {
            // console.log("Horizontal Ship")
            if (placeHorizontalShipBySize(array[i], startTile) === true) {
            i = i - 1
            // console.log("got true in placeAllShip")
            }
        } else {
            // console.log("Vertical Ship")
            if (placeVerticalShipBySize(array[i], startTile) === true) {
            // console.log(i)
            // console.log("got true in placeAllShip")
            i = i - 1
            // console.log(i)
            }
        }
    }
}
// placeAllShipsForBot(shipSizes, newRandom)


// This function tests space above and below randomly selected tile
function verticalSelectLogic(tileBeingTested) {
    // console.log(tileBeingTested + " start tile test vert logic")
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    // for(let i = 0, i <= shipSize; i++) {
    if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
        let newTileFromVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        // make tile turn grey
        // tiles[newTileFromVertLogic].style["background-color"] = "grey";
        // console.log(newTileFromVertLogic)
        return undefined
    } else {
        let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
        // make tile turn grey
        // tiles[newTileFromVertLogic].style["background-color"] = "purple";
        // console.log(newTileFromVertLogic + " tested by vert logic")
        return tiles[newTileFromVertLogic]
    }
}

// This function tests space to the left and right of randomly selected tile
function horizontalSelectLogic(tileBeingTested) {
    // console.log("horizontalSelectLogicStart")
    // Test if randomly selected tile is the last tile in row or not 
    // if (tileBeingTested.style["background-color"] === "yellow" || tileBeingTested.style["background-color"] === "purple") {
    //     return true
    // } else 
    let newTileFromHorizLogic = null
    if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        newTileFromHorizLogic = tileBeingTested - 1;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "pink";
        // console.log("came back true, not good")
        return undefined
    } else {
        newTileFromHorizLogic = tileBeingTested + 1;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "purple";
        // console.log(newTileFromHorizLogic + " tile checked by horiz")
        // console.log("horizontalSelectLogicEnd")
        return tiles[newTileFromHorizLogic]
    }
}

function placeAllBotShipLoop(array, value) {
placeAllShipsForBot(array, value) ? placeAllBotShipLoop(shipSizes, makeNewRandom()) : console.log("Bot ships placed!")
}
// placeAllUntilCompleteLoop(shipSizes, makeNewRandom())


function placeHorizontalShipBySize(shipSize, originalTileBeingTested) {
    // console.log("start of testing")
    // console.log(originalTileBeingTested)
    let tileBeingTested = originalTileBeingTested
    if (isTileTakenTest(tileBeingTested) === true) {
        console.log("this came back true which is bad")
        return true
    }
    // console.log("initial shipArray")
    let shipArray = []
    // console.log(shipArray)
    shipArray.push(tiles[originalTileBeingTested])
    // console.log(shipArray)
    // console.log("after ship array push")

    for (let i = 0; i < (shipSize - 1); i++) {
        // console.log(i + "# loop")
        // console.log("tileBeingTestedBelow")
        // console.log(tileBeingTested)
        // console.log("orig tile below")
        // console.log(originalTileBeingTested)
        if (isTileTakenTest(tileBeingTested + 1) === true) {
            // console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(horizontalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + 1

        }

        // console.log(shipArray)

        // console.log(shipArray.includes(undefined))

        if (shipArray.includes(undefined)) {
            if (isTileTakenTest(originalTileBeingTested - 1)) {
                // console.log("this came back true also")
                return true
            } else {
                // console.log(tileBeingTested + " tileBeingTestedInsideLoop") 
                // console.log(originalTileBeingTested + " = origTileInIf")
                shipArray.pop()
                // console.log(shipArray)
                shipArray.push(horizontalSelectLogic(originalTileBeingTested - 2))
                // console.log(shipArray)
                tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - 1

                // shipArray.push(horizontalSelectLogic(tileBeingTested))
            }
        }
    }
    // console.log(shipArray)
    // console.log("before makePlacement horizontal")
    makePlacement(shipArray)

    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            // shipArray[i].style["background-color"] = "pink";
            shipArray[i].classList.add("enemyShip");
            // console.log(shipArray)
        

        }
    }
}

// (placeVerticalShipBySize(4, 12)) ? console.log("1st option") : console.log("everything worked!")
function placeVerticalShipBySize(shipSize, originalTileBeingTested) {
    // console.log(tiles)
    // console.log(originalTileBeingTested)
    // console.log(tiles[originalTileBeingTested])
    let tileBeingTested = originalTileBeingTested
    if (isTileTakenTest(tileBeingTested) === true) {
        // console.log("this came back true which is bad")
        return true
    }
    // isTileTakenTest(originalTileBeingTested)

    let shipArray = []
    shipArray.push(tiles[originalTileBeingTested])
    // console.log("this is shiparraystart")
    // console.log(shipArray)

    for (let i = 0; i < (shipSize - 1); i++) {
        // console.log(i + "# loop")
        // console.log(tileBeingTested)
        // console.log(originalTileBeingTested + " = origTileInLoop")
        // console.log(shipArray)
        if (isTileTakenTest(tileBeingTested + Math.sqrt(tileArray.length)) === true) {
            // console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(verticalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + Math.sqrt(tileArray.length)

            // console.log(shipArray.includes(undefined))
        }
        if (shipArray.includes(undefined)) {
            // console.log(originalTileBeingTested)
            // console.log(tileBeingTested)
            // console.log(originalTileBeingTested - Math.sqrt(tileArray.length))
            if (isTileTakenTest(originalTileBeingTested - Math.sqrt(tileArray.length))) {
                // console.log("this came back true also")
                return true
            } else {
                shipArray.pop()
                // console.log(shipArray)
                shipArray.push(verticalSelectLogic(originalTileBeingTested - Math.sqrt(tileArray.length) * 2))
                // console.log(shipArray)
                // tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - Math.sqrt(tileArray.length)
                tileBeingTested = tileBeingTested - (Math.sqrt(tileArray.length))
            }
        }
    }
    // console.log("vertical ship places")
    // console.log(shipArray)
    makePlacement(shipArray)

    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            // console.log(i)
            // shipArray[i].style["background-color"] = "pink";
            shipArray[i].classList.add("enemyShip");
            // console.log("words also here")
        }
        // console.log("words are here")
        // console.log(shipArray)
    }
    // console.log("end of the raod")
}

function isTileTakenTest(tileBeingTested) {
    // console.log("isTileTakenTest is started")
    // console.log(tileBeingTested)
    // console.log(tiles[tileBeingTested])
    // console.log(tiles[tileBeingTested].style.backgroundColor)
    if (tiles[tileBeingTested] === undefined) {
        // console.log("Tile is undefined")
        return undefined
    } else if (tiles[tileBeingTested].style["background-color"] === "purple") {
        // console.log("this spot is taken")
        return true
    } else if (tiles[tileBeingTested].style["background-color"] === "yellow") {
        // console.log("it is yellow")
        return true
    } else if (tiles[tileBeingTested].style["background-color"] === "pink") {
        console.log("it is pink")
        return true
    } 
    // else { console.log("Tile not taken") }
}
// ``````````````````````````````````````````````````````````````























function placeAllShipsForPlayer(array, startTile) {
    // console.log("Place all started for player")
    // console.log(startTile)
    for (i = 0; i < array.length; i++) {
        // console.log(i)
        startTile = makeNewRandom()
        if (getRandomIntInclusive(0, 1) === 0) {
            // console.log("Horizontal Ship")
            if (placePlayerHorizontalShipBySize(array[i], startTile) === true) {
            i = i - 1
            // console.log("got true in placeAllShip")
            }
        } else {
            // console.log("Vertical Ship")
            if (placePlayerVerticalShipBySize(array[i], startTile) === true) {
            // console.log(i)
            // console.log("got true in placeAllShip")
            i = i - 1
            // console.log(i)
            }
        }
    }
    // console.log("Place all ended for player")
}



// This function tests space above and below randomly selected tile
function playerVerticalSelectLogic(tileBeingTested) {
    console.log("verticalSelectLogicStart")
    console.log("tileBeingTested")
    console.log(tileBeingTested)
    // console.log(tileBeingTested + " start tile test vert logic")
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    // for(let i = 0, i <= shipSize; i++) {
    if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
        let newTileFromVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        console.log(tileBeingTested)
        // make tile turn grey
        // tiles[newTileFromVertLogic].style["background-color"] = "grey";
        console.log(newTileFromVertLogic)
        return undefined
    } else {
        console.log(tileBeingTested)
        console.log(Math.sqrt(tileArray.length))
        let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
        console.log(tileBeingTested)
        // make tile turn grey
        // tiles[newTileFromVertLogic].style["background-color"] = "purple";
        // console.log(newTileFromVertLogic + " tested by vert logic")
        console.log(newTileFromVertLogic)
        console.log(playerTiles[newTileFromVertLogic])
        console.log("verticalSelectLogicEnd")
        return playerTiles[newTileFromVertLogic]
    }
}

// This function tests space to the left and right of randomly selected tile
function playerHorizontalSelectLogic(tileBeingTested) {
    console.log("horizontalSelectLogicStart")
    // Test if randomly selected tile is the last tile in row or not 
    // if (tileBeingTested.style["background-color"] === "yellow" || tileBeingTested.style["background-color"] === "purple") {
    //     return true
    // } else 
    let newTileFromHorizLogic = null
    if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        newTileFromHorizLogic = tileBeingTested - 1;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "pink";
        // console.log("came back true, not good")
        return undefined
    } else {
        newTileFromHorizLogic = tileBeingTested + 1;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "purple";
        // console.log(newTileFromHorizLogic + " tile checked by horiz")
        console.log("horizontalSelectLogicEnd")
        return playerTiles[newTileFromHorizLogic]
    }
}

function placeAllPlayerShipLoop(array, value) {
placeAllShipsForPlayer(array, value) ? placeAllPlayerShipLoop(shipSizes, makeNewRandom()) : console.log("Player ships placed!")
}
// placeAllUntilCompleteLoop(shipSizes, makeNewRandom())


function placePlayerHorizontalShipBySize(shipSize, originalTileBeingTested) {
    console.log("start of testing")
    console.log(originalTileBeingTested)
    let tileBeingTested = originalTileBeingTested
    if (isPlayerTileTakenTest(tileBeingTested) === true) {
        console.log("this came back true which is bad")
        return true
    }
    console.log("initial shipArray")
    let shipArray = []
    console.log(shipArray)
    shipArray.push(playerTiles[originalTileBeingTested])
    console.log(shipArray)
    console.log("after ship array push")

    for (let i = 0; i < (shipSize - 1); i++) {
        console.log(i + "# loop")
        console.log("tileBeingTestedBelow")
        console.log(tileBeingTested)
        console.log("orig tile below")
        console.log(originalTileBeingTested)
        if (isPlayerTileTakenTest(tileBeingTested + 1) === true) {
            // console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(playerHorizontalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + 1

        }

        // console.log(shipArray)

        // console.log(shipArray.includes(undefined))

        if (shipArray.includes(undefined)) {
            if (isPlayerTileTakenTest(originalTileBeingTested - 1)) {
                // console.log("this came back true also")
                return true
            } else {
                // console.log(tileBeingTested + " tileBeingTestedInsideLoop") 
                // console.log(originalTileBeingTested + " = origTileInIf")
                shipArray.pop()
                console.log(shipArray)
                shipArray.push(playerHorizontalSelectLogic(originalTileBeingTested - 2))
                console.log(shipArray)
                tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - 1

                // shipArray.push(horizontalSelectLogic(tileBeingTested))
            }
        }
    }
    console.log(shipArray)
    console.log("before makePlacement horizontal")
    makePlacement(shipArray)

    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            shipArray[i].style["background-color"] = "green";
        }
    }
}

// (placeVerticalShipBySize(4, 12)) ? console.log("1st option") : console.log("everything worked!")
function placePlayerVerticalShipBySize(shipSize, originalTileBeingTested) {
    console.log(tiles)
    console.log(originalTileBeingTested)
    console.log(playerTiles[originalTileBeingTested])
    let tileBeingTested = originalTileBeingTested
    if (isPlayerTileTakenTest(tileBeingTested) === true) {
        // console.log("this came back true which is bad")
        return true
    }
    // isTileTakenTest(originalTileBeingTested)

    let shipArray = []
    shipArray.push(playerTiles[originalTileBeingTested])
    console.log("this is shiparraystart")
    console.log(shipArray)

    for (let i = 0; i < (shipSize - 1); i++) {
        console.log(i)
        console.log(tileBeingTested)
        console.log(originalTileBeingTested)
        console.log(shipArray)
        if (isPlayerTileTakenTest(tileBeingTested + Math.sqrt(tileArray.length)) === true) {
            // console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(playerVerticalSelectLogic(tileBeingTested))
            tileBeingTested = tileBeingTested + Math.sqrt(tileArray.length)

            console.log(shipArray.includes(undefined))
        }
        if (shipArray.includes(undefined)) {
            console.log(originalTileBeingTested)
            console.log(tileBeingTested)
            console.log(originalTileBeingTested - Math.sqrt(tileArray.length))
            if (isPlayerTileTakenTest(originalTileBeingTested - Math.sqrt(tileArray.length))) {
                console.log("this came back true also")
                return true
            } else {
                shipArray.pop()
                console.log(shipArray)
                shipArray.push(playerVerticalSelectLogic(originalTileBeingTested - Math.sqrt(tileArray.length) * 2))
                console.log(shipArray)
                // tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - Math.sqrt(tileArray.length)
                tileBeingTested = tileBeingTested - (Math.sqrt(tileArray.length))
            }
        }
    }
    console.log("vertical ship places")
    console.log(shipArray)
    makePlacement(shipArray)

    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            // console.log(i)
            shipArray[i].style["background-color"] = "green";
            // console.log("words also here")
        }
        // console.log("words are here")
        // console.log(shipArray)
    }
    console.log("end of the raod")
}

function isPlayerTileTakenTest(tileBeingTested) {
    // console.log("isPlayerTileTakenTest is started")
    // console.log(tileBeingTested)
    // console.log(tiles[tileBeingTested])
    // console.log(tiles[tileBeingTested].style.backgroundColor)
    if (playerTiles[tileBeingTested] === undefined) {
        // console.log("Tile is undefined")
        return undefined
    } else if (playerTiles[tileBeingTested].style["background-color"] === "purple") {
        // console.log("this spot is taken")
        return true
    } else if (playerTiles[tileBeingTested].style["background-color"] === "yellow") {
        // console.log("it is yellow")
        return true
    } else if (playerTiles[tileBeingTested].style["background-color"] === "green") {
        // console.log("it is orange")
        return true
    } 
    // else { console.log("Tile not taken") }
}