# Skill: Usar o layout padrao de paginas autenticadas

Objetivo: garantir que telas do dashboard e paginas principais reutilizem o layout e a navegacao do projeto.

Aplicar sempre que a tarefa envolver:

- `ContainerAuthenticated`
- `ContainerUnauthenticated`
- `PageHeader`
- `PageActions`
- sidebar
- header principal
- navegacao de dashboard

---

## Regras obrigatórias

### 1) Nao criar layout paralelo

- reutilizar os containers existentes
- nao montar uma estrutura concorrente para paginas autenticadas

### 2) Reutilizar o shell do dashboard

- usar `ContainerAuthenticated` para paginas autenticadas
- usar `PageHeader` quando houver cabecalho de pagina
- usar `PageActions` quando houver acoes de pagina

### 3) Nao duplicar navegacao

- nao criar outra sidebar
- nao criar topbar paralela se o projeto ja tiver um padrao

---

## Checklist final

- A tela usa os containers padrao do projeto?
- O cabecalho reutiliza `PageHeader` ou a estrutura equivalente?
- Nao foi criada uma sidebar paralela?
- A pagina ficou consistente com `Dashboard/Support` e telas parecidas?
