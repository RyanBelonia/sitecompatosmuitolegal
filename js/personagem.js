
/* =========================================================
   SISTEMA DE PATOS
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const SPRITE_SHEET =
    'images/spritesheet.png';


/*
   Escala original que estava funcionando.

   12 x 10 = aproximadamente 120 pixels
   de largura visual.
*/

const ESCALA = 10;


/*
   Velocidade em pixels por segundo.
*/

const VELOCIDADE_MIN = 100;
const VELOCIDADE_MAX = 100;


/*
   Tempo entre frames da caminhada.
*/

const TEMPO_FRAME = 130;


/*
   Quanto o pato pode sair da tela.
*/

const MARGEM_FORA_TELA = 30;



/* =========================================================
   FRAMES
   =========================================================

   ATENÇÃO:

   Estas são EXATAMENTE as coordenadas
   do código antigo que estava funcionando.

   A sprite sheet começa em 0, mas as posições
   que você forneceu foram:

   1:1 → 12:14
   16:1 → 27:14
   etc.

   Portanto, usamos exatamente esses valores.

   ========================================================= */

const frames = {


    /* -----------------------------------------------------
       PARADO
       ----------------------------------------------------- */

    parado: {

        x: 1,
        y: 1,

        width: 12,
        height: 14

    },


    /* -----------------------------------------------------
       ANDANDO 1
       ----------------------------------------------------- */

    andando1: {

        x: 16,
        y: 1,

        width: 12,
        height: 14

    },


    /* -----------------------------------------------------
       ANDANDO 2
       ----------------------------------------------------- */

    andando2: {

        x: 29,
        y: 1,

        width: 12,
        height: 14

    },


    /* -----------------------------------------------------
       ANDANDO 3
       ----------------------------------------------------- */

    andando3: {

        x: 42,
        y: 1,

        width: 12,
        height: 14

    },


    /* -----------------------------------------------------
       ANDANDO 4
       ----------------------------------------------------- */

    andando4: {

        x: 54,
        y: 1,

        width: 13,
        height: 14

    },


    /* -----------------------------------------------------
       AGACHADO
       ----------------------------------------------------- */

    agachado: {

        x: 1,
        y: 16,

        width: 12,
        height: 12

    },


    /* -----------------------------------------------------
       PISCANDO
       ----------------------------------------------------- */

    piscando: {

        x: 1,
        y: 30,

        width: 12,
        height: 11

    }

};



/* =========================================================
   FRAMES DE CAMINHADA
   ========================================================= */

const framesAndando = [

    frames.andando1,
    frames.andando2,
    frames.andando3,
    frames.andando4

];



/* =========================================================
   DIREÇÕES POSSÍVEIS
   ========================================================= */

const direcoes = [

    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },

    { x: -1, y:  0 },
    { x:  1, y:  0 },

    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 }

];



/* =========================================================
   CONTAINER DOS PATOS
   ========================================================= */

const containerPatos =
    document.createElement('div');


containerPatos.id =
    'container-patos';


containerPatos.style.position =
    'fixed';


containerPatos.style.left =
    '0';


containerPatos.style.top =
    '0';


containerPatos.style.width =
    '100vw';


containerPatos.style.height =
    '100vh';


containerPatos.style.pointerEvents =
    'none';


containerPatos.style.zIndex =
    '3';


document.body.appendChild(
    containerPatos
);



/* =========================================================
   CLASSE PATO
   ========================================================= */

class Pato {

