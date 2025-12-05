document.addEventListener("DOMContentLoaded", () => {
const chatArea = document.getElementById("chat-area");
const input = document.getElementById("chatInput");
const btn = document.getElementById("sendBtn");


function enviarMensagem() {
const texto = input.value.trim();
if (texto === "") return;


const msg = document.createElement("p");
msg.textContent = "Você: " + texto;


chatArea.appendChild(msg);
chatArea.scrollTop = chatArea.scrollHeight;
input.value = "";
}


btn.addEventListener("click", enviarMensagem);


input.addEventListener("keypress", (e) => {
if (e.key === "Enter") enviarMensagem();
});
});