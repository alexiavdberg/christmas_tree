let config = {
    type: Phaser.AUTO,
    width: 611,                                 // En pixels
    height: 980,                                // En pixels
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     
        create: create,     
        update : update   
    }
};

// Variables globales
let game = new Phaser.Game(config);
let inc = -0.015;
let starImage;
let snowflakes;
let timerSnowflakes;
let musicChristmas;
let button_pop;
let isPlaying = false;
let tweenRibbonClear;

function preload() {
    this.load.image('background', './assets/images/back_2.png');
    this.load.image('tree', './assets/images/tree_1.png');
    this.load.image('ribbon', './assets/images/ribbon.png');
    this.load.image('ribbonClear', './assets/images/ribbonClear.png');
    this.load.image('boule_1', './assets/images/obj/obj_21.png');
    this.load.image('boule_2', './assets/images/obj/obj_22.png');
    this.load.image('boule_3', './assets/images/obj/obj_23.png');
    this.load.image('star_tree', './assets/images/obj/obj_29.png');
    this.load.image('star', './assets/images/obj/star.png');
    this.load.image('snowflake', './assets/images/snowflake.png');
    this.load.image('gift_1', './assets/images/obj/obj_09.png');
    this.load.image('gift_2', './assets/images/obj/obj_11.png');
    this.load.image('gift_3', './assets/images/obj/obj_12.png');
    this.load.image('gift_4', './assets/images/obj/obj_13.png');
    this.load.image('gift_5', './assets/images/obj/obj_15.png');


    this.load.image('button_snowflake', './assets/images/obj/obj_10.png');
    this.load.image('button_ribbon', './assets/images/obj/obj_25.png');
    this.load.image('button_music', './assets/images/obj/obj_02.png')
    this.load.image('button_pop', './assets/images/obj/obj_14.png')
    this.load.image('button_message', './assets/images/button.png')

    this.load.audio('musicChristmas', './assets/audio/christmasMusic.mp3');
}

