import { Player } from "../gameObjects/Player.js";
export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    // Background
    this.add.image(400, 300, "sky");

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(700, 250, "ground");

    //Create Player
    this.player = new Player(this, 100, 450).setScale(2);
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, this.platforms);

    //Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //Create Stars
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.stars.children.iterate((child) => {
      child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Collider
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    //Score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#FFF",
    });

    //Bomb
    this.bombs = this.physics.add.group();
    this.physics.add.collider(
      this.bombs,
      this.player,
      this.hitBomb,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.platforms);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.idle();
    }

    if (this.cursors.up.isDown) {
      this.player.jump();
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText("Score: " + this.score.toString());

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
    this.releaseBomb();
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    player.anims.play("turn");
    this.time.delayedCall(2000, () => {
      this.scene.start("GameOver");
    });
  }

  releaseBomb() {
    var x =
      this.player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    var bomb = this.bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
