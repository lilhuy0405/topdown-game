import * as Phaser from "phaser";

class MapScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MapScene"
    });
  }

  preload() {
    this.load.image("collision-tileset", "assets/collision.png");
    this.load.image("tileset", "assets/tileset.png");

    this.load.tilemapTiledJSON('map', 'assets/pelletTown.json');

    this.load.spritesheet('player-right',
      'assets/right.png',
      {frameWidth: 24, frameHeight: 24, }
    );
    this.load.spritesheet('player-up',
      'assets/up.png',
      {frameWidth: 24, frameHeight: 24, }
    );
    this.load.spritesheet('player-down',
      'assets/down.png',
      {frameWidth: 24, frameHeight: 24, }
    );
    this.load.spritesheet('player-left',
      'assets/left.png',
      {frameWidth: 24, frameHeight: 24}
    );
  }

  create() {
    const map = this.make.tilemap({key: 'map'});
    const groundTileSet = map.addTilesetImage('sceneSpriteSheet', 'tileset');
    const collisionTileSet = map.addTilesetImage('Collisions', 'collision-tileset');
    const mapLayers = [
      'Ocean', 'Island', 'Trees',
      'Trees 2', 'Trees 3', 'Plateau', 'Flowers and Grass', 'Bushes', 'House', 'House Trees', 'Fence',
      'Dock',
    ];
    mapLayers.forEach(layer => {
      map.createLayer(layer, [groundTileSet]);
    });

    const collisionLayer = map.createLayer('Collisions', [collisionTileSet]);
    const batterZoneLayer = map.createLayer('Battle Zones', [groundTileSet]);
    const foreGroundLayer = map.createLayer('Foreground Objects', [groundTileSet]);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setZoom(2);


    this.player = this.physics.add.sprite(300, 300, 'player-down');
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player-left', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player-right', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player-up', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player-down', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player-down', {start: 0, end: 3}),
      frameRate: 0,
      repeat: -1
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, collisionLayer);
    collisionLayer.setCollision(1025)
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown)
    {
      this.player.body.setVelocityX(-100);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.cursors.up.isDown)
    {
      this.player.body.setVelocityY(-100);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.body.setVelocityY(100);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown)
    {
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown)
    {
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.anims.play('down', true);
    }
    else
    {
      this.player.anims.stop();
    }
  }
}

export default MapScene;