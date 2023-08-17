const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = []; //created boats as an array

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop()
  

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();

  showBoats() //it's a function so NO DISPLAY!!
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}

function showBoats(){
  if(boats.length > 0){ //there should be at least 1 boat, length is greater than 0
    if(
      boats[boats.length - 1] === undefined || //the boat cannot be undefined, it must be assigned to an object
      boats[boats.length - 1] .body.position.x < width - 300 //it is supposed to be outside of the screen at the start
    ){
      var positions = [-40,-60,-70,-20]
      var position = random(positions);
      var boat = new Boat(width,height-100,170,170,position);
      boats.push(boat)
    }
    for(var i=0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y:0}) //boats.i denotes the index of the array "boats"
        boats[i].display()
      }
    }
  } else{
    boat = new Boat(width, height - 60, 170, 170,-60);
    boats.push(boat) //push is adding an element to an array, e.g. adding boat to the array "boats"
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) { //=== - comparison; = - assignement 
    balls[balls.length - 1].shoot(); //balls is an array, [] is the index
  }
}

