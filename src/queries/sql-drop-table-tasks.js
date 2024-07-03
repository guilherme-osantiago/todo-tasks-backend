import { sql_local } from "./db-local.js"

sql_local`
DROP TABLE tasks;
`.then(() => {
    console.log("Tabela excluída!")
})