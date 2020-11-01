const numDots = 1024;

export const defaultSphereSettings = Object.freeze({
  type: "sphere",
  typeSettings: Object.freeze({ binCount: 1024 }),
  generalSettings: Object.freeze({
    //for any bar
    barWidth: 2,
    //for any circular object
    // radius: 1,
    // finished controls
    heightAmplifier: 1,
  }),
});

const incrementColor = function (color, step) {
  let colorToInt = parseInt(color.slice(1), 16), // Convert HEX color to integer
    nstep = parseInt(step); // Convert step to integer
  if (!isNaN(colorToInt) && !isNaN(nstep)) {
    // Make sure that color has been converted to integer
    colorToInt += nstep; // Increment integer with step
    let ncolor = colorToInt.toString(16); // Convert back integer to HEX
    ncolor = "#" + new Array(7 - ncolor.length).join(0) + ncolor; // Left pad "0" to make HEX look like a color
    if (/^#[0-9a-f]{6}$/i.test(ncolor)) {
      // Make sure that HEX is a valid color
      return ncolor;
    }
  }
  return color;
};

export class SphereVisualizer {
  constructor(canvas) {
    // this.state = state;
    // this.canvas = canvas;
    // this.collection = [];
    // for ( let i = 0; i < numDots; i++ ){
    //   this.collection.push(new SphereParticle(canvas));
    // }
  }

  //will need to call window.requestAnimationFrame(renderDots)
  // renderParticles = (state) => {
  //   this.collection.forEach((particle, i) => {
  //     particle.draw(state.frequencyArray[i] * state.visualizerSettings.heightAmplifier)
  //   })
  // }

  animate = (canvas, state) => {
    // let collection;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if(!typeof state.generalSettings !== "object"){
    //   state.generalSettings = {heightAmplifier: 1}
    // }
    for (let i = 0; i < numDots; i++) {
      let particle = new SphereParticle(canvas, state, i);
      particle.draw();
      // collection.push(new SphereParticle(canvas));
    }
    // collection.forEach((particle, i) => {
    //   particle.draw(state.frequencyArray[i] * state.visualizerSettings.heightAmplifier)
    // })
    // this.renderParticles(state);
  };
}

//represents one particle in sphere. Code inspired by Louis Hoebregts
class SphereParticle {
  constructor(canvas, state, i) {
    this.radius =
      state.generalSettings.radius > 0 ? state.generalSettings.radius : 1;

    this.particleRadius =
      state.generalSettings.barWidth > 0 ? state.generalSettings.barWidth : 2;

    this.multiplier =
      state.generalSettings.heightAmplifier > 0
        ? state.frequencyArray[i] *
          0.003 *
          state.generalSettings.heightAmplifier
        : state.frequencyArray[i] * 0.003;

    if (state.generalSettings.color) {
      // let colorHex = state.generalSettings.color;
      // let colorInt = parseInt(colorHex.slice(1), 16) + (100*i);
      // this.color = '#' + colorInt.toString(16);
      this.color = incrementColor(state.generalSettings.color, i);
    } else {
      this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    //canvas properties
    this.canvas = canvas;
    this.perspective = canvas.width * 0.8;
    this.canvasCenterX = canvas.width / 2;
    this.canvasCenterY = canvas.height / 2;
    this.ctx = canvas.getContext("2d");

    //polar coordinates
    this.sphereRadius = canvas.width / 2;
    this.theta = Math.random() * 2 * Math.PI; //polar angle
    this.phi = Math.acos(Math.random() * 2 - 1); //azimuth angle

    //initial 3D positon
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    //initial 2D position
    this.xProjected = 0;
    this.yProjected = 0;
    this.depthProjected = 0;
  }

  //project 3D position to 2D canvas
  project3DTo2D = () => {
    this.xPos =
      this.multiplier *
      this.sphereRadius *
      Math.sin(this.phi) *
      Math.cos(this.theta);
    this.yPos = this.multiplier * this.sphereRadius * Math.cos(this.phi);
    this.zPos =
      this.multiplier *
        this.sphereRadius *
        Math.sin(this.phi) *
        Math.sin(this.theta) +
      this.sphereRadius;

    //2D position of particle
    this.depthProjected = this.perspective / (this.perspective + this.zPos);
    this.xProjected = this.xPos * this.depthProjected + this.canvasCenterX;
    this.yProjected = this.yPos * this.depthProjected + this.canvasCenterY;
    if (this.depthProjected < 0) {
      this.depthProjected = this.depthProjected * -1;
    }
  };

  draw = () => {
    this.project3DTo2D(); //get 2D position
    this.ctx.globalAlpha = Math.abs(1 - this.z / this.canvas.width); //set opacity
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    //draw particle on canvas
    this.ctx.beginPath();
    // this.ctx.strokeStyle = '#39FF14'
    this.ctx.moveTo(this.canvasCenterX, this.canvasCenterY);
    this.ctx.lineTo(this.xProjected, this.yProjected);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      this.xProjected,
      this.yProjected,
      this.particleRadius * this.depthProjected,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  };
}