function create() {
    // Fond 
    backImage = this.add.image(0, 0, 'background');
    backImage.setOrigin(0, 0);                  // En %
    backImage.setScale(0.5);                    // En %

    // Etoiles
    for (let i=0; i<150; i++) {
        starImage = this.add.image(Phaser.Math.Between(0, 611), Phaser.Math.Between(0, 500), 'star');
        starImage.setScale(Phaser.Math.FloatBetween(0.3, 1.1));
    
        let tweenStarImage = this.tweens.add({
            targets: starImage,
            alpha: 0,
            duration: Phaser.Math.Between(3000, 10000),
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }
    
    // Arbre
    treeImage = this.add.image(300, 500, 'tree');
    treeImage.setOrigin(0, 0);
    treeImage.setScale(0.3);

    // Ruban base
    ribbonImage = this.add.image(343, 570, 'ribbon');
    ribbonImage.setOrigin(0, 0);
    ribbonImage.setScale(0.31);

    // Ruban lumineux
    ribbonClear = this.add.image(343, 570, 'ribbonClear');
    ribbonClear.setOrigin(0, 0);
    ribbonClear.setScale(0.31);
    
    // Faire clignoter ruban
    tweenRibbonClear = this.tweens.add({
        targets: ribbonClear,
        alpha: 0,
        duration: 1000,  // Millisecondes
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

    // Bouton guirlande lumineuse
    button_ribbonImage = this.add.image(25, 25, 'button_ribbon').setInteractive();
    button_ribbonImage.setOrigin(0, 0);
    button_ribbonImage.setScale(0.5);
    button_ribbonImage.on('pointerdown', ribbonControl);

    // Boules
    boule_1Image = this.add.image(400, 625, 'boule_1');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(450, 670, 'boule_1');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(410, 850, 'boule_1');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(500, 820, 'boule_2');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(390, 770, 'boule_2');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(450, 600, 'boule_2');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(380, 700, 'boule_3');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(480, 730, 'boule_3');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    boule_1Image = this.add.image(420, 550, 'boule_3');
    boule_1Image.setOrigin(0, 0);
    boule_1Image.setScale(0.2);

    // Cadeaux
    giftImage = this.add.image(550, 750, 'button_pop');
    giftImage.setOrigin(0, 0);
    giftImage.setScale(0.18);

    gift_1Image = this.add.image(100, 750, 'gift_1');
    gift_1Image.setOrigin(0, 0);
    gift_1Image.setScale(0.8);

    gift_1Image = this.add.image(330, 550, 'gift_1');
    gift_1Image.setOrigin(0, 0);
    gift_1Image.setScale(0.3);

    gift_2Image = this.add.image(300, 600, 'gift_2');
    gift_2Image.setOrigin(0, 0);
    gift_2Image.setScale(0.35);

    gift_2Image = this.add.image(550, 550, 'gift_2');
    gift_2Image.setOrigin(0, 0);
    gift_2Image.setScale(0.2);

    gift_3Image = this.add.image(150, 650, 'gift_3');
    gift_3Image.setOrigin(0, 0);
    gift_3Image.setScale(0.2);

    gift_3Image = this.add.image(50, 550, 'gift_3');
    gift_3Image.setOrigin(0, 0);
    gift_3Image.setScale(0.1);

    gift_3Image = this.add.image(555, 650, 'gift_3');
    gift_3Image.setOrigin(0, 0);
    gift_3Image.setScale(0.1);

    gift_4Image = this.add.image(35, 660, 'gift_4');
    gift_4Image.setOrigin(0, 0);
    gift_4Image.setScale(0.3);

    gift_4Image = this.add.image(180, 840, 'gift_4');
    gift_4Image.setOrigin(0, 0);
    gift_4Image.setScale(0.5);

    gift_5Image = this.add.image(230, 740, 'gift_5');
    gift_5Image.setOrigin(0, 0);
    gift_5Image.setScale(0.3);

    gift_5Image = this.add.image(100, 600, 'gift_5');
    gift_5Image.setOrigin(0, 0);
    gift_5Image.setScale(0.2);

    gift_5Image = this.add.image(520, 590, 'gift_5');
    gift_5Image.setOrigin(0, 0);
    gift_5Image.setScale(0.15);

    // Etoile arbre
    starTreeImage = this.add.image(418, 495, 'star_tree');
    starTreeImage.setOrigin(0, 0);
    starTreeImage.setScale(0.3);

    // Afficher bouton neige pause
    button_snowflakeImage = this.add.image(20, 880, 'button_snowflake').setInteractive();
    button_snowflakeImage.setOrigin(0, 0);
    button_snowflakeImage.setScale(0.5);
    button_snowflakeImage.on('pointerdown', snowControl);

    // Créer panier flocons
    snowflakes = this.physics.add.group({
        defaultKey : 'snowflake',
        maxSize : 100
    })

    timerSnowflakes = this.time.addEvent({
        delay : 200, // millisecondes
        callback : spawnSnowFlakes,
        callbackScope : this,
        repeat : -1
    })

    // Afficher bouton musique
    button_music = this.add.image(520, 20, 'button_music').setInteractive();
    button_music.setOrigin(0, 0);
    button_music.setScale(0.4);
    button_music.on('pointerdown', musicControl);

    // Ajouter musique
    musicChristmas = this.sound.add('musicChristmas')

    // Afficher pop
    button_pop = this.add.image(180, 550, 'button_pop').setInteractive();
    button_pop.setOrigin(0, 0);
    button_pop.setScale(0.2);
    button_pop.on('pointerdown', buttonControl);

    button_message = this.add.image(110, 150, 'button_message');
    button_message.setOrigin(0, 0);
    button_message.setScale(1);
    button_message.setVisible(false);
    text = this.add.text(170, 205, 'Joyeux Noël', { fontSize: 42 });
    text.setVisible(false);
}

function update() {
    // Clignoter étoiles
    if (starImage.alpha == 1) inc = -inc;
    if (starImage.alpha <= 0) {
        starImage.setPosition(Phaser.Math.Between(0, 611), Phaser.Math.Between(0, 500));
        inc = -inc;
    }
    starImage.alpha += inc;

    // Détruire flocons à la sortie de l'écran
    snowflakes.getChildren().forEach(
        function(snowflake) {
        if (snowflake.y>980) snowflake.destroy();
        }, this);
}

// Faire tomber flocons
function spawnSnowFlakes(){
    let snowflake = snowflakes.get();
    if(snowflake){
        snowflake.setPosition(Phaser.Math.Between(0, 611), -5);
        snowflake.setVelocity(0, Phaser.Math.Between(50, 100));
    }
}

// Mettre flocons en pause
function snowControl(){
    timerSnowflakes.paused = !timerSnowflakes.paused;
    timerSnowflakes.paused ? button_snowflakeImage.alpha = 0.5 : button_snowflakeImage.alpha = 1;
}

// Lancer la musique
function musicControl(){
    if (musicChristmas.isPlaying) {
        musicChristmas.pause();
        button_music.alpha = 1;
    }
    else {
        musicChristmas.play();
        button_music.alpha = 0.5;        
    }
}

// Faire popper le button
function buttonControl(){
    button_message.setVisible(true);
    text.setVisible(true);
}

function ribbonControl(){
    if (tweenRibbonClear.paused) {
        tweenRibbonClear.resume();
        button_ribbonImage.alpha = 1;
    }
    else {
        tweenRibbonClear.pause();
        button_ribbonImage.alpha = 0.5;        
    }
}