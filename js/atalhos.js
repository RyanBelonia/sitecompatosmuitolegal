
/* =========================================================
   SISTEMA DE ATALHOS
   ========================================================= */


/*
   Número máximo de atalhos.

   2 linhas × 6 colunas = 12.
*/

const MAX_ATALHOS = 12;


/*
   Elemento onde os atalhos serão colocados.
*/

const shortcutsContainer =
  document.getElementById(
    'shortcuts-container'
  );


/*
   Elemento da lista de atalhos
   dentro das configurações.
*/

const listaAtalhosConfiguracao =
  document.getElementById(
    'lista-atalhos-configuracao'
  );


/*
   Carregar atalhos existentes.

   Se não existir nada salvo,
   começa com uma lista vazia.
*/

let atalhos =
  JSON.parse(
    localStorage.getItem(
      'homepage_atalhos'
    )
  ) || [];



/* =========================================================
   SALVAR
   ========================================================= */

function salvarAtalhos() {

  localStorage.setItem(

    'homepage_atalhos',

    JSON.stringify(atalhos)

  );

}



/* =========================================================
   FAVICON
   ========================================================= */

function obterFavicon(url) {

  /*
     Utilizamos o serviço de favicon
     do Google para tentar obter
     automaticamente o ícone do domínio.
  */

  try {

    const dominio =
      new URL(url).hostname;

    return (
      'https://www.google.com/s2/favicons' +
      `?domain=${dominio}&sz=64`
    );

  }

  catch {

    return '';

  }

}



/* =========================================================
   CRIAR ATALHO
   ========================================================= */

function criarAtalho(atalho) {

  const elemento =
    document.createElement('a');


  elemento.className =
    'shortcut';


  elemento.href =
    atalho.url;


  elemento.target =
    '_self';


  elemento.title =
    atalho.url;



  /*
     Ícone.
  */

  const imagem =
    document.createElement('img');


  imagem.className =
    'shortcut-icon';


  imagem.src =
    atalho.icon ||
    obterFavicon(atalho.url);


  imagem.alt =
    '';


  /*
     Caso o favicon não possa ser
     carregado, escondemos a imagem
     em vez de mostrar um ícone quebrado.
  */

  imagem.onerror =
    function () {

      this.style.display =
        'none';

    };



  /*
     Nome.
  */

  const nome =
    document.createElement('span');


  nome.className =
    'shortcut-name';


  nome.textContent =
    atalho.nome;



  elemento.appendChild(
    imagem
  );


  elemento.appendChild(
    nome
  );


  return elemento;

}



/* =========================================================
   BOTÃO ADICIONAR
   ========================================================= */

function criarBotaoAdicionar() {

  const botao =
    document.createElement('button');


  botao.className =
    'shortcut shortcut-add';


  botao.type =
    'button';


  botao.innerHTML =
    '<span class="plus">+</span>';


  botao.title =
    'Adicionar atalho';



  botao.addEventListener(
    'click',
    adicionarAtalho
  );


  return botao;

}



/* =========================================================
   ADICIONAR ATALHO
   ========================================================= */

function adicionarAtalho() {

  /*
     Impede ultrapassar os 12 espaços.
  */

  if (
    atalhos.length >=
    MAX_ATALHOS
  ) {

    alert(
      'Você já possui 12 atalhos.'
    );

    return;

  }



  const nome =
    prompt(
      'Nome do site:'
    );


  if (
    !nome ||
    !nome.trim()
  ) {

    return;

  }



  let url =
    prompt(
      'URL do site:'
    );


  if (
    !url ||
    !url.trim()
  ) {

    return;

  }



  url =
    url.trim();



  /*
     Se o utilizador escrever:

     youtube.com

     em vez de:

     https://youtube.com

     adicionamos https://.
  */

  if (
    !url.startsWith(
      'http://'
    ) &&
    !url.startsWith(
      'https://'
    )
  ) {

    url =
      'https://' +
      url;

  }



  /*
     Criar objeto.
  */

  const novoAtalho = {

    nome:
      nome.trim(),

    url:
      url,

    icon:
      obterFavicon(url)

  };



  atalhos.push(
    novoAtalho
  );


  salvarAtalhos();

  renderizarAtalhos();

  renderizarAtalhosConfiguracao();

}



