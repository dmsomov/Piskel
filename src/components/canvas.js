import { state } from "./state";
import { database } from "./database";
import { Frame } from "./Frame";

window.onload = () => {
  const canvas = document.querySelector("#canvas_dr");
  const ctx = canvas.getContext("2d");
  const CanvasPar = document.querySelector(".canvas");
  const currentColor = document.querySelector("#currentColor");
  const secondColor = document.querySelector("#secondColor");
  const toolBox = document.querySelector(".tools-box");
  const sizeTool = document.querySelector(".size_tool");
  const sizeCell = Math.floor(CanvasPar.clientHeight / 32);
  const addFrame = document.querySelector(".add_frames_action");
  const previewList = document.querySelector(".preview_list");
  const canv = document.querySelector("#canv");
  canv.height = 90;
  canv.width = 90;

  [canvas.height, canvas.width] = [sizeCell * 32, sizeCell * 32];
  [currentColor.color, secondColor.value] = [state.color.current, state.color.second];
  state.sizeCell = sizeCell;
  state.sizePen = sizeCell;

  canvas.addEventListener("mouseup", () => {
    state.IsMouseDown = false;
    ctx.beginPath();
    database.AddCanvToState();
    // database.ClearContent();
  });

  canvas.addEventListener("mousedown", () => {
    state.IsMouseDown = true;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (state.tools.pen.status === "true") { setTimeout(database.Painting(e, false), 0); }
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

  addFrame.addEventListener("click", (e) => {
    const newFr = new Frame();
    newFr.newFrame();
    database.RenderFrame();
    database.ChangeSelectedFrame(e);
  });
  previewList.addEventListener("click", (e) => {
    const classLi = Array.from(e.target.classList);
    if (classLi.indexOf("delete_frame") >= 0) {
      database.RemoveFrame(e);
    } else if (classLi.indexOf("duplicate_frame") >= 0) {
      database.DuplicateFrame(e);
    } else if (classLi.indexOf("dnd_frame") >= 0) {
      database.DragAndDrop(e);
      e.target.closest(".preview_tile").classList.add("selected");
    } else if (classLi.indexOf("frameCanv") >= 0) {
      database.AddClassSelected(e);
    }
    database.RenderFrame();
  });
  /* window.addEventListener('resize', (e) => {
    [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
    //console.log(e);
  }); */
};
