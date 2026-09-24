const express = require("express")
const cors = require("cors")
const eventos = require("./dados.json")

//Funções e códigos auxiliares, tipo: autoIncrement, totais, cálculos...
function autoIncrement() {
    return Number(eventos[eventos.length - 1].id) + 1
}

//Controllers CRUD [create, read, update, delete]
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

const createEvento = (req, res) => {
    const evento = req.body
    evento.id = autoIncrement()
    eventos.push(evento)
    res.status(201).json(evento)
}

const readEventos = (req, res) => {
    res.json(eventos)
}

const buscaEvento = (req, res) => {
    const evento = eventos.find(p => p.id == Number(req.params.id))
    if (evento) res.json(evento)
    else res.status(404).json("Id não encontrado")

    const updateEvento = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    pacientes.forEach((evento, indice) => {
        if (evento.id == id) {
            eventos[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(eventos)
    } else {
        res.status(404).send("Evento não encontrado")
    }

}



 //Configurações do servidor
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000


//Rotas REST [post, get, put, patch, delete]
app.get('/', rotaInicial)
app.post('/eventos', createEvento)
app.get('/eventos', readEventos)
app.get('/pacientes/:id', buscaEvento)
app.put('/pacientes/:id', updateEvento)
app.delete('/pacientes/:id', deleteEvento)

//Porta de entrada do servidor e saída do console
app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})