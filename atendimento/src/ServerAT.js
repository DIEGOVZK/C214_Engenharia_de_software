import postgres from 'postgres';
import path from 'path';
import fs from 'fs';

const defaultDatabase = new Database();

class ServerAT {

    // Classe desacoplada de Database
    constructor(db_obj = defaultDatabase) {
        db = db_obj;
    }

    options = {
        host: 'localhost',
        port: 5432,

        database: 'server-atendimento-database',
        username: 'server-atendimento-database-user',
        password: 'server-atendimento-database-password',
    };

    sql = postgres(this.options);

    async query(query) {
        try {
            const result = await this.sql.unsafe(query).then((res) => Object.values(res));
            return result;
        } catch (error) {
            throw error;
        }
    }

    async loadFromBuilding(building) {
        let result = await this.query(`SELECT getlistbybuilding (${building})`);
        
        let data = [];
        result.forEach(element => {
            data.push(result.getlistbybuilding)
        });

        return data;
    }
}

export default ServerAT;