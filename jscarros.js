function gerarDesconto() {
    const nome = document.getElementById("nomeDesc").value;
    const idade = Number(document.getElementById("idadeDesc").value);
    const renda = Number(document.getElementById("rendaDesc").value);

    if (!nome || idade <= 0 || renda <= 0) {
        document.getElementById("resultadoDesconto").innerHTML =
            "<span style='color:red'>Preencha todos os campos corretamente.</span>";
        return;
    }

    let desconto = 0;

    // Regras simples de desconto
    if (idade >= 60) desconto += 12;
    if (renda < 2500) desconto += 8;
    if (renda < 1500) desconto += 5;
    if (idade <= 21) desconto += 4;

    if (desconto === 0) {
        document.getElementById("resultadoDesconto").innerHTML =
            "Você não tem direito a desconto.";
        return;
    }

    // Gera senha única
    const codigo = "VEL-" + Math.floor(Math.random() * 90000 + 10000);

    // Salva no localStorage
    localStorage.setItem(codigo, desconto);

    // Exibe na tela + link para página de personalização
    document.getElementById("resultadoDesconto").innerHTML = `
        Parabéns, você tem <b>${desconto}%</b> de desconto!<br>
        Sua senha é:
        <span class="senha">${codigo}</span>
        <a href="vendas.html">Ir para Personalização</a>
    `;
}
