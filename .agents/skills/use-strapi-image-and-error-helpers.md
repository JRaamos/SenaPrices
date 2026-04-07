# Skill: Usar helpers de imagem e erro do Strapi

Objetivo: garantir consistencia ao consumir respostas da API, especialmente para imagens e erros vindos do Strapi.

Aplicar sempre que a tarefa envolver:

- imagem com `url` vinda da API
- upload de imagem ou arquivo
- submit de formulario
- hooks de leitura e escrita
- respostas do servidor

---

## Regra principal para imagens

Sempre que uma imagem da API vier com `url`, usar `parseStrapiImage(url)` antes de renderizar.

Nao usar a `url` crua diretamente em `img`, `background-image`, preview ou componente equivalente.

Exemplos do projeto:

- `src/components/Dashboard/UserCard/controller.js`
- `src/components/Form/UploadField/index.js`

---

## Regra principal para erros

Sempre que uma resposta do servidor puder retornar erro do Strapi, usar `exposeStrapiError(result)`.

Nao criar toast manual nem parse alternativo de erro se o helper central ja cobre o caso.

Exemplos do projeto:

- `src/hooks/useForm.js`
- `src/hooks/useList.js`
- `src/hooks/useSingleType.js`
- `src/screens/Authentication/*/controller.js`
- `src/screens/Dashboard/Me/controller.js`

---

## Referência de fluxo

Se houver duvida de implementacao, consultar primeiro o fluxo de suporte e seus arredores:

- `src/screens/Dashboard/Support`
- `src/screens/Dashboard/SupportForm`

Esses arquivos devem servir como referencia de padrao de tela, formulario e fluxo do projeto.

---

## Como decidir

### Para imagens

- se veio `url` da API, passar por `parseStrapiImage`
- se nao veio `url`, usar fallback do projeto quando existir

### Para respostas

- se o resultado veio de `Read`, `Create`, `Update`, `Delete`, autenticacao ou fluxo parecido, validar com `exposeStrapiError`
- so seguir no fluxo de sucesso quando `exposeStrapiError(result)` retornar falso

---

## Checklist final

- Toda imagem remota usa `parseStrapiImage`?
- Nenhuma `url` do Strapi foi usada crua?
- As respostas do servidor usam `exposeStrapiError`?
- Em caso de duvida, o fluxo de suporte foi consultado como referencia?
