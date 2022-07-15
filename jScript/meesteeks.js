class Meesteeks extends Enemie {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 0;
    this.y = Math.floor(Math.random() * 490);
    this.width = 60;
    this.height = 60;
    this.meesteeks = new Image();
  }

  drawMeesteeks() {
    this.meesteeks.src = "./docs/assets/Enemy2.png";
    this.game.ctx.drawImage(this.meesteeks, this.x, this.y, 60, 60);
    this.x += 2;
  }
}
