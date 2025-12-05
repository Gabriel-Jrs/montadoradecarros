
    const botao = document.getElementById("btnSortear");

    botao.addEventListener("click", function () {
        const nome = document.getElementById("nomeDesc").value.trim();
        const idade = document.getElementById("idadeDesc").value;
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone")?.value.trim();
        const regiao = document.getElementById("Região").value;
        const motivo = document.getElementById("motivo").value.trim();
        const jaVisitou = document.getElementById("jaVisitou").value;
        const termos = document.getElementById("termos").checked;

        const resultado = document.getElementById("resultadoDesconto");

        // VALIDAR CAMPOS
        if (!nome || !idade || !email || !regiao || !motivo || !jaVisitou) {
            resultado.innerHTML = "<p style='color: red;'>Preencha todos os campos antes de participar!</p>";
            return;
        }

        if (!termos) {
            resultado.innerHTML = "<p style='color: red;'>Você precisa aceitar os termos do sorteio.</p>";
            return;
        }

        if (idade < 12) {
            resultado.innerHTML = "<p style='color: red;'>Idade mínima para participar é 12 anos.</p>";
            return;
        }

        // SIMULAÇÃO DE SORTEIO
        const escolhido = Math.random() < 0.2; // 20% de chance

        if (escolhido) {
            resultado.innerHTML = `
                <p style="color: green; font-weight: bold;">
                    Parabéns, ${nome}! Você foi selecionado para visitar a fábrica Vellosci!
                </p>
            `;
        } else {
            resultado.innerHTML = `
                <p style="color: blue;">
                    Obrigado, ${nome}! Sua inscrição foi registrada.  
                    O resultado oficial será enviado para o seu e-mail.
                </p>
            `;
        }
    });
