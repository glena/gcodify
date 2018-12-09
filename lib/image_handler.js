const assert = require('assert');
const Jimp = require('jimp');

async function read (filename) {
  return Jimp.read(filename);
}

function prepare(image, {pxWidth, pxHeight, imageBrighness, imageContrast, imageQuality}) {
  if (pxWidth || pxHeight) {
    image = image.resize(pxWidth || Jimp.AUTO, pxHeight || Jimp.AUTO)
  }
  
  image.quality(imageQuality).greyscale();

  if (imageBrighness) {
    image.brightness(imageBrighness);
  }

  if (imageContrast) {
    image.contrast(imageContrast);
  }

  return image;
}

function isPixelOn(image, x, y, threshold) {
  const index = image.getPixelIndex(x, y);
  const bit = image.bitmap.data[index];
  return (bit > threshold);
}

module.exports = {
  read,
  prepare,
  isPixelOn
}