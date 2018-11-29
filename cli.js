const {init: initInterface, getParams} = require("./lib/interface");
const run = require('./index');

initInterface();
const params = getParams();
run(params);