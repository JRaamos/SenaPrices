# Skill: Seguir os exemplos existentes da versão inicial

Objetivo: garantir que novas implementacoes sigam os exemplos ja existentes no template antes de introduzir um padrao novo.

Aplicar sempre que:

- houver duvida de implementacao
- o agente estiver entre duas abordagens validas
- a tela usar formulario, tabela ou dashboard

---

## Ordem obrigatória de consulta

Antes de inventar uma abordagem nova, consultar:

### 1) Screens existentes

- `src/screens/Dashboard/Support`
- `src/screens/Dashboard/SupportForm`
- `src/screens/Dashboard/Me`
- `src/screens/Authentication/*`

### 2) Componentes existentes

- `src/components/Form/Core`
- `src/components/Form/Table`
- `src/components/Dashboard/*`
- `src/components/Modal/*`

### 3) Stories e exemplos de formulario

Consultar os arquivos:

- `src/components/Form/*.stories.js`

---

## Regra principal

Se a versao inicial do projeto ja mostra como algo e feito, seguir esse padrao primeiro.

Nao criar uma abordagem nova so porque ela parece mais rapida.

---

## Checklist final

- Consultei telas existentes antes de implementar?
- Consultei `FormCore` ou `Table` quando o caso pedia?
- Consultei stories dos componentes de formulario?
- A nova implementacao ficou coerente com a base inicial?
