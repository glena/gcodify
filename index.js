const fs = require('fs');
const interface = require("./lib/interface");
const { read, prepare } = require("./lib/image_handler");
const { calculatePixels } = require('./lib/calcs');
const GCode = require('./lib/gcode');
const process = require('./lib/processor');

async function run(params) {
  try {
    let image = await read(params.filename);

    const width = params.width && calculatePixels(params.width, params.laserPrecission);
    const height = params.height && calculatePixels(params.height, params.laserPrecission);

    image = prepare(image, width, height);

    const gCode = new GCode(params);
    gCode.initialise();

    process(gCode, image)

    fs.writeFileSync(`./${params.filename}.gcode`, gCode.build());

  } catch (e) {
    console.log('error', e);
  }
}

interface.init();
const params = interface.getParams();
run(params);