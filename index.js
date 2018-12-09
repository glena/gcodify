const { read, prepare } = require("./lib/image_handler");
const { calculatePixels } = require('./lib/calcs');
const OutputFactory = require('./lib/output/factory');
const process = require('./lib/processor');
const logger = require('./lib/logger');
const {validateParams} = require("./lib/interface");

async function run(params) {
  logger.init(params);

  try {
    validateParams(params);
    let pxWidth = params.width && calculatePixels(params.width, params.laserPrecision);
    let pxHeight = params.height && calculatePixels(params.height, params.laserPrecision);

    let image = await read(params.filename);

    Object.assign(params, { pxWidth, pxHeight });

    image = prepare(image, params);

    pxWidth = image.bitmap.width;
    pxHeight = image.bitmap.height;

    Object.assign(params, { pxWidth, pxHeight });

    const output = OutputFactory(params);
    await output.initialise();

    process(output, image, params)

    await output.build(params);
  } catch (e) {
    logger.error(e);
    return e;
  }
}

module.exports = run;
