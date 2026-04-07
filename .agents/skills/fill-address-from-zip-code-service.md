# Skill: Fill Address From Zip Code Service

Use esta skill quando a tarefa envolver:

- formulario de endereco
- campo de CEP
- preenchimento automatico de rua, bairro, cidade ou estado
- consulta de endereco a partir do CEP

## Regra principal

Nao consultar CEP diretamente na screen, no hook ou no componente.

Sempre usar a camada de services ja existente:

- `ReadAddressesByZipCode(zipCode)` em `src/services/api.js`

## Como implementar

1. identificar o campo de CEP no fluxo atual
2. disparar a consulta quando o CEP estiver pronto para busca
3. chamar `ReadAddressesByZipCode(zipCode)` pela camada de service
4. preencher os campos de endereco com o retorno da consulta
5. manter o fluxo do projeto em `Screen -> Hook -> Service -> API`

## Nao fazer

- nao fazer `fetch('https://viacep...')` direto na tela
- nao criar helper paralelo de CEP se `ReadAddressesByZipCode` ja atende
- nao preencher endereco manualmente quando a consulta por service deve acontecer

## Campos esperados

Ao receber o retorno do CEP, reaproveitar os nomes do formulario atual.
Quando fizer sentido, preencher valores equivalentes a:

- logradouro
- bairro
- cidade
- estado
- complemento

## Fonte de verdade

As referencias principais sao:

- `src/services/api.js`
- `AGENTS.md`
- `.agents/skills/use-formcore-with-faker.md`
