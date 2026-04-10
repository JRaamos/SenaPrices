# AGENTS — Guia Nucleo do Template Frontend

Este arquivo define as regras globais e imutaveis do projeto.
As instrucoes especializadas ficam em `.agents/skills`.

Todo agente deve ler este arquivo antes de editar qualquer codigo neste projeto.

---

## Ordem obrigatória antes de codar

Antes de implementar qualquer alteracao, o agente deve:

1. ler este `AGENTS.md` inteiro
2. identificar a tela, componente ou fluxo correto
3. carregar somente as skills necessarias em `.agents/skills`
4. aplicar as regras globais deste arquivo junto com as skills carregadas
5. so entao escrever codigo

Se houver conflito entre design e arquitetura do projeto, a arquitetura do projeto tem prioridade.

---

## Como carregar skills

As skills desta pasta devem ser carregadas sob demanda, conforme o tipo de alteracao.

Use estas referencias:
- `.agents/skills/build-screen-from-figma.md`
  - quando criar ou reconstruir uma screen a partir do Figma
  - quando a tarefa envolver arquitetura de screen, separacao entre `index.js`, `controller.js`, service e API
  - quando houver duvida sobre onde colocar estado, handlers, efeitos ou integracao externa

- `.agents/skills/frontend-ui-quality.md`
  - quando houver decisao de refinamento visual
  - quando for preciso garantir alta fidelidade ao Figma em medidas, alinhamento, proporcao e tipografia
  - quando for preciso garantir que a UI nao fique com aparencia generica ou fora do padrao do projeto

- `.agents/skills/extract-screen-subcomponents.md`
  - quando a screen ficar grande demais
  - quando surgir card, hero, section, skeleton, empty state ou subcomponente local dentro da tela

- `.agents/skills/reuse-existing-components.md`
  - quando houver card, item, row, bloco repetido ou comportamento ja existente no projeto

- `.agents/skills/render-conditions-inside-return.md`
  - quando houver lógica condicional de renderização na screen
  - quando existir tentacao de usar varios `if (...) return ...` fora do JSX
  - quando surgir decisao de render ou props com `defaultX`, `resolvedX`, `hasX` e similares
  - quando houver objetos intermediarios apenas para simplificar props ou condicoes

- `.agents/skills/keep-theme-logic-in-styled.md`
  - quando houver logica visual dependente de theme, token ou variacao de estilo
  - quando houver criacao, ajuste ou uso de cores e theme

- `.agents/skills/svg-and-image-usage.md`
  - quando houver uso de ícones ou imagens vindos do Figma

- `.agents/skills/frontend-mock-in-controller.md`
  - quando a tela estiver usando dados mockados sem integração com API (não usar services nem simular API)

- `.agents/skills/use-header-sidebar-layout.md`
  - quando a tela envolver `ContainerAuthenticated`, `ContainerUnauthenticated`, `PageHeader`, sidebar, topbar ou navegacao principal

- `.agents/skills/use-formcore-with-faker.md`
  - quando a tarefa envolver qualquer formulario, filtro lateral, multiform ou captura de dados
  - quando houver uso direto de `components/Form`
  - quando houver botoes, inputs, selects, toggles, radios, upload ou wrappers de formulario fora do padrao

- `.agents/skills/use-project-table.md`
  - quando a tarefa envolver qualquer tabela, listagem tabular, grid paginada ou tabela com busca e filtros

- `.agents/skills/use-strapi-image-and-error-helpers.md`
  - quando houver imagem com `url` vinda da API ou tratamento de resposta do servidor

- `.agents/skills/fill-address-from-zip-code-service.md`
  - quando houver formulario de endereco, CEP, preenchimento automatico de endereco ou consulta de logradouro

- `.agents/skills/follow-existing-examples-first.md`
  - quando houver duvida de implementacao e for necessario seguir o padrao da versao inicial do projeto
  - quando a tarefa envolver formulario, tabela, dashboard ou fluxo ja existente

- `.agents/skills/create-loading-with-skeleton.md`
  - quando a screen tiver loading inicial ou carregamento de conteudo principal
  - quando um spinner generico nao representar bem a estrutura real da tela

Se mais de uma skill se aplicar, carregar todas as necessarias antes de implementar.

Inventario atual da pasta `.agents/skills`:

- `build-screen-from-figma.md`
- `create-loading-with-skeleton.md`
- `extract-screen-subcomponents.md`
- `fill-address-from-zip-code-service.md`
- `follow-existing-examples-first.md`
- `frontend-mock-in-controller.md`
- `frontend-ui-quality.md`
- `keep-theme-logic-in-styled.md`
- `render-conditions-inside-return.md`
- `reuse-existing-components.md`
- `svg-and-image-usage.md`
- `use-formcore-with-faker.md`
- `use-header-sidebar-layout.md`
- `use-project-table.md`
- `use-strapi-image-and-error-helpers.md`

---

## Modo atual do app

O projeto esta em fase de front-end estatico com base arquitetural pronta:

