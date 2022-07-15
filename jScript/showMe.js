class ShowMe extends Enemie {
  constructor(game) {
    this.game = game;
    this.x = Math.floor(Math.random() * 950);
    this.y = 0;
    this.width = 60;
    this.height = 40;
    this.showMe = new Image();
  }

  drawShowMe() {
    this.showMe.src = "./docs/assets/Enemy1.png";
    this.game.ctx.drawImage(this.showMe, this.x, this.y, 60, 40);
    this.y += 2;
  }
}
