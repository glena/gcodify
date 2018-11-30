const program = require('commander');
const assert = require('assert');
const package = require('../package.json')

function init() {
  program
    .version(package.version)
    .usage('[options] <file>')
    .option('-z, --z-offset [value]', 'Position for the Z axis in mm. Defaults to 90mm.')
    .option('-x, --x-offset [value]', 'Position for the X axis in mm. Defaults to 35mm.')
    .option('-y, --y-offset [value]', 'Position for the Y axis in mm. Defaults to 35mm.')

    .option('-w, --width [value]', 'Resizes the image by its width in mm (height will be automatically computed if not provided).')
    .option('-h, --height [value]', 'Resizes the image by its height in mm (width will be automatically computed if not provided).')

    .option('-p, --precision [value]', 'Laser beam size. Defaults to 0.01mm.')
    .option('-lon, --laser-on-code [value]', 'GCODE to turn laser ON. Defaults to M106.')
    .option('-lof, --laser-off-code [value]', 'GCODE to turn laser OFF. Defaults to M107.')
    .option('-s, --laser-speed [value]', 'Speed for the movements while engraving. Defaults to 10 mm/s.')
    .option('-t, --travel-speed [value]', 'Speed for the movements while traveling. Defaults to 200 mm/s.')

    .option('-pt, --pixel-threshold [value]', 'Threshold where a pixel is identified as black (from 0 to 255). Defaults to 128.')
    .option('-b, --image-brighness [value]', 'Tweaks the image brighness (from -1 to 1)')
    .option('-c, --image-contrast [value]', 'Tweaks the image contrast (from -1 to 1)')
    .option('-q, --image-quality [value]', 'Image quality (from 0 to 100). Defaults to 60.')

    .option('-o, --output-filename [value]', 'Overrides the filename used for the process output. Used for both preview and gcode output.').option('-o, --output-filename [value]', 'Overrides the filename used for the process output. Used for both preview and gcode output.')
    .option('--preview', 'Will generate an image instead of a GCODE to preview what the CCODE will look like.')
    .option('--debug', 'Show debug info such as stack traces and debug logs.')
    .parse(process.argv);
}

function getParams() {
  return {
    xOffset: program.xOffset || 35,
    yOffset: program.yOffset || 35,
    zOffset: program.zOffset || 90,

    width: program.width, 
    height: program.height, 

    laserPrecision: program.precision || 0.1, 
    
    laserOnCode: program.laserOnCode || 'M106',
    laserOffCode: program.laserOffCode || 'M107',

    laserSpeed: program.laserSpeed || 10,
    travelSpeed: program.travelSpeed || 200,

    filename: program.args[0],

    preview: program.preview,
    debug: program.debug,
    outputFilename: program.outputFilename,

    pixelThreshold: program.pixelThreshold || 128,
    imageQuality: program.imageQuality || 60,
    imageBrighness: program.imageBrighness,
    imageContrast: program.imageContrast,
  };
}

const validateGCODE = (params, key) => {
  assert.ok(params[key], `Please provide a ${key}`);
}

const validateFilename = validateGCODE;

const validateOffset = (params, key) => {
  assert.ok(params[key], `Please provide a ${key}`);
  assert.ok(params[key] > 0, `${key} should be greater than 0`);
}

const validateSpeed = validateOffset;
const validatePrecision = validateOffset;

const validateSize = (params, key) => {
  if (!params[key]) return;
  assert.ok(params[key] > 0, `${key} should be greater than 0`);
}

const validateRange = (optional, min, max) => (params, key) => {
  if (optional && params[key] === undefined) return; 

  assert.ok(params[key], `Please provide n ${key}`);
  assert.ok(params[key] < max, `${key} should be lower than ${max}`);
  assert.ok(params[key] > min, `${key} should be greater than ${min}`);
}

const validateThreshold =  validateRange(false, 0, 255);
const validateQuality =  validateRange(false, 0, 100);
const validateBrighness =  validateRange(true, -1, 1);
const validateContrast =  validateRange(true, -1, 1);

function validateParams(params) {
  validateOffset(params, 'xOffset');
  validateOffset(params, 'yOffset');
  validateOffset(params, 'zOffset');

  validateSize(params, 'width');
  validateSize(params, 'height');

  validatePrecision(params, 'laserPrecision');
  validateFilename(params, 'filename');
  
  validateGCODE(params, 'laserOnCode');
  validateGCODE(params, 'laserOffCode');
  
  validateSpeed(params, 'laserSpeed');
  validateSpeed(params, 'travelSpeed');

  validateThreshold(params, 'pixelThreshold');
  validateQuality(params, 'imageQuality');
  validateBrighness(params, 'imageBrighness');
  validateContrast(params, 'imageContrast');
}

module.exports = {
  init,
  getParams,
  validateParams
};