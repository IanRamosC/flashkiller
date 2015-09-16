var Unidev = {}
	,	background;

Unidev.Game = function(game) {};

Unidev.Game.prototype = {
	preload: function() {
		this.load.image('background', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png');
	},
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		background = this.add.tileSprite(0, 0, 800, 600, 'background');
	},
	update: function() {
		background.tilePosition.y += 2;
	}
};