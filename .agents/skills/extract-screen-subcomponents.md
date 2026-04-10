# Skill: Extrair subcomponentes da screen para components

Objetivo: evitar arquivos de screen grandes, com subcomponentes internos, e manter a organização do projeto previsível.

---

## Regra principal

❌ NÃO criar subcomponentes dentro do arquivo da screen.

Exemplos proibidos:

```javascript
const HomeSectionCards = memo(function HomeSectionCards({ section, onAction }) {
  ...
})

function DashboardHomeSkeleton() {
  ...
}
```

Esse padrão NÃO deve ser usado.

Mesmo que o componente seja pequeno ou usado apenas naquela tela, ele deve ser extraído para `components/`.

---

## Forma correta

Se a screen precisar de partes auxiliares, elas devem ser movidas para componentes separados com estrutura de pasta.

Exemplos:

```text
components/DashboardHomeSectionCards/index.js
components/DashboardHomeSectionCards/styled.js

components/DashboardHomeSkeleton/index.js
components/DashboardHomeSkeleton/styled.js
```

Se for um card, usar a estrutura de cards com pasta própria:

```text
components/cards/HomeSectionCard/index.js
components/cards/HomeSectionCard/styled.js
```

---

## Quando extrair

Extrair sempre que existir qualquer um dos casos abaixo:

- bloco visual com identidade própria
- card
- skeleton
- section
- hero
- empty state
- grid item
- componente auxiliar criado apenas para “organizar” a screen
- componente com `memo(...)`
- componente com props próprias
- componente com renderização própria

---

## O que pode ficar na screen

A screen deve conter apenas:

- imports
- chamada do hook/context
- efeitos
- handlers principais
- render principal da página

A screen NÃO deve conter:

- componentes auxiliares
- skeletons locais
- cards locais
- sections locais
- blocos grandes extraídos em `const`
- subcomponentes com `memo`

---

## Organização dos arquivos

### Estrutura obrigatória do componente

Todo componente deve ter uma pasta com seu nome.

```text
src/components/<ComponentName>/index.js
src/components/<ComponentName>/styled.js
```

### Se for card

```text
src/components/cards/<CardName>/index.js
src/components/cards/<CardName>/styled.js
```

### Regra de styling

- `index.js` → lógica e render do componente
- `styled.js` → todos os estilos (NUNCA misturar estilo no index)

---

## Regra de decisão

Se o componente existir para:

- reutilização
- organização
- legibilidade
- separação visual

✅ extrair

Não precisa esperar reutilização real para extrair.

---

## Exemplos corretos

❌ Errado:

```javascript
function DashboardHomeSkeleton() {
  ...
}
```

✅ Certo:

```javascript
import DashboardHomeSkeleton from 'components/DashboardHomeSkeleton'
```

Estrutura:

```text
components/DashboardHomeSkeleton/index.js
components/DashboardHomeSkeleton/styled.js
```

❌ Errado:

```javascript
const HomeSectionCards = memo(function HomeSectionCards({ section, onAction }) {
  ...
})
```

✅ Certo:

```javascript
import HomeSectionCard from 'components/cards/HomeSectionCard'
```

Estrutura:

```text
components/cards/HomeSectionCard/index.js
components/cards/HomeSectionCard/styled.js
```

---

## Checklist final

Antes de finalizar:

- Existe componente auxiliar dentro da screen? ❌
- Existe skeleton dentro da screen? ❌
- Existe card dentro da screen? ❌
- Existe section extraída como função local? ❌
- Existe `memo(...)` dentro da screen? ❌
- Os blocos visuais foram movidos para `components/`? ✅
- Cada componente possui pasta própria com `index.js` e `styled.js`? ✅