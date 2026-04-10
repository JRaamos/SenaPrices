

# Skill: SVG e uso de imagens

## Objetivo

Definir o padrão de uso de ícones e imagens vindos do Figma no projeto.

Essa skill deve garantir consistência visual, reuso e alinhamento com a UI já existente.

---

## Regra principal

Quando o Figma fornecer um ícone ou imagem:

- usar o asset vindo do Figma
- seguir o padrão já existente do projeto
- evitar soluções alternativas fora do padrão

---

## Regra para ícones

Quando for um **ícone**:

- pegar o SVG vindo do Figma
- armazenar em `public/icons`
- usar o componente `Icon` que já existe na UI do projeto
- passar apenas o nome do ícone para o componente

### Componente padrão

```js
export const Icon = styled.img.attrs((props) => ({
    src: `/icons/${props.icon}.svg`,
}))`
    margin: ${props => props.nomargin ? `0` : `0 2px`} ;
    z-index: 1;
    ${props => props.pointer ? `cursor: pointer;` : ``}
    ${props => props.inverted ? `transform: rotate(180deg);` : ``  }
`;
```

### Regra de uso

- não passar `fill`
- não passar `stroke`
- não modificar cor do SVG via props
- cada ícone deve ter sua própria variação de cor no arquivo SVG
- a screen deve apenas informar qual ícone usar

### Reuso obrigatório

Antes de adicionar um novo ícone:

1. verificar se ele já existe em `public/icons`
2. se já existir, reutilizar o mesmo arquivo
3. só adicionar um novo SVG se realmente não existir equivalente no projeto

---

## Regra para imagens

Quando for uma **imagem**:

- baixar a imagem do Figma
- adicionar temporariamente no projeto
- criar uma pasta dentro de `public` com o nome da screen
- armazenar as imagens dessa screen nessa pasta

### Exemplo

```bash
public/product-details/
public/register/
public/dashboard-home/
```

### Regra de uso

- usar as imagens baixadas do Figma
- manter organização por screen
- usar essas imagens de maneira temporária enquanto necessário no projeto

---

## Proibições

❌ não usar biblioteca externa de ícones  
❌ não usar SVG de outra fonte  
❌ não usar ícone inline se o padrão do projeto é `public/icons`  
❌ não passar `fill` ou `stroke` para o componente `Icon`  
❌ não duplicar ícone já existente  

---

## Quando não for possível baixar o SVG do Figma

Se não for possível baixar o SVG do Figma:

- manter o componente `Icon` da UI no lugar
- usar o nome que o ícone deveria ter
- não substituir por outro ícone aleatório
- não buscar ícone em outra biblioteca

### Exemplo

```js
<Icon icon="search" />
```

Mesmo que o arquivo ainda não exista, manter o nome esperado para deixar claro qual ícone deve ser usado depois.

---

## Padrão esperado

Para ícones:

- Figma → `public/icons` → componente `Icon`

Para imagens:

- Figma → pasta da screen dentro de `public` → uso temporário no projeto

---

## Checklist

- ícone veio do Figma? ✅
- SVG foi salvo em `public/icons`? ✅
- reutilizou ícone existente antes de criar novo? ✅
- usou componente `Icon` da UI? ✅
- não passou `fill` ou `stroke`? ✅
- imagem foi salva em pasta da screen dentro de `public`? ✅
- evitou bibliotecas externas e fontes alternativas? ✅