/* =========================================================
   ELIMINAR ATALHO
   ========================================================= */

function eliminarAtalho(index) {

  /*
     Verificar se o índice é válido.
  */

  if (
    index < 0 ||
    index >= atalhos.length
  ) {

    return;

  }


  const atalho =
    atalhos[index];


  /*
     Pedir confirmação.

     Isto evita apagar um atalho
     por engano.
  */

  const confirmar =
    confirm(
      `Tem certeza que deseja eliminar "${atalho.nome}"?`
    );


  if (!confirmar) {

    return;

  }


  /*
     Remover o atalho da lista.
  */

  atalhos.splice(
    index,
    1
  );


  /*
     Guardar a nova lista.
  */

  salvarAtalhos();


  /*
     Atualizar os atalhos da homepage.
  */

  renderizarAtalhos();


  /*
     Atualizar a lista das configurações.
  */

  renderizarAtalhosConfiguracao();

}



/* =========================================================
   RENDERIZAR ATALHOS
   ========================================================= */

function renderizarAtalhos() {

  shortcutsContainer.innerHTML =
    '';



  /*
     Adiciona os atalhos existentes.
  */

  atalhos.forEach(
    atalho => {

      shortcutsContainer.appendChild(

        criarAtalho(
          atalho
        )

      );

    }
  );



  /*
     O botão + fica depois dos atalhos.

     Ele ocupa o próximo espaço.
  */

  if (
    atalhos.length <
    MAX_ATALHOS
  ) {

    shortcutsContainer.appendChild(

      criarBotaoAdicionar()

    );

  }

}



/* =========================================================
   RENDERIZAR ATALHOS NAS CONFIGURAÇÕES
   ========================================================= */

function renderizarAtalhosConfiguracao() {

  /*
     Verificar se o elemento existe.

     Isso evita erros caso a seção
     não esteja presente no HTML.
  */

  if (
    !listaAtalhosConfiguracao
  ) {

    return;

  }


  /*
     Limpar lista atual.
  */

  listaAtalhosConfiguracao.innerHTML =
    '';



  /*
     Nenhum atalho.
  */

  if (
    atalhos.length ===
    0
  ) {

    const mensagem =
      document.createElement('p');


    mensagem.className =
      'sem-atalhos';


    mensagem.textContent =
      'Nenhum atalho adicionado.';


    listaAtalhosConfiguracao.appendChild(
      mensagem
    );


    return;

  }



  /*
     Criar uma linha para cada atalho.
  */

  atalhos.forEach(
    (atalho, index) => {

      const item =
        document.createElement('div');


      item.className =
        'atalho-config';



      /*
         Nome do atalho.
      */

      const nome =
        document.createElement('span');


      nome.className =
        'atalho-config-nome';


      nome.textContent =
        atalho.nome;



      /*
         URL pequena abaixo do nome.
      */

      const informacao =
        document.createElement('div');


      informacao.className =
        'atalho-config-info';


      const url =
        document.createElement('span');


      url.className =
        'atalho-config-url';


      url.textContent =
        atalho.url;


      informacao.appendChild(
        nome
      );


      informacao.appendChild(
        url
      );



      /*
         Botão eliminar.
      */

      const botaoEliminar =
        document.createElement('button');


      botaoEliminar.type =
        'button';


      botaoEliminar.className =
        'botao-eliminar-atalho';


      botaoEliminar.textContent =
        'Eliminar';


      botaoEliminar.title =
        `Eliminar ${atalho.nome}`;



      botaoEliminar.addEventListener(
        'click',
        function () {

          eliminarAtalho(
            index
          );

        }
      );



      /*
         Montar item.
      */

      item.appendChild(
        informacao
      );


      item.appendChild(
        botaoEliminar
      );


      listaAtalhosConfiguracao.appendChild(
        item
      );

    }
  );

}



/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

renderizarAtalhos();

renderizarAtalhosConfiguracao();
