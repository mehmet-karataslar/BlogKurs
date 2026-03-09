---
name: nextjs-data-fetching
description: Implements data fetching in Next.js (Server Components, fetch, cache, revalidate). Use when the user asks to load data for a page, implement SSR, set up caching, or fix loading/streaming behavior.
---

# Next.js Veri Çekme

## Ne Zaman Kullanılır

- Sayfa veya layout için veri yükleme
- Cache ve revalidation stratejisi seçimi
- Loading/error UI ile birlikte stream veya suspense kullanımı

## Yöntemler

### 1. Server Component’ta Doğrudan Fetch

- `page.tsx` veya `layout.tsx` içinde async fonksiyon; `await fetch()` veya `lib` fonksiyonu.
- Next.js `fetch` varsayılan olarak cache’ler; `cache: 'no-store'` veya `next: { revalidate: 60 }` ile davranışı ayarla.

```tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },
  });
  const posts = await res.json();
  return <PostList posts={posts} />;
}
```

### 2. Loading ve Error UI

- Uzun süren bölüm için `loading.tsx` (Suspense) ekle.
- Hata için `error.tsx` ile sınır belirle; gerekirse `error.tsx` içinde tekrar fetch yapma, sadece UI ve reset.

### 3. Client Tarafında Veri

- Etkileşim sonrası veya periyodik yenileme: React Query, SWR veya `useEffect` + `fetch` (client component).
- İlk veri sunucudan geliyorsa, client’ta sadece refetch/mutation kullan.

### 4. Cache Stratejisi

- **Statik:** Varsayılan fetch cache; build time’da sabit.
- **ISR:** `revalidate: 60` (saniye) ile periyodik yenileme.
- **Dinamik:** `cache: 'no-store'` veya `dynamic = 'force-dynamic'`.
- **Segment config:** `export const revalidate = 60` sayfa/layout’ta.

## Kontrol Listesi

- [ ] Veri mümkünse Server Component’ta
- [ ] `loading.tsx` / `error.tsx` gerekirse eklendi
- [ ] Cache/revalidate ihtiyaca göre ayarlandı
- [ ] Client veri gerekiyorsa React Query/SWR veya fetch uygun yerde
