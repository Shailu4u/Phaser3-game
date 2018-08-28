import Phaser from 'phaser';

const width = window.innerWidth < 1300 ? 1325: window.innerWidth;
const height = window.innerHeight - 56;
// set container height
document.querySelector("#canvas-container").style.height = height+'px';

// Game variables
let player;
let food;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText, gameOverText;
let trophy;
<<<<<<< HEAD
=======
let gameText, music;
>>>>>>> c533398b420b831e86dd23bc7f1ea79327fbefc6

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.jumpVelocity =  -250;
    }
   
    preload () {
        // this.load.image('sky', 'assets/sky.png');
        this.load.image('background-clouds', './assets/clouds.png');
        this.load.image('ground1', 'assets/platform1.png');
        this.load.image('ground2', 'assets/base.png');
        this.load.image('ground3', 'assets/platform3.png');
        this.load.image('ground4', 'assets/platform4.png');
        this.load.image('ground5', 'assets/platform5.png');
        this.load.image('ground6', 'assets/platform6.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        // player animations
        this.load.atlas('player', './assets/player2.png', './assets/player3.json', './assets/player3.json');
        this.load.atlas('food', './assets/food.png', './assets/food.json', './assets/food.json');
        this.load.image('trophy', './assets/trophy.png');

        // load sound
<<<<<<< HEAD
=======
        this.load.audio('music', './assets/true.mp3');
>>>>>>> c533398b420b831e86dd23bc7f1ea79327fbefc6
        this.load.audio('eatfood', './assets/eat-food.wav');
        this.load.audio('jumpsmall', './assets/jump-high.wav');
        this.load.audio('jumphigh', './assets/jump-small.wav');
    }
    
    create () {       
       
        platforms = this.physics.add.staticGroup();
        //  Here we create the ground.
        platforms.create(width/2, height - 33 , 'ground2');

        //  Now let's create some ledges
        platforms.create(500, height - 200, 'ground3');
        platforms.create(75,  height/2, 'ground4');
        platforms.create((width/2) + 190, (height/2) - 70, 'ground5');
        platforms.create(width - 105,  200, 'ground6');

        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#2889d4');
        this.physics.world.bounds.width = width;
        this.physics.world.bounds.height = height;

        let clouds = this.physics.add.sprite(0, -10, 'background-clouds').setOrigin(0,0);
        let clouds2 = this.physics.add.sprite( 100, 10, 'background-clouds').setOrigin(0,0);
        clouds.body.setVelocityX(8);
        clouds2.body.setVelocityX(2);
        clouds2.body.setAllowGravity(false);
        //clouds.body.setVelocityY(50);
        clouds.body.setAllowGravity(false);
        //clouds.body.setBounce(20);
        clouds.setCollideWorldBounds(false);
        clouds2.setCollideWorldBounds(false);

        // The player and its settings
        player = this.physics.add.sprite(200, height/2 + 90, 'player');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // set size for player
        player.body.setSize(player.width, player.height-8);
            
        // player walk animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        // idle with only one frame, so repeat is not needed
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });

        // Input Events
        cursors = this.input.keyboard.createCursorKeys();

        food = this.physics.add.group();
        food.create(35, 100, 'food', 'sprite1');
        food.create(135, 135, 'food', 'sprite2');
        food.create(335, 165, 'food', 'sprite3');

        food.create(width/2 - 300, 195, 'food', 'sprite4');
        food.create(width/2 - 200, 195, 'food', 'sprite5');
        food.create(width/2 - 100, 195, 'food', 'sprite6');

        food.create(width/2 - 300, height - 135, 'food', 'sprite7');
        food.create(width/2 - 200, height - 135, 'food', 'sprite8');
        food.create(width/2 - 100, height - 135, 'food', 'sprite9');

        food.create(width/2 + 100, height/2, 'food', 'sprite2');
        food.create(width/2 + 200, height/2, 'food', 'sprite3');

        food.create(width - 300, height/2, 'food', 'sprite10');
        food.create(width - 200, height/2, 'food', 'sprite11');
        food.create(width - 100, height/2, 'food', 'sprite1');

        food.children.iterate(function (child) {  
            child.setBounceY(0.2);  
            child.setCollideWorldBounds(true);
        });

        // add sounds to the game        
        this.sound.add('eatfood');
        this.sound.add('jumpsmall');
        this.sound.add('jumphigh');

        // Add trophy
        trophy = this.physics.add.sprite(width - 105, 100, 'trophy');
        trophy.setCollideWorldBounds(true);

        bombs = this.physics.add.group();
        // The score
        scoreText = this.add.text(16, 16, 'Energy: 0', { fontSize: '25px', fill: '#fff' });        
        // fix the text to the camera
        scoreText.setScrollFactor(0);  
        
        gameOverText = this.add.text(width/2 - 100, height/2 - 50, 'Game Over!', { fontSize: '50px', fill: '#fff' });       
        gameOverText.setVisible(false);
        gameOverText.setScrollFactor(0);  

        //  Collide the player and the food with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(trophy, platforms);
        this.physics.add.collider(food, platforms);

        //  Checks to see if the player overlaps with any of the food, if he does call the collectEnergy function 
        this.physics.add.overlap(player, food, this.collectEnergy, null, this);

        this.physics.add.overlap(player, trophy, this.collectTrophy, null, this);

         this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, width, height);
        
        // make the camera follow the player
        this.cameras.main.startFollow(player, true);
    }

    update () {
        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-250);
            player.anims.play('walk', true); // walk left
            player.flipX = true; // flip the sprite to the left
        }
        else if (cursors.right.isDown)
        {  
            player.body.setVelocityX(250);
            player.anims.play('walk', true);
            player.flipX = false; // use the original sprite looking to the right
        }
        else
        {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            if(score > 100) {
                score -= 10; // Engergy descreases for every jump
                scoreText.setText('Energy: ' + score);
            }
            // TODO: increase velocity based on backend value
            if(score < 90) {
                player.body.setVelocityY(this.jumpVelocity); 
                this.sound.play('jumphigh');
            }
            else if(score >= 90 && score < 250) {    
                player.body.setVelocityY(-320); 
                this.sound.play('jumphigh');
            }
            else if(score >= 250) {      
                player.body.setVelocityY(-400); 
                this.sound.play('jumpsmall');
            }            
            
        }
    }

    collectEnergy (player, foodItem) {
        foodItem.disableBody(true, true);
        this.sound.play('eatfood');

        //  Add and update the score
        score += 10;
        scoreText.setText('Energy: ' + score);

        if (food.countActive(true) === 0)
        {
            //  A new batch of food to collect
            food.children.iterate(function (child) {
                child.enableBody(true, child.x, width/2 + 100 >= child.x ? 0: height/2, true, true);
            });

            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            let bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    // TODO: Collect the trophy
    collectTrophy(player, trophy) {
        console.log("You Won the Trophy!");
        trophy.disableBody(true, true);
    }

    hitBomb (player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
        gameOverText.setVisible(true);
    }

}

export default GameScene;
