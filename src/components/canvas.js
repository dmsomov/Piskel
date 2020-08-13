import { state } from './state';
import { database } from './database';

window.onload = () => {
  const canvas = document.querySelector('#canvas_dr');
  const ctx = canvas.getContext('2d');
  const CanvasPar = document.querySelector('.canvas');
  const currentColor = document.querySelector('#currentColor');
  const secondColor = document.querySelector('#secondColor');
  const toolBox = document.querySelector('.tools-box');
  const sizeTool = document.querySelector('.size_tool');

  [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
  [currentColor.color, secondColor.value] = [state.color.current, state.color.second];

  canvas.addEventListener('mouseup', () => {
    state.IsMouseDown = false;
    ctx.beginPath();
  });

  canvas.addEventListener('mousedown', () => {
    state.IsMouseDown = true;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (state.tools.pen.status === 'true') { database.Painting(e); }
    if (state.tools.eraser.status === 'true') { database.Eraser(); }
    if (state.tools.bucket.status === 'true') { database.Bucket(); }
    if (state.tools.colorswap.status === 'true') { database.Colorswap(); }
    if (state.tools.stroke.status === 'true') { database.Stroke(); }
  });

  currentColor.addEventListener('change', (e) => {
    database.ChangeColor(e);
  });

  secondColor.addEventListener('change', (e) => {
    database.ChangeColor(e);
  });

  toolBox.addEventListener('click', (e) => {
    database.ChangeStatusSelected(e);
  });

  sizeTool.addEventListener('change', (e) => {
    state.size_pen = e.target.value;
  });
  /*window.addEventListener('resize', (e) => {
    [canvas.height, canvas.width] = [CanvasPar.clientHeight, CanvasPar.clientWidth];
    //console.log(e);
  });*/
};
