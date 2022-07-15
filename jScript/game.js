class Game {
  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.player = null;
    this.isRunning = false;
    this.background = new Image();
    this.frames = 0;
    this.score = 0;
    this.x = 0;
    this.y = 0;
    this.canvasWidth = 980;
    this.canvasHeight = 520;
    this.intervalId = null;
    this.meesteeks = [];
    this.showMe = [];
    this.poopie = [];
    this.jerry = [];
    this.scoreUp = [];
    this.musicBackground = new Audio(
      "./docs/assets/sounds/Get Schwifty Music Video   Rick and Morty  Adult Swim-[AudioTrimmer.com].mp3"
    );
    this.musicGameOver = new Audio(
      "./docs/assets/sounds/Morty, you fucking idiot-[AudioTrimmer.com]-[AudioTrimmer.com].mp3"
    );
    this.scoreUpSound = new Audio(
      "./docs/assets/sounds/Rick and Morty (Wubba Lubba Dub Dub) Sound Effect.mp3"
    );
  }

  start() {
    this.isRunning = true;
    this.musicBackground.play();
    this.player = new Player(this, 460, 190, 60, 40);
    const movement = new Movement(this);
    movement.keyEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  reset() {
    
  }

  update() {
    this.drawBackground();
    this.player.draw();
    this.drawEnemie();
    this.meesteeks.forEach((enemie) => {
      enemie.drawMeesteeks();
    });
    this.showMe.forEach((enemie) => {
      enemie.drawShowMe();
    });
    this.poopie.forEach((enemie) => {
      enemie.drawPoopie();
    });
    this.jerry.forEach((enemie) => {
      enemie.drawJerry();
    });
    this.drawPowerUp();
    this.scoreUp.forEach((scoreUp) => {
      scoreUp.drawPowerUp();
    });
    this.frames += 3;
    this.score++;
    this.getScore();
    this.checkGameOver();
    this.checkPowerUp();
  }

  drawBackground() {
    this.background.src = "./docs/assets/background-game.png";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  drawEnemie() {
    if (this.frames % 600 === 0) {
      this.meesteeks.push(new Meesteeks(this));
      this.showMe.push(new ShowMe(this));
      this.poopie.push(new Poopie(this));
      this.jerry.push(new Jerry(this));
    }
  }

  drawPowerUp() {
    if (this.frames % 1800 === 0) {
      this.scoreUp.push(new ScoreUp(this));
    }
  }

  stopGame() {
    this.musicBackground.pause();
    this.ctx.font = "90px didot";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 200, 250);
    this.musicGameOver.play();
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  getScore() {
    let score = Math.floor(this.score);
    this.ctx.font = "40px didot";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${score}`, 0, 40);
  }

  checkGameOver() {
    const player = this.player;
    const crashedMeesteeks = this.meesteeks.some(function (meesteeks) {
      return player.colision(meesteeks);
    });
    const crashedShowMe = this.showMe.some(function (showMe) {
      return player.colision(showMe);
    });
    const crashedPoopie = this.poopie.some(function (poopie) {
      return player.colision(poopie);
    });
    const crashedJerry = this.jerry.some(function (jerry) {
      return player.colision(jerry);
    });

    if (crashedMeesteeks || crashedPoopie || crashedShowMe || crashedJerry) {
      this.stopGame();
    }
  }

  checkPowerUp() {
    const player = this.player;
    const crashedPowerUp = this.scoreUp.some(function (powerUp) {
      return player.colision(powerUp);
    });
    if (crashedPowerUp) {
      this.scoreUpSound.play();
      this.score += 100;
      this.scoreUp = [];
      this.meesteeks = [];
      this.showMe = [];
      this.poopie = [];
      this.jerry = [];
    }
  }
}
