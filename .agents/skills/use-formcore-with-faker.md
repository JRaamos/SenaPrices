# Skill: Usar FormCore com faker ativo

Objetivo: garantir que todo formulario do projeto siga o padrao central baseado em `components/Form/Core`, mantendo o autofill com faker ativo.

Aplicar sempre que a tarefa envolver:

- formulario de tela
- filtro lateral
- multiform
- captura de dados
- tela com `formItems`

---

## Regra principal

Sempre usar `components/Form/Core` quando o projeto precisar de formulario.

Nao montar formulario manual com inputs soltos se o `FormCore` conseguir atender.

---

## Regras obrigatórias

### 1) O formulario nasce de `formItems`

- modelar a estrutura do formulario via `formItems`
- deixar `controller.js` ou hook montar esses itens
- passar `formItems` para `FormCore`

### 2) Faker deve permanecer ativo

- nao remover o autofill
- nao desligar o faker existente
- nao substituir o comportamento central por mocks locais soltos

O padrao do projeto ja possui autofill e regras de faker em:

- `src/components/Form/Core/index.js`

### 3) Reaproveitar exemplos existentes

Usar como referencia:

- `src/screens/Authentication/Login/index.js`
- `src/screens/Authentication/Register/index.js`
- `src/screens/Dashboard/Me/index.js`
- `src/screens/Dashboard/SupportForm/index.js`
- `src/components/Dashboard/SideFilters/index.js`

### 4) Reaproveitar os componentes internos do ecossistema de formulario

Antes de criar qualquer campo novo, verificar:

- `Input`
- `Select`
- `Check`
- `Toggle`
- `Radio`
- `UploadFile`
- `MultiForm`
- `MultiSelect`
- `PasswordValidation`

---

## Checklist final

- O formulario usa `components/Form/Core`?
- A tela monta `formItems` em vez de inputs soltos?
- O faker e o autofill continuam ativos?
- Os exemplos existentes foram consultados antes de criar algo novo?
