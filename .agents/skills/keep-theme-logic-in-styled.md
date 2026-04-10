# Skill: Cores do theme devem ser genéricas e usadas direto no styled

Objetivo: garantir reaproveitamento de cores, evitar tokens específicos por tela/fluxo e impedir lógica de cor fora do `styled`.

---

## Regra principal

* ✅ As cores devem vir do theme
* ✅ As cores devem ser usadas diretamente no `styled`
* ❌ Não usar `useTheme()` para resolver cor no componente
* ❌ Não criar variáveis auxiliares como `defaultBaseColor`, `defaultHighlightColor`
* ❌ Não passar `className` e `containerClassName` como padrão de styling
* ❌ Não criar grupos de cores por tela ou fluxo, como `dashboardHome`, `auth`, `checkout`, etc.

---

## Forma correta

As cores devem ser aplicadas diretamente no `styled`.

Exemplo correto:

```javascript
export const CardWrapper = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;
  border: 1px solid ${p => p.theme.palette.colors.border};
  border-radius: 11px;
  background: ${p => p.theme.palette.colors.white};
`
```

---

## Exemplo proibido

```javascript
const theme = useTheme()

const defaultBaseColor = theme?.palette?.colors?.whitegrey || theme?.palette?.colors?.backgroundgrey
const defaultHighlightColor = theme?.palette?.colors?.backgroundgrey || theme?.palette?.colors?.white

<SkeletonTheme
  baseColor={baseColor || defaultBaseColor}
  highlightColor={defaultHighlightColor}
  borderRadius={borderRadius}
>
  <StyledSkeleton
    className={className}
    containerClassName={containerClassName}
    count={count}
    circle={circle}
    height={height}
    inline={inline}
    width={width}
    {...props}
  />
</SkeletonTheme>
```

Esse padrão não deve ser usado.

Motivos:

* espalha lógica de cor no componente
* dificulta reaproveitamento
* aumenta acoplamento com props de estilo
* foge do padrão do projeto

---

## Estrutura correta do theme

O arquivo `ui/theme-color.js` deve conter nomes genéricos e reaproveitáveis.

✅ Correto:

```javascript
    primary: {
      main: '#002B45',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
    white: {
      main: '#ffffff',
      contrastText: '#002B45',
    },
    error: {
      main: '#dd4952',
      contrastText: '#002B45',

    },
    warning: {
      main: '#ffa726',
      contrastText: '#002B45',

    },
    info: {
      main: '#a4a4a4',
      contrastText: '#fff',
    },
    blue: {
      main: '#013CA6',
      contrastText: '#fff',
    },
```

❌ Proibido criar grupos por tela/fluxo:

```javascript
dashboardHome: {
  background: '#020618',
  surface: '#1D293D',
  text: '#FFFFFF',
}
```

```javascript
auth: {
  shell: '#F5F3EA',
  text: '#2F1D19',
  button: '#6D6A4E',
}
```

---

## Regra de criação de novas cores

Antes de criar uma nova cor no theme:

* verificar se a cor já existe no projeto
* verificar se existe uma cor equivalente já nomeada de forma genérica
* reutilizar a cor existente sempre que possível

❌ Não criar token novo só porque a tela é nova
❌ Não nomear token pela tela, fluxo ou feature
✅ Nomear pela função visual genérica da cor

---

## Regra de styling

* ✅ Cor sempre no `styled`
* ✅ Buscar cor em `p.theme.palette.colors.*` ou tokens globais equivalentes
* ❌ Não resolver fallback de cor no componente com `||`
* ❌ Não usar `className` e `containerClassName` para controlar estilo
* ❌ Não criar props só para trocar cor se a cor puder ser fixa

---

## Checklist final

Antes de finalizar:

* A cor está vindo do theme? ✅
* A cor está sendo usada direto no `styled`? ✅
* Existe `useTheme()` só para resolver cor? ❌
* Existe variável auxiliar de cor no componente? ❌
* Existe `className` ou `containerClassName` para styling? ❌
* Foi criado grupo de cor por tela/fluxo? ❌
* A cor nova realmente não existia antes no projeto? ✅

---

## Lógica de theme deve ficar no styled

Objetivo: concentrar a decisão visual no sistema de estilo do projeto, evitando espalhar theme no JSX.

---

### Regra principal

Não decidir estilo em `index.js` ou `controller.js`.

Evitar:

- cor hardcoded
- `style={{ ... }}`
- resolver token visual no JSX
- criar funções auxiliares só para decidir estilo

---

### Forma correta

- deixar a lógica visual no `styled.js`
- usar `ui/styled` e `ui/theme`
- controlar variações por props semânticas
- novas screens e componentes devem usar o sistema de theme desde o início
- quando houver estilo próprio, criar `styled.js` separado

---

### Exemplos de props semânticas

- `primary`
- `active`
- `muted`
- `dense`
- `disabled`

---

### Exemplos práticos

#### ❌ Errado (decidindo estilo no JSX)

```javascript
const color = isActive ? theme.palette.colors.primary : theme.palette.colors.gray

return <Text style={{ color }}>Label</Text>
```

#### ✅ Correto (decisão no styled)

```javascript
export const Label = styled.span`
  color: ${p => p.active 
    ? p.theme.palette.colors.primary 
    : p.theme.palette.colors.gray};
`
```

Uso:

```javascript
<Label active={isActive}>Label</Label>
```

---

### Checklist adicional

- Alguma cor foi decidida no JSX? ❌
- Alguma variação visual saiu do `styled.js`? ❌
- Houve uso de `style={{ ... }}` sem necessidade? ❌
- O componente segue o padrão do tema do projeto? ✅
- A screen ou componente novo usou `ui/theme` ou `ui/styled` como base? ✅
- O estilo próprio ficou em `styled.js` separado? ✅
