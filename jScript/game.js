class Game {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.player = null;
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
    }

    start() {
        console.log(this.frames);
        this.player = new Player(this, 460, 190, 60, 40);
        const movement = new Movement(this);
        movement.keyEvents();
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000 / 60)
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
        this.frames += 3;
        this.score++;
        this.getScore();
        this.checkGameOver();
    }

    drawBackground() {
        this.background.src = './docs/assets/background-game.png';
        this.ctx.drawImage(this.background, this.x, this.y, this.canvasWidth, this.canvasHeight);
    }

    drawEnemie() {
        if (this.frames % 600 === 0) {
            this.meesteeks.push(new Meesteeks(this));
            this.showMe.push(new ShowMe(this));
            this.poopie.push(new Poopie(this));
        }
    }

    stopGame() {
        this.ctx.font = '90px didot';
        this.ctx.fillStyle = "red";
        this.ctx.fillText('GAME OVER', 200, 250) 
        clearInterval(this.intervalId);
    }

    getScore() {
        let score = Math.floor(this.score);
        this.ctx.font = '40px didot';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Score: ${score}`, 0, 40);
    }

    checkGameOver() {
        const player = this.player;
        const crashedMeesteeks = this.meesteeks.some(function (meesteeks) {
            console.log(player.colision(meesteeks))
            return player.colision(meesteeks);
        });
        const crashedShowMe = this.showMe.some(function (showMe) {
            console.log(player.colision(showMe))

            return player.colision(showMe);
        });
        const crashedPoopie = this.poopie.some(function (poopie) {
            console.log(player.colision(poopie))

            return player.colision(poopie);
        });

        if (crashedMeesteeks || crashedPoopie || crashedShowMe) {
            console.log(this.meesteeks, this.crashedPoopie, this.showMe)
            console.log(crashedMeesteeks, crashedPoopie, crashedShowMe)
            this.stopGame();
        }
    }
}