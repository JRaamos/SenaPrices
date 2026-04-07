# Skill: Manter logica de render e props inline

Objetivo: evitar indirecao desnecessaria em componentes React do projeto.

Aplicar sempre que surgir vontade de criar:

- `defaultX`
- `resolvedX`
- `hasX`
- `computedX`

---

## Regra principal

Nao criar variaveis intermediarias apenas para decidir renderizacao ou props.

Evitar:

```javascript
const resolvedActions = actions || defaultActions
const resolvedSearchProps = searchProps || {}
const hasControlledSearch = typeof resolvedSearchProps.onChange === 'function'
```

---

## Forma correta

- deixar condicoes inline no JSX
- passar props diretamente
- usar defaults no parametro da funcao quando necessario

---

## Checklist final

- Existe `resolvedX` no componente?
- Existe `prop || {}` apenas para resolver props?
- As condicoes ficaram inline no JSX?
- Os defaults ficaram no parametro da funcao quando necessario?
