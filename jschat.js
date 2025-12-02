const input = document.getElementById("chatInput");
const sendBtn = document.getElementById("chatSend");
const chatArea = document.getElementById("chatMessages");

// alternador: se 0 = sempre Anônimo, e se 1 = sempre Atendente
let turno = 0;

function enviarMensagem() {
    const texto = input.value.trim();

    if (texto === "") return;

    // Alterna os nomes conforme seu turno
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

sendBtn.addEventListener("click", enviarMensagem);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});

