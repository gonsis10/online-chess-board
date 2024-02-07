const order_w = { 0: 4, 1: 3, 2: 2, 3: 5, 4: 6, 5: 2, 6: 3, 7: 4 };
const order_b = { 0: "R", 1: "K", 2: "B", 3: "Q", 4: "K", 5: "B", 6: "K", 7: "R" };
const order_class = { 0: "rook", 1: "knight", 2: "bishop", 3: "queen", 4: "king", 5: "bishop", 6: "knight", 7: "rook" };

const board = document.getElementById("board");
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let unit = document.createElement("div");
    if (i % 2 == (j % 2 == 0 ? 1 : 0)) {
      unit.classList.add("black");
    } else {
      unit.classList.add("white");
    }
    unit.draggable = false;
    board.appendChild(unit);
  }
}

const interface = document.getElementById("interface");
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let unit = document.createElement("div");
    let img = document.createElement("img");
    img.draggable = true;
    unit.classList.add("cell");
    if (i == 1) {
      // unit.innerHTML = "A";
      // unit.classList.add("pawn");
      img.classList.add("piece");
      img.src = `assets/pawn1.png`;
    } else if (i == 0) {
      // unit.innerHTML = order_b[j];
      // unit.classList.add(order_class[j]);
      img.classList.add("piece");
      img.src = `assets/${order_class[j]}1.png`;
    } else if (i == 6) {
      // unit.innerHTML = 1;
      // unit.classList.add("pawn");
      img.classList.add("piece");
      img.src = `assets/pawn.png`;
    } else if (i == 7) {
      // unit.innerHTML = order_w[j];
      // unit.classList.add(order_class[j]);
      img.classList.add("piece");
      img.src = `assets/${order_class[j]}.png`;
    }
    unit.appendChild(img);
    unit.id = `${i} ${j}`;
    interface.appendChild(unit);
  }
}

// let target = null;
// let piece = "";
// let info = "";
// let selected = false;

// interface.addEventListener("mousedown", (e) => {
//   if ((e.target.innerHTML != null) & (selected == false)) {
//     target = e.target.id;
//     piece = e.target.className;
//     info = e.target.innerHTML == undefined ? "" : e.target.innerHTML;
//     selected = true;
//   }
// });

// interface.addEventListener("mouseup", (e) => {
//   if ((e.target.id != target) & (info != "") & (selected == true)) {
//     e.target.innerHTML = info;
//     e.target.className = piece;
//     let t = document.getElementById(target);
//     t.innerHTML = "";
//     t.className = "";
//     piece = null;
//     target = null;
//     info = "";
//     selected = false;
//     console.log("done");
//   }
// });

function handleDragStart(e) {
  this.style.opacity = "0.5";
  dragSrcEl = this;

  e.target.style.cursor = "move";

  // e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", this.parentNode.id);
  // e.preventDefault();
}

function handleDragEnd(e) {
  this.style.opacity = "1";
  cells.forEach(function (c) {
    c.classList.remove("over");
  });
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.parentNode.classList.add("over");
}

function handleDragLeave(e) {
  this.parentNode.classList.remove("over");
}

let pieces = document.querySelectorAll("#interface .cell .piece");
pieces.forEach((p) => {
  p.addEventListener("dragstart", handleDragStart);
  p.addEventListener("dragover", handleDragOver);
  p.addEventListener("dragenter", handleDragEnter);
  p.addEventListener("dragleave", handleDragLeave);
  p.addEventListener("dragend", handleDragEnd);
});
console.log(pieces);

//units

function handleDrop(e) {
  e.stopPropagation(); // stops the browser from redirecting.
  if (dragSrcEl !== this.firstChild) {
    let id = e.dataTransfer.getData("text/plain");
    let orig = document.getElementById(id).firstChild;
    this.firstChild.src = orig.src;
    orig.src = "";
    // this.src = orig;
  }
  // console.log(dragSrcEl);

  return false;
}

let cells = document.querySelectorAll("#interface .cell");
cells.forEach((c) => {
  c.addEventListener("drop", handleDrop);
});
