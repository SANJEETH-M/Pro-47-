class Game {

    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createElement();
        this.leaderboardTitle = createElement("h2");
        this.bike1 = createElement("h2");
        this.bike2 = createElement("h2");
        this.bike3 = createElement("h2");
        this.bike4 = createElement("h2");


    }



    async start(){

        if (gameState ===0){
            player = new Player();
            var playerCount = await database.ref('playerCount').on("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.value();
                player.getCount();
            }
            form = new Form();
            fuels = new Group();
            form.display();
        }

        bike1 = createSprite(100,200);
        bike1_img.addImage("bike1",bike1_img);
        bike2 = createSprite(300,200);
        bike2_img.addImage("bike2",bike2_img);
        bike3 = createSprite(500,200);
        bike3_img.addImage("bike3",bike3_img);
        bike4 = createSprite(700,200);
        bike4_img.addImage("bike4",bike4_img);

        bikes = [bike1,bike2,bike3,bike4]

        // Adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImage, 0.02);

    }

    play(){
        form.hide();
        player.getPlayerInfo();


        if (allPlayers !== undefined){
            background("white");
            image(track,0,displayHeight-4,displayWidth, displayHeight-5);

            var index = 0
            var x = 185;
            var y;

            x = x + 200
            y = displayHeight-allPlayers[plr].distance;
            bikes[index-1].x=x;
            bikes[index-1].y = y;

            if(index === player.index){
                stroke(10);
                fill("orange");
                ellipse(x,y,50,50);
                bikes[index -1].shapeColor = "orange";
                camera.position.x = displayWidth/2;
                camera.position.y = bikes[index-1].y;
            }


        }       
        
    }

    updateCount(count){
        database.ref('/').update({
            playerCount:count
        });
    
    }

    update(){
        var playerIndex = "players/player"+this.index;
        database.ref(playerIndex).set({
            name:this.name,
            distance:this.distance
        });

        
    }

    getBikesAtEnd(){
        database.ref('BikesAtEnd').on("value",(data)=>{
            this.rank = data.val();
        })
    }

    static updateBikesAtEnd(rank){
        database.ref('/').update({
            BikesAtEnd:rank
        })
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref('player');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        })
    }
}