var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400,400,{backgroundColor: 0xA9A9A9});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

// define sprites

var bird_nest = new PIXI.Sprite(PIXI.Texture.fromImage("bird_nest.png"))

var bird = new PIXI.Sprite(PIXI.Texture.fromImage("bird.png"));

var hunter = new PIXI.Sprite(PIXI.Texture.fromImage("hunter.png"));

var victoryScreen = new PIXI.Sprite(PIXI.Texture.fromImage("victory_screen.png"));

var defeatScreen = new PIXI.Sprite(PIXI.Texture.fromImage("defeat_screen.png"));

//set position of all the sprites

bird.position.x = 100;
bird.position.y = 300;

bird_nest.position.x = 300;
bird_nest.position.y = 100;

hunter.position.x = 200;
hunter.position.y = 350;

victoryScreen.position.x = 200;
victoryScreen.position.y = 200;
defeatScreen.position.x = 0;
defeatScreen.position.y = 0;

stage.addChild(bird);
stage.addChild(bird_nest);
stage.addChild(hunter);

function keydownEventHandler(e)
{
	if(e.keyCode == 87)// W key
	{
		bird.position.y -= 10;
	}
	if(e.keyCode == 83)// S key
	{
		bird.position.y += 10;
	}
	if(e.keyCode == 65)// D key
	{
		bird.position.x -= 10;
	}
	if(e.keyCode == 68)// A key
	{
		bird.position.x += 10;
	}
}
document.addEventListener('keydown', keydownEventHandler);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
	
	//bird is above hunter
	if(bird.position.y-10 < hunter.position.y)
	{
		hunter.position.y -= 2;
	}
	//bird is below hunter
	if(bird.position.y-10 > hunter.position.y)
	{
		hunter.position.y += 2;
	}
	//victory
	if(bird.position.x - 10 == bird_nest.position.x && bird.position.y == bird_nest.position.y+10)
	{
		stage.addChild(victoryScreen);
		document.removeEventListener('keydown', keydownEventHandler);
	}
	//defeat
	if(bird.position.x-20 == hunter.position.x && bird.position.y-10 == hunter.position.y)
	{
		stage.addChild(defeatScreen);
		document.removeEventListener('keydown', keydownEventHandler);
	}
}
animate();
