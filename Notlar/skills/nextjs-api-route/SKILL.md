---
name: nextjs-api-route
description: Creates a Next.js App Router API route (route.ts) with GET, POST, PUT, PATCH, or DELETE. Use when the user asks to add an API endpoint, create a REST route, build backend handler, or implement API for forms or data fetching.
---

# Next.js API Route Oluşturma

## Ne Zaman Kullanılır

- Yeni API endpoint eklenirken (`/api/...`)
- Form gönderimi, CRUD işlemi veya harici servis proxy’si yazılırken
- Route Handler (GET, POST vb.) tanımlanırken

## Adımlar

### 1. Yol ve Dosya

- Endpoint yolu = `app/api/` altındaki klasör yolu.
- Örnek: `/api/posts` → `app/api/posts/route.ts`
- Dinamik: `/api/posts/[id]` → `app/api/posts/[id]/route.ts`

### 2. Metod Handler’ları

- Kullanılacak HTTP metodlarını adlandırılmış export ile yaz: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Desteklenmeyen metod için 405 dön.

### 3. Request İşleme

- **GET:** Query parametreleri `new URL(request.url).searchParams`
- **POST/PUT/PATCH:** Body `await request.json()`; gerekirse Zod vb. ile validate et
- Header: `request.headers.get('Authorization')` vb.

### 4. Response

- Başarı: `NextResponse.json(data, { status: 200 | 201 })`
- Hata: Tutarlı format (örn. `{ error: string }`); 400, 401, 404, 500 uygun kullanılsın

### 5. Dinamik Segment (Varsa)

- `app/api/posts/[id]/route.ts` içinde params: Next 15+ için `params` Promise olabilir; `await params` sonra `params.id`

## Kontrol Listesi

- [ ] `route.ts` doğru `app/api/...` yolunda
- [ ] İstenen HTTP metodları export edildi
- [ ] Body/query validation (Zod vb.) yapıldı
- [ ] Hata durumları ve status kodları doğru
- [ ] Gerekirse auth/rate limit düşünüldü

## Örnek

```ts
// app/api/posts/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';
  const posts = await getPosts(Number(page));
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = postSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  const post = await createPost(result.data);
  return NextResponse.json(post, { status: 201 });
}
```
