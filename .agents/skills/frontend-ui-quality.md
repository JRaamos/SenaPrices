# Skill: Qualidade de UI com fidelidade ao Figma

## Objetivo

Garantir que a UI final:

- seja fiel ao Figma
- mantenha consistencia com o projeto
- tenha hierarquia visual clara
- evite aparencia generica de IA
- fique precisa em espacamento, alinhamento, proporcao e tipografia

---

## Ordem obrigatoria de decisao

1. Figma
2. componentes existentes
3. padrao visual do projeto
4. melhoria visual controlada, apenas se nao conflitar com os itens acima

Nao pular etapas.

---

## Regra principal

Nunca adivinhar valores quando o Figma existir.

Extrair do Figma, sempre que aplicavel:

- largura e altura
- padding, margin e gap
- border-radius
- font-size
- line-height
- font-weight
- letter-spacing

Se houver conflito entre percepcao visual e Figma, seguir o Figma.

---

## Comportamento esperado

A UI deve:

- respeitar exatamente o layout do Figma
- manter espacamentos consistentes
- manter alinhamentos corretos
- manter proporcoes corretas
- manter hierarquia visual clara
- preservar consistencia com outras telas do projeto

---

## Melhoria controlada

Voce pode ajustar a UI apenas quando:

- nao existir conflito com o Figma
- nao alterar estrutura da tela
- nao exigir componente novo sem necessidade
- nao quebrar padroes do projeto

Melhorias permitidas:

- ajuste fino de espacamento
- ajuste fino de alinhamento
- refinamento de largura e altura
- melhoria de legibilidade visual

Se houver duvida, nao melhorar.

---

## O que evitar

- layout diferente do Figma
- aproximacao sem base
- desalinhamento de 1px ou elementos quase alinhados
- tipografia diferente da especificada
- componente novo quando um existente atende
- cor hardcoded
- padrao generico sem identidade
- mudanca subjetiva por preferencia pessoal

---

## Consistencia visual

- usar ritmo consistente baseado nos espacamentos do projeto e do Figma
- manter elementos semelhantes com medidas semelhantes
- usar SVG quando fizer sentido e sem distorcer proporcao
- evitar misturar padroes de espacamento aleatorios

---

## Reuso obrigatorio

Antes de criar UI nova:

1. buscar componente existente
2. validar se atende o caso
3. adaptar via props
4. criar novo apenas se nao houver alternativa viavel

---

## Resultado esperado

A interface deve parecer intencional, precisa e profissional, sem perder fidelidade ao Figma nem consistencia com a base atual.
