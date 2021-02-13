var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, groundImage;
var helicopterImg,helicopter;
var zombieImg, zombies;
var missileImg,missile,exploSound,crash;
var humanImg, humans;
var birds,birdImg;
var gameOverImg,gameOver;
var restartImg,restart;
var bird;
var score = 0;

function preload(){
  
 //loading images
 groundImage = loadImage("desertt.png");  
 helicopterImg = loadImage("helicopter.png");
 zombieImg = loadImage("zombies.png");
 missileImg = loadImage("Missile.png");
 humanImg = loadImage("peoplee.png");
 birdImg = loadImage("birdd.png");
 gameOverImg = loadImage("go2.0.png");
 restartImg = loadImage("26715-6-restart-photo.png");
 
 //loading sounds 
 exploSound = loadSound("zapsplat_explosions_punchy_explosion_with_short_tail_006_62170.mp3")
  
crash = loadSound("crash-sound.mp3")

}

function setup() {
  createCanvas(365,325);
  
  //creating the ground
  ground = createSprite(100,150,400,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -3;
  ground.scale = 0.69;
  
  //creating the helicopter
  helicopter = createSprite(100,100,1700,40);
  helicopter.addImage(helicopterImg);
  helicopter.scale = 0.34;
  
  //creating the game over
  gameOver = createSprite(180,150,1500,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.25;
  
  //creating the restart
  restart = createSprite(180,210,1500,40);
  restart.addImage(restartImg);
  restart.scale = 0.16;

  //creating the ivisible grounds
  invisibleG1 = createSprite(200,127,800,10);
  invisibleG2 = createSprite(200,16,800,10);
  invisibleG3 = createSprite(200,355.5,800,4);
  invisibleG1.visible = false;
  invisibleG2.visible = false;
  invisibleG3.visible = false;

  missileGroup = new Group();
  zombiesGroup = new Group();
  humansGroup = new Group();
  birdsGroup = new Group();
  birdGroup = new Group();

}

function draw() {
 background(180);
fill("white");
  
if(gameState === PLAY){
    ground.velocityX = -3;

  restart.visible = false;
  gameOver.visible = false;
  
 if (ground.x < -50){
  ground.x = ground.width/3.5;
 }
  
  if(keyDown("down_arrow")){
    helicopter.y = helicopter.y + 8;
  }
    
  if(keyDown("up_arrow")){
    helicopter.y = helicopter.y - 8;
  }
  
  if(keyDown("space")) {
     spawnMissile();
    }
  
  if(missileGroup.isTouching(zombiesGroup)){
    exploSound.play();
    zombies.destroy();
    score=score+1;
  }
  
   if(missileGroup.isTouching(humansGroup)){
    exploSound.play();
    humans.destroy();
    gameState = END;
  }
  
  if(missileGroup.isTouching(invisibleG3)){
    exploSound.play();
    
  }
  
  if(helicopter.isTouching(birdsGroup)){
    gameState = END;
    crash.play();

  }
  
  if(helicopter.isTouching(birdGroup)){
    gameState = END;
    crash.play();
  }
  
  helicopter.collide(invisibleG1);
  helicopter.collide(invisibleG2); 
  missileGroup.collide(invisibleG3);
  
  spawnZombies();
  spawnHumans();
  spawnBirds();
  spawnBird();
  
}
  
 else if (gameState === END) {
   
   background("black");
   //gameOver.visible = true;
   //restart.visible = true;
   helicopter.visible = false;
   birdsGroup.destroyEach();
 birdGroup.destroyEach();
 zombiesGroup.destroyEach();
 humansGroup.destroyEach();   
   ground.velocityX = 0;
   restart.visible = true;
   gameOver.visible = true;

   
   }

  
  if(mousePressedOver(restart)) {
     reset();
  }
   drawSprites()
   text("Score: "+ score, 266,15);

} 

function reset(){
 gameState = PLAY;
 helicopter.visible = true;

 score = 0;
 
}


 function spawnMissile() {
  missile = createSprite();
  missile.addImage(missileImg);
  missile.y = helicopter.y;
  missile.x = 100;
  //missile.y = 103;
  missile.velocityY = 4;
  missile.lifetime = 200;
  missile.scale = 0.1; 
  missile.setCollider("rectangle",0,0,missile.width,missile.height);
  missile.debug = false
  missileGroup.add(missile);
}

function spawnZombies(){
if(World.frameCount%190==0){
 zombies = createSprite(400,299,10,40);
 zombies.addImage(zombieImg);
 zombies.scale = 0.14;
 zombies.velocityX = -2;
  
 //preventing memory leak
 zombies.lifetime = 350;
  
 //creating a group for obstacles
 zombiesGroup.add(zombies);  
  
 }

}

function spawnHumans(){
if(World.frameCount%690==0){
 humans = createSprite(550,299,10,40);
 humans.addImage(humanImg);
 humans.scale = 0.092;
 humans.velocityX = -2;
   
 //preventing memory leak
 humans.lifetime = 350;
  
 //creating a group for obstacles
 humansGroup.add(humans);  
  
 }

}

function spawnBirds(){
if(World.frameCount%190==0){
 birds = createSprite(400,109,10,40);
 birds.y = Math.round(random(17,17));
 birds.addImage(birdImg);
 birds.scale = 0.09;
 birds.velocityX = -3;
  
 //preventing memory leak
 birds.lifetime = 350;
  
 //creating a group for obstacles
 birdsGroup.add(birds);  
  
 }

}

function spawnBird(){
if(World.frameCount%320==0){
 bird = createSprite(400,109,10,40);
 bird.y = Math.round(random(127,127));
 bird.addImage(birdImg);
 bird.scale = 0.09;
 bird.velocityX = -3;
  
 //preventing memory leak
 bird.lifetime = 350;
  
 //creating a group for obstacles
 birdGroup.add(bird);  
  
 }

}
