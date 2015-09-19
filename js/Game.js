var background
	,	player
	,	playerSpeed = 200
	,	enemies
	,	enemy
	,	enemySpeed = 150
	, bullets
	, bullet
	,	shotSpeed = 300
	, shotTime = 0
	, keys;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
	game.load.image('background', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png');
	game.load.image('spaceship', 'assets/img/spaceship.png');
	game.load.image('enemies', 'assets/img/enemies.png');
	game.load.image('bullet', 'assets/img/bullet.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(30, 'bullet');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);

	createPlayer();

	enemies = game.add.physicsGroup(Phaser.Physics.ARCADE, game.world, 'enemies');

	createEnemies();

	keys = game.input.keyboard.createCursorKeys();
	fireUp = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
	background.tilePosition.x -= 2;

	game.physics.arcade.overlap(bullet, enemies, killEnemy, null, this);

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
		bullet = bullets.getFirstExists(false);
		if(bullet) {
			bullet.reset(player.x + player.width, player.y);
			bullet.body.velocity.x = shotSpeed;
			shotTime = game.time.now + 300;
		}
	}
}

function createEnemies() {
	var x = game.world.width
		,	y = game.rnd.integerInRange(0, game.world.height);
	enemy = enemies.create(x, y, 'enemies');
	enemy.health = 3;
	enemy.body.velocity.x = -enemySpeed;
}

function killEnemy(bullet, enemy) {
	enemy.damage(1);
	bullet.kill();
}