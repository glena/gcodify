const fs = require('fs');
const { read, prepare } = require("./lib/image_handler");
const { calculatePixels } = require('./lib/calcs');
const GCode = require('./lib/gcode');
const process = require('./lib/processor');

async function run() {
  try {
    const xOffset = 35;
    const yOffset = 35;
    const zOffset = 90;

    const width_mm = 100;
    const height_mm = null;
    
    const laserPrecission = 0.01; // mm
    const laserOnCode = 'M106';
    const laserOffCode = 'M107';
    const laserSpeed = 20; // mmpms
    const travelSpeed = 90; // mmpms

    const filename = './logo.jpg';

    let image = await read(filename);

    const width = width_mm && calculatePixels(width_mm, laserPrecission);
    const height = height_mm && calculatePixels(height_mm, laserPrecission);

    image = prepare(image, width, height);

    const gCode = new GCode({laserOnCode, laserOffCode, laserPrecission, laserSpeed, travelSpeed, xOffset, yOffset, zOffset});
    gCode.initialise();

    process(gCode, image)

    fs.writeFileSync(`./${filename}.gcode`, gCode.build());

  } catch (e) {
    console.log('error', e);
  }
}

run();