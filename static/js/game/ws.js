export default class Socket {
    constructor(
        hostName = location.host,
    ) {
        this.socket = new WebSocket("wss://" + hostName + "/api/game/start");
        this.socketOpen = false;

        this.mapChange = true;
    }

    _setCookies() {
        let d = new Date();
        d.setDate(d.getDate()+1);
        document.cookie =
            "session_id="+Math.round(Math.random()*2*32).toString()+"; "+
            "path=/; "+
            "expires="+d.toUTCString()+";";
    }

    startServe(objs) {
        const that = this;

        this.socket.addEventListener("open", (event) => {
            that.socketOpen = true;
        });
        
        this.socket.addEventListener("close", () => {
        });
        
        this.socket.addEventListener("message", (event) => {
            let data = JSON.parse(event.data)
            if (this.mapChange) {
                objs.map.map = data.map.field;
                // mapSize = data.map.sizex;
                // tileSize = data.map.tailsize;
        
                objs.barriers = data.barriers;
        
                objs.player.id = data.id;
                
        
                this.mapChange = false;     

                // console.log(objs.map.map);
            }

            // console.log(data);
            
            if (data["url"] != '') {
                objs.advUrl = data["url"];
                // console.log(data["url"], objs.advUrl)
            }
    
            if (data["bullets"] != null) {
                objs.bullets = data["bullets"]
            }
        
            if (data["advs"] != null) {
                objs.advs = data["advs"];
            }     

            if (data["dead"] != null) {
                objs.dead = data["dead"];
            }

            if (data["players"] != null) {

                if (data["players"][0].id == objs.player.id) {
                    objs.player.x += data["players"][0].object.x - objs.player.x;
                    objs.player.y += data["players"][0].object.y - objs.player.y;
                    objs.player.hp = data["players"][0].object.hp;

                    if (data["players"][0]["cash"] != null) {
                        console.log(data["players"][0]["cash"])
                        objs.score = data["players"][0]["cash"];
                    }
            
                    // objs.enemy.x += (data["players"][1].object.x - objs.enemy.x) * objs.player.c;
                    // objs.enemy.y += (data["players"][1].object.y - objs.enemy.y) * objs.player.c;
                    // console.log("player: ", data["players"][0].object.x, data["players"][0].object.y);
                    // console.log("enemy: ", data["players"][1].object.x, data["players"][1].object.y);
                    // }ss
                } else {
                    objs.player.x += data["players"][1].object.x - objs.player.x;
                    objs.player.y += data["players"][1].object.y - objs.player.y
            
                    // objs.enemy.x += (data["players"][0].object.x - objs.enemy.x) * objs.player.c;
                    // objs.enemy.y += (data["players"][0].object.y - objs.enemy.y) * objs.player.c;
            
                    // console.log("player: ", data["players"][1].object.x, data["players"][1].object.y);
                    // console.log("enemy: ", data["players"][0].object.x, data["players"][0].object.y);
                }

            // if (data["players"] != null) {
            //     if (data["players"][0].id == objs.player.id) {
            //         objs.player.x += (data["players"][0].object.x - objs.player.x) * objs.player.c;
            //         objs.player.y += (data["players"][0].object.y - objs.player.y) * objs.player.c;
            
            //         // objs.enemy.x += (data["players"][1].object.x - objs.enemy.x) * objs.player.c;
            //         // objs.enemy.y += (data["players"][1].object.y - objs.enemy.y) * objs.player.c;
            //         // console.log("player: ", data["players"][0].object.x, data["players"][0].object.y);
            //         // console.log("enemy: ", data["players"][1].object.x, data["players"][1].object.y);
            //         // }ss
            //     } else {
            //         objs.player.x += (data["players"][1].object.x - objs.player.x) * objs.player.c;
            //         objs.player.y += (data["players"][1].object.y - objs.player.y) * objs.player.c;
            
            //         // objs.enemy.x += (data["players"][0].object.x - objs.enemy.x) * objs.player.c;
            //         // objs.enemy.y += (data["players"][0].object.y - objs.enemy.y) * objs.player.c;
            
            //         // console.log("player: ", data["players"][1].object.x, data["players"][1].object.y);
            //         // console.log("enemy: ", data["players"][0].object.x, data["players"][0].object.y);
            //     }
            }
        });
        
        this.socket.addEventListener("error", (error) => {
            console.error(error)
        });
    }
}
