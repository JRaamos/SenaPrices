# Skill: Construir screen a partir do Figma

Objetivo: criar screens novas seguindo o padrao do projeto, sem duplicar componentes nem inventar estrutura paralela.

Aplicar sempre que:

- houver uma nova tela no Figma
- uma tela precisar ser refeita com base no design
- a implementacao partir do layout antes da integracao

---

## Passo a passo obrigatório

### 1) Confirmar a tela certa

- validar node-id quando existir
- confirmar a rota e o fluxo corretos
- identificar se a tela pertence a autenticado, nao autenticado ou landpage

### 2) Buscar exemplos existentes primeiro

- seguir `.agents/skills/follow-existing-examples-first.md`
- seguir `.agents/skills/reuse-existing-components.md`

### 3) Respeitar a estrutura do projeto

- `index.js` para view
- `controller.js` para logica, estado, hooks e mocks quando necessario
- `styled.js` apenas quando houver estilo local relevante

### 4) Reutilizar o layout do projeto

- usar containers existentes
- se houver area autenticada, seguir `.agents/skills/use-header-sidebar-layout.md`

### 5) Formularios e tabelas nao sao manuais

- se a tela tiver formulario, seguir `.agents/skills/use-formcore-with-faker.md`
- se a tela tiver tabela, seguir `.agents/skills/use-project-table.md`

### 6) Estilo e render devem seguir o padrao

- seguir `.agents/skills/keep-theme-logic-in-styled.md`
- seguir `.agents/skills/keep-render-logic-inline.md`

---

## Checklist final

- A tela foi identificada corretamente?
- O projeto ja tinha algo parecido para reaproveitar?
- O layout reutiliza containers e componentes existentes?
- Formularios usam `FormCore`?
- Tabelas usam `components/Form/Table`?
- A screen segue o padrao da base inicial do projeto?
