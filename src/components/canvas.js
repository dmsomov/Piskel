import { state } from "./state";
import { database } from "./database";

window.onload = () => {
  const canvas = document.querySelector("#canvas_dr");
  const ctx = canvas.getContext("2d");
  const CanvasPar = document.querySelector(".canvas");
  const currentColor = document.querySelector("#currentColor");
  const secondColor = document.querySelector("#secondColor");
  const toolBox = document.querySelector(".tools-box");
  const sizeTool = document.querySelector(".size_tool");
  const sizeCell = Math.floor(CanvasPar.clientHeight / 32);

  [canvas.height, canvas.width] = [sizeCell * 32, sizeCell * 32];
  [currentColor.color, secondColor.value] = [state.color.current, state.color.second];
  state.sizeCell = sizeCell;
  state.sizePen = sizeCell;

  canvas.addEventListener("mouseup", () => {
    state.IsMouseDown = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousedown", () => {
    state.IsMouseDown = true;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (state.tools.pen.status === "true") { database.Painting(e, false); }
    if (state.tools.eraser.status === "true") { database.Painting(e, true); }
    if (state.tools.bucket.status === "true") { database.Bucket(e); }
    if (state.tools.colorswap.status === "true") { database.Colorswap(e); }
    if (state.tools.stroke.status === "true") { database.CopyImage(); }
  });

  currentColor.addEventListener("change", (e) => {
    database.ChangeColor(e);
  });

  secondColor.addEventListener("change", (e) => {
    database.ChangeColor(e);
  });

  toolBox.addEventListener("click", (e) => {
    database.ChangeStatusSelected(e);
  });

  sizeTool.addEventListener("change", (e) => {
    state.sizePen = state.sizeCell * e.target.value;
  });
  /* window.addEventListener('resize', (e) => {
    [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
    //console.log(e);
  }); */
};
