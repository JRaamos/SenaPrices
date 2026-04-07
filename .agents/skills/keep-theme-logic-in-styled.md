# Skill: Manter a logica de theme dentro do styled

Objetivo: concentrar a decisao visual no sistema de estilo do projeto, evitando espalhar theme no JSX.

Aplicar sempre que houver:

- variacao de cor
- token visual
- diferenca de estado visual
- condicao de estilo
- nova screen
- novo componente com estilo proprio

---

## Regra principal

Nao decidir estilo em `index.js` ou `controller.js`.

Evitar:

- cor hardcoded
- `style={{ ... }}`
- resolver token visual no JSX
- criar funcoes auxiliares so para decidir estilo

---

## Forma correta

- deixar a logica visual no `styled.js`
- usar `ui/styled` e `ui/theme`
- controlar variacoes por props semanticas
- novas screens e componentes devem usar o sistema de theme do projeto desde o inicio
- quando houver estilo proprio, criar `styled.js` separado em vez de manter estilo relevante no `index.js`

Exemplos de props boas:

- `primary`
- `active`
- `muted`
- `dense`
- `disabled`

---

## Checklist final

- Alguma cor foi decidida no JSX?
- Alguma variacao visual saiu do `styled.js`?
- Houve uso de `style={{ ... }}` sem necessidade?
- O componente segue o padrao do tema do projeto?
- A screen ou componente novo usou `ui/theme` ou `ui/styled` como base?
- O estilo proprio ficou em `styled.js` separado?
