import { state } from './state';

export const database = {
  ChangeColor(e) {
    const color = e.target.value;
    [e.target.color, state.color.active] = [color, color];
  },

  ChangeStatusSelected(e) {
    const toolBox = document.querySelector('.tools-box');

    Array.from(toolBox.children).forEach((el) => {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected');
      }
    });
    e.target.classList.add('selected');
    this.ChangeStatusTools(e.target.dataset.set);
  },

  Painting(e) {
    const canvas = document.querySelector('#canvas_dr');
    const ctx = canvas.getContext('2d');

    if (state.IsMouseDown) {
      const x = e.offsetX;
      const y = e.offsetY;
      const myColor = state.color.active;

      ctx.fillStyle = myColor;
      ctx.strokeStyle = myColor;
      ctx.lineWidth = 10;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  },
  CopyImage() {
    const canvas = document.querySelector('#canvas_dr');
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  },
  Eraser() {
    if (state.IsMouseDown) { console.log('eraser'); }
  },
  Bucket() {
    if (state.IsMouseDown) { console.log('bucket'); }
  },
  Colorswap() {
    if (state.IsMouseDown) { console.log('colorswap'); }
  },
  Stroke() {
    if (state.IsMouseDown) { console.log('stroke'); }
  },
  ChangeStatusTools(e) {
    const obj = state.tools;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key].status = (e === key) ? 'true' : 'false';
      }
    }
  },
};

export default { database };
