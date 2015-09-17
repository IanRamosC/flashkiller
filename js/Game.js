var game = new Phaser.Game(800, 600, Phaser.AUTO);

function preload() {
	this.load.image('background', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png');
}

function create() {
	this.physics.startSystem(Phaser.Physics.ARCADE);
	background = this.add.tileSprite(0, 0, 800, 600, 'background');
}

function update() {
	background.tilePosition.y += 2;
}