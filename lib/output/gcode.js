const fs = require('fs');

const TRAVEL_CODE = 'G0';
const MOVE_CODE = 'G1'; 

module.exports = class Gcode {
  constructor({laserOnCode, laserOffCode, laserPrecision, laserSpeed, travelSpeed, xOffset, yOffset, zOffset}) {
    this.code = [];
    this.laserOnCode = laserOnCode;
    this.laserOffCode = laserOffCode;
    this.laserPrecision = laserPrecision;
    this.laserSpeed = laserSpeed * 60;
    this.travelSpeed = travelSpeed * 60;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = zOffset;
    this.currentXPosition = 0;
    this.laserStatus = undefined;
  }

  async initialise() {
    this.turnLaserOff();
    this.autoHome();
    this.setUnitMM();
    this.relativePositioning();
    this.initialPosition();
    return Promise.resolve();
  }

  autoHome() {
    this.append('G28');
  }

  relativePositioning() {
    this.append('G91');
  }

  initialPosition() {
    this.move(TRAVEL_CODE, { x: this.xOffset, y: this.yOffset, z: this.zOffset });
  }

  move(code, {x, y, z, fr}) {
    let params = '';
    
    if (x !== undefined) { 
      this.currentXPosition = this.currentXPosition + x;
      params = params + ` X${x}`; 
    }
    
    if (y) { params = params + ` Y${y}`; }
    if (z) { params = params + ` Z${z}`; }

    if (!fr) { 
      if (code === TRAVEL_CODE) {
        fr = this.travelSpeed;
      } else if (code === MOVE_CODE) {
        fr = this.laserSpeed;
      }
    }
    
    params = params + ` F${fr}`; 

    this.append(`${code}${params}`); 
  }

  setUnitMM() {
    this.append(`G21`);
  }

  movePixels(n) {
    if (!this.laserStatus) {
      this.move(TRAVEL_CODE,  { x: this.laserPrecision * n } );
    } else {
      this.move(MOVE_CODE,  { x: this.laserPrecision * n } )
    }
  }

  moveLine(n, reset) {
    const params = { y: this.laserPrecision * n }
    if (reset) {
      params.x = (-1 * this.currentXPosition) + this.xOffset;
    }
    this.move(TRAVEL_CODE, params);
  }

  append(line) {
    this.code.push(line);
  }
  
  getLaserStatus() {
    return this.laserStatus;
  }
  
  turnLaser(status) {
    if (status) {
      this.turnLaserOn();
    } else {
      this.turnLaserOff();
    }
  }

  turnLaserOn() {
    if (!this.laserStatus || this.laserStatus === undefined) {
      this.laserStatus = true;
      this.code.push(`${this.laserOnCode} S255`);
    }
  }

  turnLaserOff() {
    if (this.laserStatus || this.laserStatus === undefined) {
      this.laserStatus = false;
      this.code.push(`${this.laserOffCode} S0`);
    }
  }

  build({outputFilename, filename}) {
    const file = outputFilename ? outputFilename : `./${filename}.gcode`;
    fs.writeFileSync(file, this.code.join("\n"));
  }
};