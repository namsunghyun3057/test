var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var animation;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//게임 매니저
var timer = 0;
var bottomPixel = 200;
var jumpTimer = 0;

//장애물(cactus)관련 변수
var cactusSpeed = 3;

//플레이어 관련 변수
var jumpSpeed = 2;
var isJump = false;
var doubleJump = false;
var jumpCount = 0;

//장애물 저장 array
var cactusArray = [];

var dino = {
  //공룡 초기 위치
  x : 10,
  y : bottomPixel,  
  //공룡 초기 크기
  width : 50,
  height : 50,

  draw(){ //공룡 (사각형) 그리기
    ctx.fillStyle = 'green';  //색상
    ctx.fillRect(this.x, this.y, this.width, this.height);  //위치
    ctx.drawImage(img2, this.x, this.y);
  }
  /*
  ,
  jump(){
    for(var i; i < 100; i++){
      dino.y -= jumpSpeed;
    }
    for(i; i>100; i--){
      dino.y += jumpSpeed;
    }
  }
  */
}

var img1 = new Image();
img1.src = 'cactus.png';

var img2 = new Image();
img2.src = 'dino.png';

dino.draw(); 

class Cactus {//선인장
  constructor(){
    this.x = 500;
    this.y = bottomPixel;
    this.width = 50;
    this.height = 50;
  }
  draw(){ //선인장 그리기
    ctx.fillStyle = 'red';  //색상
    //  ctx.fillRect(this.x, this.y, this.width, this.height);  //위치
    ctx.drawImage(img1, this.x, this.y);
  }
}


//프레임마다 실행
function frameAct(){  
  animation = requestAnimationFrame(frameAct); 
  timer++;

  ctx.clearRect(0,0, canvas.width, canvas.height);
  //120프레임마다 장애물(cactus) 생성
  if (timer % 120 === 0){ 
    var cactus = new Cactus();
    //생성한 장애물 array에 저장
    cactusArray.push(cactus);  
  }
  //array에 있는 장애물 draw()
  cactusArray.forEach((a, i, o)=>{  
    //x좌표가 0미만이면 제거
    if (a.x < 0){
      o.splice(i, 1);
    }
    a.x -= cactusSpeed; //장애물 이동

    collision(dino, a); //충돌 판단
    
    a.draw();
  })

  //점프기능

  if (isJump){
    dino.y -= jumpSpeed;
    jumpTimer++;
  }
  if (isJump == false){
    if (dino.y < bottomPixel){
      dino.y += jumpSpeed;
    }
  }
  if (jumpTimer > 50){
    isJump = false;
    jumpTimer = 0;
  }
  /*
  if (doubleJump){
    dino.y -= jumpSpeed;
  }
  else if (doubleJump && ){

  }
  */

  dino.draw();
}

frameAct();

//충돌확인
function collision(dino, cactus){
  var xDis = cactus.x - (dino.x + dino.width);
  var yDis = cactus.y - (dino.y + dino.height);
  if (xDis < 0 && yDis < 0){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

document.addEventListener('keydown', function(e){
  if(e.code === 'Space'){ //스페이스바 누르면
    isJump = true;  //점프 중 true
    //doubleJump = false;
  }
  /*
  if(e.code === 'Space' && isJump){
    doubleJump = true;
  }
  */
})