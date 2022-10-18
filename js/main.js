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
const medShip = 5

let tiles = document.getElementsByClassName("allTile")

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for(let i=0;i<tiles.length;i++) { 
    tiles[i].addEventListener("click", function() {
    tiles[i].style["background-color"] = "red";
});
}

let tileArray = []

// This function tests space above and below randomly selected tile
function verticalSelectLogic(tileBeingTested) {
    // Math.sqrt(tileArray.length) gives tile 
    // above or below a **SQUARE ONLY** grid (1x1,2x2,3x3,...)
    if (tileBeingTested + Math.sqrt(tileArray.length) >= tileArray.length) {
        let newTileFromeVertLogic = tileBeingTested - Math.sqrt(tileArray.length);
        // make tile turn grey
        tiles[newTileFromeVertLogic].style["background-color"] = "grey";
        console.log(newTileFromeVertLogic)
        return tiles[newTileFromeVertLogic]
    } else {
        let newTileFromVertLogic = tileBeingTested + Math.sqrt(tileArray.length);
        // make tile turn grey
        tiles[newTileFromVertLogic].style["background-color"] = "grey";
        console.log(newTileFromVertLogic)
        return tiles[newTileFromVertLogic]
    }
}

function randomGrey() {
    for(let i=0; i<tiles.length; i++) { 
        tileArray.push(i)
        console.log(tileArray)
    }
    // randomTileSelect chooses random tile from grid
    let randomTileSelect = getRandomIntInclusive(0, tileArray.length - 1)
    console.log(randomTileSelect)
    let random1 = verticalSelectLogic(randomTileSelect)
    tiles[randomTileSelect].style["background-color"] = "grey";
}

randomGrey()
