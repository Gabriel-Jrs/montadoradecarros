const input = document.getElementById("chatInput");
const sendBtn = document.getElementById("chatSend");
const chatArea = document.getElementById("chatMessages");

// alternador: 0 = Anônimo, 1 = Atendente
let turno = 0;

function enviarMensagem() {
    const texto = input.value.trim();

    if (texto === "") return;

    // Define nome conforme o turno
    const nome = turno === 0 ? "Anônimo" : "Atendente";

    // Cria elemento <p>
    const msg = document.createElement("p");
    msg.innerHTML = `<span class="${turno === 0 ? 'usuario' : 'atendente'}">${nome}:</span> ${texto}`;

    // Coloca no chat
    chatArea.appendChild(msg);

    // Rolar até o final
    chatArea.scrollTop = chatArea.scrollHeight;

    // Limpar input
    input.value = "";

    // Alternar turno
    turno = turno === 0 ? 1 : 0;
}

// Botão enviar
sendBtn.addEventListener("click", enviarMensagem);

// Enter para enviar
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});
