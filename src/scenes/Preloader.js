export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('bomb', 'bomb.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.spritesheet('dude','dude.png',{frameWidth:32, frameHeight: 48});
    }

    create() {
        this.scene.start('Game');
    }
}
