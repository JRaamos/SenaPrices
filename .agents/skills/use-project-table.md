# Skill: Usar o componente de tabela do projeto

Objetivo: garantir que tabelas e listagens tabulares usem o componente central do projeto em vez de implementacoes manuais.

Aplicar sempre que a tarefa envolver:

- tabela
- grid tabular
- listagem com colunas
- listagem com busca, tabs, filtros ou paginacao

---

## Regra principal

Sempre usar `components/Form/Table` quando a necessidade for tabular.

Nao criar tabela manual na screen se o componente do projeto atender.

---

## Regras obrigatórias

### 1) Montar a tabela pelos contratos do projeto

- fornecer `rows`
- fornecer `columns`
- fornecer `config` quando houver busca, filtros, tabs ou paginacao

### 2) Reaproveitar recursos internos

O componente ja integra:

- `TableHeader`
- `TablePagination`
- `SideFilters`
- busca
- tabs
- filtros

Nao recriar isso na tela se o componente central ja cobre o caso.

### 3) Usar exemplos existentes

Usar como referencia:

- `src/screens/Dashboard/Support/index.js`
- `src/screens/Dashboard/Support/controller.js`

---

## Checklist final

- A tabela usa `components/Form/Table`?
- A screen evitou criar uma tabela manual?
- Busca, tabs, filtros e paginacao foram reaproveitados do componente central?
- Os exemplos de `Dashboard/Support` foram consultados?
