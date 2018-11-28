const TRAVEL_CODE = 'G0';
const MOVE_CODE = 'G1'; 

module.exports = class Gcode {
  constructor({laserOnCode, laserOffCode, laserPrecission, laserSpeed, travelSpeed, xOffset, yOffset, zOffset}) {
    this.code = [];
    this.laserOnCode = laserOnCode;
    this.laserOffCode = laserOffCode;
    this.laserPrecission = laserPrecission;
    this.laserSpeed = laserSpeed * 60;
    this.travelSpeed = travelSpeed * 60;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = zOffset;
    this.currentXPosition = 0;
    this.laserStatus = undefined;
  }

  initialise() {
    this.turnLaserOff();
    this.autoHome();
    this.setUnitMM();
    this.relativePositioning();
    this.initialPosition();
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
      this.move(TRAVEL_CODE,  { x: this.laserPrecission * n } );
    } else {
      this.move(MOVE_CODE,  { x: this.laserPrecission * n } )
    }
  }

  moveLine(n, reset) {
    const params = { y: this.laserPrecission * n }
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

  build() {
    return this.code.join("\n");
  }
};