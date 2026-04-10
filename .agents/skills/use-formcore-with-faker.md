# Skill: Usar FormCore com faker e ecossistema de Form

## Objetivo

Garantir que todo formulario do projeto siga o padrao central baseado em `components/Form/Core`, mantendo o autofill com faker ativo e reutilizando os componentes ja existentes em `components/Form`.

Aplicar sempre que a tarefa envolver:

- formulario de tela
- filtro lateral
- multiform
- captura de dados
- tela com `formItems`
- uso de botoes, inputs, selects, checks, toggles, radios ou upload no contexto de formulario

---

## Regra principal

Sempre usar `components/Form/Core` quando o projeto precisar de formulario.

Nao montar formulario manual com inputs soltos se o `FormCore` conseguir atender.

---

## Regras obrigatorias

### 1) O formulario nasce de `formItems`

- modelar a estrutura do formulario via `formItems`
- deixar `controller.js` montar esses itens
- passar `formItems` para `FormCore`

### 2) Faker deve permanecer ativo

- nao remover o autofill
- nao desligar o faker existente
- nao substituir o comportamento central por mocks locais soltos

Referencia principal:

- `src/components/Form/Core/index.js`

### 3) Reaproveitar exemplos existentes

Usar como referencia:

- `src/screens/Authentication/Login/index.js`
- `src/screens/Authentication/Register/index.js`
- `src/screens/Dashboard/Me/index.js`
- `src/screens/Dashboard/SupportForm/index.js`
- `src/components/Dashboard/SideFilters/index.js`

### 4) Reaproveitar o ecossistema de `components/Form`

Antes de criar qualquer campo novo, verificar:

- `Button`
- `Input`
- `Select`
- `Check`
- `Toggle`
- `Radio`
- `UploadFile`
- `MultiForm`
- `MultiSelect`
- `PasswordValidation`

Nao recriar comportamento ou estilo que ja existe nesses componentes.

---

## Regras de uso dos componentes de Form

### Button

- usar `components/Form/Button`
- configurar por props e theme
- nao estilizar o botao por CSS externo para mudar aparencia base

### Input, Select, Check, Toggle e Radio

- usar os componentes existentes
- nao criar versao manual com `styled`
- nao duplicar validacao ou comportamento central

### UploadFile, MultiSelect, MultiForm e PasswordValidation

- reutilizar o componente existente
- nao implementar versao paralela sem necessidade clara

---

## Checklist final

- o formulario usa `components/Form/Core`?
- a tela monta `formItems` em vez de inputs soltos?
- o faker e o autofill continuam ativos?
- os componentes de `components/Form` foram reutilizados antes de criar algo novo?
- os exemplos existentes foram consultados?
