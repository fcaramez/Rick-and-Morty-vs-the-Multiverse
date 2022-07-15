class ScoreUp extends Enemie {
  constructor(game) {
    this.game = game;
    this.x = Math.floor(Math.random() * 980);
    this.y = Math.floor(Math.random() * 630);
    this.width = 80;
    this.height = 80;
    this.powerUp = new Image();
  }

  drawPowerUp() {
    this.powerUp.src = "./docs/assets/powerUp-removebg-preview.png";
    this.game.ctx.drawImage(this.powerUp, this.x, this.y, 80, 80);
  }
}
