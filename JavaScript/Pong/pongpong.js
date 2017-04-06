/*
 * 
 * 		Pong Clone in JavaScript
 * 		
 * 		Krzysztof Dobrzyński 2017
 * 
 */

// RequiestAnimationFrame invocation
var animate = window.requestAnimationFrame ||
			  window.webkitRequestAnimationFrame || 
			  window.mozRequestAnimationFrame || 
			  function(callback)
			  {
				  // around 60 fps
				  window.setTimeout(callback, 1000/60)
			  };
	  
// Global variables
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
var backgroundColor = "#000000";
var paddleColor = "#FFFF00";
var ballColor = "#FFFFFF";
var ballRadius = 5; // ball radius and movement speed
var ballStartSpeedX = 0;
var ballStartSpeedY = 3;
var ballStartPosX = 200;
var ballStartPosY = 300;

// Moving objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(ballStartPosX, ballStartPosY);

// Set width and height
canvas.width = width;
canvas.height = height;

// Canvas 2D context
var context = canvas.getContext('2d');

//
//		What should happen when window loads:
//		1) Attach Canvas to screen
//		2) Start animating
//
window.onload = function() 
{
	document.body.appendChild(canvas);
	animate(tick);
};

// 
//		1) Update all objects: paddles and ball
//		2) Render those objects
//		3) Use "requestAnimationFrame" to call "tick" function again
//
var tick = function() 
{
	update();
	render();
	animate(tick);
};

// Get something on the screen
var update = function() 
{
	player.update();
	computer.update(ball);
	ball.update(player.paddle, computer.paddle); // Update ball
};

// Render screen
var render = function() 
{
	context.fillStyle = backgroundColor; // Field color
	context.fillRect(0, 0, width, height); // Draw field
	player.render(); // render Player
	computer.render(); // render Computer
	ball.render(); // render Ball
};

// Paddle definition
function Paddle(posX, posY, width, height) 
{
	this.posX = posX; // position X
	this.posY = posY; // position Y
	this.width = width; // width of the paddle
	this.height = height; // height of the paddle
	this.speedX = 0; // X axis speed
	this.speedY = 0; // Y axis speed
}

// Render paddle
Paddle.prototype.render = function() 
{
	context.fillStyle = paddleColor;
	context.fillRect(this.posX, this.posY, this.width, this.height);
};

// Move paddle
Paddle.prototype.move = function(moveX, moveY) 
{
	this.posX += moveX;
	this.posY += moveY;
	this.speedX = moveX;
	this.speedY = moveY;
	if(this.posX < 0) // all the way to the left
	{ 
		this.posX = 0;
		this.speedX = 0;
	} 
	else if(this.posX + this.width > width) // all the way to the right
	{ 
		this.posX = width - this.width;
		this.speedX = 0;
	}
}

// Player definition
function Player() 
{
	this.paddle = new Paddle(175, 580, 50, 10); // Player paddle
}

// Player rendering function
Player.prototype.render = function() 
{
	this.paddle.render();
};

// Update player's position
Player.prototype.update = function() 
{
	for(var key in keysDown) 
	{
		var value = Number(key);
		if(value == 37) // left arrow
		{
			this.paddle.move(-4, 0);
		} 
		else if(value == 39) // right arrow
		{
			this.paddle.move(4, 0);
		} 
//		else 
//		{
//			this.paddle.move(0, 0);
//		}
	}
};

// Computer player definition
function Computer() 
{
	this.paddle = new Paddle(175, 10, 50, 10); // Computer paddle
}

// Computer rendering function
Computer.prototype.render = function() 
{
	this.paddle.render();
};

// Update computer possition
Computer.prototype.update = function(ball) 
{
	var posX = ball.posX;
	var diff = -((this.paddle.posX + (this.paddle.width / 2)) - posX);
	if(diff < 0 && diff < -4) // max speed left
	{ 
		diff = -5;
	} 
	else if(diff > 0 && diff > 4) // max speed right
	{ 
		diff = 5;
	}
	this.paddle.move(diff, 0);
	
	if(this.paddle.posX < 0) 
	{
		this.paddle.posX = 0;
	} 
	else if (this.paddle.posX + this.paddle.width > width) 
	{
		this.paddle.posX = width - this.paddle.width;
	}
};

// Ball definition
function Ball(posX, posY) 
{
	this.posX = posX; // ball X position
	this.posY = posY; // ball Y position
	this.speedX = ballStartSpeedX; // ball X axis speed
	this.speedY = ballStartSpeedY; // ball Y axis speed
	this.radius = ballRadius; // ball radius
}

// Ball rendering definition
Ball.prototype.render = function() 
{
	context.beginPath();
	context.arc(this.posX, this.posY, this.radius, 2 * Math.PI, false);
	context.fillStyle = ballColor;
	context.fill();
};

// Ball update definition
Ball.prototype.update = function(paddlePlayer, paddleComputer) 
{
	this.posX += this.speedX;
	this.posY += this.speedY;
	
	var topX = this.posX - ballRadius;
	var topY = this.posY - ballRadius;
	var bottomX = this.posX + ballRadius;
	var bottomY = this.posY + ballRadius;
	
	if(this.posX - ballRadius < 0) // hitting the left wall
	{
		this.posX = ballRadius;
		this.speedX = -this.speedX;
	}
	else if(this.posX + ballRadius > width) // hitting the right wall
	{
		this.posX = width - ballRadius;
		this.speedX = -this.speedX;
	}
	
	// a point was scored
	if(this.posY < 0 || this.posY > height) 
	{
		this.speedX = ballStartSpeedX;
		this.speedY = ballStartSpeedY;
		this.posX = ballStartPosX;
		this.posY = ballStartPosY;
	}
	
	if(topY > ballStartPosY)
	{
		// hit the player's paddle
		if(topY < (paddlePlayer.posY + paddlePlayer.height) && 
			bottomY > paddlePlayer.posY && 
			topX < (paddlePlayer.posX + paddlePlayer.width) && 
			bottomX > paddlePlayer.posX)
		{
			this.speedY = -ballStartSpeedY;
			this.speedX += (paddlePlayer.speedX / 2);
			this.posY += this.speedY;
		}
	}
	else
	{
		// hit the computer's paddle
		if(topY < (paddleComputer.posY + paddleComputer.height) && 
			bottomY > paddleComputer.posY && 
			topX < (paddleComputer.posX + paddleComputer.width) && 
			bottomX > paddleComputer.posX)
		{
			this.speedY = ballStartSpeedY;
			this.speedX += (paddleComputer.speedX / 2);
			this.posY += this.speedY;
		}
	}
};

// Keys pressed
var keysDown = {};

// Set key to true if it is pressed
window.addEventListener("keydown", function(event) 
{
	keysDown[event.keyCode] = true;
});

// Remove key if player stopped pressing it
window.addEventListener("keyup", function(event) 
{
	delete keysDown[event.keyCode];
});
