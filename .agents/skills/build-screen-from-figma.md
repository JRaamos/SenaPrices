# Skill: Construir screen a partir do Figma no padrão do projeto

## Objetivo

Criar ou refatorar screens com fidelidade ao Figma sem quebrar a arquitetura do template.

O fluxo obrigatório é:

`index.js` -> `controller.js` -> service -> API

---

## Regra principal

- nao inventar layout novo quando existir Figma ou exemplo semelhante
- manter a screen declarativa e focada em renderizacao
- concentrar estado, handlers, regras de negocio e integracao externa em `controller.js`
- usar service apenas para chamadas externas e transformacao de dados nesse nivel

---

## Estrutura esperada

```bash
ScreenName/
  index.js
  controller.js
  styled.js
  utils.js (opcional)
```

### `index.js`

- apenas render
- importa `useController`
- usa componentes, containers e `styled`
- pode ter condicionais dentro do JSX

### `controller.js`

- concentra estado da tela
- concentra efeitos da tela
- concentra handlers da tela
- prepara dados derivados para a view
- faz chamadas de service quando necessario
- deve expor apenas o que a screen precisa renderizar

### `service`

- integra com backend
- nao acessa UI
- nao recebe responsabilidade visual da screen

---

## O que a screen nao deve fazer

- chamar API diretamente
- conter logica pesada
- criar subfluxo arquitetural paralelo
- reorganizar dados antes do `return`
- fazer `find`, `filter`, `map`, `reduce`, `sort` ou comparacoes para montar UI fora do JSX
- criar constantes intermediarias apenas para simplificar acesso simples

### Correto

```js
title={steps?.[activeStep]?.heading}
```

### Errado

```js
const currentStep = steps?.[activeStep]
title={currentStep?.heading}
```

Quando houver dado derivado de verdade, ele deve vir pronto do `controller.js`, preferencialmente com `useMemo` quando fizer sentido.

---

## Passos recomendados

1. encontrar uma tela similar em `src/screens`
2. copiar a estrutura visual mais proxima do projeto
3. extrair medidas e hierarquia do Figma
4. montar a view em `index.js`
5. mover estado, handlers e dados derivados para `controller.js`
6. ligar service e API apenas se a tarefa realmente exigir backend

---

## Proibicoes

- screen chamar API
- screen resolver regra complexa de negocio
- service acessar UI
- usar `hook.js` como arquivo principal da screen
- espalhar a logica principal da mesma tela em varios hooks sem necessidade

---

## Checklist

- a estrutura segue `index.js`, `controller.js` e `styled.js`?
- a screen ficou declarativa?
- a logica principal esta no `controller.js`?
- a integracao externa ficou em service?
- a tela reutiliza exemplos existentes antes de inventar abordagem nova?
