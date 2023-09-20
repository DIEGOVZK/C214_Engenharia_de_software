export class FileHandler {
    constructor(clientId) {
        this.clientId = clientId;
    }

    getFileName(extension) {
        return `${this.clientId}.${extension}`;
    }

    saveFile(data, extension) {
        const fileName = this.getFileName(extension);
        const filePath = path.join(__dirname, '..', 'persist', fileName);
        fs.writeFileSync(filePath, data);
    }

    readFile(extension) {
        const fileName = this.getFileName(extension);
        const filePath = path.join(__dirname, '..', 'persist', fileName);

        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return data;
        } catch (error) {
            console.error(`Error reading file '${fileName}': ${error.message}`);
            return null;
        }
    }
}

