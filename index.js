const express = require('express')
const mysql = require('mysql2')

const app = express()

app.use(express.json())

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "academia"
});

app.post('/sessoes', (req, res) => {
    const {nome_aluno, nome_personal, tipo_treino, data, horario, observacoes} = req.body

    if (!nome_aluno || typeof(nome_aluno) != 'string' || nome_aluno.trim() == '') {
       return res.status(400).send("Nome é obrigatório para o cadastro!")
    }
    
    if (!nome_personal || typeof(nome_personal) != 'string' || nome_personal.trim() == ''){
        return res.status(400).send("Nome é obrigatório para o cadastro!")
    }

    if (!tipo_treino || typeof(tipo_treino) != 'string' || tipo_treino.trim() == ''){
        return res.status(400).send("É obrigatório cadastrar o tipo de treino do aluno!")
    }

    if (!data || data.trim() == '') {
        return res.status(400).send("Necessitamos que informe a data do treino.")
    }

    if (!horario || horario.trim() == '') {
        return res.status(400).send("Necessitamos que informe o horário do treino.")
    }

    conexao.query('INSERT INTO sessoes (aluno, personal, tipo_treino, data, horario, observacoes) VALUES(?, ?, ?, ?, ?, ?)', [nome_aluno, nome_personal, tipo_treino, data, horario, observacoes])
    res.status(201).send('Sessão cadastrada com sucesso!')

});

app.get('/sessoes', (req, res) => {
    conexao.query('SELECT * FROM sessoes', (err, results) => {
        if (err) {
            res.status(500).send("Erro ao cadastrar sessões.")
        }

        res.status(200).send(results)
    })
});

app.listen(3000, () => {
    console.log('Servidor back-end rodando!')
})


