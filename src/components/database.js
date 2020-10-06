/* eslint-disable max-len */
/* eslint-disable no-console */
import { state } from "./state";

export const database = {

  ChangeColor(e) {
    const color = e.target.value;
    [e.target.color, state.color.active] = [color, color];
  },

  ChangeStatusSelected(e) {
    const toolBox = document.querySelector(".tools-box");

    Array.from(toolBox.children).forEach((el) => {
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    });
    e.target.classList.add("selected");
    this.ChangeStatusTools(e.target.dataset.set);
  },

  PaintingOld(e, status) {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const { sizePen } = state;

    if (state.IsMouseDown) {
      const x = e.offsetX;
      const y = e.offsetY;
      const myColor = state.color.active;

      if (status) {
        ctx.globalCompositeOperation = "destination-out";
      }

      ctx.fillStyle = myColor;
      ctx.strokeStyle = myColor;
      ctx.lineWidth = sizePen * 2;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, sizePen, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);

      if (status) {
        ctx.globalCompositeOperation = "source-over";
      }
    }
  },

  Painting(e, status) {
    if (state.IsMouseDown) {
      const canvas = document.querySelector("#canvas_dr");
      const ctx = canvas.getContext("2d");
      const { sizePen } = state;
      const { sizeCell } = state;
      const myColor = state.color.active;
      const coordX = e.offsetX;
      const coordY = e.offsetY;
      const gridSize = Math.floor(canvas.height / sizeCell);

      if (status) {
        ctx.globalCompositeOperation = "destination-out";
      }

      for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
          if (coordX > (j * +sizeCell) && coordX < ((j + 1) * +sizeCell) && coordY > (i * +sizeCell) && coordY < ((i + 1)) * +sizeCell) {
            ctx.fillStyle = myColor;
            ctx.fillRect((j * +sizeCell), (i * +sizeCell), +sizePen, +sizePen);
          }
        }
      }

      if (status) {
        ctx.globalCompositeOperation = "source-over";
      }
    }
  },

  Eraser() { },
  Bucket(e) {
    if (state.IsMouseDown) {
      const canvas = document.querySelector("#canvas_dr");
      const ctx = canvas.getContext("2d");
      const { sizeCell } = state;
      const X = e.offsetX;
      const Y = e.offsetY;
      const coordX = Math.floor(X / sizeCell);
      const coordY = Math.floor(Y / sizeCell);
      const currentPenColor = this.HexToRGB(state.color.active);
      // console.log("Цвет заливки - ", currentPenColor);
      let ArrayToRGB = Array.from(ctx.getImageData(X, Y, 1, 1).data);
      ArrayToRGB = ArrayToRGB.filter((i, ind) => ind < 3).join(", ");

      this.BucketCheckCells(coordX, coordY, ArrayToRGB, currentPenColor);

      // console.log("Цвет текущей ячейки - ", ArrayToRGB);
      // console.log(coordX, coordY, sizeCell);
      // this.DrawRect(coordX, coordY, currentPenColor);
    }
  },

  Colorswap(e) {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const X = e.offsetX;
    const Y = e.offsetY;
    const { sizeCell } = state;
    const currentColor = state.color.active;
    let ArrayToRGB = Array.from(ctx.getImageData(X, Y, 1, 1).data);
    ArrayToRGB = ArrayToRGB.filter((i, ind) => ind < 3).join(", ");

    if (state.IsMouseDown) {
      for (let i = 0; i < 32; i += 1) {
        for (let j = 0; j < 32; j += 1) {
          let colorCell = ctx.getImageData(i * sizeCell + 1, j * sizeCell + 1, 1, 1).data;
          colorCell = colorCell.filter((a, ind) => ind < 3).join(", ");
          if (colorCell === ArrayToRGB) {
            this.DrawRect(i, j, currentColor);
          }
        }
      }
    }
  },

  Stroke() {
    if (state.IsMouseDown) { console.log("stroke"); }
  },

  CopyImage() {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(image);
  },

  ChangeStatusTools(e) {
    const obj = state.tools;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key].status = (e === key) ? "true" : "false";
      }
    }
  },
  HexToRGB(col) {
    const m = col.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    return m.join(", ");
  },
  DrawRect(X, Y, color) {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const { sizeCell } = state;

    ctx.fillStyle = color;
    ctx.fillRect((X * +sizeCell), (Y * +sizeCell), +sizeCell, +sizeCell);
  },
  CheckToColor(X, Y, color1, color2) {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const { sizeCell } = state;
    const colorCurrent = color1;
    const colorReplace = color2;
    let colorCell = ctx.getImageData(X * sizeCell + 1, Y * sizeCell + 1, 1, 1).data;
    colorCell = colorCell.filter((a, ind) => ind < 3).join(", ");
    if (X >= 0 && X <= 32 && Y >= 0 && Y <= 32 && colorCell === colorCurrent && colorCell !== colorReplace) {
      this.DrawRect(X, Y, `rgb(${colorReplace})`);
      return this.BucketCheckCells(X, Y, colorCurrent, colorReplace);
      // console.log(colorCell);
    }
  },
  BucketCheckCells(X, Y, colorC, colorR) {
    this.CheckToColor(X - 1, Y, colorC, colorR);
    this.CheckToColor(X + 1, Y, colorC, colorR);
    this.CheckToColor(X, Y - 1, colorC, colorR);
    this.CheckToColor(X, Y + 1, colorC, colorR);
  },
  RemoveFrame(e) {
    const previewList = document.querySelector(".preview_list");
    if (e.target.parentNode !== previewList.childNodes[1] && e.target.classList) {
      e.target.parentNode.remove();
    }
  },
  DuplicateFrame(e) {
    const cloneFrame = e.target.parentNode.cloneNode(true);
    e.target.parentNode.after(cloneFrame);
  },
  RenderFrame() {
    const liFrame = document.querySelectorAll(".toggled");
    Array.from(liFrame).forEach((i, ind) => { i.innerHTML = ind + 1; });
  },
  DragAndDrop(e) {
    const elLi = e.target.parentNode;
    elLi.addEventListener("mousemove", this.MoveAt(e));
    // elLi.style.position = "absolute";
    // elLi.style.zIndex = 1000;
    // console.log(elLi.style);
  },
  MoveAt() {
    const previewList = document.querySelector(".preview_list");
    const previewTiles = previewList.querySelectorAll(".preview_tile");
    previewTiles.forEach((item) => {
      item.draggable = true;
    });

    previewList.addEventListener("dragstart", (el) => {
      el.target.classList.add("selected");
    });
    previewList.addEventListener("dragend", (el) => {
      el.target.classList.remove("selected");
    });
    previewList.addEventListener("dragover", (el) => {
      el.preventDefault();

      const activeElement = previewList.querySelector(".selected");
      const currentElement = el.target;
      const isMoveable = activeElement !== currentElement && currentElement.classList.contains("preview_tile");

      if (!isMoveable) {
        return;
      }

      const nextElement = (currentElement === activeElement.nextElementSibling)
        ? currentElement.nextElementSibling
        : currentElement;

      previewList.insertBefore(activeElement, nextElement);
    });

    console.log(previewList);
    console.log(previewTiles);
    // elLi.style.top = e.clientY;
  },
};

export default { database };
