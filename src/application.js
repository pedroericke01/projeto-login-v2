/* importando o módulo express, que me permite realizar requisições e gerar 
resposta utilizando a linguagem javascript: */
import express from "express"

/* importando o módulo do express-handlebars: */
import { engine, ExpressHandlebars } from "express-handlebars";

/* importando o expressfileupload */
import fileUpload from "express-fileupload";

/* criando uma instância do módulo express */
const servidor = express();

/* habilitando meu servidor para compreender requisições no formato JSON */
servidor.use(express.json());

/* habilitando meu servidor para analisar os dados provenientes de uma requisição
de formulários no formato JSON antes efetuar quaquer operação: */
express.urlencoded({extended:true});

/* habilitando meu servidor para compreender e analisar dados das requisições, no 
formato JSON e possivelmente fazer o upload de mídias; */
servidor.use(fileUpload());

/* habilitando meu servidor para trabalhar com dados estáticos: */
servidor.use(express.static("estaticos"));

/* configurando a engine do express-handlebars: */
servidor.engine("handlebars", engine());
servidor.set("view engine", "handlebars");
servidor.set("views", "./views");

function nome_valido(estrutura_dados, novo_nome){
    var cont_invalido = 0;

    for(let cont=0; cont < estrutura_dados.length; cont+=1){

        /* realizando a busca dentro da estrutura de dados se o novo nome que 
        o usuário quer cadastrar ja existe na base dos dados */
        if(estrutura_dados[cont].nome == novo_nome){
            cont_invalido +=1;
            return false;
        }
    }
    if(cont_invalido > 0){
        return false;
    }else{
        return true;
    }
}

function id_valido(id){
    if(id < 0 || id > usuarios.length){
        return false;
    }else{
        return [true, id];
    }
}

function busca_usuario(estrutura_dados, callback){
    if(callback != false){
        /* fazer a busca pelo id informado pelo usuário na base de dados: */
        return estrutura_dados[callback[1]];
    }else{
        return false;
    }
}

/* base de dado genêrica: */
const usuarios = [
    {"nome":"pedro", "senha":"pedro123"},
    {"nome":"nycolas", "senha":"nick123"},
    {"nome":"eva", "senha":"eva12345"},
    {"nome":"fernanda", "senha":"fernanda678"},
    {"nome":"bryan", "senha":"123bryan88"}
]

/* SISTEMA DE ROTAS: */
servidor.get('/', (requisicao, resposta)=>{
    resposta.render("Interface.handlebars");
});

/* rota para criar um registro de um novo usuário em minha base de dados genêrica: */
servidor.post("/usuarios", (requisicao, resposta)=>{
    /* acessando o corpo da requisição do usuário e capturando os dados: */
    const novo_usuario = requisicao.body
    console.log(novo_usuario);

    /* chamada a função de validação, que verifica se esse nome do usuário ja existe 
    ou não na base de dados: */
   const resultado_validacao = nome_valido(usuarios, novo_usuario.nome);

    if(resultado_validacao == true){
        usuarios.push(novo_usuario);
        resposta.status(201).json({"resultado":"Novo usuário cadastrado com sucesso!"});
    }else{
        resposta.status(400).json({"resultado":"Esse nome de usuário ja existe na base de dados!"});
    }

});

/* ROTA PARA RETORNAR TODOS OS USUÁRIOS EXISTENTES NA BASE DOS DADOS: */
servidor.get('/usuarios', (requisicao, resposta)=>{
    resposta.send(usuarios);
});

/* ROTA PARA SELECIONAR 1 USUÁRIO ESPECÍFICO PELA SUA CHAVE PRIMÁRIO NA BASE DE DADOS,
ESSA CHAVE SERÁ INFORMADA NA URL PELO USUÁRIO*/
servidor.get("/usuarios/:id", (requisicao, resposta)=>{
    /* capturando o id informado pelo usuário: */
    const id = requisicao.params.id;

    const resultado_busca = busca_usuario(usuarios, id_valido(id));    
    if(resultado_busca == false){
        resposta.status(404).json({"resultado":"Usuário não existe!"});
    }else{
        resposta.status(200).json({"resultado":resultado_busca});
    }
});

/* rota para atualizar um registro de usuário específico: */
servidor.put("/usuarios/:id", (requisicao, resposta)=>{
    /* capturando o parÂmetro id da requisição do usuário: */
    const id = requisicao.params.id;

    /* acessando o corpo da requisição e acessando atributos específicos: */
    const novo_nome = requisicao.body.nome;
    const nova_senha = requisicao.body.senha;

    /* chamada a função de busca de um elemento específico na base de dados, 
    essa função vai me retornar todo o registro do usuário e seus dados no caso
    de ele existir no sistema: */
    var resultado_busca = busca_usuario(usuarios, id_valido(id));
    /* validando a existência do usuário: */
    if(resultado_busca == false){
        resposta.status(404).json({"resultado":"Usuário não existe na base de dados!"});
    }else{
        /* atualizar as propriedades de nome e senha: */
        resultado_busca.nome = novo_nome;
        resultado_busca.senha = nova_senha;

        resposta.status(201).json({"resultado":resultado_busca});
    }
});

/* rota para deletar um usuário na base de dados: */
servidor.delete("/usuarios/:id", (requisicao, resposta)=>{

    const id = requisicao.params.id;

    const resultado_id = id_valido(id);
    
    if(resultado_id != false){
        /* excluindo o usuário da base de dados */
        usuarios.splice(resultado_id[1], 1);
        resposta.status(200).json({"resultado":"Usuário excluido com sucesso!"});
    }else{
        resposta.status(404).json({"resultado":"Esse usuário não existe na base de dados!"});
    }
});
export default servidor
