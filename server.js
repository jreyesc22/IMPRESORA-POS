const net = require('net');
const http = require('http');
const cors = require('cors'); // Necesitas instalar: `npm install cors`

// Configuración CORS para permitir cualquier origen
const corsOptions = {
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: 'POST',
    allowedHeaders: ['Content-Type']
};

// Servidor HTTP para recibir solicitudes del cliente web
const httpServer = http.createServer((req, res) => {
    // Aplicar CORS
    res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
    res.setHeader('Access-Control-Allow-Methods', corsOptions.methods);
    res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders);

    if (req.method === 'OPTIONS') {
        // Respuesta a la solicitud preflight CORS
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        let data = Buffer.from([]);
        req.on('data', chunk => {
            data = Buffer.concat([data, chunk]);
        });
        req.on('end', () => {
            // Enviar los datos a la impresora
            const printerSocket = new net.Socket();
            printerSocket.connect(9100, '192.168.1.87', () => { // Ajusta la IP de tu impresora
                printerSocket.write(data);
                printerSocket.end(); // Cerrar la conexión después de enviar
            });
            printerSocket.on('error', (err) => {
                console.error('Error al conectar con la impresora:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al imprimir');
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Impresión enviada');
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método no permitido');
    }
});

httpServer.listen(3005, () => {
    console.log('Servidor escuchando en http://localhost:3005');
});

httpServer.on('error', (err) => {
    console.error('Error en el servidor:', err);
});

/*
// Prueba automática al iniciar el servidor
if (require.main === module) {
    setTimeout(() => {
        const http = require('http');
        const options = {
            hostname: 'localhost',
            port: 3005,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => console.log('Respuesta de prueba:', data));
        });
        req.on('error', err => console.error('Error en la prueba:', err));
        req.write('=== PRUEBA DE IMPRESIÓN DESDE NODE ===\nProducto: Test x1  Q10.00\nTOTAL: Q10.00\n============================');
        req.end();
    }, 1000); // Espera 1 segundo para que el servidor esté listo
}*/