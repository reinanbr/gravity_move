let system;
var forceX
var forceY
var accForce

class Move{
  constructor(x,y){
    this.mag = 0.1
    this.mass = 10
    this.r = 32
    this.pos = createVector(x,y)
    this.vel = createVector(1,1)
    this.acc = createVector(0,0)
  }
  addForce(vectorForce){
    console.log(vectorForce.y)
    forceX = vectorForce.x/this.mass
    forceY = vectorForce.y/this.mass
    accForce = createVector(forceX,forceY)
    this.acc.add(accForce)
  }
  update(){
    this.acc.setMag(this.mag)
    this.vel.add(this.acc)
    this.vel.limit(20)
    this.pos.add(this.vel)
    // a soma de todas as forças é igual a zero
    this.acc = createVector(0,0)
  }
  
  limitDimension(){
    if (this.pos.x >= dimensionLimit.x-this.r){
      this.pos.x = dimensionLimit.x-this.r
      this.vel.x = - this.vel.x
    }else if (this.pos.x <= this.r){
      this.pos.x = this.r
      this.vel.x = - this.vel.x
    }
    
    if (this.pos.y >= dimensionLimit.y-this.r){
      this.pos.y = dimensionLimit.y-this.r
      this.vel.y = - this.vel.y
    }else if (this.pos.y <= this.r){
      this.pos.y = this.r
      this.vel.y = - this.vel.y
    }
  }
  
  show(){
    stroke(255)
    strokeWeight(2)
    fill(255,100)
    ellipse(this.pos.x,this.pos.y,this.r)
  }
}



function setup(){
  gravity = createVector(0,9.8)
  wind = createVector(0.01,0)
  
  dimensionLimit = createVector(450,700)
  createCanvas(450, 700);
  bola = new Move(200,200)
  
 // system = new ParticleSystem(createVector(width / 2, 50));
}

dt = new Date()
time_init = dt.valueOf()
var dt_c
var time_c
function draw() {
  dt_c = new Date()
  time_c = dt_c.valueOf()-time_init
  normalVel = Math.sqrt(bola.vel.x**2+bola.vel.y**2)
  
  pVel = `<p><b>normal da velocidade:</b> ${round(normalVel,2)}m/s</p>`
  
  pHight = `<p><b>altura:</b> ${round(abs(bola.pos.y-dimensionLimit.y-bola.r),2)}m</p>`
  
  pMoment = `<p><b>normal do momento:</b> ${round(normalVel*bola.mass,2)}kg*m/s</p><p><b>massa do objeto:</b> ${bola.mass}kg</p>`
  
  pTimeCrono = `<p><b>time system:</b> ${round(time_c/1000,1)}s</p>`
  pForces = `<p><b>força da gravidade:</b> ${gravity.y}m/s²</p><p><b></b></p>`
  
  $('#force').html(`${pVel}${pHight}${pMoment}${pForces}${pTimeCrono}`)
  background(0);
  bola.addForce(gravity)
  bola.addForce(wind)
  bola.update()
  bola.limitDimension()
  bola.show()
  //system.addParticle();
  //system.run();
  
}



