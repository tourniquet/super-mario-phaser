/* globals game, Phaser */

let playState = {
  create () {
    // set game background color
    game.stage.backgroundColor = '#5b99fe'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = game.add.sprite(10, 600, 'player')
    // player.isBig is true after eating mushroom
    this.player.isBig = false
    game.physics.arcade.enable(this.player)
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 300
    this.player.body.collideWorldBounds = true
    // player jump sound
    this.playerJump = game.add.audio('jump')

    this.map = game.add.tilemap('level')
    this.map.addTilesetImage('tiles')

    this.layer = this.map.createLayer('Tile Layer 1')

    this.bricks = game.add.group()
    this.map.createFromTiles(1, 3, 'brick', this.layer.index, this.bricks)
    game.physics.enable(this.bricks)
    this.bricks.setAll('body.immovable', true)

    this.questions = game.add.group()
    this.map.createFromTiles(2, null, 'question', this.layer.index, this.questions)
    game.physics.enable(this.questions)
    this.questions.setAll('body.immovable', true)

    this.cursors = game.input.keyboard.createCursorKeys()
  },
  update () {
    // destroy brick when collide with player
    game.physics.arcade.collide(this.player, this.bricks, this.destroyBrick, null, this)
    // collide player with question marks
    game.physics.arcade.collide(this.player, this.questions)

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
    this.player.body.velocity.y = -320
  },
  destroyBrick (player, brick) {
    // this will allow collide player with bottom side of brick
    // when player jump, because player.y value on axe is bigger than brick.y value
    // I added +50 to brick.y axe, because if player.y is only bigger than brick.y
    // when player is touching sides of bricks, it will move up
    // remove +50 to see what is happening
    if (player.y > brick.y + 50) {
      player.body.velocity.y = 150

      // if player is big, destroy brick
      if (player.isBig) {
        brick.kill()
      }

      // if player is not big, just ease brick
      if (!player.isBig) {
        game.add.tween(brick).to({ y: [brick.y - 20, brick.y] }, 200, Phaser.Easing.Linear.None, true)
      }
    }
  }
}
