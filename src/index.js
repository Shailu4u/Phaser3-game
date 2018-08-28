import Phaser from 'phaser';
import GameScene from './scenes/game-scene';

const height = window.innerHeight - 56;
// set container height
document.querySelector("#exercise").style.height = height+'px';

const config = {
  type: Phaser.AUTO,
  pixelArt: false,
  roundPixels: false,
  width: window.innerWidth,
  height: window.innerHeight - 56,
  parent: 'canvas-container',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: [ GameScene ]
};

const game = new Phaser.Game(config);


