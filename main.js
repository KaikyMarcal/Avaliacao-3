const conteudo = document.querySelector('#conteudo');
function menu(link) {
    fetch('pages/' + link + '.html')
        .then(response => response.text())
        .then(html => conteudo.innerHTML = html)
        .catch(error => console.innerHTML = 'Página não encontrada');
}
const tbody = document.querySelector('#tabela');
const url = 'https://teste-16a79-default-rtdb.firebaseio.com/';
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const data = document.querySelector('#data');
const id = document.querySelector('#id');

var clientes = [];

const render = () => {

    tbody.innerHTML = '';
    clientes.sort().forEach(usuario => {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdNome = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdData = document.createElement('td');
        const tdSenha = document.createElement('td');
        const tdAcoes = document.createElement('td');

        tdId.innerHTML = usuario.id;
        tdNome.innerHTML = usuario.nome;
        tdEmail.innerHTML = usuario.email;
        tdData.innerHTML = usuario.data;
        tdSenha.innerHTML = usuario.senha;

        const iconeEditar = document.createElement('i');
        const iconeRemover = document.createElement('i');

        iconeEditar.className = 'mdi mdi-pencil';
        iconeRemover.className = 'mdi mdi-delete';

        iconeEditar.addEventListener('click', () => loadEdit(usuario.id));
        iconeRemover.addEventListener('click', () => Delete(usuario.id));

        tdAcoes.appendChild(iconeEditar);
        tdAcoes.appendChild(iconeRemover);

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdData);
        tr.appendChild(tdSenha);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    });
}

render();
function loadEdit(key) {
    const clienteEdit = clientes.find(cliente => cliente.id === key);
    nome.value = clienteEdit.nome;
    email.value = clienteEdit.email;
    data.value = clienteEdit.data;
    senha.value = clienteEdit.senha;
    id.value = clienteEdit.id;
}

function Save() {
    (id.value == '') ? Create() : Update(); // ternário
}
/* FUNÇÕES CRUD COM GOOGLE FIREBASE */

// CREATE
function Create() {
    // cria o objeto cliente com os dados do formulário
    const cliente = {
        nome: nome.value,
        email: email.value,
        data: data.value,
        senha: senha.value
    }

    // Enviar o objeto para o Firebase
    fetch(url + '/clientes.json', {
        method: 'POST', // método de envio dos dados (POST, GET, PUT, DELETE)
        body: JSON.stringify(cliente) // objeto cliente convertido para JSON
    }) // URL da API do Firebase
        .then(response => response.json()) // qual formato será usado para receber a resposta do servidor
        .then(() => {
            nome.value = ''
            email.value = ''
            data.value = ''
            senha.value = ''
            Read();
        }) // o que fazer com a resposta do servidor - se sucesso
        .catch(error => console.log(error)); // o que fazer com a resposta do servidor - se erro
}

// READ
function Read() {
    fetch(url + '/clientes.json', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => {
            clientes = [];
            for (const id in response) {
                response[id].id = id
                clientes.push(response[id])
            }
            render();
        })
        .catch();
}

// UPDATE
function Update() {
    const cliente = {
        nome: nome.value,
        email: email.value,
        data: data.value,
        senha: senha.value
    }
    fetch(url + '/clientes/' + id.value + '.json', {
        method: 'PUT',
        body: JSON.stringify(cliente)
    })
        .then(() => Read())
        .catch(error => console.log(error));
}

// DELETE
function Delete(id) {
    fetch(url + '/clientes/' + id + '.json', {
        method: 'DELETE'
    })
        .then(() => Read())
        .catch(error => console.log(error));
}

function irParaIndex() {
    // Chama a função menu com o parâmetro 'index'
    menu('index');
}

function irParaIndex() {
    // Redireciona para a index.html
    window.location.href = 'http://127.0.0.1:5500/AVALIAÇÃO-3/index.html';
}