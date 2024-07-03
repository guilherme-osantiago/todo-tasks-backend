import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Hello, world'
})

// Criar
server.post('/tasks', (request, reply) => {
    const { title, description, check } = request.body

    database.create({
        title,
        description,
        check,
    })

    // Status 201
    // Sucesso & Algo foi criado
    return reply.status(201).send()
})

// Ler
server.get('/tasks', (request, reply) => {
    const search = request.query.search

    const tasks = database.list(search)
    return tasks
})

// Update
server.put('/tasks/:id', (request, reply) => {
    const taskId = request.params.id
    const { title, description, check } = request.body

    database.update(taskId, {
        title,
        description,
        check,
    })

    // Status 204
    // Sucesso & Não existe conteúdo na resposta
    return reply.status(204).send()
})

// Delete
server.delete('/tasks/:id', (request, reply) => {
    const taskId = request.params.id
    database.delete(taskId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
    host: '0.0.0.0'
})