var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var gap = 80;
var constant;
var bx = 10;
var by = 150;

var gravity = 1.5;
var pipegravity = 1.5;
var score = 0;
var pipe = [];
var pe = [];
var lost = false;

var bird = new Image();
var background = new Image();
var foreground = new Image();
var foreground1 = new Image();
var foreground2 = new Image();
var foreground3 = new Image();
var foreground4 = new Image();
var pipeend = new Image();
var pipeDown = new Image();
var woosh = new Audio();
var tading = new Audio();
var crash = new Audio();

bird.src = "images/bird.png";
background.src = "images/background.jpg";
foreground.src = "images/foreground.jpg";
foreground1.src = "images/foreground1.jpg";
foreground2.src = "images/foreground2.jpg";
foreground3.src = "images/foreground3.jpg";
foreground4.src = "images/foreground4.jpg";
pipeDown.src = "images/pipe_down.png";
pipeend.src = "images/pipeend.png";
woosh.src = "sounds/woosh.mp3";
tading.src = "sounds/tading.mp3";
crash.src = "sounds/crash.mp3";

pipe[0]={
	x: cvs.width,
	y: 0
};

pe[0]= {
	x: cvs.width,
	y : 254

};


document.addEventListener("keydown", moveup);

function moveup(){
	woosh.play();
	by = by - 25;
}


function main() {
	ctx.drawImage(background,0,0);

       for(var i = 0; i< pipe.length; i ++)
	 {
        
		ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y);
		ctx.drawImage(pipeend,pe[i].x,pe[i].y);
		pe[i].x --;
        
		pipe[i].x--;
	
	 if(pipe[i].x == 125){
		pipe.push({
			x: cvs.width,
			y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
		})
		pe.push({
			x: cvs.width,
			y: pipe[i+1].y + pipeDown.height
		})
	 }

	 //if statement for check

	 if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeDown.width || by + bird.height >= cvs.height)
		if(by <= pipe[i].y + pipeDown.height ){
			lost = true;
			crash.play();
			setTimeout(function() {
				location.reload()
			}, 750);
		}//end of if

		//second if statement
		if( by + bird.height >= cvs.height-90)
		{
			lost = true;
			crash.play();
			setTimeout(function() {
				location.reload()
			}, 750);
		}//end of if

		if(by <=pipe[i].y + pipeDown.height+ pipeend.height&& bx + bird.width >= pipe[i].x && bx + bird.width  <= pipe[i].x +1)
		{
			tading.play();
		score ++;
		pe[i].y = 4000;

		}








	 }//end of for
	 if(score <4)
    ctx.drawImage(foreground,0 , cvs.height - foreground.height);
     else if(score  <8 && score >=4)
    ctx.drawImage(foreground1,0 , cvs.height - foreground1.height);
     else if(score <12 && score >=8)
    ctx.drawImage(foreground2,0 , cvs.height - foreground2.height);
     else if(score <16&& score >=12)
    ctx.drawImage(foreground3,0 , cvs.height - foreground3.height);
     else if(score <20 && score >=16)
    ctx.drawImage(foreground4,0 , cvs.height - foreground4.height);
     ctx.drawImage(bird,bx,by);
    by += gravity;
    
    if(lost == true){
    	ctx.fillStyle = "#FF0000";
    	ctx.font = "42px Verdana ";
    	if(score<20)
      ctx.fillText("You Trashed", 10,cvs.height - 20)
        else{
        	ctx.fillStyle = "#66FF33";
        	ctx.fillText("You Cleaned", 10,cvs.height - 20)
        }
   } 
   else { 
   	  ctx.font = "22px Verdana ";

      ctx.fillText("Score:" + score/2, 10 , cvs.height - 20);

   }
   requestAnimationFrame(main);
    
}
main();