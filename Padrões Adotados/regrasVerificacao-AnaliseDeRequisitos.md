# Padrões Adotados

## Objetivo do Documento

Este documento define como os requisitos do sistema **Organizador de Rotinas** serão descritos, organizados e analisados, com base em regras simples e nos princípios apresentados no livro _Engenharia de Software_, de Rogério Magela.


## Regras de Verificação e Análise de Requisitos

## 1. Nomenclatura dos Requisitos

Para facilitar a identificação e categorização, os requisitos do sistema serão nomeados da seguinte forma:

- **RF** – Requisito Funcional  
  _Ações que o sistema deve executar._  
  **Exemplo:** `RF01 - O sistema deve permitir o cadastro de atividades.`

- **RNF** – Requisito Não Funcional  
  _Características desejadas sobre o comportamento do sistema._  
  **Exemplo:** `RNF01 - O sistema deve funcionar em celulares e computadores.`

---

## 2. Organização do Documento de Requisitos

O documento será estruturado nas seguintes seções:

- **Introdução** – Breve explicação do sistema e seus objetivos.
- **Requisitos Funcionais (RF)** – Lista das funcionalidades esperadas.
- **Requisitos Não Funcionais (RNF)** – Requisitos de desempenho, interface, compatibilidade, etc.
- **Regras de Negócio (RB)** – Regras que regem a lógica interna do sistema.
- **Critérios de Aceitação** – Condições que determinam se um requisito foi atendido.

---

## 3. Regras para Especificação dos Requisitos

### Regra 1 – Clareza

Os requisitos devem ser escritos de forma clara, sem ambiguidade ou termos subjetivos.

- **Errado:** O sistema deve ser bonito.
- **Certo:** O sistema deve usar as cores da identidade visual da UNILAVRAS.

---

### Regra 2 – Verificável

Todo requisito deve ser testável, ou seja, deve haver uma forma objetiva de confirmar sua implementação.

- **Errado:** O sistema deve ser simples.
- **Certo:** O sistema deve permitir que o usuário crie uma rotina em até 5 minutos.

---

### Regra 3 – Sem Contradições

Os requisitos não podem se contradizer entre si.

- **Exemplo de conflito:**  
  `RF02 - A rotina da semana é fixa.`  
  `RF03 - O usuário pode editar a rotina livremente.`

Nesse caso, é necessário revisar e escolher uma abordagem clara e consistente.

## Regras de Commit

- Usar modo imperativo ("Adiciona feature" não "Adicionando feature" ou "Adicionada feature")
- Primeira linha deve ter no máximo 72 caracteres
- Considere descrever com detalhes no corpo do commit
- Considere usar um emoji no início da mensagem de commit

Emoji | Code | Commit Type
------------ | ------------- | -------------
:tada: | `:tada:` | commit inicial
:art: | `:art:` | quando melhorar a estrutura/formato do código
:recycle: | `:recycle:` | quando melhorar ou refatorar um código já existente
:memo: | `:memo:` | quando escrever alguma documentação
:bug: | `:bug:` | quando corrigir um bug
:test_tube: | `:test_tube:` | quando adicionar testes
:sparkles: | `:sparkles:` | nova funcionalidade
:arrow_up_down: | `:arrow_up_down:` | ao adicionar ou remover dependências.
:twisted_rightwards_arrows: | `:twisted_rightwards_arrows:` | merge em branchs
:rewind: | `:rewind:` | ao reverter versões
:see_no_evil: | `:see_no_evil:` | solução paliativa avançado

## Uso de Branches

- Para cada nova funcionalidade criada deve ser criada uma nova branch que indica o que está sendo implementado
  **Exemplo:** `development/feature/RNF01/`


## Definições de pastas

Pasta | Conteúdo
------------ | -------------
BD | Bancos de dados utilizados
Padrões Adotados | Documentos relacionados aos padrões do projeto
Requisitos | Documentos relacionados aos requisitos
sistema | Implementação do projeto

## Práticas de codificação


- Identar o código: 4 espaços para cada nível
- Colocar espaços dos dois lados dos operadores aritméticos
- Nomear variáveis e funções no modelo camelCase
- Nomear funçoes utilizando verbos no infinitivo
- Nomear variáveis utilizando subsantivos
- Criar variáveis no início do arquivo

## Licença

Este documento faz parte do projeto **Organizador de Rotinas - UNILAVRAS** e pode ser utilizado por fins educacionais e acadêmicos.
