// CommomJS => require
// ESModules => import/export (mais utilizado) -> add  "type": "module", in package.json
import http from 'node:http'

// HTTP => 1. Método HTTP / 2. URL

// GET, POST, PUT, PATCH, DELETE

/*
GET => Buscar uma recurso do back-end
POST => Criar uma recurso no back-end
PUT => Atualizar um recurso no back-end
PATCH => Atualizar uma informação específica de um recurso no back-end
DELETE => Deletar um recurso do back-end
*/

/*
Método HTTP + RECURSO = ROTA

GET /users => Buscando usuários
POST /users => Criando um usuário
*/

// Stateful - Stateless
// Cabeçalhos (Requisições/resposta) => Metadados

const users = []

// req (request) & res (response)
const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const buffers = []

    // percorre cada pedacinho da requisição
    // e coloca dentro do array de buffers.
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
    
    if (method === 'GET' && url === '/users'){
        // JSON => Javascript Object Notation
        return res
            // compreendeu que era um json e mostra no terminal
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users'){
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }
    return res.writeHead(404).end('Not found')
})

// localhost:3333 => definido onde o servidor vai escutar a aplicação
server.listen(3333, () => {
    console.log("RODANDO")
})