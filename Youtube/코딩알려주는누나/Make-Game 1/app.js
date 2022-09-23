// 캔버스 세팅

let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d"); // 2d로 그림을 그릴 수 있게 해줌

canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas); // document.body에 canvas를 넣어줌

let backgroundImage, spaceshipImage, bulletImage, alienImage, gameoverImage;
let gameover=false; // true면 게임오버
let score = 0;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList = [];

function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x= spaceshipX + 20;
        this.y= spaceshipY;

        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.checkhit=function(){
        for(let i=0; i<alienList.length; i++){
            if(this.y <= alienList[i].y && this.x >= alienList[i].x && this.x <= alienList[i].x + 40){
                // 총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
                score++;
                this.alive = false; // 죽은 총알
                alienList.splice(i, 1); // 적군이 죽음
            }
        }
    }
}

function generateRandomValue(min, max){
    let randomnum = Math.floor(Math.random()*(max-min+1))+min
    return randomnum
}

let alienList = [];

function alien(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.y= 0;
        this.x= generateRandomValue(0, canvas.width - 55);
        alienList.push(this)
    };
    this.update = function(){
        this.y += 2; // 적군의 속도

        if(this.y >= canvas.height - 48) {
            gameover = true;

        }
    };
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "background.gif";
    
    spaceshipImage = new Image();
    spaceshipImage.src = "spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "bullet.png";

    alienImage = new Image();
    alienImage.src = "alien.png";

    gameoverImage = new Image();
    gameoverImage.src = "gameovergif.gif";
}

let keysDown={}

function setupKeyboardListeners(){
    document.addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true;
    });
    document.addEventListener("keyup", function(e){
        delete keysDown[e.keyCode];

        if(e.keyCode == 32){
            createBullet(); // 총알생성
        }
    });
}

function createBullet(){
    let bullet = new Bullet();
    bullet.init();
}

function createAlien(){
    const interval = setInterval(function(){
        let ali = new alien();
        ali.init();
    }, 1000);
}

function update(){
    if (39 in keysDown){
        spaceshipX += 4; // 우주선의 속도
    } // right
    if (37 in keysDown){
        spaceshipX -= 4;
    } // left

    if (spaceshipX <= 0){
        spaceshipX = 0;
    }
    if (spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64;
    }

    for(let i=0; i<bulletList.length; i++){
        if (bulletList[i].alive){
            bulletList[i].update()
            bulletList[i].checkhit()
        }
    }

    for(let i=0; i<alienList.length; i++){
        alienList[i].update();
    }
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score: {score}`, 10, 20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for(let i=0; i<alienList.length; i++){
        ctx.drawImage(alienImage, alienList[i].x, alienList[i].y);
    }
}

function main(){
    if(!gameover){
        update(); // 좌표값을 업데이트
        render(); // 그려주고
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameoverImage, 10, 100, 380, 380);
    }
}

loadImage();
setupKeyboardListeners();
createAlien();
main();

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x값
// 3. 발사된 총알들은 총알 배열에 저장
// 4. 총알들은 x, y값을 가지고 있음
// 5. 총알들은 render에서 그려줌

// 적군만들기
// 1. 적군이란? 적군의 x, y값을 가지고 있음
// 2. 적군은 render에서 그려