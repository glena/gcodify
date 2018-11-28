const assert = require('assert');
const Jimp = require('jimp');

async function read (filename) {
  return new Promise((resolve, reject) => {

    Jimp.read(filename, (err, image) => {
      if (err) { return reject(err); }
      resolve(image);
    })
  })
}

function prepare(image, width, height) {
  assert.ok(width || height, 'With or height should be specified');

  return image.resize(width || Jimp.AUTO, height || Jimp.AUTO)
    .quality(60)
    .greyscale();
}

function isPixelOn(image, x, y) {
  const index = image.getPixelIndex(x, y);
  const bit = image.bitmap.data[index];
  return (bit > 128);
}

module.exports = {
  read,
  prepare,
  isPixelOn
}