    constructor() {

        /* =================================================
           ELEMENTO PRINCIPAL
           ================================================= */

        this.personagem =
            document.createElement('div');


        this.personagem.className =
            'personagem';


        this.personagem.style.position =
            'absolute';


        this.personagem.style.pointerEvents =
            'none';


        /*
           O elemento não tem tamanho fixo.

           A posição será controlada
           diretamente.
        */


        /* =================================================
           SPRITE
           ================================================= */

        this.sprite =
            document.createElement('div');


        this.sprite.className =
            'personagem-sprite';


        this.sprite.style.position =
            'absolute';


        this.sprite.style.backgroundImage =
            `url("${SPRITE_SHEET}")`;


        this.sprite.style.backgroundRepeat =
            'no-repeat';


        /*
           MUITO IMPORTANTE:

           Não usamos background-size.

           A folha permanece nos seus
           68 x 68 pixels originais.

           É exatamente como no código antigo.
        */


        this.sprite.style.imageRendering =
            'pixelated';


        this.sprite.style.transformOrigin =
            'top left';


        this.personagem.appendChild(
            this.sprite
        );


        containerPatos.appendChild(
            this.personagem
        );


        /* =================================================
           ESTADO
           ================================================= */

        this.estado =
            'parado';


        /* =================================================
           POSIÇÃO
           ================================================= */

        this.x =
            Math.random() *
            window.innerWidth;


        this.y =
            Math.random() *
            window.innerHeight;


        /* =================================================
           DIREÇÃO
           ================================================= */

        this.direcaoX =
            1;


        this.direcaoY =
            0;


        /* =================================================
           VELOCIDADE
           ================================================= */

        this.velocidade =
            VELOCIDADE_MIN +
            Math.random() *
            (
                VELOCIDADE_MAX -
                VELOCIDADE_MIN
            );


        /* =================================================
           FRAME
           ================================================= */

        this.frameAtual =
            0;


        /* =================================================
           TEMPORIZADORES
           ================================================= */

        this.proximaAcao =
            performance.now() +
            1000 +
            Math.random() * 3000;


        this.proximoFrame =
            performance.now();


        /* =================================================
           DIREÇÃO VISUAL

           Igual ao código antigo:

           esquerda  = scaleX(1)
           direita   = scaleX(-1)
           ================================================= */

        this.escalaX =
            -1;


        /* =================================================
           PRIMEIRO FRAME
           ================================================= */

        this.mostrarFrame(
            frames.parado
        );


        this.atualizarDirecaoVisual();


        this.atualizarPosicao();


        /*
           Começar com comportamento
           aleatório.
        */

        this.escolherProximaAcao();

    }



    /* =====================================================
       ESCOLHER DIREÇÃO
       ===================================================== */

    escolherDirecao() {

        const direcao =
            direcoes[
                Math.floor(
                    Math.random() *
                    direcoes.length
                )
            ];


        this.direcaoX =
            direcao.x;


        this.direcaoY =
            direcao.y;


        /*
           A direção horizontal determina
           para que lado o pato olha.

           Se estiver andando verticalmente,
           mantém a direção horizontal anterior.
        */

        if (
            this.direcaoX !== 0
        ) {

            this.atualizarDirecaoVisual();

        }

    }



    /* =====================================================
       MOSTRAR FRAME
       ===================================================== */

    mostrarFrame(frame) {

        /*
           EXATAMENTE a mesma lógica
           do código antigo.

           Não redimensionamos a sprite sheet.

           Apenas mudamos o recorte.
        */

        this.sprite.style.backgroundPosition =
            `-${frame.x}px -${frame.y}px`;


        /*
           O tamanho do elemento corresponde
           exatamente ao tamanho do frame.
        */

        this.sprite.style.width =
            `${frame.width}px`;


        this.sprite.style.height =
            `${frame.height}px`;


        /*
           A escala é aplicada aqui.

           Igual ao código antigo.
        */

        this.sprite.style.transform =
            `scaleX(${this.escalaX}) scale(${ESCALA})`;

    }



    /* =====================================================
       DIREÇÃO VISUAL
       ===================================================== */

    atualizarDirecaoVisual() {

        /*
           Mantemos EXATAMENTE a lógica
           que estava funcionando.

           direcaoX < 0 → esquerda → 1
           direcaoX > 0 → direita  → -1
        */

        if (
            this.direcaoX < 0
        ) {

            this.escalaX =
                1;

        }

        else if (
            this.direcaoX > 0
        ) {

            this.escalaX =
                -1;

        }


        /*
           Reaplicar a transformação
           ao frame atual.
        */

        const frame =
            this.obterFrameAtual();


        this.sprite.style.transform =
            `scaleX(${this.escalaX}) scale(${ESCALA})`;

    }



    /* =====================================================
       OBTER FRAME ATUAL
       ===================================================== */

