import postgres from "postgres";

export const sql_local = postgres({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    username: 'postgres',
    password: 'postgres'
})