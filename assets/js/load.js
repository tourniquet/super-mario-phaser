/* globals game */

let loadState = {
  preload () {
    // load menu background image
    game.load.image('background', 'assets/images/background.png')
    // load game image assets
    game.load.image('player', 'assets/images/player.png')
    game.load.image('brick', 'assets/images/brick.png')
    // game sounds
    game.load.audio('jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
