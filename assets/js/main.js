let mainState = {
  preload: function () {
    game.load.image('player', 'assets/images/bird.png')
    game.load.image('brick', 'assets/images/pipe.png')
  },
  create: function () {
    // set game background color
    game.stage.backgroundColor = '#5b99fe'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = game.add.sprite(10, 10, 'player')
    game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 300
    this.player.body.collideWolrdBounds = true

    this.bricks = game.add.group()
    this.bricks.enableBody = true

    this.brick = this.bricks.create(0, game.world.height - 300, 'brick')
    this.brick.body.immovable = true

    // add jump to spacebar
    let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    spaceKey.onDown.add(this.jump, this)
  },
  update: function () {
    game.physics.arcade.collide(this.player, this.bricks)
  },
  jump () {
    this.player.body.velocity.y = -100
  }
}

let game = new Phaser.Game(800, 400, Phaser.AUTO)
game.state.add('main', mainState)
game.state.start('main')
