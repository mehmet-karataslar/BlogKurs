---
name: nextjs-feature-page
description: Creates a new Next.js App Router page or feature (layout, page, loading, error). Use when the user asks to add a new page, create a route, build a feature with multiple pages, or set up a new section in the app directory.
---

# Next.js Sayfa / Feature Oluşturma

## Ne Zaman Kullanılır

- Yeni sayfa veya rota eklenirken
- Yeni bir feature (örn. blog, dashboard, ayarlar) bölümü açılırken
- App Router’da `app/` altında yeni segment oluşturulurken

## Adımlar

### 1. Segment Yapısını Belirle

- Tek sayfa: `app/[segment]/page.tsx`
- Alt sayfaları olan bölüm: `app/[segment]/layout.tsx` + `app/[segment]/page.tsx` ve gerekirse alt rotalar

### 2. Layout (Varsa)

- Bölüm ortak UI (sidebar, başlık) için `layout.tsx` yaz.
- Root layout’u değiştirme; sadece bu segment için wrapper ekle.

### 3. Page

- `page.tsx` default export; mümkünse Server Component (async).
- Veri ihtiyacı: doğrudan `page` içinde fetch veya `lib/` fonksiyonu.
- Metadata: `export const metadata = { title, description }` veya dinamikse `generateMetadata`.

### 4. Loading & Error (Önerilen)

- Bekleme süresi olan sayfalar için `loading.tsx` (skeleton/spinner).
- Hata sınırı için `error.tsx` (`'use client'`, `error`, `reset`).

### 5. Link Ekle

- Yeni sayfaya giden linkleri mevcut nav/menüye ekle (`next/link`).

## Kontrol Listesi

- [ ] Dosyalar `app/` altında doğru segmentte
- [ ] `page.tsx` default export ve gerekirse async
- [ ] Metadata (statik veya generateMetadata) ayarlı
- [ ] Gerekirse `loading.tsx` ve `error.tsx` eklendi
- [ ] Navigasyon linkleri güncellendi

## Örnek Yapı

```
app/
  blog/
    layout.tsx    # Ortak blog layout
    page.tsx      # /blog
    loading.tsx
    error.tsx
    [slug]/
      page.tsx    # /blog/[slug]
```
