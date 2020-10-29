var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climberGroup;
var ghost,ghostJumpImage,ghostStandImage;
var invisibleOb,invisibleObGroup;
var gameState="play";
var sound;

function preload(){
    towerImage=loadImage("tower.png");
    doorImage=loadImage("door.png");
    climberImage=loadImage("climber.png");
    ghostStandImage=loadImage("ghost-standing.png");
    ghostJumpImage=loadImage("ghost-jumping.png");
    sound=loadSound("spooky.wav");
}
function setup(){
    createCanvas(600,600);
    tower=createSprite(300,300,20,600);
    tower.addImage("tower",towerImage);
    tower.velocityY=1;

    ghost=createSprite(300,300);
    ghost.addImage("standing",ghostStandImage);
    ghost.addImage("jumping",ghostJumpImage);
    ghost.scale=0.3;

    doorsGroup=createGroup();
    climberGroup=createGroup();
    invisibleObGroup=createGroup();

    sound.play();
    sound.loop();

}
function draw(){
    //background(255);

    if(gameState==="play"){
        if(keyDown("space")){
            ghost.velocityY=-5;
        }

        if(keyDown("left")){
            ghost.x=ghost.x-3;
        }

        if(keyDown("right")){
            ghost.x=ghost.x+3;
        }

        if(climberGroup.isTouching(ghost)){
            ghost.velocityY=0;
            //ghost.collide(climberGroup);
        }

        if(invisibleObGroup.isTouching(ghost)||ghost.y>600){
            ghost.destroy();
            gameState="end";
        }

        if(tower.y>600){
            tower.y=300;
        }

        spawnDoors();
        ghost.velocityY=ghost.velocityY+0.5;

        drawSprites();
    }
    if(gameState==="end"){
        background("black");
        textSize(30);
        stroke("yellow");
        fill("yellow");
        text("Game Over",250,300);
    }
    

}
function spawnDoors(){
    if(frameCount % 200===0){
        door=createSprite(200,-30);
        door.x=Math.round(random(120,400));
        door.addImage("door",doorImage);
        door.velocityY=1;
        door.lifetime=600;
        doorsGroup.add(door);

        climber=createSprite(200,-30);
        climber.x=door.x;
        climber.y=door.y+60;
        climber.addImage("climber",climberImage);
        climber.velocityY=1;
        climber.lifetime=600;
        climberGroup.add(climber);

        ghost.depth=climber.depth+1;

        invisibleOb=createSprite(200,-30,50,10);
        invisibleOb.x=climber.x;
        invisibleOb.y=climber.y+10;
        invisibleOb.width=climber.width;
        invisibleOb.velocityY=1;
        invisibleOb.lifetime=600;
        invisibleOb.visible=false;
        invisibleOb.debug=true;
        invisibleObGroup.add(invisibleOb);

    }
}