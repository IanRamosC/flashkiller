var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Game', Unidev.Game);

game.state.start('Game');