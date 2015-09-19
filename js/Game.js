var background
	,	player
	,	playerSpeed = 200
	,	enemies = {}
	, fireBalls
	, fireBall
	,	shotSpeed = 300
	, shotTime = 0
	, keys;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
	game.load.image('background', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png');
	game.load.image('spaceship', 'assets/img/spaceship.png');
	game.load.image('fireball', 'https://support.ouat-e.com/media/luckypirate/images/help/tool_fireball.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	fireBalls = game.add.group();
	fireBalls.enableBody = true;
	fireBalls.physicsBodyType = Phaser.Physics.ARCADE;
	fireBalls.createMultiple(30, 'fireball');
	fireBalls.setAll('anchor.x', 0.5);
	fireBalls.setAll('anchor.y', 0.5);
  fireBalls.setAll('outOfBoundsKill', true);
  fireBalls.setAll('checkWorldBounds', true);

	createPlayer();

	keys = game.input.keyboard.createCursorKeys();
	fireUp = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
	background.tilePosition.x -= 2;

  player.body.velocity.setTo(0, 0);

	if(keys.up.isDown) {
		player.body.velocity.y = -playerSpeed;
	}
	if(keys.down.isDown) {
		player.body.velocity.y = playerSpeed;
	}
	if(keys.right.isDown && player.body.x < 210) {
		player.body.velocity.x = +playerSpeed;
	}
	if(keys.left.isDown && player.body.x > 10) {
		player.body.velocity.x = -playerSpeed;
	}
	if(fireUp.isDown) {
		shot();
	}
}

function createPlayer() {
	player = game.add.sprite(10, game.world.height/2, 'spaceship');
  game.physics.arcade.enable(player);
	player.anchor.setTo(0, 0.5);
  player.body.collideWorldBounds = true;
}

function shot() {
	if(game.time.now > shotTime) {
		fireBall = fireBalls.getFirstExists(false);
		if(fireBall) {
			fireBall.reset(player.x + player.width, player.y);
			fireBall.body.velocity.x = shotSpeed;
			fireBall.scale.x = 0.5;
			fireBall.scale.y = 0.5;
			shotTime = game.time.now + 300;
		}
	}
}