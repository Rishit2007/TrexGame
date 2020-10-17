var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=0;
var gameState=PLAY;

var cloudsGroup;
var obstaclesGroup;

var score ;

var gameOver;
var reset;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstaclesImage1= loadImage("obstacle1.png");
  
  obstaclesImage2 = loadImage("obstacle2.png");
  
  obstaclesImage3 = loadImage("obstacle3.png");
  
  obstaclesImage4 = loadImage("obstacle4.png");
  
  obstaclesImage5 = loadImage("obstacle5.png");
  
  obstaclesImage6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  resetImage = loadImage("restart.png");
  
  trexCollided = loadImage("trex_collided.png");
  


}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided);
  trex.scale = 0.5;
  
  ground=createSprite(300,170,600,50);
  ground.addImage(groundImage)
  
  invisibleGround=createSprite(300,195,600,15)
 
  invisibleGround.visible=false
  
  
  score = 0;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  
gameOver=createSprite(300,70,80,10);
gameOver.addImage(gameOverImage);
gameOver.scale=0.5;
  
reset = createSprite(300,110,70,70);
reset.addImage(resetImage);  
reset.scale = 0.5; 
  
}

function draw() {
  //set background color
  background(255);
  
  
  text("Score:" + score , 500 ,50);
  
  
  trex.collide(invisibleGround);
  
  
  
  if (gameState==1){
      
  ground.velocityX=-5;
 
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  if(keyDown("space")&&trex.y>=150)
  {
    trex.velocityY=-12  
  }  
    
     trex.velocityY=trex.velocityY+1;
    
    score = score + Math.round(getFrameRate()/50);
    
  spawnClouds();
  
  spawnObstacles();
    
    gameOver.visible=false;
    reset.visible=false;
   
    
   
   if (obstaclesGroup.isTouching(trex)){
     gameState=0;
   }
  }
  
  else if (gameState==0){
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    reset.visible=true;
    
   trex.changeAnimation("collided", trexCollided);
    
    if(mousePressedOver(reset)){
    refresh();
    }

  }
 
  
  
  drawSprites();
  
}

function refresh(){
 gameState=1;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0;
 trex.changeAnimation("running", trex_running);

  
}



function spawnClouds(){
  if(frameCount%60==0)
  {
    
  var clouds=createSprite(600,10,10,10);
  clouds.y=random(10,150);
  
  clouds.velocityX=-5;
  
    clouds.addImage(cloudImage);
    
    clouds.scale=0.5;
    
    clouds.depth=trex.depth-1;
    
 console.log(clouds.depth);
    
  clouds.lifetime=120;
    
    cloudsGroup.add(clouds);
  }
 
}

function spawnObstacles(){
  
  if(frameCount%80==0){
    
   var obstacles = createSprite(600,195,50,60);
    
    obstacles.velocityX=-5;
    
    var randomImage = Math.round(random(1,6));
    
    switch(randomImage){
        
      case 1 : obstacles.addImage(obstaclesImage1);
               break;
             
      case 2 : obstacles.addImage(obstaclesImage2);
               break;         
        
      case 3 : obstacles.addImage(obstaclesImage3);
               break;   
               
      case 4 : obstacles.addImage(obstaclesImage4);
               break;         
       
      case 5 : obstacles.addImage(obstaclesImage5);
               break;        
               
      case 6 : obstacles.addImage(obstaclesImage6);
               break;
               
      default : break;       
    }
    
    obstacles.scale=0.5;
    
    obstacles.collide(invisibleGround);
    
    obstacles.lifetime=120;
    
    obstaclesGroup.add(obstacles);
  }
  
}
