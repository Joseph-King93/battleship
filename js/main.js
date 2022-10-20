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

let tileArray = []
let newRandom = null
for(let i = 0; i < tiles.length; i++) { 
    tileArray.push(i)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for(let i=0; i < tiles.length; i++) { 
    tiles[i].addEventListener("click", function() {
        tiles[i].style["background-color"] = "red";
    });
}
tiles[4].style["background-color"] = "yellow";
tiles[17].style["background-color"] = "purple";
console.log(tiles)
console.log(tileArray)






function placeAllShipsForBot(array) {
    for (i = 0; i < array.length; i++) {
    let newRandom = randomGrey()
    console.log(newRandom + " is new random val")
    if (getRandomIntInclusive(0, 1) === 0) {
        console.log("Horizontal Ship")
        placeHorizontalShipBySize(array[i], newRandom)
    } else {
        console.log("Vertical Ship")
        placeVerticalShipBySize(array[i], newRandom)
    }
    }
}

// placeAllShipsForBot(shipSizes)

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
            console.log(newTileFromeVertLogic)
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
    // Test if randomly selected tile is the last tile in row or not 
    if (tileBeingTested.style["background-color"] === "yellow" || tileBeingTested.style["background-color"] === "purple") {
        return true
    } else if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        let newTileFromHorizLogic = tileBeingTested - 1;
        // make tile turn grey
        // tiles[newTileFromHorizLogic].style["background-color"] = "pink";
        console.log(newTileFromHorizLogic)
        return undefined
    } else {
        let newTileFromHorizLogic = tileBeingTested + 1;
        // make tile turn grey
        tiles[newTileFromHorizLogic].style["background-color"] = "purple";
        console.log(newTileFromHorizLogic + " tile checked by horiz")
        return tiles[newTileFromHorizLogic]
    }
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
    newRandom = randomGrey()
    // console.log(newRandom)
    return newRandom
}
makeNewRandom()
// placeHorizontalShipBySize(4, 24)

function placeHorizontalShipBySize(shipSize, originalTileBeingTested) {
    console.log(originalTileBeingTested + " = origTile")
    let tileBeingTested = originalTileBeingTested
    let shipArray = []
    tiles[originalTileBeingTested].style["background-color"] = "yellow";

    for(let i = 0; i < (shipSize - 1); i++) {
        console.log(i + "# loop")
        console.log(tileBeingTested + " start tile")
        console.log(originalTileBeingTested + " = origTileInLoop")

        shipArray.push(horizontalSelectLogic(tileBeingTested))

        console.log(shipArray)

        tileBeingTested = tileBeingTested + 1

        console.log(shipArray.includes(undefined))

        if (shipArray.includes(undefined)) {
            // console.log(tileBeingTested + " tileBeingTestedInsideLoop") 
            console.log(originalTileBeingTested + " = origTileInIf")
            shipArray.pop()           
            console.log(shipArray)
            shipArray.push(horizontalSelectLogic(originalTileBeingTested - 2))
            console.log(shipArray)
            tileBeingTested = tileBeingTested - 1
            originalTileBeingTested = originalTileBeingTested - 1
            
            // shipArray.push(horizontalSelectLogic(tileBeingTested))
        }
    }
}

(placeVerticalShipBySize(4, 12)) ? console.log("1st option") : console.log("everything worked!")
function placeVerticalShipBySize(shipSize, originalTileBeingTested) {
    console.log(tiles)
    console.log(originalTileBeingTested)
    console.log(tiles[originalTileBeingTested])
    let tileBeingTested = originalTileBeingTested
    if (isTileTakenTest(tileBeingTested) === true) {
        console.log("this came back true which is bad")
        return true
    }
    // isTileTakenTest(originalTileBeingTested)
    
    let shipArray = []
    shipArray.push(tiles[originalTileBeingTested])
    console.log("this is shiparraystart")
    console.log(shipArray)

    for(let i = 0; i < (shipSize - 1); i++) {
        console.log(i + "# loop")
        console.log(tileBeingTested)
        // console.log(originalTileBeingTested + " = origTileInLoop")
        // console.log(shipArray)
        if (isTileTakenTest(tileBeingTested + Math.sqrt(tileArray.length)) === true) {
            console.log("this came back true which is bad")
            return true
        } else {
            shipArray.push(verticalSelectLogic(tileBeingTested))       
            tileBeingTested = tileBeingTested + Math.sqrt(tileArray.length)
            
            console.log(shipArray.includes(undefined))
        }    
        if (shipArray.includes(undefined)) {
            console.log(originalTileBeingTested)
            console.log(tileBeingTested)
            console.log(originalTileBeingTested - Math.sqrt(tileArray.length))
            if (isTileTakenTest(originalTileBeingTested - Math.sqrt(tileArray.length))) {
                console.log("this came back true also")
                return true
            } else {
                shipArray.pop()           
                console.log(shipArray)
                shipArray.push(verticalSelectLogic(originalTileBeingTested - Math.sqrt(tileArray.length)*2))
                console.log(shipArray)
                // tileBeingTested = tileBeingTested - 1
                originalTileBeingTested = originalTileBeingTested - Math.sqrt(tileArray.length)
                tileBeingTested = tileBeingTested - (Math.sqrt(tileArray.length))
            }
        }
    }
    console.log(shipArray)
    makePlacement(shipArray)
    
    function makePlacement(array) {
        for (let i = 0; i < array.length; i++) {
            console.log(i)
            shipArray[i].style["background-color"] = "pink"; 
            console.log("words also here")       
        }
    console.log("words are here")
    console.log(shipArray)
    }
    console.log("end of the raod")
}


function isTileTakenTest(tileBeingTested) {
    console.log("isTileTakenTest is started")
    console.log(tileBeingTested)
    console.log(tiles[tileBeingTested])
    // console.log(tiles[tileBeingTested].style.backgroundColor)
    if (tiles[tileBeingTested] === undefined) { 
            console.log("Tile is undefined")
            return undefined
        } else if (tiles[tileBeingTested].style["background-color"] === "purple") {
        // console.log("this spot is taken")
            return true
        } else if  (tiles[tileBeingTested].style["background-color"] === "yellow") {
            console.log("it is yellow")
            return true
        } else { console.log("Tile not taken") }
}
// console.log(tiles[4].style.backgroundColor)
// isTileTakenTest(4)
// let trueFalseCheck = 22 - Math.sqrt(tileArray.length)
// console.log(trueFalseCheck)
// console.log(isTileTakenTest(trueFalseCheck))




















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
