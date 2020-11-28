export const state = {
  IsMouseDown: false,
  tools: {
    pen: {
      status: "true",
    },
    eraser: {
      status: "false",
    },
    bucket: {
      status: "false",
    },
    colorswap: {
      status: "false",
    },
    stroke: {
      status: "false",
    },
  },
  sizeCell: 5,
  sizePen: 5,
  color: {
    current: "#000000",
    second: "#ffffff",
    active: "#000000",
  },
  frames: [],
  curfr: [],
};

export default "state";
