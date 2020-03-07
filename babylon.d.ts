///<reference path="babylon.d.ts" />

class Game {
  constructor(canvasElement : string) {
  }

  createScene() : void {
  }

  doRender() : void {
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'.
  let game = new Game('renderCanvas');

  // Create the scene.
  game.createScene();

  // Start render loop.
  game.doRender();
});