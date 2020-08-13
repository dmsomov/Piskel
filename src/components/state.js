export const state = {
  IsMouseDown: false,
  tools: {
    pen: {
      status: 'true',
    },
    eraser: {
      status: 'false',
    },
    bucket: {
      status: 'false',
    },
    colorswap: {
      status: 'false',
    },
    stroke: {
      status: 'false',
    },
  },
  size_pen: 5,
  color: {
    current: 'black',
    second: 'white',
    active: 'black',
  },
};

export default 'state';