    obterFrameAtual() {

        if (
            this.estado ===
            'andando'
        ) {

            return framesAndando[
                this.frameAtual
            ];

        }


        if (
            this.estado ===
            'agachado'
        ) {

            return frames.agachado;

        }


        if (
            this.estado ===
            'piscando'
        ) {

            return frames.piscando;

        }


        return frames.parado;

    }



    /* =====================================================
       MUDAR ESTADO
       ===================================================== */

    mudarEstado(
        novoEstado,
        duracao
    ) {

        this.estado =
            novoEstado;


        this.frameAtual =
            0;


        /* -------------------------------------------------
           ANDANDO
           ------------------------------------------------- */

        if (
            novoEstado ===
            'andando'
        ) {

            this.velocidade =
                VELOCIDADE_MIN +
                Math.random() *
                (
                    VELOCIDADE_MAX -
                    VELOCIDADE_MIN
                );


            this.escolherDirecao();


            this.proximoFrame =
                performance.now();


            this.mostrarFrame(
                framesAndando[0]
            );

        }


        /* -------------------------------------------------
           PARADO
           ------------------------------------------------- */

        else if (
            novoEstado ===
            'parado'
        ) {

            this.mostrarFrame(
                frames.parado
            );

        }


        /* -------------------------------------------------
           AGACHADO
           ------------------------------------------------- */

        else if (
            novoEstado ===
            'agachado'
        ) {

            this.mostrarFrame(
                frames.agachado
            );

        }


        /* -------------------------------------------------
           PISCANDO
           ------------------------------------------------- */

        else if (
            novoEstado ===
            'piscando'
        ) {

            this.mostrarFrame(
                frames.piscando
            );

        }


        /*
           Duração do estado.
        */

        this.proximaAcao =
            performance.now() +
            duracao;

    }



    /* =====================================================
       ANIMAÇÃO
       ===================================================== */

    atualizarAnimacaoAndando(
        agora
    ) {

        if (
            agora >=
            this.proximoFrame
        ) {

            this.mostrarFrame(

                framesAndando[
                    this.frameAtual
                ]

            );


            this.frameAtual++;


            if (
                this.frameAtual >=
                framesAndando.length
            ) {

                this.frameAtual =
                    0;

            }


            this.proximoFrame =
                agora +
                TEMPO_FRAME;

        }

    }



    /* =====================================================
       MOVIMENTO 2D
       ===================================================== */

    atualizarMovimento(
        delta
    ) {

        if (
            this.estado !==
            'andando'
        ) {

            return;

        }


        /*
           Comprimento do vetor.

           Evita que diagonais sejam
           mais rápidas.
        */

        const comprimento =
            Math.sqrt(

                this.direcaoX *
                this.direcaoX +

                this.direcaoY *
                this.direcaoY

            );


        if (
            comprimento === 0
        ) {

            return;

        }


        const movimentoX =

            (
                this.direcaoX /
                comprimento
            ) *
            this.velocidade *
            delta;


        const movimentoY =

            (
                this.direcaoY /
                comprimento
            ) *
            this.velocidade *
            delta;


        this.x +=
            movimentoX;


        this.y +=
            movimentoY;



        /* =================================================
           LIMITES
           ================================================= */

        const minimoX =
            -MARGEM_FORA_TELA;


        const maximoX =
            window.innerWidth +
            MARGEM_FORA_TELA;


        const minimoY =
            -MARGEM_FORA_TELA;


        const maximoY =
            window.innerHeight +
            MARGEM_FORA_TELA;



        /* -------------------------------------------------
           ESQUERDA
           ------------------------------------------------- */

        if (
            this.x <=
            minimoX
        ) {

            this.x =
                minimoX;


            this.direcaoX =
                1;


            this.atualizarDirecaoVisual();

        }



        /* -------------------------------------------------
           DIREITA
           ------------------------------------------------- */

        if (
            this.x >=
            maximoX
        ) {

            this.x =
                maximoX;


            this.direcaoX =
                -1;


            this.atualizarDirecaoVisual();

        }



        /* -------------------------------------------------
           TOPO
           ------------------------------------------------- */

        if (
            this.y <=
            minimoY
        ) {

            this.y =
                minimoY;


            this.direcaoY =
                1;

        }



        /* -------------------------------------------------
           FUNDO
           ------------------------------------------------- */

        if (
            this.y >=
            maximoY
        ) {

            this.y =
                maximoY;


            this.direcaoY =
                -1;

        }

    }



