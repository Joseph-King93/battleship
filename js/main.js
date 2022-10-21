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
let rejectLoop = 0
console.log(startButton)
console.log(rejectLoop)



function doATest() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style["background-color"] = "lightblue";
        playerTiles[i].style["background-color"] = "lightblue";
    }
    placeAllUntilCompleteLoop(shipSizes, makeNewRandom())
}

let tileArray = []
let newRandom = null
for (let i = 0; i < tiles.length; i++) {
    tileArray.push(i)
}


for (let i = 0; i < playerTiles.length; i++) {
    // console.log("playerTilesLoop")
    // console.log(i)

    playerTiles[i].addEventListener("click", function() {
        console.log("can click this tile")
    })
}

async function main() {
    console.log(shipSizes)
  for (let i = 0; i < shipSizes.length; i++) {
        console.log(i)
        console.log(shipSizes)
        console.log(shipSizes[i])
    console.log("waiting for a placement", i);
    await getClick(shipSizes[i]);
    console.log("after await return to async")
    // console.log(this)
    console.log("tilePlaceReceived", i);

    console.log(rejectLoop)
    console.log("rejectLoop in async")
  }
  rejectLoop = 20
  console.log(rejectLoop)
  console.log("done");      
}

function getClick(shipSize) {
    console.log("getClick start")
    console.log(shipSize)
    return new Promise(acc => {
        function handleClick() {
            console.log("handleClickStart")
            console.log(this)
            let thisClassList = this.classList
            console.log(thisClassList)
            console.log(thisClassList[0])
            let thisClassListString = thisClassList[0]
            console.log(thisClassListString)
            let thisClassListIndex = thisClassListString.slice(10)
            console.log(thisClassListIndex)
            thisClassListIndex = Number(thisClassListIndex)
            console.log(thisClassListIndex)
            // console.log(rejectLoop)       
            // console.log("rejectLoop in handleClick")      
                // console.log(rejectLoop)
                // rejectLoop = rejectLoop + 1
                // console.log(rejectLoop)
                this.removeEventListener('click', handleClick);
                // console.log(playerTiles)
                console.log(this)
                // console.log(playerTiles.index(valueofThis))
                console.log(shipSize)
                console.log(thisClassListIndex--)
                placePlayerHorizontalShipBySize(shipSize, thisClassListIndex--)
                this.style["background-color"] = "green"
            acc();
        // } else { console.log("somethingDidn'tWork") }
        // return this
      }
      console.log("for loop in getClick started")
      
for (let i = 0; i < playerTiles.length; i++) {
            //   console.log(i)
            playerTiles[i].addEventListener('click', handleClick);

        }
        console.log("for loop in getClick done")
        })
    } 
 
  
  main();



// function placePlayerShipBySize(shipSize, startTile) {
//     console.log("placePlyaerShip start")
//     for ( let i = 0; i < shipSize.length; i++) {
//         if (startTile % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
//         console.log("shipArrayLoop")
//         console.log(i)


            
//         }      
//     }
//      console.log("placePlayerShip end")
// }
    



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Here is logic to test whether choice is a hit or miss
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function () {
        if (tiles[i].style["background-color"] == "pink") {
            tiles[i].style["background-color"] = "red";
        } else if (tiles[i].style["background-color"] == "lightblue") {
            tiles[i].style["background-color"] = "blue";
        }
        isShipOnBoard()
    })
}
    // for (let i = 0; i < tiles.length; i++) {
    //         if (tiles[i].style.includes(["background-color"] == "pink") !== true) {
    //             for (let i = 0; i < tiles.length; i++) {
    //                 tiles[i].style["background-color"] = "yellow";
    //             }
    //         }
    // }


tiles[4].style["background-color"] = "yellow";
tiles[17].style["background-color"] = "purple";
// console.log(playerTiles)
// console.log(tileArray)
function isShipOnBoard() {
    let trueFalseArray = []
    for (let i = 0; i < tiles.length; i++) {
        trueFalseArray.push(tiles[i].style["background-color"] == "pink")
        console.log(trueFalseArray)
        if (trueFalseArray.includes(true)) {
            break
        }
    }
    console.log(trueFalseArray)
    if (trueFalseArray.includes(true)) {
        console.log("still ship left")
    } else { console.log("no ships left") }
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
        let newTileFromeVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        // make tile turn grey
        // tiles[newTileFromeVertLogic].style["background-color"] = "grey";
        // console.log(newTileFromeVertLogic)
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

function placeAllUntilCompleteLoop(array, value) {
placeAllShipsForBot(array, value) ? placeAllUntilCompleteLoop(shipSizes, makeNewRandom()) : console.log("everything worked!")
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
            shipArray[i].style["background-color"] = "pink";
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
            shipArray[i].style["background-color"] = "pink";
            // console.log("words also here")
        }
        // console.log("words are here")
        // console.log(shipArray)
    }
    console.log("end of the raod")
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
// console.log(tiles[4].style.backgroundColor)
// isTileTakenTest(4)
// let trueFalseCheck = 22 - Math.sqrt(tileArray.length)
// console.log(trueFalseCheck)
// console.log(isTileTakenTest(trueFalseCheck))


// for (let i = 0; i < tiles.length; i++) {
//     console.log(tiles[i].style["background-color"] == "yellow")
// }




