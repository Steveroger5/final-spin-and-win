let config = {
  width:1200,
  height:700,
  scene:{
    preload:preload,
    create:create,
    update:update
  }
}
let is_spin=0;
let prize1 = ["CB book","CB Tshirt","2 Extra Spin","Amazon Vouchers","50% off","Netflix Subs","100% off","CB swagpack","70% off","Hard Luck","35% off","3000 CB Credits"]
let prize2 = [1.5,500,100,20,300,50,30,700,5,10,2,3];
let prize3 = ["birthday cocktail","free golf for two","2 scoops of icecream","a glass of wine","a pint of beer","a bottle of cava","a birthday cocktail","free golf for two","2 scoops of icecream","a glass of housewine","a pint of beer","a bottle of cava"];
let prize4=["5 windmills","5 pushups","10 jumping jacks","5 run in place","5 squats","10 burpes","5 windmills","5 pushups","10 jumping jacks","5 run in place","5 squats","10 burpes"];
let prize5=["fun","stupid","loving","awkawrd","crazy","energetic","calm","happy","scared","kind","meh","cute","lazy","dumb","CHEERFULL","cool","ugly","fun","stupid","loving","awkawrd","crazy","energetic","calm","happy","scared","kind","meh","cute","lazy","dumb","CHEERFULL","cool","ugly"];

let theme = 0;

let game = new Phaser.Game(config);

function preload(){

  this.load.image("background","images/back.jpg")
  this.load.image("background2","images/back2.jpg")
  this.load.image("background3","images/back3.jpg")
  this.load.image("background4","images/back4.jpg")
  this.load.image("background5","images/back5.jpg")

  this.load.image("vicbox","images/box.png")
  this.load.image("vicicon","images/victory.png")

  this.load.image("wheel","images/wheel.png")
  this.load.image("wheel2","images/wheel2.png")
  this.load.image("wheel3","images/wheel3.png")
  this.load.image("wheel4","images/wheel4.png")
  this.load.image("wheel5","images/wheel5.png")

  this.load.image("stand","images/stand.png")
  this.load.image("pin","images/pin.png")


  this.load.image("button","images/logo.png")
  this.load.image("button2","images/change.png")

  this.load.audio("theme","sounds/spin.mp3")
}
function create(){
  console.log("in create");
  let w = game.config.height;
  let h = game.config.width;


  this.button = this.add.sprite(h/2,w/13,'button').setInteractive();
  this.button.depth=1;
  this.button.setScale(0.18);

  this.button2 = this.add.sprite(h/2,0.95*w,'button2').setInteractive();
  this.button2.depth=1;
  this.button2.setScale(0.6);

  let back = this.add.sprite(h/2,w/2,'background');



  back.depth=0.5;

  this.stand = this.add.sprite(h/2,(6.5*w)/8,'stand')
  this.pin = this.add.sprite(h/2,(w/5),'pin')
  this.pin.depth=3;
  this.pin.setScale(0.25);
  this.stand.setScale(0.27);
  this.stand.depth=1;
  this.wheel = this.add.sprite(h/2,w/2,'wheel');
  this.wheel.depth=2;
  this.wheel.setScale(0.20);

  this.button.on("pointerover",function(){
    this.setScale(0.21);
  })

  this.button.on("pointerout",function(){
    this.setScale(0.18);
  })

  this.button.on("pointerdown",spinwheel,this);

  this.button2.on("pointerover",function(){
    this.setScale(0.7);
  })

  this.button2.on("pointerout",function(){
    this.setScale(0.6);
  })

  this.button2.on("pointerdown",changetheme,this);

}
function update(){
  console.log("in update");
}

function spinwheel(e){
  let w = game.config.height;
  let h = game.config.width;
    let message = "";
    var text = this.add.text(10,h/9, message, { color: 'red', fontFamily: 'Arial', fontSize: '32px ',fontWeight:'bold',backgroundColor:'yellow'});

  if(is_spin==0)
  {
   let music = this.sound.add('theme');
   music.play();
  is_spin=1;
  let rounds = Phaser.Math.Between(2,4);
  let angle = Phaser.Math.Between(0,11);
  let mainangle=rounds*360+(30*angle);

  let won = prize1;
  if(theme==0){
    won = prize1;
    message = "You have won ";
  }
  else if(theme == 1){
    won = prize2;
    mainangle+=10;
    message = "You have won $";
  }
  else if(theme == 2){
    won = prize3;
    message = "You will get ";
  }
  else if(theme == 3){
    won = prize4;
    mainangle+=15;
    message="You should do ";
  }
  else if(theme == 4){
    won = prize5;
    angle=Phaser.Math.Between(0,33)
    mainangle=rounds*360+(10.5*angle);
    angle--;
    message="Your personality is "
  }
  let tween = this.tweens.add({
    targets:this.wheel,
    angle:mainangle,
    ease:"Cubic.easeOut",
    duration:6000
  });
  won = won[angle];

  setTimeout(function(){
  message+= won;
  text.setText(message);
  is_spin=0;
  },6000)
  let vic = this.add.sprite(200,h/7,'vicbox');
  vic.depth=0;
  vic.setScale(0.8);

  let vicicon = this.add.sprite(200,h/18,'vicicon');
  vicicon.depth=0;
  vicicon.setScale(0.25);
  setTimeout(function(){
      text.depth = 2;
      vic.depth=1;
      vicicon.depth=1;

      setTimeout(function(){
        text.depth = -1;
        vic.depth=-1;
        vicicon.depth=-1;
      },4000)
  },6000)

}
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    background.visible =! background.visible;

}

function changetheme(e){
    let w = game.config.height;
    let h = game.config.width;
    // let back2 = this.add.sprite(h/2,w/2,'background2');
    // back2.depth=1;
    theme++;
    if(theme>4){
      theme=0;
    }

    switch(theme){

      case 0:
      let back = this.add.sprite(h/2,w/2,'background');
      back.depth=0.5;
      this.wheel = this.add.sprite(h/2,w/2,'wheel');
      this.wheel.depth=2;
      this.wheel.setScale(0.20);
      break;

      case 1:
      let back2 = this.add.sprite(h/2,w/2,'background2');
      back2.depth=0.5;
      back2.setScale(0.7);
      this.wheel = this.add.sprite(h/2,w/2,'wheel2');
      this.wheel.depth=2;
      this.wheel.setScale(0.5);
      break;

      case 2:
      let back3 = this.add.sprite(h/2,w/2,'background3');
      back3.depth=0.5;
      back3.setScale(1);
      this.wheel = this.add.sprite(h/2,w/2,'wheel3');
      this.wheel.depth=2;
      this.wheel.setScale(0.54);
      break;

      case 3:
      let back4 = this.add.sprite(h/2,w/2,'background4');
      back4.depth=0.5;
      back4.setScale(1);
      this.wheel = this.add.sprite(h/2,w/2,'wheel4');
      this.wheel.depth=2;
      this.wheel.setScale(0.7);
      break;

      case 4:
      let back5 = this.add.sprite(h/2,w/2,'background5');
      back5.depth=0.5;
      back5.setScale(0.75);
      this.wheel = this.add.sprite(h/2,w/2,'wheel5');
      this.wheel.depth=2;
      this.wheel.setScale(0.7);
      break;

    }
}
