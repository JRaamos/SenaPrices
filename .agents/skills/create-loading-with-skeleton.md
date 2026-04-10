# Skill: Criar loading com Skeleton

## Objetivo

Sempre que uma screen precisar de estado de loading, devemos priorizar o uso de **Skeleton** em vez de loading genérico simples.

Queremos que o loading represente visualmente a estrutura real da tela, melhorando percepção de desempenho e mantendo consistência visual.

---

## Regra principal

Quando uma tela tiver carregamento inicial ou carregamento de conteúdo principal:

- preferir criar um componente de skeleton específico da screen
- evitar usar apenas spinner genérico quando a tela tiver estrutura rica
- o skeleton deve imitar a estrutura visual da tela real

---

## Base obrigatória

Sempre reutilizar primeiro os skeletons existentes em:

```js
components/Skeleton
# Skill: Criar loading com Skeleton

## Objetivo

Sempre que uma screen precisar de estado de loading, devemos priorizar o uso de **Skeleton** em vez de loading genérico simples.

Queremos que o loading represente visualmente a estrutura real da tela, melhorando percepção de desempenho e mantendo consistência visual.

---

## Regra principal

Quando uma tela tiver carregamento inicial ou carregamento de conteúdo principal:

- preferir criar um componente de skeleton específico da screen
- evitar usar apenas spinner genérico quando a tela tiver estrutura rica
- o skeleton deve imitar a estrutura visual da tela real

---

## Base obrigatória

Sempre reutilizar primeiro os skeletons existentes em:

```js
components/Skeleton
```

Disponíveis:

- `BaseSkeleton`
- `CardSkeleton`
- `FormScreenSkeleton`
- `HomeSkeleton`
- `ListSkeleton`

Antes de criar um novo skeleton:

1. verificar se algum já resolve o caso
2. se não resolver, criar um skeleton específico da screen
3. ainda assim reutilizar `BaseSkeleton` como base principal

---

## Componente base

O padrão principal é usar:

```js
<BaseSkeleton />
```

Props disponíveis:

- `borderRadius`
- `count`
- `circle`
- `height`
- `inline`
- `width`

Exemplo:

```js
<BaseSkeleton height={18} width="68%" />
```

```js
<BaseSkeleton height={56} width={188} borderRadius={12} />
```

```js
<BaseSkeleton height={40} width={40} circle />
```

---

## Estrutura esperada

Quando uma screen tiver skeleton próprio, preferir este padrão:

```bash
src/components/<ScreenName>Skeleton/
  index.js
  styled.js
```

ou seguir exatamente o padrão já existente no projeto.

Se o skeleton for muito ligado àquela screen e não fizer sentido ser compartilhado, ele ainda deve ser criado de forma organizada e consistente com o projeto.

---

## Regra de construção

O skeleton deve:

- representar a estrutura real da tela
- respeitar hierarquia visual
- usar blocos próximos do layout final
- manter espaçamentos e proporções coerentes
- evitar detalhes desnecessários

---

## O que usar

- `BaseSkeleton` para blocos genéricos
- wrappers styled para organizar layout
- skeletons existentes quando resolverem bem
- largura e altura coerentes com a UI real

---

## O que evitar

- criar skeleton totalmente diferente da tela real
- usar spinner simples em telas complexas
- hardcode visual fora do padrão do projeto
- criar loading solto dentro da própria screen sem organização
- duplicar skeleton já existente

---

## Exemplo desejado

```js
import React from "react";
import { BaseSkeleton } from "components/Skeleton";

import {
    SkeletonCard,
    SkeletonCardContent,
    SkeletonCards,
    SkeletonHero,
    SkeletonHeroContent,
    SkeletonRoot,
    SkeletonSection,
    SkeletonSections,
} from "./styled";

export default function DashboardHomeSkeleton() {
    return (
        <SkeletonRoot>
            <SkeletonHero>
                <SkeletonHeroContent>
                    <BaseSkeleton height={14} width={116} borderRadius={999} />
                    <BaseSkeleton height={72} width="min(840px, 74vw)" borderRadius={18} />
                    <BaseSkeleton height={18} width="min(640px, 54vw)" />
                    <BaseSkeleton height={18} width="min(580px, 48vw)" />
                    <BaseSkeleton height={56} width={188} borderRadius={12} />
                </SkeletonHeroContent>
            </SkeletonHero>

            <SkeletonSections>
                {Array.from({ length: 3 }).map((_, sectionIndex) => (
                    <SkeletonSection key={sectionIndex}>
                        <BaseSkeleton height={32} width={sectionIndex === 0 ? 240 : 200} />

                        <SkeletonCards>
                            {Array.from({ length: sectionIndex === 0 ? 3 : 4 }).map((__, cardIndex) => (
                                <SkeletonCard key={`${sectionIndex}-${cardIndex}`}>
                                    <BaseSkeleton height="100%" borderRadius="16px" />

                                    <SkeletonCardContent>
                                        <BaseSkeleton height={18} width={sectionIndex === 2 ? "54%" : "68%"} />
                                        <BaseSkeleton height={16} width="38%" />
                                    </SkeletonCardContent>
                                </SkeletonCard>
                            ))}
                        </SkeletonCards>
                    </SkeletonSection>
                ))}
            </SkeletonSections>
        </SkeletonRoot>
    );
}
```

---

## Como usar na screen

A screen deve renderizar o skeleton dentro do fluxo normal de renderização.

Preferir:

```js
return (
  <Screen>
    {loading ? <DashboardHomeSkeleton /> : <Content />}
  </Screen>
)
```

Evitar:

```js
if (loading) {
  return <Load />
}
```

Se existir a skill de renderização condicional dentro do return, ela também deve ser seguida.

---

## Quando criar skeleton novo

Criar skeleton novo quando:

- a screen tem estrutura própria
- os skeletons existentes não representam bem a interface
- há blocos específicos importantes da tela

---

## Quando reutilizar skeleton existente

Reutilizar quando:

- a necessidade já for coberta por `CardSkeleton`
- a necessidade já for coberta por `ListSkeleton`
- a necessidade já for coberta por `FormScreenSkeleton`
- a necessidade já for coberta por outro skeleton já existente no projeto

---

## Proibições

❌ usar spinner genérico em tela rica sem necessidade  
❌ criar skeleton sem verificar os existentes  
❌ não usar `BaseSkeleton` quando ele resolve  
❌ criar loading fora do padrão visual do projeto  
❌ duplicar estrutura de skeleton já existente

---

## Preferência final

Sempre priorizar:

- reuso
- consistência visual
- skeleton parecido com a tela final
- organização por componente
- uso de `BaseSkeleton` como base