// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.gameOverText = this.add.text(400, 300, 'GAME OVER', { fontSize: '40px', fill: '#FFF'}).setOrigin(0.5, 0.5);
        this.playAgainText = this.add.text(400, 400, 'Play again!', {fontSize: '20px', fill: '#FFF'}).setOrigin(0.5, 0.5);
        this.playAgainText.setInteractive();
        this.playAgainText.on('pointerdown', () => { this.scene.start('Game');});
        this.playAgainText.on('pointerover', () => {this.playAgainText.setStyle({ fill: '#ff0' });});
        this.playAgainText.on('pointerout', () => {this.playAgainText.setStyle({ fill: '#fff' });});
    }

}
