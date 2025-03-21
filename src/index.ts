import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";
import { API_PORT } from "./config";
import { syncAll } from "./utils/sync";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");

        await syncAll();
        console.log("Sincronización de departamentos y ciudades completada");

        app.listen(API_PORT);
        console.log("Server is listening on port", API_PORT);
    } catch (error) {
        console.error(error);
    }
}

main();