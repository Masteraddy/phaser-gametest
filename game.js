const Game_W = 288;
const Game_H = 512;
var gameState = {
	state: 0,
	ready: 0,
	start: 1,
	over: 2,
};

class Scene1 extends Phaser.Scene {
	constructor() {
		super({ key: 'Scene1' });
	}

	preload() {
		this.load.audio('fly', 'sounds/fly.mp3');
		this.load.image('bg', 'images/bg.png');
		this.load.image('bird', 'images/bird.png');
		this.load.image('fg', 'images/fg.png');
		this.load.image('pN', 'images/pipeNorth.png');
		this.load.image('pS', 'images/pipeSouth.png');
		// console.log(navigation);
	}

	create() {
		//Add all the sprites loaded
		this.bg = this.add.sprite(0, 0, 'bg').setInteractive();
		this.bird = this.add.sprite(50, 150, 'bird').setInteractive();
		this.fg = this.add.sprite(0, 0, 'fg');
		this.pS = this.add.sprite(Game_W - 25, 120, 'pS');
		this.pN = this.add.sprite(0, 0, 'pN');

		//Add all the sound loaded
		this.flySound = this.sound.add('fly');

		//Set Position and anchors
		this.fg.y = Game_H - (this.fg.height - 5);
		console.log(this);
		this.fg.setOrigin(0, 0);
		this.bg.setOrigin(0, 0);
		this.bird.setOrigin(0, 0);

		this.vibrate = navigator.vibrate(500);

		//Bird Fly
		this.bird.fly = () => {
			this.bird.y -= 25;
			this.flySound.play();
		};

		//On background click
		this.bg.on('pointerdown', (e) => {
			this.bird.fly();
		});

		//Keyboard down event check
		this.input.keyboard.on('keydown', (e) => {
			switch (e.code) {
				case 'Space':
					this.bird.fly();
					break;
				default:
					console.log(e.code);
					break;
			}
		});
	}

	update() {
		this.bird.y += 1;
		if (this.bird.getBottomCenter().y >= this.fg.getTopCenter().y) {
			this.bird.y = this.fg.getTopCenter().y - this.bird.height;
			this.vibrate();
		}
	}
}

const config = {
	title: 'Flappy Bird',
	width: Game_W,
	height: Game_H,
	type: Phaser.AUTO,
	scene: [ Scene1 ],
};

let game = new Phaser.Game(config);
