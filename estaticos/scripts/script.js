/* script responsável por no front end fazer a validação do nome 
inserido pelo usuário, esse nome não pode conter numeros, apenas 
dados alfabéticos: */

function nome_valido(nome){
    const dados_numericos = [0,1,2,3,4,5,6,7,8,9,10];
    
    /* variável acumulativa, todas as vezes que eu encontrar um dado numérico
    dentro da string nome, vamos acumular 1 ponto a essa variável */
    var quant_numerico = 0;
    
    /* loop que percorre toda a extensão do nome: */
    for(let cont=0; cont < nome.length; cont+=1){
        /* validação que busca o caractere específico da string nome dentro
        da lista dos dados numéricos: */
        if(dados_numericos.indexOf(Number(nome[cont])) != -1){
            quant_numerico += 1;
            return false;
        }
    }
    if(quant_numerico > 0){
        return false;
    }else{
        return true;
    }
}

/* ligando meu formulário ao javascript */
const formulario = window.document.querySelector("body > main > form");

var txt_nome = window.document.getElementById("nome");
var txt_senha = window.document.getElementById("senha");

/* adicionando um ouvidor de eventos de submit no meu formulário, quando esse 
evento acontecer vamos capturar os dados inseridos pelo usuário nos inputs: */
formulario.addEventListener("submit", ()=>{
    
    /* extraindo o dado do nome e senha das espectivas variáveis: */
    const nome = (txt_nome.value);
    const senha = (txt_senha.value);

    /* chamada a função para validação do nome: */
    const resultado = nome_valido(nome);
    if(resultado ==false){
        window.alert(`Nome de usuário inválido!`);
    }else{
        window.alert(`Enviando dados...`);
    }

});
