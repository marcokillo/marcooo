
const puzzle = document.getElementById('puzzle');
const message = document.getElementById('message');

let dragSrcEl = null;
let selectedTile = null;

function initPuzzle() {
  puzzle.innerHTML = "";
  message.textContent = "";
  const indices = [...Array(12).keys()];
  shuffle(indices);

  indices.forEach((index, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = index;
    tile.dataset.position = i;

    const img = document.createElement("img");
    img.src = `tiles/tile-${index}.jpg`;
    img.alt = `Tile ${index}`;

    tile.appendChild(img);
    puzzle.appendChild(tile);
  });

  addEvents();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addEvents() {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(tile => {
    // Mouse events
    tile.addEventListener("dragstart", function () {
      dragSrcEl = this;
      this.classList.add("dragging");
    });

    tile.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    tile.addEventListener("drop", function (e) {
      e.preventDefault();
      if (dragSrcEl !== this) {
        swapTiles(dragSrcEl, this);
        checkWin();
      }
      this.classList.remove("over");
      dragSrcEl.classList.remove("dragging");
    });

    tile.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });

    // Touch events for mobile
    tile.addEventListener("touchstart", function (e) {
      e.preventDefault();
      if (!selectedTile) {
        selectedTile = this;
        this.classList.add("selected");
      } else {
        swapTiles(selectedTile, this);
        selectedTile.classList.remove("selected");
        selectedTile = null;
        checkWin();
      }
    });
  });
}

function swapTiles(tile1, tile2) {
  const img1 = tile1.querySelector("img");
  const img2 = tile2.querySelector("img");

  const tempSrc = img1.src;
  const tempIndex = tile1.dataset.index;

  img1.src = img2.src;
  tile1.dataset.index = tile2.dataset.index;

  img2.src = tempSrc;
  tile2.dataset.index = tempIndex;
}

function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  const isSolved = [...tiles].every((tile, i) => tile.dataset.index == i);
  if (isSolved) {
    message.textContent = "🎉 پازل با موفقیت کامل شد!";
  }
}

window.onload = initPuzzle;
