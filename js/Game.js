var background
	,	player
	,	playerSpeed = 200
	,	enemies
	,	enemy
	, bullets
	, bullet
	, infoText = {}
	,	shotSpeed = 300
	, shotTime = 0
	, keys;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
	game.load.image('background', 'assets/img/sky.png');
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
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);

	createPlayer();

	enemies = game.add.physicsGroup(Phaser.Physics.ARCADE, game.world, 'enemies');

 	game.enemyGenerator = game.time.events.loop(Phaser.Timer.SECOND * 1.25, createEnemies, this);
  game.enemyGenerator.timer.start();

  infoText.currentScore = 0;
  infoText.scoreText = game.add.text(10, 10, 'Score: ' + infoText.currentScore, { font: '34px Arial', fill: '#FFF'} );

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

	game.physics.arcade.overlap(bullets, enemies, killEnemy, null, this);
	game.physics.arcade.overlap(player, enemies, hitPlayer, null, this);
	infoText.scoreText.text = 'Score: ' + infoText.currentScore;

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
		,	y = game.rnd.integerInRange(50, game.world.height - 50);
	enemy = enemies.create(x, y, 'enemies');
  enemy.anchor.setTo(0, 0.5);
	enemy.health = 2;
	enemy.body.velocity.x = game.rnd.integerInRange(-150, -200); ;
	enemy.outOfBoundsKill;
}

function killEnemy(bullet, enemy) {
	bullet.kill();
	enemy.damage(1);
	if (enemy.health === 0) {
		infoText.currentScore += 100;
	}
}

function hitPlayer(player, enemy) {
	player.destroy();
	enemy.kill();
	restart();
}

function restart() {
  enemies.removeAll();
  createEnemies();
  createPlayer();

	infoText.currentScore = 0;
}