const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http')
const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)
setupWebsocket(server);

const port = 3334
const db = {
   user: 'davi',
   password: 8680,
   name: 'week10'
}

mongoose.connect(`mongodb+srv://${db.user}:${db.password}@cluster0-r85xs.mongodb.net/${db.name}?retryWrites=true&w=majority`, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

// app.listen(port, () => console.log(`Servidor node semana 10 rodando!`))
server.listen(port, () => console.log(`Servidor node semana 10 rodando!`))