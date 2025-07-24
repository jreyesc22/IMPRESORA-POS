NodeJS Print Server
Este proyecto es un servidor Node.js que actúa como puente entre aplicaciones web y una impresora de red (puerto 9100, típico de impresoras térmicas o POS). Recibe peticiones HTTP POST con datos a imprimir y los reenvía directamente a la impresora usando sockets TCP.

¿Para qué sirve?
Permite enviar impresiones desde cualquier frontend web (por ejemplo, un POS web, app de facturación, sistema de pedidos, etc.) a una impresora conectada en la red local. Así puedes imprimir tickets, recibos, comandas, etc. sin tener que instalar drivers ni depender del navegador.

¿Cómo funciona?
Recibe solicitudes HTTP POST en el puerto 3005 (puedes cambiarlo si quieres).

Acepta cualquier origen CORS (perfecto para pruebas y sistemas internos) puedes limitarlo tambien a rangos.

Al recibir datos, los reenvía tal cual a la impresora configurada (IP y puerto 9100). puedes imprimir desde varias direcciones ip.

Devuelve una respuesta simple: "Impresión enviada" o error si no se pudo conectar con la impresora.

Instalación
Clona este repo o copia el archivo server.js.

Instala las dependencias necesarias:

#bash
Copiar
Editar
npm install cors
Modifica la IP de la impresora en el archivo (línea: printerSocket.connect(9100, '192.168.1.87', ... )) por la IP real de tu impresora en la red.

Ejecuta el servidor:

#bash
Copiar
Editar
node server.js
Ejemplo de uso
Puedes hacer una petición desde cualquier frontend, Postman, o incluso con curl:

#bash
Copiar
Editar
curl -X POST http://localhost:3005/ -H "Content-Type: text/plain" --data "Texto a imprimir en la impresora"
Personalización
Puerto del servidor: Cambia el valor en httpServer.listen(3005, ...) si quieres otro puerto.

IP de la impresora: Cambia '192.168.1.87' por la IP de tu impresora en la red.

Puerto de impresora: Usualmente es 9100 en impresoras de tickets (Ethernet o WiFi). Modifícalo si tu modelo usa otro puerto.

Seguridad
¡Advertencia! El servidor permite cualquier origen y no requiere autenticación. Es ideal para LAN/local, pero no expongas este servidor a internet tal cual, salvo que le pongas autenticación, control de acceso y/o un proxy.

¿Qué NO hace?
No interpreta formatos ni comandos de impresora. Envía los datos tal como los recibe.

No soporta impresión directa a impresoras USB, solo impresoras de red.

No almacena ni registra trabajos de impresión. Va todo directo a la impresora.

Licencia
Este proyecto es open source, pero con sello propio. Puedes copiar, modificar y usar el código bajo la licencia "jdkan":
Si te funciona, compártelo; si lo mejoras, no seas codo. Si algo explota… no reclames, mejor aprende.
Desarrollado por jdkan.

Autor: jdkan
Contacto: [jdreyescan@hotmail.com] 
