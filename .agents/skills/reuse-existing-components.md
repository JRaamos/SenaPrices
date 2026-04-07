# Skill: Reutilizar componentes existentes antes de criar novos

Objetivo: impedir duplicacao de componentes, hooks e padroes visuais que ja existem na versao inicial do projeto.

Aplicar sempre que o Figma ou a tarefa mostrar:

- card
- item
- row
- bloco repetido
- secao de dashboard
- formulario
- tabela
- modal

---

## Ordem obrigatória de busca

Antes de criar algo novo, procurar em:

- `src/components`
- `src/hooks`
- `src/services`
- `src/utils`
- `src/context`
- `src/screens`

---

## Regra principal

Se existir algo adaptavel, reutilizar.

Nao criar componente novo apenas porque mudou:

- cor
- espacamento
- radius
- sombra
- fonte
- icone
- texto

---

## O que fazer quando encontrar algo parecido

- adaptar com props simples
- compor com `children`, `left`, `right`, `header`, `footer`
- evitar `variant` string para controlar comportamentos muito diferentes

---

## Quando criar algo novo

So criar novo quando:

- nao existir equivalente utilizavel
- a adaptacao quebrar o componente original
- ficar claro que a nova peca sera realmente distinta e reutilizavel

---

## Checklist final

- Procurei primeiro em `src/components` e `src/screens`?
- Havia um exemplo existente que poderia ser adaptado?
- Evitei criar variacao so por diferenca visual pequena?
- Evitei `variant` string para casos muito diferentes?
