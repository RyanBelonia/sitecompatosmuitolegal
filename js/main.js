/* =========================================================
   RELÓGIO
   ========================================================= */

function atualizarRelogio() {
  const agora = new Date();

  const horas = String(agora.getHours()).padStart(2, "0");

  const minutos = String(agora.getMinutes()).padStart(2, "0");

  document.getElementById("relogio").textContent = `${horas}:${minutos}`;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

/* =========================================================
   FAÍSCAS
   ========================================================= */

const canvas = document.getElementById("sparks");

const ctx = canvas.getContext("2d");

function redimensionarCanvas() {
  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;
}

window.addEventListener("resize", redimensionarCanvas);

redimensionarCanvas();

const coresFaiscas = ["#441576", "#6b21ba", "#8f3bf0", "#b06bf3"];

class Faisca {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;

    this.y = canvas.height + Math.random() * 20;

    this.tamanho = Math.random() * 2.5 + 0.5;

    this.velocidadeY = Math.random() * 2 + 1;

    this.velocidadeX = (Math.random() - 0.5) * 1.2;

    this.opacidade = Math.random() * 0.8 + 0.2;

    this.cor = coresFaiscas[Math.floor(Math.random() * coresFaiscas.length)];
  }

  atualizar() {
    this.y -= this.velocidadeY;

    this.x += this.velocidadeX;

    this.opacidade -= 0.005;

    if (this.opacidade <= 0 || this.y < -10) {
      this.reset();
    }
  }

  desenhar() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);

    ctx.fillStyle = this.cor;

    ctx.globalAlpha = Math.max(0, this.opacidade);

    ctx.shadowBlur = 8;

    ctx.shadowColor = this.cor;

    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

const listaFaiscas = Array.from(
  {
    length: 70,
  },
  () => new Faisca(),
);

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  listaFaiscas.forEach((faisca) => {
    faisca.atualizar();

    faisca.desenhar();
  });

  requestAnimationFrame(animar);
}

animar();

/* ========================================================= CONFIGURAÇÕES ========================================================= */

const settingsButton = document.getElementById("settings-button");
const settingsOverlay = document.getElementById("settings-overlay");
const closeSettings = document.getElementById("close-settings");
const duckCount = document.getElementById("duck-count");
/* ========================================================= ABRIR CONFIGURAÇÕES ========================================================= */
settingsButton.addEventListener("click", () => {
  settingsOverlay.classList.add("open");
});
/* ========================================================= FECHAR CONFIGURAÇÕES ========================================================= */
closeSettings.addEventListener("click", () => {
  settingsOverlay.classList.remove("open");
});
/* Clicar fora do painel também fecha. */ settingsOverlay.addEventListener(
  "click",
  (event) => {
    if (event.target === settingsOverlay) {
      settingsOverlay.classList.remove("open");
    }
  },
);
/* ========================================================= QUANTIDADE DE PATOS ========================================================= */
const quantidadePatosSalva = localStorage.getItem("homepage_quantidade_patos");
if (quantidadePatosSalva !== null) {
  duckCount.value = quantidadePatosSalva;
}
duckCount.addEventListener("change", () => {
  const quantidade = Number(duckCount.value);
  localStorage.setItem("homepage_quantidade_patos", quantidade);
  /* personagem.js possui esta função. */ if (
    typeof atualizarQuantidadePatos === "function"
  ) {
    atualizarQuantidadePatos(quantidade);
  }
});



/* =========================================================
   GERENCIAR ATALHOS
   ========================================================= */

/*
   Mostra os atalhos existentes dentro
   das configurações.
*/

function atualizarListaAtalhosConfiguracao() {

    const lista =
        document.getElementById(
            'lista-atalhos-configuracao'
        );


    if (!lista) {
        return;
    }


    lista.innerHTML = '';


    /*
       Recuperar atalhos salvos.
    */

    const atalhos =
        JSON.parse(
            localStorage.getItem('atalhos') || '[]'
        );


    /*
       Nenhum atalho.
    */

    if (atalhos.length === 0) {

        lista.innerHTML =
            '<p class="sem-atalhos">Nenhum atalho adicionado.</p>';

        return;

    }


    /*
       Criar cada item.
    */

    atalhos.forEach(
        (atalho, index) => {

            const item =
                document.createElement('div');

            item.className =
                'atalho-config';


            /*
               Nome do site.
            */

            const nome =
                document.createElement('span');

            nome.className =
                'atalho-config-nome';

            nome.textContent =
                atalho.nome ||
                atalho.title ||
                atalho.url;


            /*
               Botão eliminar.
            */

            const botao =
                document.createElement('button');

            botao.className =
                'botao-eliminar-atalho';

            botao.textContent =
                'Eliminar';


            botao.addEventListener(
                'click',
                () => {

                    eliminarAtalho(index);

                }
            );


            item.appendChild(
                nome
            );

            item.appendChild(
                botao
            );


            lista.appendChild(
                item
            );

        }
    );

}



/* =========================================================
   ELIMINAR ATALHO
   ========================================================= */

function eliminarAtalho(index) {

    /*
       Recuperar atalhos.
    */

    const atalhos =
        JSON.parse(
            localStorage.getItem('atalhos') || '[]'
        );


    /*
       Verificar se o índice existe.
    */

    if (
        index < 0 ||
        index >= atalhos.length
    ) {

        return;

    }


    /*
       Remover somente o atalho
       selecionado.
    */

    atalhos.splice(
        index,
        1
    );


    /*
       Guardar novamente.
    */

    localStorage.setItem(
        'atalhos',
        JSON.stringify(atalhos)
    );


    /*
       Atualizar os atalhos
       visíveis na homepage.

       IMPORTANTE:
       Se a sua função responsável por
       desenhar os atalhos tiver outro nome,
       substitua atualizarAtalhos() pelo
       nome dela.
    */

    if (
        typeof atualizarAtalhos ===
        'function'
    ) {

        atualizarAtalhos();

    }


    /*
       Atualizar a lista dentro
       das configurações.
    */

    atualizarListaAtalhosConfiguracao();

}



/* =========================================================
   ATUALIZAR AO ABRIR CONFIGURAÇÕES
   ========================================================= */

const botaoConfiguracoes =
    document.getElementById(
        'botao-configuracoes'
    );


if (
    botaoConfiguracoes
) {

    botaoConfiguracoes.addEventListener(
        'click',
        () => {

            atualizarListaAtalhosConfiguracao();

        }
    );

}
