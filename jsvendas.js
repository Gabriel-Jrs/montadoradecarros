document.addEventListener("DOMContentLoaded", () => {

    const precosBase = {
        tynel: 60060,
        vero: 81600,
        elyx: 72400,
        magnus: 146200,
        elyon: 320000,
        taurus: 238000,
        kardon: 508000,
        voltanna: 482300,
        trion: 402000,
        Kairon: 312500,
        lancerra: 1850600,
        vyntra: 4560000,
    };

    const adicionais = {
        roda: { 1: 0, 2: 4200, 3: 7000 },
        banco: { tecido: 0, couro: 3000, premium: 6000 },
        som: { basico: 0, plus: 1500, premium: 3000 },
        ar: { manual: 0, digital: 2500, dual: 4500 }
    };

    const modelo = document.getElementById("modelo");
    const cor = document.getElementById("cor");   // 🔹 seu original
    const roda = document.getElementById("roda");
    const banco = document.getElementById("banco");
    const som = document.getElementById("som");
    const ar = document.getElementById("ar");

    const nomeModelo = document.getElementById("nomeModelo");
    const imgCarro = document.getElementById("imgCarro");
    const precoFinal = document.getElementById("preco");

    // 🔥 NOVO — elementos da galeria de fotos
    const fotoFrente = document.getElementById("fotoFrente");
    const fotoLado = document.getElementById("fotoLado");
    const foto45 = document.getElementById("foto45");

    // 🔥 NOVO — atualiza apenas as imagens 3D
    function atualizarFotosCarro() {
        const carro = modelo.options[modelo.selectedIndex].dataset.carro;

        fotoFrente.src = `img/${carro}-frente.png`;
        fotoLado.src = `img/${carro}-lado.png`;
        foto45.src = `img/${carro}-45.png`;
    }

    function atualizar() {
        const m = modelo.value;
        const c = cor ? cor.value : ""; // caso não exista seleção de cor

        if (nomeModelo) nomeModelo.textContent = m.toUpperCase();
        if (imgCarro && c) imgCarro.src = `img/${m}_${c}.png`;

        let preco = precosBase[m];
        preco += adicionais.roda[roda.value];
        preco += adicionais.banco[banco.value];
        preco += adicionais.som[som.value];
        preco += adicionais.ar[ar.value];

        if (precoFinal) precoFinal.textContent = preco.toLocaleString("pt-BR");

        atualizarFotosCarro(); // 🔥 adicionando troca de imagens
    }

    modelo.addEventListener("change", atualizar);
    if (cor) cor.addEventListener("change", atualizar);
    roda.addEventListener("change", atualizar);
    banco.addEventListener("change", atualizar);
    som.addEventListener("change", atualizar);
    ar.addEventListener("change", atualizar);

    atualizar();
});
