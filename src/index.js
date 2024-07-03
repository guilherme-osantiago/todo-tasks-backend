import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()
const database = new DatabasePostgres()

server.get('/', () => {
    return 'Hello, world'
})

// Criar
server.post('/tasks', async (request, reply) => {
    const { title, description, is_checked } = request.body

    await database.create({
        title,
        description,
        is_checked,
    })

    // Status 201
    // Sucesso & Algo foi criado
    return reply.status(201).send()
})

// Ler
server.get('/tasks', async (request, reply) => {
    const search = request.query.search

    const tasks = await database.list(search)
    return tasks
})

// Update
server.put('/tasks/:id', async (request, reply) => {
    const taskId = request.params.id
    const { title, description, is_checked } = request.body

    await database.update(taskId, {
        title,
        description,
        is_checked,
    })

    // Status 204
    // Sucesso & Não existe conteúdo na resposta
    return reply.status(204).send()
})

// Delete
server.delete('/tasks/:id', async (request, reply) => {
    const taskId = request.params.id
    await database.delete(taskId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
    host: '0.0.0.0'
})