// don't delete this. this is before changes made above!!! May need to recover this
// function placeShipBySize(shipSize, originalTileBeingTested) {

//     let tileBeingTested = originalTileBeingTested
//     let shipArray = []
//     tiles[originalTileBeingTested].style["background-color"] = "yellow";
//     for(let i = 0; i < (shipSize - 1); i++) {
//         console.log(i + "# loop")
//         console.log(tileBeingTested + " tileBeingTested")
//         if (horizontalSelectLogic(tileBeingTested) === undefined) {
//             horizontalSelectLogic(originalTileBeingTested - shipSize)
//             console.log("broken")
//             console.log(shipArray)
//             i = i--
//         }
//         tileBeingTested = tileBeingTested + 1
//         // if (horizontalSelectLogic(tileBeingTested) < 25) {
//         // horizontalSelectLogic(tileBeingTested)
//         // } else {
//         //     i = i--
//         //     horizontalSelectLogic(tileBeingTested - 1)
//         // }
//     }   
// }



// shipSize = 4

// for(let i = 0; i <= shipSize; i++) {
//     doLogic(tileToTest) => place grey next to tile
//     tileToTest = grey tile from above 
//     "now tileToTest is gray tile on 2nd loop"
//        if (tile === undefined) {
//         doLogic(tileToTest) => if (test fail on 2nd+ loops)
//         i = i-- && tileToTest = originalTileToTest
//     }
//         "this is a repeat loop on original tile if a test is failed"
//         doLogic(tileToTest) => make grey but opposite side from above
//         "this is a loop that would happen after a repeat loop"
//         tileToTest = grey tile from above ln 107


function playerHorizontalSelectLogic(tileBeingTested) {
    
    console.log("playerHorizontalSelectLogicStart")
    console.log(tileBeingTested)
    Number(tileBeingTested)
    // Test if randomly selected tile is the last tile in row or not 
    // if (tileBeingTested.style["background-color"] === "yellow" || tileBeingTested.style["background-color"] === "purple") {
    //     return true
    // } else 
    let newPlayerTileFromHorizLogic = tileBeingTested
    console.log(newPlayerTileFromHorizLogic)
    console.log(Math.sqrt(tileArray.length))
    console.log(tileBeingTested % Math.sqrt(tileArray.length))

    if (tileBeingTested % Math.sqrt(tileArray.length) === 0) {
        // newPlayerTileFromHorizLogic = tileBeingTested--;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "pink";
        console.log("came back true, not good")
        return undefined
    } else {
        newPlayerTileFromHorizLogic = (tileBeingTested++);
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "purple";
        // console.log(newPlayerTileFromHorizLogic + " tile checked by horiz")
        console.log(playerTiles[newPlayerTileFromHorizLogic])
        console.log(playerTiles[tileBeingTested])
        console.log("playerHorizontalSelectLogicEnd")
        return playerTiles[newPlayerTileFromHorizLogic]
    }
}

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
    console.log(playerTiles[originalTileBeingTested])
    shipArray.push(playerTiles[originalTileBeingTested])
    console.log(shipArray)
    console.log("after ship array push")

    for (let i = 0; i < (shipSize - 1); i++) {
        console.log(i + "# loop")
        console.log("tileBeingTestedBelow")
        console.log(tileBeingTested)
        console.log("orig tile below")
        console.log(originalTileBeingTested)
        Number(tileBeingTested)
        console.log(tileBeingTested)
        if (isPlayerTileTakenTest(tileBeingTested++) === true) {
            console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(playerHorizontalSelectLogic(tileBeingTested))
            console.log(tileBeingTested)
            tileBeingTested = tileBeingTested + 1
            console.log(tileBeingTested)

        }

        console.log(shipArray)

        console.log(shipArray.includes(undefined))

        if (shipArray.includes(undefined)) {
            if (isPlayerTileTakenTest(originalTileBeingTested - 1)) {
                console.log("this came back true also")
                return true
            } else {
                // console.log(tileBeingTested + " tileBeingTestedInsideLoop") 
                // console.log(originalTileBeingTested + " = origTileInIf")
                shipArray.pop()
                console.log(shipArray)
                shipArray.push(playerHorizontalSelectLogic(originalTileBeingTested - 1))
                console.log(shipArray)
                console.log("shipArrayPushIfStatement")
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
        console.log("placing pink here")
        for (let i = 0; i < array.length; i++) {
            shipArray[i].style["background-color"] = "pink";
        }
    }
}

function isPlayerTileTakenTest(tileBeingTested) {
    console.log("isPlayerTileTakenTest is started")
    console.log(tileBeingTested)
    console.log(playerTiles[tileBeingTested])
    console.log(playerTiles[tileBeingTested].style.backgroundColor)
    if (playerTiles[tileBeingTested] === undefined) {
        // console.log("Tile is undefined")
        return undefined
    } else if (playerTiles[tileBeingTested].style["background-color"] === "purple") {
        // console.log("this spot is taken")
        return true
    } else if (playerTiles[tileBeingTested].style["background-color"] === "yellow") {
        // console.log("it is yellow")
        return true
    } else if (playerTiles[tileBeingTested].style["background-color"] === "pink") {
        console.log("it is pink")
        return true
    } 
    else { console.log("Tile not taken") }
}