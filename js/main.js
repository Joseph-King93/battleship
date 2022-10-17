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
function randomGrey() {
    for(let i=0; i<tiles.length; i++) { 
        tileArray.push(i)
        console.log(tileArray)
    }
    let randomSelect = getRandomIntInclusive(0, tileArray.length - 1)
    console.log(randomSelect)
    tiles[randomSelect].style["background-color"] = "grey";
}

randomGrey()
