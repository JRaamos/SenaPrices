# Skill: Render declarativo e props inline

## Objetivo

Manter screens e componentes declarativos, com um unico fluxo visual e sem indirecao desnecessaria para renderizacao ou props.

---

## Regra principal

- preferir um unico `return` principal
- concentrar condicoes dentro do JSX
- nao criar variaveis intermediarias apenas para decidir renderizacao ou props
- usar defaults no parametro da funcao quando necessario

---

## Evitar

```js
if (loading) {
  return <Loading />
}

if (!data) {
  return <EmptyState />
}

const resolvedActions = actions || defaultActions
const resolvedSearchProps = searchProps || {}
const hasControlledSearch = typeof resolvedSearchProps.onChange === "function"
```

---

## Preferir

```js
return (
  <Screen>
    {loading ? <Loading /> : <Content />}
  </Screen>
)
```

```js
return (
  <Screen>
    {!data ? <EmptyState /> : <Content />}
  </Screen>
)
```

```js
{title ? <Title>{title}</Title> : null}
```

```js
{loading ? <Skeleton /> : <Content data={data} />}
```

---

## Pode usar

- ternario
- `&&`
- `? : null`
- props passadas diretamente
- defaults no parametro da funcao

---

## Nao fazer

- varios `if (...) return ...` para estados da mesma tela
- `if/else` fora do JSX para controlar layout
- `resolvedX`, `defaultX`, `computedX` ou `hasX` apenas para simplificar props
- `prop || {}` apenas para criar objeto resolvido sem necessidade

Essa regra vale para renderizacao da screen e tambem para componentes React do projeto.

---

## Exemplo desejado

### Nao queremos

```js
if (loading) {
  return (
    <LoadCenter>
      <Load />
    </LoadCenter>
  )
}

if (!detail) {
  return (
    <LoadCenter>
      <Load />
    </LoadCenter>
  )
}
```

### Queremos

```js
return (
  <PageRoot>
    {loading ? (
      <LoadCenter>
        <Load />
      </LoadCenter>
    ) : !detail ? (
      <LoadCenter>
        <Load />
      </LoadCenter>
    ) : (
      <Content />
    )}
  </PageRoot>
)
```

---

## Checklist

- existe um unico fluxo visual?
- as condicoes ficaram no JSX?
- existe `resolvedX` sem necessidade real?
- os defaults ficaram no parametro quando apropriado?
