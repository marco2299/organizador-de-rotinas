# Regras de Verificação e Análise de Requisitos

## Objetivo do Documento

Este documento define como os requisitos do sistema **Organizador de Rotinas** serão descritos, organizados e analisados, com base em regras simples e nos princípios apresentados no livro _Engenharia de Software_, de Rogério Magela.

---

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

---

## Licença

Este documento faz parte do projeto **Organizador de Rotinas - UNILAVRAS** e pode ser utilizado por fins educacionais e acadêmicos.
