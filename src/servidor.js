/* importando a instância do express: */
import servidor from "./application.js";

/* definindo uma porta para meus usuário enviar suas requisições para o meu servidor: */
const PORTA = 8080;

/* adicionando um ouvidor de eventos de acesso a minha porta: */
servidor.listen(PORTA, (erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log(`Servidor rodando no endereço http://${PORTA}`);
    }
});
