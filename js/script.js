carregar();

function carregar() {
    const questao = document.querySelector("h5");
    const question = document.querySelectorAll(".question");
    
    // Pegar informações do json
    fetch("../perguntas.json")
        .then(response => response.json())
        .then(dados => {

            // Variaveis
    
            let score = 0;
            let numeroAleatorio = Math.floor(Math.random() * dados.length);
            let perguntasRespondidas = [];
            const btnNext = document.querySelector(".b-next");
            const reset = document.querySelector("#reset");
            const buttons = document.querySelectorAll(".section1 .btn");

            const section1 =document.querySelector(".section1");
            const section2 =document.querySelector(".section2");

            let acertos = document.querySelector("#acertos");
            let perguntas = document.querySelector("#qtd-perguntas");

            // Geração randomicamente de pergunta

            questao.textContent = dados[numeroAleatorio].numero + " - " + dados[numeroAleatorio].pergunta
            question[0].textContent = dados[numeroAleatorio].letraA
            question[1].textContent = dados[numeroAleatorio].letraB
            question[2].textContent = dados[numeroAleatorio].letraC
            question[3].textContent = dados[numeroAleatorio].letraD

            // Clicar na alternativa
            buttons.forEach((button, index)=>{
                button.addEventListener("click", ()=>{

                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].disabled = true; 
                    }

                    document.querySelector(".b-next").classList.remove("hidden");

                    // Verificações de botoes/Se a resposta estiver correta
                    if(buttons[index].id === dados[numeroAleatorio].resposta){
                        buttons.forEach((btn,idx)=>{

                            
                            if(index === idx){
                                btn.classList.add('victory')
                                score++
                            }
                            else{
                                btn.classList.add('error')
                            }
                        })
                            //Se a resposta for errada
                    }else{
                        buttons.forEach((button) => {
                            if (button.id === dados[numeroAleatorio].resposta) {
                                button.classList.add("victory");
                            } else {
                                button.classList.add("error");
                            }
                        });   
                    }                  
                })   
       
            })
            
            perguntasRespondidas.push(numeroAleatorio)

                              //Pular pergunta

                              btnNext.addEventListener("click", () => {
                             
                                 // Configs basicas"
                                buttons.forEach((button) => {
                                    button.disabled = false;
                                });
                            
                                btnNext.classList.add("hidden");
                            
                                buttons.forEach((n) => {
                                    n.classList.remove("victory");
                                    n.classList.remove("error");
                                });
                            
                                // Verifica se todas as perguntas foram respondidas
                            
                                if (perguntasRespondidas.length >= dados.length) {
                                    section1.classList.add("hidden");
                                    section2.classList.remove("hidden");  
                                    
                                    acertos.textContent = score;
                                    perguntas.textContent = dados.length;
                                }
                                // Gera um novo número aleatório que não esteja na lista de perguntas respondidas            

                                 while (perguntasRespondidas.includes(numeroAleatorio)){
                        
                                    if(perguntasRespondidas.length >= dados.length){break}
                                    numeroAleatorio = Math.floor(Math.random() * dados.length);
                                    console.log(perguntasRespondidas)

                                 };
                            
                                // Exibe a próxima pergunta
                                questao.textContent = dados[numeroAleatorio].numero + " - " + dados[numeroAleatorio].pergunta;
                                question[0].textContent = dados[numeroAleatorio].letraA;
                                question[1].textContent = dados[numeroAleatorio].letraB;
                                question[2].textContent = dados[numeroAleatorio].letraC;
                                question[3].textContent = dados[numeroAleatorio].letraD;
                            
                                // Adiciona o número da pergunta ao array de perguntas respondidas
                                perguntasRespondidas.push(numeroAleatorio);
                            });
                    
                            reset.addEventListener("click",()=>{
                                location.href = "../index.html"
                            })
        })

        // Tratativa de erro
        .catch(error => console.error("Erro ao carregar perguntas:", error));     
        //Fim da função carregar
}






