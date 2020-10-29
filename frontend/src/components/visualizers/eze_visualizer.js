// import React from "react";

// // class Particle {
// //   constructor(x, y) {
// //     const colorOne = "rgba(10, 255, 255, 0.7)";
// //     const colorTwo = "rgba(255, 255, 255, 0.7)";
// //     const colorThree = "rgba(10, 255, 255, 0.9)";
// //     const colorFour = "rgba(255, 255, 255, 0.9)";
// //     const colorFive = "rgba(10, 255, 255, 0.5)";
// //     const colorSix = "rgba(255, 255, 255, 0.5)";
// //     const allColors = [
// //       colorOne,
// //       colorTwo,
// //       colorThree,
// //       colorFour,
// //       colorFive,
// //       colorSix,
// //     ];
// //     this.vel = [0, 5]
// //     this.x = x + 20;
// //     this.y = y + 20;
// //     this.radius = 20;
// //     this.d = 40
// //     this.color = allColors[Math.floor(Math.random() * 6)];
// //   }

// //   updateParticleModel() {
// //     var a = 180 - (this.d + 90); // find the 3rd angle
// //     this.d > 0 && this.d < 180 ? this.x += this.s * Math.sin(this.d) / Math.sin(this.s) : this.x -= this.s * Math.sin(this.d) / Math.sin(this.s);
// //     this.d > 90 && this.d < 270 ? this.y += this.s * Math.sin(a) / Math.sin(this.s) : this.y -= this.s * Math.sin(a) / Math.sin(this.s);
// //     return p;
// //   };

// //   move(){
// //     this.y += this.vel[1]
// //   }
// // }

// // export class ezeVisualizer {
// //   constructor(props) {
// //     this.settings = props;
// //     this.draw = this.draw.bind(this)
// //   }

// //   animate(canvas, state) {
// //     const ctx = canvas.getContext("2d");
// //     this.createParticlesArray(canvas);
// //     this.draw(ctx);
// //   }

// //   createParticlesArray(canvas) {
// //     // debugger
// //     this.particles = [];
// //     // x/y += is amount of spacing between each circle 
// //     for (let x = 0; x < canvas.width; x += 60) {
// //       // for (let y = 0; y < canvas.height; y += 60) {
// //         // filling every coordinate with particles
// //         let particle = new Particle(x, 0);
// //         // particle.move()
// //         this.particles.push(particle);
// //         // console.log(particle);
// //       // }
// //     }
// //   }

// //   draw(ctx) {
// //     for(const p of this.particles){
// //       ctx.fillStyle = p.color
// //       ctx.beginPath();
// //       ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false)
// //       ctx.fill();
// //     }
// //   }
// // }

// // Configuration, Play with these
// const config = {
//   particleNumber: 800,
//   maxParticleSize: 10,
//   maxSpeed: 40,
//   colorVariation: 50
// };

// // Colors
// const colorPalette = {
//     bg: {r:12,g:9,b:29},
//     matter: [
//       {r:36,g:18,b:42}, // darkPRPL
//       {r:78,g:36,b:42}, // rockDust
//       {r:252,g:178,b:96}, // solorFlare
//       {r:253,g:238,b:152} // totesASun
//     ]
// };

// // Some Variables hanging out
// const particles = [],
//     centerX = canvas.width / 2,
//     centerY = canvas.height / 2,
//     drawBg,

// class Particle  {
//   constructor(x, y){

//   }

//   setup(canvas){
//      // X Coordinate
//      this.x = x || Math.round(Math.random() * canvas.width);
//      // Y Coordinate
//      this.y = y || Math.round(Math.random() * canvas.height);
//      // Radius of the space dust
//      this.r = Math.ceil(Math.random() * config.maxParticleSize);
//      // Color of the rock, given some randomness
//      this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
//      // Speed of which the rock travels
//      this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
//      // Direction the Rock flies
//      this.d = Math.round(Math.random() * 360);
//   }

//   updateParticleModel(p){
//     var a = 180 - (p.d + 90); // find the 3rd angle
//     p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
//     p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
//     return p;
//   }

//   cleanUpArray(){
//     particles = particles.filter((p) => { 
//       return (p.x > -100 && p.y > -100); 
//     });
//   }

//   animate(canvas, state){
//    this.setup(canvas)

//   }

//   drawParticle(x, y, r, c){
//     ctx.beginPath();
//     ctx.fillStyle = c;
//     ctx.arc(x, y, r, 0, 2*Math.PI, false);
//     ctx.fill();
//     ctx.closePath();
//   }
// }

// // Provides some nice color variation
// // Accepts an rgba object
// // returns a modified rgba object or a rgba string if true is passed in for argument 2
// var colorVariation = function (color, returnString) {
//     var r,g,b,a, variation;
//     r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
//     g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
//     b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
//     a = Math.random() + .5;
//     if (returnString) {
//         return "rgba(" + r + "," + g + "," + b + "," + a + ")";
//     } else {
//         return {r,g,b,a};
//     }
// };



// // Remove particles that aren't on the canvas

// var initParticles = function (numParticles, x, y) {
//     for (let i = 0; i < numParticles; i++) {
//         particles.push(new Particle(x, y));
//     }
//     particles.forEach((p) => {
//         drawParticle(p.x, p.y, p.r, p.c);
//     });
// };

// // First particle explosion
// initParticles(config.particleNumber);

// var frame = function () {
//   // Draw background first
//   drawBg(ctx, colorPalette.bg);
//   // Update Particle models to new position
//   particles.map((p) => {
//     return updateParticleModel(p);
//   });
//   // Draw em'
//   particles.forEach((p) => {
//       drawParticle(p.x, p.y, p.r, p.c);
//   });
//   // Play the same song? Ok!
//   window.requestAnimFrame(frame);
// };