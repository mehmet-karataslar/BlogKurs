# BlogKurs – AI Agent Rehberi

Bu proje **React** ve **Next.js (App Router)** ile geliştirilir. Aşağıdaki yapılandırmalar AI asistanının tutarlı kod üretmesi için kullanılır.

## Teknoloji Özeti

- **Framework:** Next.js (App Router)
- **UI:** React 18+
- **Dil:** TypeScript (strict)
- **Stil:** Tailwind CSS (tercih); gerekirse CSS Modules

## Proje Yapısı

| Klasör / Dosya | Açıklama |
|----------------|----------|
| `app/` | Next.js App Router: layout, page, route, loading, error |
| `components/` | Yeniden kullanılabilir React bileşenleri |
| `lib/` | Yardımcılar, API client, hooks, tipler |
| `public/` | Statik dosyalar |
| `.cursor/rules/` | Kod stilleri ve kurallar (.mdc) |
| `.cursor/skills/` | İş akışı becerileri (SKILL.md) |

## Kurallar (Rules)

- **react-nextjs-core.mdc** – Her zaman uygulanır: dil, yapı, isimlendirme, state, stil, a11y, performans.
- **react-components.mdc** – `**/*.tsx`: functional components, hooks, composition.
- **nextjs-app-router.mdc** – `app/**/*.tsx`: layout, page, loading, error, metadata, route.
- **nextjs-api-routes.mdc** – `app/api/**/*.ts`: Route Handlers, HTTP metodları, response.
- **typescript-standards.mdc** – `**/*.ts,**/*.tsx`: tipler, strict, import/export.
- **subagents-usage.mdc** – Alt ajan seçimi: explore (keşif), shell (komut), generalPurpose (çok adımlı). Her zaman uygulanır.
- **theme-and-responsive.mdc** – Çoklu tema (CSS variables) ve responsive (sm/md/lg) standartları. Tüm sayfa, bileşen ve kartlar bu iki özellik üzerinde inşa edilir.
- **folder-structure-modern.mdc** – Modern klasör ve dosya yapısı; böl-parçala mimarisi, tek sorumluluk, `app/` segmentleri, `components/` (ui, layout, sections, features), `lib/` (utils, hooks, api, types). Yeni dosya/klasör oluştururken her zaman uygulanır.

Kurallar dosya/glob’a göre otomatik yüklenir; sohbette `@Rules` ile de eklenebilir.

## Alt Ajanlar (Subagents)

- **explore** – Kod tabanı arama, dosya/pattern keşfi. "Projeyi tara", "X nerede?" gibi isteklerde.
- **shell** – Terminal: git, npm, build, test. "Komut çalıştır", "push et" gibi isteklerde. Komutlarda `;` kullan, `&&` kullanma.
- **generalPurpose** – Çok adımlı görevler, araştırma. Detay: `.cursor/SUBAGENTS.md` ve `.cursor/rules/subagents-usage.mdc`.

## Beceriler (Skills)

- **nextjs-feature-page** – Yeni sayfa/feature: layout, page, loading, error, link.
- **react-component** – Yeni React bileşeni: props, stil, a11y, konum.
- **nextjs-api-route** – Yeni API endpoint: route.ts, metodlar, validation, response.
- **nextjs-data-fetching** – Veri çekme: Server/Client, cache, revalidate, loading/error.
- **github-commit-push** – Push öncesi kontrol (lint, build), conventional commit mesajı, GitHub’a push.

Skills sohbette cümleyle veya ilgili anahtar kelimelerle tetiklenir (örn. “yeni sayfa ekle”, “API endpoint yaz”).

## Öncelikler

1. **Server Components** varsayılan; client sadece etkileşim/state gerektiğinde.
2. **TypeScript** zorunlu; `any` kullanılmaz.
3. **Erişilebilirlik** ve **SEO** (metadata, semantik HTML) dikkate alınır.
4. **Performans:** next/image, next/font, gerekirse dynamic import.

Bu dosya, proje kuralları ve becerilerine hızlı referans içindir. Detaylar `.cursor/rules/` ve `.cursor/skills/` içindedir.
