const express= require('express')

const app = express();
const PORT = 3000;

let campanha =[{
    id: 10,
    titulo: "Animais campus IFMS",
    descricao: "arrecadação de fundos para remédios destinado aos cachorros do IFMS",
    meta: 12000.00,
    status: "ABERTA"
}]

let doador =[{
    id: 20,
    nome: "Helder da Silva",
    email: "helder@gmail.com"
}]

let doacao =[{
    id:30,
    valor: 2000.00,
    campanhaid: 10,
    doadorid: 20,
    data: "11/11/2001"
}]

let voluntario=[{
    id: 40,
    nome: "Lucas Alves",
    email: "lucas@gmail.com",
    telefone: "(67)99999-9999"
}]

let acao=[{
    id:50,
    nome: "Entrega de alimentos",
    descricao: "Distribuição das cestas arrecadadas",
    data: "10/10/2026",
    voluntarios: [40]
}]


app.get('/', (req,res) => {
    res.send('API de doações')
})

app.get('/campanha', (req,res)=> {
    res.json(campanha);
})

app.post('/campanha', (req,res)=>{
    const novaCampanha = req.body;
    campanha.push(novaCampanha);

    res.status(201).json(novaCampanha);
})

app.get('/campanha', (req,res)=> {
    res.json(campanha);
})

app.get('/campanhas/:id', (req, res) => {
    const id = Number(req.params.id);

    const campanhaEncontrada = campanha.find(c => c.id === id);

    res.json(campanhaEncontrada);
});

app.put('/campanhas/:id', (req, res) => {
    const id = Number(req.params.id);

    const campanhaEncontrada = campanha.find(c => c.id === id);

    campanhaEncontrada.titulo = req.body.titulo;
    campanhaEncontrada.descricao = req.body.descricao;
    campanhaEncontrada.meta = req.body.meta;
    campanhaEncontrada.status = req.body.status;

    res.json(campanhaEncontrada);
});

app.delete('/campanhas/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = campanha.findIndex(c => c.id === id);

    campanha.splice(indice, 1);

    res.send('Campanha removida com sucesso');
});


app.get('/doacoes', (req,res)=> {
    res.json(doacao);
});


app.listen(PORT, () =>{
    console.log(`servidor rodando na porta http://localhost:${PORT}`)
})