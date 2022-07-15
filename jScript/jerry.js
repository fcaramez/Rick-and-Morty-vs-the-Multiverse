class Jerry extends Enemie {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = 980;
    this.y = Math.floor(Math.random() * 490);
    this.width = 60;
    this.height = 60;
    this.jerry = new Image();
  }

  drawJerry() {
    this.jerry.src = "./docs/assets/enemy4.png";
    this.game.ctx.drawImage(this.jerry, this.x, this.y, 60, 60);
    this.x -= 2;
  }
}
