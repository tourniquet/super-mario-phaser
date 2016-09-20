/* globals game, Phaser */

let loadState = {
  preload () {
    // load menu background image
    game.load.image('background', 'assets/images/background.png')
    // load game image assets
    game.load.image('player', 'assets/images/player.png')
    // game.load.image('brick', 'assets/images/brick.png')

    // load first level tiles
    game.load.image('tiles', 'assets/images/tiles.png')
    // load (json) map file
    game.load.tilemap('level', 'assets/maps/level.json', null, Phaser.Tilemap.TILED_JSON)

    // game sounds
    game.load.audio('jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
