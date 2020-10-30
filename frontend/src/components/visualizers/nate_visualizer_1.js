const numDots = 1024;

export const defaultSphereSettings = {
  type: "sphere",
  typeSettings: { binCount: 1024 },
  generalSettings: {
    //for canvas settings
    centerX: 350,
    centerY: 350,
    //for any bar
    barWidth: 1,
    //for any circular object
    radius: 0,
    // finished controls
    heightAmplifier: 0.5,
  },
}

export class SphereVisualizer{
  constructor(canvas){
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
    if(!typeof state.generalSettings !== "object"){
      state.generalSettings = {heightAmplifier: 1}
    }
    for ( let i = 0; i < numDots; i++ ){
      let particle = new SphereParticle(canvas);
      particle.draw(state.frequencyArray[i] * state.generalSettings.heightAmplifier)
      // collection.push(new SphereParticle(canvas));
    }
    // collection.forEach((particle, i) => {
    //   particle.draw(state.frequencyArray[i] * state.visualizerSettings.heightAmplifier)
    // })
    // this.renderParticles(state);
  }
}

//represents one particle in sphere. Code inspired by Louis Hoebregts
class SphereParticle {
  constructor(canvas){

    this.particleRadius = 7;
    this.color = '#' + Math.floor(Math.random()*16777215).toString(16);
    //canvas properties
    this.canvas = canvas;
    this.perspective = canvas.width * 0.8;
    this.canvasCenterX = canvas.width/2;
    this.canvasCenterY = canvas.height/2;
    this.ctx = canvas.getContext('2d');

    //polar coordinates
    this.sphereRadius = canvas.width/3;
    this.theta = Math.random() * 2 * Math.PI; //polar angle
    this.phi = Math.acos((Math.random() * 2) -1); //azimuth angle

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
  project3DTo2D = (multiplier) => {
    this.xPos = multiplier * this.sphereRadius * Math.sin(this.phi) * Math.cos(this.theta);
    this.yPos = multiplier * this.sphereRadius * Math.cos(this.phi);
    this.zPos = multiplier * this.sphereRadius * Math.sin(this.phi) * Math.sin(this.theta) + this.sphereRadius;
    
      
    //2D position of particle
    this.depthProjected = this.perspective / (this.perspective + this.zPos);
    this.xProjected = (this.xPos * this.depthProjected) + this.canvasCenterX;
    this.yProjected = (this.yPos * this.depthProjected) + this.canvasCenterY;
    if (this.depthProjected < 0){
      this.depthProjected = this.depthProjected * -1
    }
  }

  draw = (multiplier) => {
    this.project3DTo2D(multiplier*.01); //get 2D position
    this.ctx.globalAlpha = Math.abs(1 - this.z / this.canvas.width); //set opacity
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    //draw particle on canvas
    this.ctx.beginPath();
    // this.ctx.strokeStyle = '#39FF14'
    this.ctx.moveTo(this.canvasCenterX, this.canvasCenterY);
    this.ctx.lineTo(this.xProjected, this.yProjected)
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
  }
}

