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
  Bucket() {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const { sizeCell } = state;
    const pxlCol = ctx.getImageData(5, 5, 1, 1);

    if (state.IsMouseDown) {
      console.log(Array.from(pxlCol.data));
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
};

export default { database };
