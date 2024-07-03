import { sql } from "./db.js"

export class DatabasePostgres {
    async list(search) {
        let tasks

        if (search) {
            tasks = await sql`
                SELECT *
                FROM tasks
                WHERE title ILIKE ${'%' + search + '%'}
            `
        } else {
            tasks = await sql`SELECT * FROM tasks`
        }

        return tasks
    }

    async create(task) {
        const { title, description, is_checked } = task

        await sql`
            INSERT INTO
            tasks (title, description, is_checked)
            VALUES (${title}, ${description}, ${is_checked})
        `
    }

    async update(id, task) {
        const { title, description, is_checked } = task

        await sql`
            UPDATE tasks
            SET title = ${title},
            description = ${description},
            is_checked = ${is_checked}
            WHERE id = ${id}
        `
    }

    async delete(id) {
        await sql`DELETE FROM tasks WHERE id = ${id}`
    }
}