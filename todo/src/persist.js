import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export class FileHandler {
    constructor(clientId) {
        this.clientId = clientId;
        this.extension = 'txt';
        const __filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(__filename);
    }

    getFileName(extension = this.extension) {
        return `${this.clientId}.${extension}`;
    }

    writeFile(data, extension = this.extension) {
        const fileName = this.getFileName(extension);
        const filePath = path.join(this.__dirname, '..', 'persist', fileName);
        fs.writeFileSync(filePath, data);
    }

    readFile(extension = this.extension) {
        const fileName = this.getFileName(extension);
        const filePath = path.join(this.__dirname, '..', 'persist', fileName);

        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return data;
        } catch (error) {
            return null;
        }
    }
}