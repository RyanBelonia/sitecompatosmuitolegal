# 🦆 Custom Browser Homepage

Uma homepage minimalista e personalizável para utilizar como **página inicial do seu navegador**.

O projeto transforma uma página HTML simples em um ambiente pessoal para começar a navegar, com pesquisa rápida, atalhos personalizados e pequenos personagens animados andando pela tela.

---

## ✨ Funcionalidades

### 🔎 Pesquisa rápida

A homepage possui uma barra de pesquisa central que permite pesquisar diretamente no Google.

Basta escrever o que deseja procurar e pressionar **Enter**.

---

### 🔗 Atalhos personalizados

É possível adicionar os seus próprios sites diretamente pela homepage.

Cada atalho possui:

* Nome personalizado
* URL
* Favicon automático
* Acesso rápido com um clique
* Armazenamento local

Os atalhos ficam guardados no navegador através do `localStorage`, portanto permanecem salvos mesmo depois de fechar e abrir o navegador novamente.

---

### ⚙️ Configurações

A homepage possui um painel de configurações acessível através do botão de engrenagem.

Atualmente é possível configurar:

* Quantidade de personagens na página
* Gerenciamento dos atalhos
* Remoção de atalhos existentes

---

### 🦆 Personagens animados

Pequenos personagens podem andar pela página de forma independente.

Eles possuem:

* Movimento em 2D
* Movimento diagonal
* Mudança de direção
* Animação de caminhada
* Animação parado
* Animação agachado
* Animação piscando
* Movimento parcialmente para fora da tela
* Direção visual esquerda/direita
* Comportamento aleatório

A quantidade de personagens pode ser configurada nas opções.

---

### ✨ Efeito de partículas

O fundo possui um sistema de partículas criado com `<canvas>`.

As partículas possuem:

* Movimento independente
* Diferentes tamanhos
* Diferentes níveis de transparência
* Brilho
* Cores em tons de roxo

O efeito é executado diretamente no navegador utilizando JavaScript.

---

### 🕐 Relógio

Um relógio digital é exibido no canto superior da página.

O horário é atualizado automaticamente utilizando o horário local do dispositivo.

---

## 🛠️ Tecnologias

O projeto foi desenvolvido utilizando tecnologias web padrão:

* **HTML5**
* **CSS3**
* **JavaScript**
* **Canvas API**
* **LocalStorage**
* **Google Favicon Service**

Não é necessário utilizar um servidor backend para as funcionalidades atuais.

---

## 📁 Estrutura do projeto

```text
Custom-Browser-Homepage/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── atalhos.js
│   └── personagem.js
│
└── assets/
    └── ...
```

### `index.html`

Responsável pela estrutura principal da homepage.

Contém:

* Barra de pesquisa
* Relógio
* Botão de configurações
* Área dos atalhos
* Painel de configurações
* Canvas das partículas

---

### `css/style.css`

Responsável pela aparência da página.

Controla:

* Layout
* Cores
* Tipografia
* Pesquisa
* Atalhos
* Configurações
* Animações
* Personagens

---

### `js/main.js`

Controla os elementos gerais da homepage, incluindo funcionalidades da interface e configurações.

---

### `js/atalhos.js`

Controla o sistema de atalhos.

Responsável por:

* Adicionar sites
* Carregar sites salvos
* Guardar sites no `localStorage`
* Criar os elementos dos atalhos
* Obter favicons
* Eliminar atalhos
* Atualizar a interface

---

### `js/personagem.js`

Controla os personagens animados.

Responsável por:

* Movimento
* Direção
* Animações
* Sprite sheet
* Comportamento aleatório
* Quantidade de personagens
* Posicionamento na tela

---

## 💾 Armazenamento

O projeto utiliza o armazenamento local do navegador:

```javascript
localStorage
```

Os atalhos são armazenados utilizando a chave:

```text
homepage_atalhos
```

Isso significa que cada utilizador possui os seus próprios atalhos no seu navegador.

Não é necessário criar uma conta para utilizar essa funcionalidade.

---

## 🚀 Como utilizar

### Opção 1 — Abrir diretamente

Faça o download ou clone o projeto e abra:

