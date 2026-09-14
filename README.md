# Grifo da Bel

Loja de livros clássicos em domínio público. O projeto simula a finalização
de uma compra: você confere o carrinho, preenche os dados do cartão e recebe
a confirmação ou a recusa.

**Autora:** Maria Izabel de Lima

---

## O que a aplicação faz

São quatro telas:

- **Carrinho** (`/`) - lista os cinco livros com quantidade, subtotal e total
- **Pagamento** (`/pagamento`) - formulário com titular, cartão, validade e CVV
- **Sucesso** (`/sucesso`) - compra aprovada, com o valor e o final do cartão
- **Falha** (`/falha`) - compra recusada

O pagamento é simulado no navegador. Não existe back-end, não existe cobrança
real e nenhum dado é enviado para lugar nenhum.

---

## Como rodar

Este repositório guarda o código-fonte, não o site pronto. Um projeto React
precisa ser montado antes de virar site, e quem faz isso é o Vite, que roda
em cima do Node.js. Por isso você precisa ter o **Node.js instalado, versão
20 ou mais nova**, para rodar na sua máquina.

Baixe o projeto:

```bash
git clone https://github.com/mariaizabeldelima0-arch/grifo-da-bel.git
cd grifo-da-bel
```

Instale o que o projeto precisa:

```bash
npm install
```

Rode:

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador.

Uma coisa importante: **abra pelo endereço, não clicando no arquivo**. Se você
abrir o `index.html` direto, a página fica em branco. O React precisa do
servidor rodando.

---

## Como testar

Para a compra dar certo, use qualquer cartão com 16 dígitos que não sejam
todos iguais:

```
Titular:   Maria Izabel
Cartão:    4111 1111 1111 1111
Validade:  12/28
CVV:       123
```

Para cair na tela de falha, use os 16 dígitos iguais:

```
Cartão:    1111 1111 1111 1111
```

Pode digitar o cartão com espaços ou hifens, tanto faz. A aplicação limpa
antes de validar.

---

## O que usei

- **React** com **Vite**
- **React Router** para as quatro telas
- **React Hook Form** e **Zod** no formulário
- **CSS puro**, sem biblioteca de componentes

---

## Como o projeto está organizado

```
public/
  produtos.json        os cinco livros da loja
src/
  assets/styles/       as cores e fontes do site
  components/          pedaços reutilizáveis de tela
  hooks/               a lógica da compra
  pages/               as quatro telas
  utils/               funções de apoio
```

---

## Decisões que eu tomei

**Livros em domínio público.** Escolhi clássicos cujos autores morreram há
mais de 70 anos. Assim não tem problema de direito autoral em nenhum lugar do
projeto. Cheguei nessa decisão conversando com o Claude: eu tinha pensado em
outro tema primeiro, e ele me mostrou a diferença entre usar nomes de marcas
e usar imagens protegidas. A livraria de clássicos resolveu os dois de uma vez.

**Capas feitas em CSS, sem imagem nenhuma.** Cada capa é um retângulo com o
título, o autor e uma faixa escura imitando a lombada. A cor vem do arquivo
de produtos. Fiz assim por três motivos: não dependo de imagem de ninguém,
o site carrega mais rápido e foi um jeito de praticar CSS.

**Os produtos vêm de um arquivo, não do código.** O `produtos.json` fica na
pasta `public` e é carregado com `fetch`. Assim eu consigo mostrar o
carregamento e o tratamento de erro funcionando, mas sem depender de nenhum
serviço externo que possa estar fora do ar.

**A lógica da compra ficou separada da tela.** Criei o hook `usePagamento`
com tudo que decide se a compra passa ou não. A tela só chama ele. Se a regra
mudar um dia, eu mexo em um arquivo só.

**O total viaja junto com a navegação.** O edital não permitia usar Context
API, que é o recurso do React para compartilhar informação entre telas. Então
o valor vai de uma tela para outra pelo próprio React Router, junto com a
navegação.

**Só os quatro últimos dígitos do cartão saem do hook.** O número completo
nunca chega nas telas de resultado. É o mesmo que os sites de verdade fazem.

**Validei só o formato do cartão**, que foi o que o edital pediu. Não conferi
bandeira, algoritmo de Luhn nem se a data já venceu.

**As cores são todas conferidas.** Rodei o Lighthouse e conferi o contraste de
cada combinação de texto e fundo. Nota 100 em acessibilidade.

---

## Problemas que eu tive e como resolvi

**Página em branco no começo.** Conferi os arquivos e estava tudo certo. Abri
o console e vi um erro de CORS apontando para o `main.jsx`. Descobri que eu
estava abrindo o arquivo direto do computador em vez de usar o endereço do
servidor. Passei a abrir pelo `localhost:5173` e funcionou.

**O erro de carregamento mostrava mensagem técnica.** Testei apontando o
`fetch` para um arquivo que não existe, esperando ver a minha mensagem, mas
apareceu um erro em inglês sobre JSON inválido. Descobri que o Vite não
devolve 404: ele responde a própria página. Por isso minha verificação não
pegava, e o erro só aparecia depois. Passei a mostrar uma mensagem fixa em
português e deixei o detalhe técnico no console.

**A tela de sucesso mostrava R$ 0,00.** Achei isso testando o layout no
celular. Conferi os três arquivos do caminho e todos estavam corretos. Refiz
o teste saindo do carrinho e o valor apareceu certo, o que mostrou que o
problema era o caminho e não o código: o valor viaja com a navegação e some
quando a pessoa entra direto na tela. Isso acontecia no botão "Tentar
novamente" da tela de falha. Corrigi passando o total adiante nesse botão e
avisando na tela quando não há valor.

**Contraste reprovado em uma capa.** O Lighthouse deu 91 e apontou a capa do
Morro dos Ventos Uivantes. O contraste estava em 4,31 e o mínimo é 4,5.
Tentei escurecer o fundo, mas piorou, porque o texto também era escuro e os
dois ficaram parecidos demais. Escureci o texto e subiu para 5,23. Rodei de
novo e deu 100.

---

## Sobre o uso de IA

Usei IA durante todo o projeto, em conversa contínua, para:

- montar o planejamento e organizar as tarefas por dia
- revisar código e apontar erros
- explicar conceitos que eu ainda estava repondo das aulas
- indicar boas práticas

O que eu procurei fazer foi conferir cada parte com o Claude antes de seguir
em frente, vendo funcionar na tela e entendendo o que o código fazia. Os quatro
problemas da seção acima apareceram assim, testando na mão, e dois deles eram
coisas que a IA tinha deixado passar.

---

## Para fechar

Esse foi meu primeiro projeto juntando tudo que vi no módulo: componentes,
estado, formulário com validação, rotas e um hook próprio. Saiu bem diferente
do que eu imaginava no começo, e o que mais me ensinou não foi escrever o
código, foi descobrir por que ele não funcionava.

Obrigada pela atenção e pela leitura.

---

## Links

- **Repositório:** https://github.com/mariaizabeldelima0-arch/grifo-da-bel
- **Trello:** https://trello.com/b/3qGDa0OA
- **Vídeo:** link do Drive
