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
      // [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
      const coordX = e.offsetX;
      const coordY = e.offsetY;
      const gridSize = Math.floor(canvas.height / sizeCell);

      if (status) {
        ctx.globalCompositeOperation = "destination-out";
      }

      for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
        // eslint-disable-next-line max-len
          if (coordX > (j * +sizeCell) && coordX < ((j + 1) * +sizeCell) && coordY > (i * +sizeCell) && coordY < ((i + 1)) * +sizeCell) {
            ctx.fillStyle = myColor;
            // eslint-disable-next-line max-len
            ctx.fillRect((j * +sizeCell) - sizePen / 2, (i * +sizeCell) - sizePen / 2, +sizePen, +sizePen);
          }
        }
      }

      if (status) {
        ctx.globalCompositeOperation = "source-over";
      }
    }
  },

  Eraser(e) {
    if (state.IsMouseDown) {
      const canvas = document.querySelector("#canvas_dr");
      const ctx = canvas.getContext("2d");
      const { sizePen } = state;
      const { sizeCell } = state;
      const myColor = state.color.active;
      // [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
      const coordX = e.offsetX;
      const coordY = e.offsetY;

      /* const pxlX = "128";
      const pxlY = "128"; */

      const gridSize = Math.floor(canvas.height / sizeCell);

      for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
        // eslint-disable-next-line max-len
          if (coordX > (j * +sizeCell) && coordX < ((j + 1) * +sizeCell) && coordY > (i * +sizeCell) && coordY < ((i + 1)) * +sizeCell) {
            ctx.fillStyle = myColor;
            // eslint-disable-next-line max-len
            ctx.fillRect((j * +sizeCell) - sizePen / 2, (i * +sizeCell) - sizePen / 2, +sizePen, +sizePen);
          }
        }
      }
    }
  },

  CopyImage() {
    const canvas = document.querySelector("#canvas_dr");
    const ctx = canvas.getContext("2d");
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  },
  Bucket() {
    if (state.IsMouseDown) { console.log("bucket"); }
  },
  Colorswap() {
    if (state.IsMouseDown) {
      console.log("colorswap");
    }
  },
  Stroke() {
    if (state.IsMouseDown) { console.log("stroke"); }
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
};

export default { database };
