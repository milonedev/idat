const http = require('http')
const url = require('url')
const querystring = require('querystring')
const { v4: uuidv4 } = require('uuid');

let listaCompras = [];

const servidor = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url)
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*')

    if(reqUrl.pathname === '/compras' && method === 'POST') {
        let cuerpo = ''

        req.on('data', chunk => {
            cuerpo += chunk.toString()
        })

        req.on('end', () => {
            const datos = JSON.parse(cuerpo)

            const nuevaCompra = {
                // id: uuidv4(),
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                fecha: datos.fecha,
                esCompletado: false,
            }

            listaCompras.push(nuevaCompra)

            res.writeHead(201)
            res.end(JSON.stringify(nuevaCompra))
        })
    }
    else if (reqUrl.pathname === '/compras/completar' && method === 'POST') {
        let cuerpo = ''

        req.on('data', chunk => {
            cuerpo += chunk.toString()
        })

        req.on('end', () => {
            const datos = JSON.parse(cuerpo)
            const id = datos.id;

            const obtenerCompra = listaCompras.find(compra => compra.id = id)
            obtenerCompra.esCompletado = true;

            res.writeHead(202)
            res.end(JSON.stringify(listaCompras))
        })
    } 
     else if (reqUrl.pathname === '/compras/pendientes' && method === 'GET') {
        const comprasPendientes = listaCompras.filter(compra => !compra.esCompletado)
        res.writeHead(202)
        res.end(JSON.stringify(comprasPendientes))
    } else if (reqUrl.pathname === '/compras/completado' && method === 'GET') {
        const comprasPendientes = listaCompras.filter(compra => compra.esCompletado)
        res.writeHead(202)
        res.end(JSON.stringify(comprasPendientes))
    } else {
        res.writeHead(500);
        res.end(JSON.stringify({ok: false, msg: 'Ruta desconocida.'}))
    }
});

const PORT = 3000
servidor.listen(PORT, () => {
    console.log('The server is running on port 3000')
})