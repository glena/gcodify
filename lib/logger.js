class Logger {
  init({debug}) {
    this.debug = debug;
  }

  info(message) {
    console.info(message);
  }

  debug(message) {
    if (!this.debug) return;
    console.debug(message);
  }
  
  error(e) {
    if (this.debug) {
      console.error(e)
    } else {
      console.log('Error: ', e.message)
    }
  }
}

const logger = new Logger();

module.exports = logger;