- priorizar fidelidade ao Figma
- priorizar reuso dos componentes e telas ja existentes
- evitar integrar backend novo sem necessidade clara
- manter o fluxo `Screen -> Hook -> Service -> API`
- se algo depender de backend ainda nao pronto, deixar `TODO` claro

---

## Estrutura obrigatória por screen

Toda screen nova deve seguir o padrao existente em `src/screens`.

Regra base:

- `index.js` para a view
- `controller.js` para logica, estado, memoizacoes e mocks quando necessario
- `styled.js` quando houver estilo local relevante

Regras:

- `index.js` deve ser simples
- logica pesada nao deve ficar no render
- nao alterar rotas existentes sem necessidade explicita
- estilos relevantes nao devem ficar no `index.js`
- novas screens e componentes devem usar o sistema de theme do projeto em `ui/theme` e `ui/styled`

Se a task vier do Figma, carregar:

- `.agents/skills/build-screen-from-figma.md`

---

## Navegação e layout

- sempre reutilizar os containers e wrappers do projeto
- nao criar container paralelo se ja existir equivalente
- preferir `ContainerAuthenticated`, `ContainerUnauthenticated`, `PageHeader`, `PageActions` e blocos do dashboard
- respeitar a arquitetura de rotas existente

Se a tela envolver layout de pagina autenticada ou navegacao principal, carregar:

- `.agents/skills/use-header-sidebar-layout.md`

---

## Styling e theme

- usar o padrao de estilo do projeto
- respeitar `ui/theme` e `ui/styled`
- nao hardcodar cores
- nao decidir estilos em `index.js` ou `controller.js`
- nao criar componentes genericos de estilo sem necessidade
- controlar variacoes por props semanticas
- novas screens e componentes devem usar sempre o sistema de theme do projeto
- quando houver estilo proprio, manter em arquivo `styled.js` separado
- evitar colocar conteudo visual grande e logica de estilo dentro do `index.js`

Se houver logica de theme ou token, carregar:

- `.agents/skills/keep-theme-logic-in-styled.md`

---

## Render e props

- nao criar variaveis intermediarias para resolver renderizacao ou props
- nao criar objetos "resolvidos" com `prop || {}`
- manter condicoes inline no JSX
- usar defaults no parametro da funcao quando necessario

Se surgir esse tipo de logica, carregar:

- `.agents/skills/render-conditions-inside-return.md`

---

## Reuso antes de criar

Antes de criar qualquer componente novo, procurar em:

- `src/components`
- `src/hooks`
- `src/services`
- `src/utils`
- `src/context`
- `src/screens`

Se houver algo parecido, adaptar antes de criar novo.

Carregar:

- `.agents/skills/reuse-existing-components.md`

---

## Formulários

Para qualquer formulario, filtro lateral, multiform ou captura de dados:

- usar `components/Form/Core`
- manter o faker ativo
- estruturar a tela em torno de `formItems`
- nao montar formulario manual com inputs soltos se `FormCore` atender

Carregar:

- `.agents/skills/use-formcore-with-faker.md`

---

## Tabelas

Para qualquer tabela ou grid tabular:

- usar `components/Form/Table`
- nao criar tabela manual na screen se o componente do projeto atender
- reutilizar busca, tabs, filtros laterais e paginacao do componente existente

Carregar:

- `.agents/skills/use-project-table.md`

---

## Imagens e respostas do servidor

Sempre que houver imagem com `url` vinda da API:

- usar `parseStrapiImage(url)` antes de renderizar
- nao usar a `url` crua diretamente

Sempre que houver resposta do servidor com possibilidade de erro do Strapi:

- usar `exposeStrapiError(result)`
- nao criar parse manual de erro se o helper central ja atende

Carregar:

- `.agents/skills/use-strapi-image-and-error-helpers.md`

---

## Endereço por CEP

Sempre que houver formulario de endereco com campo de CEP:

- usar a camada de services para buscar o endereco
- usar `ReadAddressesByZipCode(zipCode)` em `src/services/api.js`
- preencher os campos de endereco a partir do CEP informado
- nao fazer `fetch` direto na screen, no hook ou no componente
- manter o fluxo `Screen -> Hook -> Service -> API`

Carregar:

- `.agents/skills/fill-address-from-zip-code-service.md`

---

## Exemplos da versão inicial

Ao implementar algo novo, usar como referencia os exemplos ja existentes no template.

Prioridades de consulta:

- telas existentes em `src/screens`
- componentes em `src/components`
- stories em `src/components/Form/*.stories.js`
- exemplos ja prontos como `Dashboard/Support` e `Dashboard/SupportForm`

Carregar:

- `.agents/skills/follow-existing-examples-first.md`

---

## Checklist final antes de entregar

- A tela, componente ou fluxo correto foi identificado?
- As skills necessarias foram carregadas antes de editar?
- Houve reuso antes de criar algo novo?
- O layout segue o padrao do projeto?
- Formularios usam `FormCore` com faker ativo?
- Tabelas usam o componente `Table` do projeto?
- Os exemplos existentes foram consultados antes de inventar uma nova abordagem?
- Formularios de endereco usam `ReadAddressesByZipCode(zipCode)` pela camada de services?
