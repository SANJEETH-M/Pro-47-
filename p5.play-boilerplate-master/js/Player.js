class Player {

    constructor(){
        this.index = 0;
        this.distance = 0;
        this.name = null;
        this.rank = null;
    }

    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
            playerCount = data.val();
          })
    }
}