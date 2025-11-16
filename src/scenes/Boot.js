export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('sky','assets/sky.png');
    }

    create() {
        this.scene.start('Preloader');
    }
}
