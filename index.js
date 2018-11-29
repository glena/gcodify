const interface = require("./lib/interface");
const { read, prepare } = require("./lib/image_handler");
const { calculatePixels } = require('./lib/calcs');
const OutputFactory = require('./lib/output/factory');
const process = require('./lib/processor');

async function run(params) {
  try {
    let pxWidth = params.width && calculatePixels(params.width, params.laserPrecision);
    let pxHeight = params.height && calculatePixels(params.height, params.laserPrecision);

    let image = await read(params.filename);
    
    if (!(pxWidth || pxHeight)) {
      pxWidth = image.bitmap.width;
      pxHeight = image.bitmap.height;
    }

    Object.assign(params, { pxWidth, pxHeight });

    image = prepare(image, params);

    const output = OutputFactory(params);
    await output.initialise();

    process(output, image, params)

    output.build(params);
  } catch (e) {
    console.log('error', e);
  }
}

interface.init();
const params = interface.getParams();
run(params);