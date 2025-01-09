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
    {"id":0,"nome":"pedro", "senha":"pedro123"},
    {"id":1,"nome":"nycolas", "senha":"nick123"},
    {"id":2,"nome":"eva", "senha":"eva12345"},
    {"id":3,"nome":"fernanda", "senha":"fernanda678"},
    {"id":4,"nome":"bryan", "senha":"123bryan88"}
]

const novo_usuario = {
    "id":5,
    "nome":"howard",
    "senha":"howardstark001"
}

const validacao_nome = nome_valido(usuarios, novo_usuario.nome.toLowerCase());
console.log(validacao_nome);

const resultado_busca = busca_usuario(usuarios, id_valido(3));
console.log(resultado_busca)
