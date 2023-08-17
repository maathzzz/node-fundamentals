import http from 'node:http'
import { json } from './middlewares/json.js '
import { routes } from './routes/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
 
// Query Params : URL Stateful => Filteos, paginação, não-obrigatórios
// Route Parameters: Identficação de recus
// Request Body: Envio de inforações de um formulário (HTTPs)

// GET http://localhost:3333/users?userId=1&name=Matheus
// http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        // req.params = { ...routeParams.groups }
        
        // console.log(extractQueryParams(routeParams.groups.query))

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not found')
})

server.listen(3333, () => {
    console.log("RODANDO")
})