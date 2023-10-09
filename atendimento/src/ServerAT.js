import postgres from 'postgres';
import path from 'path';
import fs from 'fs';

const options = {
    host: 'localhost',
    port: 5432,

    database: 'server-atendimento-database',
    username: 'server-atendimento-database-user',
    password: 'server-atendimento-database-password',
};

const defaultDatabase = postgres(options);

class ServerAT {

    // Classe desacoplada de Database
    constructor(db_obj = defaultDatabase) {
        this.db = db_obj;
    }

    async query(query) {
        try {
            const result = await this.db.unsafe(query).then((res) => Object.values(res));
            return result;
        } catch (error) {
            throw error;
        }
    }

    async loadFromBuilding(building) {
        let result = await this.query(`SELECT getlistbybuilding (${building})`);
        let data = [];
        result.forEach(element => {
            if (element.getlistbybuilding !== undefined) data.push(element.getlistbybuilding)
        });
        return data;
    }
}

export default ServerAT;