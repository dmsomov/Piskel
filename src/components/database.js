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

  Painting(e, status) {
    const canvas = document.querySelector('#canvas_dr');
    const ctx = canvas.getContext('2d');
    const sizePen = state.size_pen;

    if (state.IsMouseDown) {
      const x = e.offsetX;
      const y = e.offsetY;
      const myColor = state.color.active;

      if (status) {
        ctx.globalCompositeOperation = 'destination-out';
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
        ctx.globalCompositeOperation = 'source-over';
      } 
    }
  },
  CopyImage() {
    const canvas = document.querySelector('#canvas_dr');
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
