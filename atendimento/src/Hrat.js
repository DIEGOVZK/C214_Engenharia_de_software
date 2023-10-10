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
        if (sala >= 6 && sala <= 10) this.hratList = this.server.loadFromBuilding(2);
        if (sala >= 11 && sala <= 15) this.hratList = this.server.loadFromBuilding(3);
        if (sala >= 16 && sala <= 20) this.hratList = this.server.loadFromBuilding(4);

        try {
            eval(this.hratList);
            return this.hratList;
        } catch (e) {
            return null;
        }
    }

    loadAsList(sala = 0) {
        const json = this.loadFromServer(sala);
        if (json.lenght === 0) return null;
        const arr = [];
        for (const obj of json) {
            const innerArr = [];
            for (const key in obj) {
                innerArr.push(obj[key]);
            }
            arr.push(innerArr);
        }
        return arr;
    }
}

export default Hrat;