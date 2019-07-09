const express = require('express');
const expressRouters = require('./express-router');
const server = express();
const port = 3001;

server.use(express.json());
server.use(expressRouters);

server.listen(port, () => {
    console.log(`<<< Server listening on http://localhost:${port} >>>`)
})
