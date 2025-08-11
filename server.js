// Importa o Express e o Path
const express = require('express');
const path = require('path');

// 1. Cria a instância da aplicação Express
const app = express();
const port = 3000;

// 2. Configura o Express para servir arquivos estáticos
// Esta linha deve vir DEPOIS de `const app = express();`
app.use(express.static(path.join(__dirname, 'public')));

// 3. Configura o EJS como o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Exemplo de dados de produtos (simulando uma base de dados)
const produtos = [
    { id: 1, nome: 'Teclado Mecânico', preco: 150, descricao: 'Teclado de alta performance com switches Cherry MX.' },
    { id: 2, nome: 'Mouse Gamer', preco: 80, descricao: 'Mouse com sensor óptico de 16000 DPI e iluminação RGB.' },
    { id: 3, nome: 'Monitor Ultrawide', preco: 1200, descricao: 'Monitor de 34 polegadas com resolução 4K e taxa de atualização de 144Hz.' }
];

// 4. Define as rotas
app.get('/', (req, res) => {
    res.render('index', { produtos: produtos });
});

app.get('/produto/:id', (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado.');
    }

    res.render('produto', { produto: produto });
});

// 5. Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});