import ServerAT from "./ServerAT.js";
const defaultServer = new ServerAT();

class Hrat {

    // Classe desacoplada de ServerATentimento
    constructor (server_obj = defaultServer) {
        this.server = server_obj;
        this.hratList = [];
    }

    loadFromServer(sala = 0) {
        if (sala >= 1 && sala <= 5) this.hratList = this.server.loadFromBuilding(1);
        if (sala >= 6 && sala <= 5) this.hratList = this.server.loadFromBuilding(1);

        try {
            JSON.parse(this.hratList);
            return this.hratList;
        } catch (e) {
            return null;
        }
    }
}

export default Hrat;