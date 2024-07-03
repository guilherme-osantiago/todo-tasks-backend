import postgres from "postgres"

export const sql = postgres({
    host: 'postgres', // Nome do serviço no compose.yaml
    port: 5432,
    database: 'mydatabase',
    username: 'postgres',
    password: 'postgres'
})