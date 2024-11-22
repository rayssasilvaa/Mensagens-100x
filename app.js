async function enviarMenssagem(scriptText) {
    //Divide o texto em linhas
    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);

    //Seleciona o elemento principal e a área de texto onde a mensagem será digitada
    main = document.querySelector("#main"),
    txtArea = main.querySelector(`div[contenteditable="true"]`)

    //Verificar se existe uma área de texto para enviar as mensagens
    if (!txtArea) throw new Error("Não há uma conversa aberta")

    //Loop para iterar uma área de texto para enviar as mensagens
    for(const line of lines){
        //Exibe cada linha que está sendo enviada no console
        console.log(line)

        //Foca no campo de texto onde a mensagem será inserida
        txtArea.focus()
        //Insere o texto da linha na área de texto
        document.execCommand('insertText', false, line)
        //Dispara um evento de mudança para simular que o texto foi alterado
        txtArea.dispatchEvent(new Event('change', {bubbles: true}))

        //Envia a mensagem clicando no botão de envio após um pequeno delay
        setTimeout(() => {
            (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click()
        }, 100)

        //Se não for a última linha, aguardar antes de enviar a próxima
        if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250))
    }

    //Retorna o número de mensagens enviadas 
    return lines.length
}

//Gerar o texto escolhido 100x, cada um em uma linha
let message = Array(100).fill('Escreva sua mensagem aqui').join('\n')

//Chamar a função para enviar a mensagem e exibe a quantidade de mensagens enviadas
enviarMenssagem(message).then(e => console.log("Mensagens enviadas")).catch(console.error)