import state from "./state";

export class Frame {
  constructor() {
    this.previewList = document.querySelector(".preview_list");
    this.newElementLi = document.createElement("li");
  }

  newFrame() {
    this.newElementLi.classList.add("preview_tile");
    this.newElementLi.innerHTML = `
    <div class="tile_container"></div>
    <button class="tile_overlay duplicate_frame icon_frame_duplicate"></button>
    <button class="tile_overlay delete_frame icon_frame_recyclebin"></button>
    <div class="tile_overlay dnd_frame icon_frame_dragndrop"></div>
    <button class="tile_overlay tile_count toggled">1</button> `;
    this.previewList.append(this.newElementLi);
  }

  // previewList = document.querySelector('.preview_list');
  say() {}
}

export default { Frame };
