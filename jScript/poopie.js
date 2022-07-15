class Poopie extends Enemie {
  constructor(game) {
    super(game);
    this.game = game;
    this.x = Math.floor(Math.random() * 460);
    this.y = 0;
    this.width = 60;
    this.height = 60;
    this.poopie = new Image();
  }

  drawPoopie() {
    this.poopie.src = "./docs/assets/Enemy3.png";
    this.game.ctx.drawImage(this.poopie, this.x, this.y, 60, 60);
    this.x++;
    this.y++;
  }
}
