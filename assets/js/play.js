/* globals game, Phaser */

let playState = {
  create () {
    // set game background color
    game.stage.backgroundColor = '#5b99fe'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = game.add.sprite(10, 600, 'player')
    game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 300
    this.player.body.collideWolrdBounds = true
    // player jump sound
    this.playerJump = game.add.audio('jump')

    this.level = game.add.tilemap('level')
    // add tiles to game
    this.level.addTilesetImage('tiles')
    // create layer by specifying the name of the tiled layer
    this.layer = this.level.createLayer('Tile Layer 1')
    // player not fall when it's on bricks
    this.level.setCollision(1)
    // player not fall when it's on question mark
    this.level.setCollision(2)

    this.cursors = game.input.keyboard.createCursorKeys()
  },
  update () {
    // collide enemy with walls
    game.physics.arcade.collide(this.player, this.layer)

    this.player.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
    }

    // if player is on the platform, jump on "up" key
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.jump()
    }
  },
  jump () {
    this.playerJump.play()
    this.player.body.velocity.y = -320
  }
}