    /* =====================================================
       POSIÇÃO
       ===================================================== */

    atualizarPosicao() {

        this.personagem.style.left =
            `${this.x}px`;


        this.personagem.style.top =
            `${this.y}px`;

    }



    /* =====================================================
       PRÓXIMA AÇÃO
       ===================================================== */

    escolherProximaAcao() {

        const aleatorio =
            Math.random();


        /*
           65% andar
        */

        if (
            aleatorio < 0.65
        ) {

            this.mudarEstado(

                'andando',

                1500 +
                Math.random() *
                4000

            );

        }


        /*
           20% parado
        */

        else if (
            aleatorio < 0.85
        ) {

            this.mudarEstado(

                'parado',

                800 +
                Math.random() *
                2500

            );

        }


        /*
           8% agachado
        */

        else if (
            aleatorio < 0.93
        ) {

            this.mudarEstado(

                'agachado',

                500 +
                Math.random() *
                1000

            );

        }


        /*
           7% piscando
        */

        else {

            this.mudarEstado(

                'piscando',

                150 +
                Math.random() *
                250

            );

        }

    }



    /* =====================================================
       ATUALIZAR PATO
       ===================================================== */

    atualizar(
        agora,
        delta
    ) {

        /*
           Movimento.
        */

        this.atualizarMovimento(
            delta
        );


        /*
           Animação.
        */

        if (
            this.estado ===
            'andando'
        ) {

            this.atualizarAnimacaoAndando(
                agora
            );

        }


        /*
           Próxima ação.
        */

        if (
            agora >=
            this.proximaAcao
        ) {

            this.escolherProximaAcao();

        }


        /*
           Posição.
        */

        this.atualizarPosicao();

    }



    /* =====================================================
       DESTRUIR
       ===================================================== */

    destruir() {

        this.personagem.remove();

    }

}



/* =========================================================
   LISTA DE PATOS
   ========================================================= */

let listaPatos = [];



/* =========================================================
   CRIAR PATO
   ========================================================= */

function criarPato() {

    const pato =
        new Pato();


    listaPatos.push(
        pato
    );

}



/* =========================================================
   REMOVER PATO
   ========================================================= */

function removerPato() {

    if (
        listaPatos.length ===
        0
    ) {

        return;

    }


    const pato =
        listaPatos.pop();


    pato.destruir();

}



/* =========================================================
   ALTERAR QUANTIDADE DE PATOS
   ========================================================= */

function atualizarQuantidadePatos(
    quantidade
) {

    quantidade =
        Number(
            quantidade
        );


    /*
       Limite atual:

       0 → 10 patos
    */

    quantidade =
        Math.max(
            0,
            Math.min(
                10,
                quantidade
            )
        );


    /*
       Criar.
    */

    while (
        listaPatos.length <
        quantidade
    ) {

        criarPato();

    }


    /*
       Remover.
    */

    while (
        listaPatos.length >
        quantidade
    ) {

        removerPato();

    }

}



/* =========================================================
   QUANTIDADE INICIAL
   ========================================================= */

const quantidadeSalva =
    localStorage.getItem(
        'homepage_quantidade_patos'
    );


const quantidadeInicial =
    quantidadeSalva === null
        ? 1
        : Number(
            quantidadeSalva
        );


atualizarQuantidadePatos(
    quantidadeInicial
);



/* =========================================================
   LOOP PRINCIPAL
   ========================================================= */

let ultimoTempo =
    performance.now();


function loopPatos(
    agora
) {

    /*
       Delta em segundos.
    */

    const delta =
        Math.min(
            (
                agora -
                ultimoTempo
            ) / 1000,

            0.1
        );


    ultimoTempo =
        agora;


    /*
       Atualizar todos os patos.
    */

    listaPatos.forEach(
        pato => {

            pato.atualizar(
                agora,
                delta
            );

        }
    );


    requestAnimationFrame(
        loopPatos
    );

}


requestAnimationFrame(
    loopPatos
);

