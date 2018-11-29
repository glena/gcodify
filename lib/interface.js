const program = require('commander');
const package = require('../package.json')

// const xOffset = 35;
// const yOffset = 35;
// const zOffset = 90;

// const width_mm = 100;
// const height_mm = null;

// const laserPrecission = 0.01; // mm
// const laserOnCode = 'M106';
// const laserOffCode = 'M107';
// const laserSpeed = 40; // mmpms
// const travelSpeed = 200; // mmpms

function init() {
  program
    .version(package.version)
    .usage('[options] <file>')
    .option('-z, --z-offset [value]', 'Position for the Z axis in mm. Defaults to 90mm.')
    .option('-x, --x-offset [value]', 'Position for the X axis in mm. Defaults to 35mm.')
    .option('-y, --y-offset [value]', 'Position for the Y axis in mm. Defaults to 35mm.')

    .option('-w, --width [value]', 'Resizes the image by its width in mm (height will be automatically computed if not provided).')
    .option('-h, --height [value]', 'Resizes the image by its height in mm (width will be automatically computed if not provided).')

    .option('-p, --precission [value]', 'Laser beam size. Defaults to 0.01mm.')
    .option('--laser-on-code [value]', 'GCODE to turn laser ON. Defaults to M106.')
    .option('--laser-off-code [value]', 'GCODE to turn laser OFF. Defaults to M107.')
    .option('-s, --laser-speed [value]', 'Speed for the movements while engraving. Defaults to 40 mm/s.')
    .option('-t, --travel-speed [value]', 'Speed for the movements while traveling. Defaults to 200 mm/s.')
    .parse(process.argv);
}

function getParams() {
  return {
    xOffset: program.xOffset || 35,
    yOffset: program.yOffset || 35,
    zOffset: program.zOffset || 90,

    width: program.width, 
    height: program.height, 

    laserPrecission: program.precission || 0.1, 
    
    laserOnCode: program.laserOnCode || 'M106',
    laserOffCode: program.laserOffCode || 'M107',

    laserSpeed: program.laserSpeed || 40,
    travelSpeed: program.travelSpeed || 200,

    filename: program.args[0]
  };
}

module.exports = {
  init,
  getParams
};