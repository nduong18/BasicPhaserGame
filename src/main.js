import { Game } from './scenes/Game.js';
import { Preloader } from './scenes/Preloader.js'
import { Boot } from './scenes/Boot.js'
import { GameOver } from './scenes/GameOver.js'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2d3436',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 500}
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader, 
        Game,
        GameOver
    ]
};

new Phaser.Game(config);