```text
index.html
```

em um navegador.

---

### Opção 2 — Hospedar no GitHub Pages

O projeto pode ser hospedado gratuitamente utilizando o **GitHub Pages**.

Depois de publicado, será possível acessar a homepage através de um endereço semelhante a:

```text
https://seu-utilizador.github.io/nome-do-projeto/
```

Essa URL pode então ser utilizada como página inicial do navegador.

---

## 🌐 Definir como homepage

Depois de hospedar o projeto, copie a URL gerada pelo GitHub Pages.

Nas configurações do navegador, procure pela opção de:

```text
Página inicial
```

ou:

```text
Homepage
```

e coloque a URL do projeto.

Assim, sempre que abrir uma nova sessão ou utilizar o botão de página inicial, sua homepage personalizada poderá ser carregada.

---

## 🎨 Personalização

O projeto foi desenvolvido para ser facilmente modificado.

É possível alterar:

* Cores
* Fonte
* Fundo
* Tamanho da barra de pesquisa
* Posição dos elementos
* Quantidade máxima de atalhos
* Animações
* Personagens
* Sprite sheets
* Partículas
* Interface das configurações

---

## 🦆 Sprite Sheet

Os personagens utilizam uma sprite sheet para suas animações.

Os frames são definidos diretamente no JavaScript através de coordenadas da folha.

Isso permite utilizar sprites que não estejam perfeitamente organizados em uma grade.

Exemplo:

```javascript
const frames = {

    parado: {
        x: 1,
        y: 1,
        width: 12,
        height: 14
    },

    andando1: {
        x: 16,
        y: 1,
        width: 12,
        height: 14
    }

};
```

Dessa forma, diferentes personagens e animações podem ser adicionados sem precisar dividir fisicamente a sprite sheet em vários arquivos.

---

## 🔒 Privacidade

O projeto foi pensado para funcionar de forma simples e local.

Os atalhos personalizados são armazenados no `localStorage` do navegador.

O projeto não precisa de:

* Cadastro
* Conta
* Banco de dados
* Servidor próprio
* Backend

A pesquisa é enviada diretamente ao mecanismo de pesquisa configurado no formulário.

---

## 📱 Compatibilidade

Por utilizar HTML, CSS e JavaScript padrão, o projeto pode funcionar em navegadores modernos como:

* Firefox
* Google Chrome
* Microsoft Edge
* Brave
* Opera
* Outros navegadores baseados em Chromium

A experiência pode variar dependendo do navegador e das configurações de privacidade.

---

## 🗺️ Roadmap

Algumas funcionalidades que podem ser adicionadas futuramente:

* [ ] Escolha de diferentes personagens
* [ ] Sistema de temas
* [ ] Fundo personalizado
* [ ] Mais mecanismos de pesquisa
* [ ] Arrastar e reorganizar atalhos
* [ ] Mais opções de personalização
* [ ] Importar/exportar configurações
* [ ] Widgets
* [ ] Previsão do tempo
* [ ] Calendário
* [ ] Personalização do relógio
* [ ] Mais animações dos personagens
* [ ] Suporte para diferentes sprite sheets
* [ ] Sistema de plugins/extensões
* [ ] Página de configurações mais completa

---

## 🤝 Contribuição

Contribuições são bem-vindas.

Se quiser melhorar o projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua alteração.
3. Faça as alterações.
4. Teste no navegador.
5. Abra um Pull Request.

---

## 📜 Licença

Este projeto pode ser distribuído sob a licença definida no arquivo:

```text
LICENSE
```

Caso nenhuma licença seja definida, todos os direitos permanecem com o autor do projeto.

---

## 💡 Sobre o projeto

A ideia deste projeto é criar uma homepage simples, bonita e personalizável para substituir a página inicial tradicional do navegador.

Em vez de uma página cheia de conteúdo, anúncios e informações que o utilizador não escolheu, a proposta é oferecer um espaço pessoal com:

**pesquisa + atalhos + personalização + pequenos personagens animados.**

O objetivo é que cada utilizador possa transformar a homepage em algo próprio e adaptar a experiência às suas preferências.

```
```
