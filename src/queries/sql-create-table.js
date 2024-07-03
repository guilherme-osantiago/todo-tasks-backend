import { sql_local } from "./db-local.js";

sql_local`
CREATE TABLE tasks (
    id uuid DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    is_checked BOOLEAN
);
`.then(() => {
    console.log("Tabela criada!")
})