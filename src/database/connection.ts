import path from 'path';
import { createConnection, Connection, DataSource } from 'typeorm';
export async function createDatabaseConnection(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'todo',//database name 
    entities: [path.join(__dirname,'../*/.entity{.ts,.js}')],
    synchronize: true, // Automatically creates database schema based on entity definitions (for development only)
  });
}