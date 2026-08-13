import sharp from "sharp";

const image = sharp("public/favicon-rounded.png");
const info = await image.metadata();
const b = await image.raw().toBuffer();

const { width: w, height: h, channels } = info;

const px = (x, y) =>
  channels === 4
    ? b[(y * w + x) * 4 + 3]
    : 255;

console.log("dims", { w, h });
console.log("top-left:", px(0, 0));
console.log("top-right:", px(w - 1, 0));
console.log("center:", px(Math.floor(w / 2), Math.floor(h / 2)));
console.log("edge:", px(16, 16));