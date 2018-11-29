const Jimp = require('jimp');

const COLOR_WHITE = 0xFFFFFFFF;
const COLOR_BLACK = 0x000000FF;

module.exports = class Previewer {
  constructor({ pxHeight, pxWidth }) {
    this.pxHeight = pxHeight;
    this.pxWidth = pxWidth; 

    this.x = 0;
    this.y = this.pxHeight - 1;
  }
  
  async initialise() {
    return new Promise((resolve, reject) => {
      new Jimp(this.pxWidth, this.pxHeight, COLOR_WHITE, (err, image) => {
        if (err) { return reject(err); }
        this.image = image;
        resolve();
      });
    });
  }

  movePixels(n) {
    for (let a = n; a > 0; a--) {
      this.image.setPixelColor(this.laserStatus ? COLOR_BLACK : COLOR_WHITE, this.x, this.y);
      this.x++;
    }
  }

  moveLine(n, reset) {
    this.y = this.y - n;
    if (reset) {
      this.x = 0;
    }
  }

  getLaserStatus() {
    return this.laserStatus;
  }
  
  turnLaser(status) {
    if (status) {
      this.turnLaserOn();
    } else {
      this.turnLaserOff();
    }
  }

  turnLaserOn() {
    this.laserStatus = true;
  }

  turnLaserOff() {
    this.laserStatus = false;
  }

  build({outputFilename, filename}) {
    const file = outputFilename ? outputFilename : `./preview.${filename}`;
    this.image.write(file);
  }
};