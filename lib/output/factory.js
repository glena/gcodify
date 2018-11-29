const GCode = require('./gcode');
const Previewer = require('./previewer');

module.exports = (params) => {
  if (params.preview) return new Previewer(params);
  return new GCode(params);
}