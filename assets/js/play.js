/* globals game, Phaser */

let playState = {
  create () {
    // set game background color
    game.stage.backgroundColor = '#5b99fe'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = game.add.sprite(10, 10, 'player')
    game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 300
    this.player.body.collideWolrdBounds = true
    // player jump sound
    this.playerJump = game.add.audio('jump')

    this.bricks = game.add.group()
    this.bricks.enableBody = true

    this.brick = this.bricks.create(0, game.world.height - 300, 'brick')
    this.brick.body.immovable = true

    this.brick = this.bricks.create(100, game.world.height - 300, 'brick')
    this.brick.body.immovable = true

    this.cursors = game.input.keyboard.createCursorKeys()
  },
  update () {
    game.physics.arcade.collide(this.player, this.bricks)

    this.player.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
    }

    // if player is on the platform, jump on "up" key
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.jump()
    }
  },
  jump () {
    this.playerJump.play()
    this.player.body.velocity.y = -100
  }
}
