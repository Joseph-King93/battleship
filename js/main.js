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
const shipSizes = [smallShip, medShip, largeShip, superMegaShip]

let tiles = document.getElementsByClassName("allTile")

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

let tileArray = []

// This function tests space above and below randomly selected tile
function verticalSelectLogic(shipSize, tileBeingTested) {
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    // for(let i = 0, i <= shipSize; i++) {
        if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
            let newTileFromeVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
            // make tile turn grey
            tiles[newTileFromeVertLogic].style["background-color"] = "grey";
            console.log(newTileFromeVertLogic)
            return undefined
        } else {
            let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
            // make tile turn grey
            tiles[newTileFromVertLogic].style["background-color"] = "grey";
            console.log(newTileFromVertLogic)
            return tiles[newTileFromVertLogic]
        }
    }
// }

// This function tests space to the left and right of randomly selected tile
function horizontalSelectLogic(tileBeingTested) {
    // Test if randomly selected tile is the last tile in row or not 
    if (tileBeingTested % Math.sqrt(tileArray.length) === (Math.sqrt(tileArray.length) - 1)) {
        let newTileFromeHorizLogic = tileBeingTested - 1;
        // make tile turn grey
        // tiles[newTileFromeHorizLogic].style["background-color"] = "pink";
        console.log(newTileFromeHorizLogic)
        return undefined
    } else {
        let newTileFromHorizLogic = tileBeingTested + 1;
        // make tile turn grey
        tiles[newTileFromHorizLogic].style["background-color"] = "purple";
        console.log(newTileFromHorizLogic + " tile checked horiz")
        return tiles[newTileFromHorizLogic]
    }
}


function randomGrey() {
    for(let i = 0; i < tiles.length; i++) { 
        tileArray.push(i)
        console.log(tileArray)
    }
    // randomTileSelect chooses random tile from grid
    let randomTileSelect = getRandomIntInclusive(0, tileArray.length - 1)
    console.log(randomTileSelect + " is random tile")
    // let random1 = horizontalSelectLogic(randomTileSelect)
    // tiles[randomTileSelect].style["background-color"] = "yellow";
    return randomTileSelect
}

let newRandom = randomGrey()
console.log(newRandom)

placeShipBySize(4, 3)

function placeShipBySize(shipSize, originalTileBeingTested) {

    let tileBeingTested = originalTileBeingTested
    let shipArray = []
    tiles[originalTileBeingTested].style["background-color"] = "yellow";
    
    for(let i = 0; i < (shipSize - 1); i++) {
        console.log(i + "# loop")
        console.log(tileBeingTested + " start tile")

        shipArray.push(horizontalSelectLogic(tileBeingTested))

        console.log(shipArray)

        tileBeingTested = tileBeingTested + 1

        console.log(shipArray.includes(undefined))

        if (shipArray.includes(undefined)) {
            console.log(tileBeingTested + " tileBeingTested") 
            shipArray.pop()           
            console.log(shipArray)
            shipArray.push(horizontalSelectLogic(originalTileBeingTested - 2))
            
            // shipArray.push(horizontalSelectLogic(tileBeingTested))
        }
    }
        // if (horizontalSelectLogic(tileBeingTested) < 25) {
        // horizontalSelectLogic(tileBeingTested)
        // } else {
        //     i = i--
        //     horizontalSelectLogic(tileBeingTested - 1)
        // }
}   

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
