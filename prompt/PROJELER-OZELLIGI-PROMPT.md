# Projeler Özelliği – Uygulama Prompt'u

Bu dosya, BlogKurs projesine **projeler** (kullanıcının kendi projelerini tanıttığı) özelliği eklemek için adım adım kullanabileceğin detaylı bir prompt'tur. Blog özelliği ile aynı yapıdadır; proje kurallarına (tema, responsive, React/Next.js) uygun şekilde uygula.

---

## 1. Veri modeli ve depolama (Supabase)

- **Veritabanı:** Supabase kullanılır. Projeler bir `projects` (veya `projeler`) tablosunda tutulur; kapak görselleri Supabase Storage'da.
- **Proje (Project)** için TypeScript tipi ve Supabase tablo alanları:
  - `id`: string (uuid, Supabase tarafından otomatik)
  - `slug`: string (URL'de kullanılacak, **benzersiz**, unique constraint)
  - `title`: string
  - `excerpt`: string (kısa tanıtım, liste ve SEO için)
  - `cover_image_url`: string (Supabase Storage'dan dönen public URL)
  - `content`: string (proje detayları, açıklama – Markdown veya HTML)
  - `github_url`: string (GitHub repo linki; boş olabilir)
  - `related_links`: jsonb veya json (ilgili linkler: örn. `[{ "label": "Canlı Demo", "url": "https://..." }, ...]`)
  - `published`: boolean (yayında mı)
  - `featured_on_homepage`: boolean (ana sayfada gösterilsin mi; varsayılan false)
  - `homepage_order`: number (ana sayfada sıralama; küçük değer önce)
  - `view_count`: number (görüntülenme sayısı; varsayılan 0)
  - `like_count`: number (beğeni sayısı; varsayılan 0)
  - `created_at`: timestamptz (Supabase otomatik)
  - `updated_at`: timestamptz (Supabase otomatik veya trigger)
- **Supabase Storage:** Kapak görselleri için bir bucket (örn. `project-covers`) oluştur; public okuma izni ver.

---

## 2. Admin tarafı – Genel yapı

- **Admin rotası:** `app/admin/` altında (blog ile aynı layout).
  - Layout'a "Projeler" menü linki ekle: `app/admin/projeler/page.tsx` (veya `admin/projects`).
- **Admin sayfaları (projeler):**
  - `app/admin/projeler/page.tsx`: **Proje listesi** (tüm projeler).
  - `app/admin/projeler/yeni/page.tsx`: **Yeni proje oluşturma**.
  - `app/admin/projeler/[slug]/duzenle/page.tsx`: **Mevcut projeyi düzenleme** (slug ile bul).

Tüm admin sayfalarında tema (CSS variables) ve responsive kuralları kullan; renkler `var(--color-*)`, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## 3. Admin – Proje listesi (`/admin/projeler`)

- Sayfa: Tüm projeleri listele (Supabase'den çek).
- Her satırda: kapak önizlemesi (küçük), başlık, slug, yayın durumu (yayında / taslak), **Ana sayfada** (evet/hayır veya ikon), **görüntülenme** ve **beğeni** sayıları, oluşturma tarihi.
- Aksiyonlar: "Düzenle", "Sil" (silmeden önce onay). İstersen "Ana sayfada göster"ü listeden hızlı toggle ile aç/kapa.
- "Yeni proje" butonu: `/admin/projeler/yeni`'e yönlendir.
- Tablo veya kart grid'i responsive olsun.
- Loading ve hata: `loading.tsx`, `error.tsx`.

---

## 4. Admin – Yeni proje / Düzenleme sayfası (form)

Tek bir form bileşeni hem "yeni" hem "düzenle" için kullanılsın.

- **Alanlar:**
  1. **Başlık (title):** metin, zorunlu.
  2. **Slug:** metin, zorunlu; boş bırakılırsa başlıktan otomatik üret (Türkçe karakterleri değiştir, boşluk → tire).
  3. **Kısa tanıtım (excerpt):** textarea, 1–2 cümle, liste ve SEO için.
  4. **Kapak görseli (cover_image_url):** Mevcut görsel varsa önizleme; dosya seç (image/*) → sıkıştır → API ile yükle → dönen URL'i alana yaz.
  5. **Proje detayları (content):** Markdown veya zengin metin editörü (blog ile aynı yapı).
  6. **GitHub linki (github_url):** metin (URL); opsiyonel. Validasyon: geçerli URL veya boş.
  7. **İlgili linkler (related_links):** Dinamik liste: her biri "etiket" + "URL" (örn. "Canlı Demo", "https://..."). Array olarak sakla; UI'da ekle/çıkar satırı.
  8. **Yayın durumu (published):** checkbox veya toggle (taslak / yayında).
  9. **Ana sayfada göster (featured_on_homepage):** checkbox veya toggle.
  10. **Ana sayfa sırası (homepage_order):** number (küçük değer önce).
- Form gönderiminde: Yeni → POST; Düzenle → PUT/PATCH. Validasyon client (Zod) + API.

---

## 5. Admin – Kapak görseli yükleme (Supabase Storage + sıkıştırma)

- Blog ile aynı mantık: büyük görseller **önce sıkıştır** (istemci veya sunucuda), sonra yükle.
- **API route:** `app/api/admin/projeler/upload/route.ts` (veya `app/api/projeler/upload/route.ts`).
  - POST, FormData, dosya tipi ve boyut kontrolü.
  - Supabase Storage bucket: `project-covers` (veya `blog-covers` ile aynı bucket'ta `projeler/` prefix).
  - Response: `{ url: "..." }` (public URL).
- İstemci: dosya seç → (büyükse) sıkıştır → API'ye at → URL'i state'e yaz, önizlemede göster.

---

## 6. Proje eklerken / düzenlerken / silerken dikkat edilecekler

- **Slug benzersizliği:** Yeni ve düzenlemede slug başka projede kullanılmamalı. API'de kontrol; çakışma varsa 409.
- **Kapak değişince:** Eski Storage dosyasını silmek iyi pratiktir (opsiyonel).
- **Silme:** Onay göster; silerken Storage'daki kapak dosyasını da sil.
- **Yayın durumu:** Taslaklar sadece admin'de; müşteri listesi ve tekil sayfa sadece `published === true`. Ana sayfada `published` + `featured_on_homepage` true olanlar.
- **related_links:** Geçerli URL'ler; boş array kabul edilir. JSON/JSONB olarak sakla.

---

## 7. Admin – Proje API route'ları (CRUD, Supabase)

- **GET** `app/api/admin/projeler/route.ts`: Tüm projeleri döndür.
- **GET** `app/api/admin/projeler/[slug]/route.ts`: Tek proje (slug ile).
- **POST** `app/api/admin/projeler/route.ts`: Yeni proje; body: title, slug, excerpt, cover_image_url, content, github_url, related_links, published, featured_on_homepage, homepage_order. Slug benzersizlik kontrolü.
- **PUT** veya **PATCH** `app/api/admin/projeler/[slug]/route.ts`: Güncelle; slug değişiyorsa benzersizlik kontrolü.
- **DELETE** `app/api/admin/projeler/[slug]/route.ts`: Projeyi sil; mümkünse Storage'daki kapak dosyasını da sil.

**Müşteri tarafı (sayılar):**
- **POST** `app/api/projeler/[slug]/view/route.ts`: Görüntülenme artır (isteğe bağlı cookie ile tekrarları sınırla).
- **POST** `app/api/projeler/[slug]/like/route.ts`: Beğeni artır (isteğe bağlı cookie/localStorage ile tekrar beğenmeyi engelle).

---

## 8. Müşteri tarafı – Proje listesi (`/projeler`)

- **Sayfa:** `app/projeler/page.tsx` (mevcut varsa genişlet).
  - Supabase'den sadece **published** projeler.
  - Sıralama: `updated_at` veya `created_at` yeniden eskiye.
  - Her proje için kart: `Card` bileşeni; `title`, `excerpt`, `cover_image_url`, `slug` → `/projeler/[slug]`. İstersen kartta görüntülenme ve beğeni sayıları.
  - Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`, Section ile.
  - Metadata: title "Projeler | Site Adı", description.

---

## 9. Müşteri tarafı – Tekil proje sayfası (`/projeler/[slug]`)

- **Sayfa:** `app/projeler/[slug]/page.tsx`.
  - Slug ile projeyi getir; bulunamazsa 404. Sadece `published === true` ise göster.
  - Layout:
    - Kapak görseli (next/image), başlık (h1), tarih (created_at/updated_at).
    - **Görüntülenme ve beğeni:** Sayfa yüklendiğinde view artır (API); beğeni butonu ile like artır (API). Tekrar sayım/beğeni engelleme: cookie veya localStorage.
    - Proje detayları: `content` (Markdown veya HTML render).
    - **GitHub linki:** Varsa buton/link (yeni sekmede aç).
    - **İlgili linkler:** `related_links` array'ini liste veya butonlar olarak göster (etiket + URL).
  - Stil: Tema değişkenleri, responsive, container `max-w-3xl mx-auto` gibi.
  - Metadata: `generateMetadata` ile title (proje adı) ve description (excerpt).

---

## 10. Ana sayfada hangi projeler görünsün

- **Kural:** Sadece `published === true` **ve** `featured_on_homepage === true` olan projeler ana sayfada listelensin.
- **Sıralama:** `homepage_order` (küçükten büyüğe), sonra `updated_at` yeniden eskiye. Limit (örn. 3 veya 6).
- **Yer:** Ana sayfa (`app/page.tsx`) içinde bir bölüm: "Öne Çıkan Projeler" veya "Projeler". Section + Card grid, `/projeler/[slug]` linki.
- **Veri:** Supabase'den `published = true AND featured_on_homepage = true`, order by `homepage_order ASC, updated_at DESC`, limit 6.

---

## 11. Yardımcılar ve tip güvenliği

- `lib/types/project.ts`: Project tipi (Supabase satırı ile uyumlu; related_links tipi: `{ label: string; url: string }[]`).
- `lib/supabase.ts`: Mevcut Supabase client (blog ile ortak).
- `lib/projects.ts`: getProjects, getProjectBySlug, getProjectsForHomepage, createProject, updateProject, deleteProject (Supabase).
- Slug üretimi: `lib/slug.ts` (blog ile ortak).

---

## 12. Özet kontrol listesi

- [ ] Supabase: `projects` tablosu (slug unique, view_count, like_count, github_url, related_links), Storage bucket `project-covers`
- [ ] Project tipi ve lib/projects
- [ ] Admin proje listesi (görüntülenme/beğeni, ana sayfada sütunu)
- [ ] Admin "yeni proje" ve "düzenle" sayfaları (GitHub + ilgili linkler alanları dahil)
- [ ] Kapak yükleme: sıkıştırma + Supabase Storage
- [ ] Admin API: list, get, create, update, delete
- [ ] Müşteri proje listesi (`/projeler`)
- [ ] Müşteri tekil proje (`/projeler/[slug]`) + GitHub + related_links + görüntülenme/beğeni (API: view, like)
- [ ] Ana sayfada öne çıkan projeler (featured_on_homepage + homepage_order)
- [ ] Tema ve responsive, metadata ve SEO

Bu prompt'u parça parça kullan; blog prompt'u ile aynı pattern'leri takip et. Proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
