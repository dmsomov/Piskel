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
  color: {
    current: 'black',
    second: 'white',
    active: 'black',
  },
};

export default 'state';
