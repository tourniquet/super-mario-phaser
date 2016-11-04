/* globals game, Phaser */

let loadState = {
  preload () {
    // load (json) map file
    game.load.tilemap('level', 'assets/maps/level.json', null, Phaser.Tilemap.TILED_JSON)
    // game sounds
    game.load.audio('jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg'])

    game.load.path = 'assets/images/'
    game.load.images(['background', 'brick', 'player', 'question', 'tiles'])
  },
  create () {
    game.state.start('menu')
  }
}
