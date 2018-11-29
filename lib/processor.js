const { isPixelOn } = require("./image_handler");

module.exports = function process(gCode, image, { pixelThreshold }) {
  let positionCount = 0;
  let lineCount = 0;
  let didLaserToggle = false;

  const checkAndMoveLines = () => {
    if (lineCount > 0) {
      gCode.moveLine(lineCount, true);
      lineCount = 0;
    }
  }

  for (let y = image.bitmap.height - 1; y >= 0; y--) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const shouldBurn = !isPixelOn(image, x, y, pixelThreshold);

      if (gCode.getLaserStatus() !== shouldBurn) {
        didLaserToggle = true;
        if (positionCount > 0) {
          checkAndMoveLines();
          gCode.movePixels(positionCount);
          positionCount = 0;
        }

        gCode.turnLaser(shouldBurn);
      }

      positionCount++;
    }

    if (positionCount > 0 && didLaserToggle && gCode.getLaserStatus()) {
      gCode.movePixels(positionCount);
      gCode.turnLaserOff();
      gCode.moveLine(lineCount + 1, true);
      lineCount = 0;
    } else {
      lineCount ++;
    }

    didLaserToggle = false;
    positionCount = 0;
  }
}