# Blog Özelliği – Uygulama Prompt'u

Bu dosya, BlogKurs projesine **blog (yazı)** özelliği eklemek için adım adım kullanabileceğin detaylı bir prompt'tur. Proje kurallarına (tema, responsive, React/Next.js) uygun şekilde uygula.

---

## 1. Veri modeli ve depolama (Supabase)

- **Veritabanı:** Supabase kullanılır. Blog yazıları bir `posts` (veya `blog_posts`) tablosunda tutulur; kapak görselleri Supabase Storage'da.
- **Blog yazısı (Post)** için TypeScript tipi ve Supabase tablo alanları:
  - `id`: string (uuid, Supabase tarafından otomatik)
  - `slug`: string (URL'de kullanılacak, **benzersiz**, unique constraint)
  - `title`: string
  - `excerpt`: string (kısa açıklama, liste ve SEO için)
  - `cover_image_url`: string (Supabase Storage'dan dönen public URL)
  - `content`: string (zengin metin / Markdown / HTML – editör formatına göre)
  - `published`: boolean (yayında mı)
  - `featured_on_homepage`: boolean (ana sayfada gösterilsin mi; varsayılan false)
  - `homepage_order`: number (ana sayfada sıralama; küçük değer önce; örn. 0, 1, 2)
  - `view_count`: number (görüntülenme sayısı; varsayılan 0)
  - `like_count`: number (beğeni sayısı; varsayılan 0)
  - `created_at`: timestamptz (Supabase otomatik)
  - `updated_at`: timestamptz (Supabase otomatik veya trigger)
  - İstersen: `author`, `tags` (text[] veya ayrı tablo), `reading_time_minutes` (opsiyonel)
- **Supabase Storage:** Kapak görselleri için bir bucket (örn. `blog-covers`) oluştur; public okuma izni ver. Yükleme sonrası dönen public URL `cover_image_url` olarak kaydedilir.

---

## 2. Admin tarafı – Genel yapı

- **Admin rotası:** `app/admin/` altında.
  - `app/admin/layout.tsx`: Sadece admin sayfalarında görünen bir layout; sidebar veya üst menü ile "Blog listesi", "Yeni yazı", "Çıkış" gibi linkler.
  - Admin için basit bir koruma düşün: örneğin environment'ta `ADMIN_SECRET` veya ileride giriş (auth) eklenebilir; şimdilik sadece route yapısı hazır olsun.
- **Admin sayfaları:**
  - `app/admin/page.tsx`: Admin ana sayfa (dashboard), "Blog yönetimi"ne link.
  - `app/admin/blog/page.tsx`: **Blog listesi** (tüm yazılar).
  - `app/admin/blog/yeni/page.tsx`: **Yeni blog yazısı oluşturma**.
  - `app/admin/blog/[slug]/duzenle/page.tsx`: **Mevcut yazıyı düzenleme** (slug ile bul).

Tüm admin sayfalarında tema (CSS variables) ve responsive kuralları kullan; renkler `var(--color-*)`, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, başlıklar responsive (`text-2xl sm:text-3xl md:text-4xl` vb.).

---

## 3. Admin – Blog listesi (`/admin/blog`)

- Sayfa: Tüm blog yazılarını listele (Supabase'den çek).
- Her satırda: kapak önizlemesi (küçük), başlık, slug, yayın durumu (yayında / taslak), **Ana sayfada** (evet/hayır veya ikon), **görüntülenme** ve **beğeni** sayıları, oluşturma tarihi.
- Aksiyonlar: "Düzenle", "Sil" (silmeden önce onay). İstersen "Ana sayfada göster"ü listeden hızlı toggle ile aç/kapa.
- "Yeni yazı" butonu: `/admin/blog/yeni`'e yönlendir.
- Tablo veya kart grid'i responsive olsun (mobilde tek sütun, sm'den sonra tablo veya grid).
- Loading ve hata durumları: `loading.tsx` ve gerekirse `error.tsx` kullan.

---

## 4. Admin – Yeni yazı / Düzenleme sayfası (form)

Tek bir form bileşeni hem "yeni" hem "düzenle" için kullanılsın; düzenlemede mevcut değerler doldurulsun.

- **Alanlar:**
  1. **Başlık (title):** metin, zorunlu.
  2. **Slug:** metin, zorunlu; URL'de kullanılacak. Boş bırakılırsa başlıktan otomatik üret (Türkçe karakterleri değiştir, boşluk → tire).
  3. **Kısa açıklama (excerpt):** textarea, 1–2 cümle, liste ve SEO için.
  4. **Kapak görseli (coverImageUrl):**
     - Mevcut görsel varsa göster (önizleme).
     - Yükleme: dosya seç (input type file); kabul: image/*.
     - Yükleme sonrası: dosyayı sunucuya gönder (API route), dönen URL'i `coverImageUrl` alanına yaz.
  5. **İçerik (content):** Blog editörü (aşağıda).
  6. **Yayın durumu (published):** checkbox veya toggle (taslak / yayında).
  7. **Ana sayfada göster (featured_on_homepage):** checkbox veya toggle. İşaretlenirse yazı ana sayfada listelenir.
  8. **Ana sayfa sırası (homepage_order):** sayı (opsiyonel). Küçük değer önce; aynı değerlerde `updated_at` veya `created_at` kullan.
- Form gönderiminde:
  - **Yeni:** POST ile kaydet; sonra `/admin/blog` veya düzenleme sayfasına yönlendir.
  - **Düzenle:** PUT/PATCH ile güncelle; sonra liste veya aynı sayfada "Kaydedildi" mesajı.
- Validasyon: client'ta (ör. Zod) ve mümkünse server tarafında da (API'de) kontrol et; hata mesajları formda gösterilsin.

---

## 5. Admin – Kapak görseli yükleme (Supabase Storage + sıkıştırma)

- **Hedef:** Supabase Storage bucket'ına (örn. `blog-covers`) yükleme. Görsel boyutu büyükse **önce sıkıştır**, sonra yükle.
- **Sıkıştırma stratejisi:**
  - **İstemci tarafı (tercih):** Dosya seçildikten sonra, belirli bir boyut eşiğini (örn. 800 KB veya 1 MB) aşan görselleri tarayıcıda sıkıştır (Canvas API veya `browser-image-compression` gibi kütüphane). Max genişlik (örn. 1200–1600px) ve kalite (örn. 0.8) ile JPEG/WebP üret; böylece yükleme hızı ve Storage maliyeti düşer.
  - **Sunucu tarafı (opsiyonel):** API'de `sharp` ile boyut/kalite düşür; büyük dosya gelirse sıkıştırıp Storage'a yaz. İstemci sıkıştırsa bile sunucuda ikinci bir kontrol iyi olur.
- **API route:** `app/api/admin/blog/upload/route.ts`.
  - Method: POST.
  - Body: FormData; alan adı `file` veya `cover`.
  - Yapılacaklar:
    - Dosya tipi kontrolü (image/jpeg, image/png, image/webp).
    - Boyut sınırı (örn. max 3–5 MB; sıkıştırma sonrası daha küçük gelir).
    - İstersen sunucuda `sharp` ile resize/compress (örn. max 1600px genişlik, kalite 80).
    - Supabase Storage'a yükle: benzersiz dosya adı (uuid + uzantı), public URL al.
    - Response: `{ url: "https://...supabase.co/storage/v1/object/public/blog-covers/xyz.jpg" }`.
- İstemci: dosya seçilince (büyükse) sıkıştır → bu API'ye FormData ile at → dönen URL'i `cover_image_url` state'ine yaz ve önizlemede göster.

---

## 6. Admin – Blog editörü (yazı yazma sayfası)

- **İçerik alanı:** Zengin metin veya Markdown.
  - **Seçenek A – Markdown:** Textarea + önizleme (Markdown'ı HTML'e çevirip göster). Projede `react-markdown` kullanılabilir.
  - **Seçenek B – Rich text:** Basit bir WYSIWYG (ör. Tiptap, Lexical veya `contenteditable` ile minimal toolbar: başlık, kalın, liste, link). Editör çıktısı HTML veya JSON olarak `content` alanına kaydedilsin.
- Editör bileşeni:
  - Client component (`"use client"`).
  - Tema uyumlu: arka plan `var(--color-surface)`, metin `var(--color-text-primary)`, border `var(--color-border)`.
  - Responsive: mobilde tam genişlik, font boyutu `text-sm sm:text-base`.
- Otomatik kaydet (opsiyonel): belirli aralıklarla taslak olarak API'ye gönderebilirsin; ilk aşamada zorunlu değil.

---

## 6b. Blog eklerken / düzenlerken / silerken dikkat edilecekler

- **Slug benzersizliği:** Yeni kayıtta ve düzenlemede slug başka bir yazıda kullanılmamalı (kendi kaydı hariç). API'de insert/update öncesi kontrol et; çakışma varsa 409 veya anlamlı hata dön.
- **Kapak görseli değiştiğinde:** Eski kapak Supabase Storage'da kalır. İstersen eski dosyayı sil (Storage'dan remove); yoksa "orphan" dosyalar birikebilir. Periyodik temizlik veya düzenleme anında eski URL'deki dosyayı silme kararı projeye bırakılır.
- **Silme:** Yazı silinirken Storage'daki kapak dosyasını da silmek iyi bir pratiktir (URL'den dosya yolunu çıkarıp Storage delete). Ayrıca silme öncesi kullanıcıya onay göster ("Bu yazıyı kalıcı olarak silmek istediğinize emin misiniz?").
- **Yayın durumu:** Taslak (`published: false`) yazılar sadece admin tarafında görünsün; müşteri listesi ve tekil sayfa sadece `published === true` dönsün. Ana sayfada sadece hem `published` hem `featured_on_homepage` true olanlar listelensin.
- **Zorunlu alanlar:** title, slug, excerpt en azından boş olmasın; content boş olabilir (taslak). Validasyonu hem client (Zod) hem API'de yap.

---

## 7. Admin – Blog API route'ları (CRUD, Supabase)

- **GET** `app/api/admin/blog/route.ts`: Tüm yazıları Supabase'den döndür (admin listesi için).
- **GET** `app/api/admin/blog/[slug]/route.ts`: Tek yazı (slug ile).
- **POST** `app/api/admin/blog/route.ts`: Yeni yazı oluştur; body: title, slug, excerpt, cover_image_url, content, published, featured_on_homepage, homepage_order. Slug benzersizlik kontrolü yap; çakışma varsa 409.
- **PUT** veya **PATCH** `app/api/admin/blog/[slug]/route.ts`: Mevcut yazıyı güncelle. Slug değişiyorsa yeni slug'un başka kayıtta kullanılmadığını kontrol et.
- **DELETE** `app/api/admin/blog/[slug]/route.ts`: Yazıyı sil; mümkünse Supabase Storage'daki kapak dosyasını da sil.

**Müşteri tarafı (sayılar):**
- **POST** `app/api/blog/[slug]/view/route.ts`: Görüntülenme artır. İsteğe bağlı: cookie ile aynı ziyaretçiyi aynı gün tekrar sayma.
- **POST** `app/api/blog/[slug]/like/route.ts`: Beğeni artır. İsteğe bağlı: cookie/localStorage ile aynı ziyaretçinin tekrar beğenmesini engelle.

Tüm admin API'lerinde ileride auth eklenebilir diye yorum bırak; şimdilik CRUD + Supabase client (server-side) kullan.

---

## 8. Müşteri tarafı – Blog listesi (`/blog`)

- **Sayfa:** `app/blog/page.tsx` (mevcut dosyayı genişlet).
  - Veriyi Server Component ile çek: Supabase'den sadece **published** yazılar.
  - Sıralama: `updated_at` veya `created_at`'e göre yeniden eskiye.
  - Her yazı için kart: mevcut `Card` bileşenini kullan; `title`, `excerpt`, `cover_image_url`, `slug` ile `/blog/[slug]` linki. İstersen kartta görüntülenme ve beğeni sayılarını göster.
  - Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`, Section ile sarmalı.
  - Metadata: title "Blog | Site Adı", description "Kısa site açıklaması".

---

## 9. Müşteri tarafı – Tekil blog yazısı (`/blog/[slug]`)

- **Sayfa:** `app/blog/[slug]/page.tsx`.
  - Slug ile yazıyı getir; bulunamazsa 404.
  - Sadece `published === true` ise göster; değilse 404.
  - Layout:
    - Kapak görseli: üstte, `next/image` ile, aspect oranı korunmuş (örn. aspect-video veya 16/9).
    - Başlık (h1), tarih (created_at/updated_at), isteğe bağlı okuma süresi.
    - **Görüntülenme ve beğeni:** Sayfa yüklendiğinde görüntülenme sayısını artır (API: POST veya PATCH, tek sefer sayılması için cookie/session kontrolü veya basit increment). Beğeni butonu: tıklanınca `like_count` artır (API); aynı ziyaretçinin tekrar beğenmesini engellemek için cookie veya localStorage.
    - İçerik: `content` alanı Markdown ise `react-markdown` ile render et; HTML ise `dangerouslySetInnerHTML` (sadece kendi içeriğin olduğunda güvenli) veya bir HTML render bileşeni.
  - Stil: Tema değişkenleri; tipografi `prose` benzeri sınıflar (Tailwind Typography eklentisi varsa `prose` kullan) veya kendi sınıfların; responsive `text-sm sm:text-base`, container `max-w-3xl mx-auto` gibi.
  - Metadata: `generateMetadata` ile dinamik title (yazı başlığı) ve description (excerpt).

---

## 9b. Ana sayfada hangi bloglar görünsün

- **Kural:** Sadece `published === true` **ve** `featured_on_homepage === true` olan yazılar ana sayfada listelensin.
- **Sıralama:** Önce `homepage_order` (küçükten büyüğe), aynı order değerlerinde `updated_at` yeniden eskiye. Limit koy (örn. en fazla 3 veya 6 kart).
- **Yer:** Ana sayfa (`app/page.tsx`) içinde bir bölüm: örn. "Son Yazılar" veya "Öne Çıkan Yazılar". Mevcut Section/CardGridSection yapısına uyumlu; Card bileşeni ile blog kartları, `/blog/[slug]` linki.
- **Veri:** Server Component ile Supabase'den `published = true AND featured_on_homepage = true` filtresi, order by `homepage_order ASC, updated_at DESC`, limit 6 (veya seçilen sayı).

---

## 10. Yardımcılar ve tip güvenliği

- `lib/types/blog.ts`: Post tipi (Supabase satırı ile uyumlu: snake_case alanlarını istersen camelCase'e map et).
- `lib/supabase.ts` (veya `lib/supabase/server.ts`): Supabase client (server-side); API route ve Server Component'larda kullan. Environment: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (admin işlemleri için).
- `lib/blog.ts`: Blog verisi okuyan/yazan yardımcılar (getPosts, getPostBySlug, getPostsForHomepage, createPost, updatePost, deletePost) Supabase üzerinden; API route'lar veya sayfalar bu fonksiyonları kullansın.
- Slug üretimi: `lib/slug.ts` (Türkçe karakterleri Latin karşılıklara çevir, küçük harf, boşluk → tire).

---

## 11. Özet kontrol listesi

- [ ] Supabase: `posts` tablosu (slug unique, view_count, like_count), Storage bucket `blog-covers`
- [ ] Post tipi (featured_on_homepage, homepage_order dahil) ve lib/supabase + lib/blog
- [ ] Admin layout ve menü
- [ ] Admin blog listesi (Ana sayfada sütunu/toggle dahil)
- [ ] Admin "yeni yazı" ve "düzenle" sayfaları (tek form; ana sayfada göster + sıra alanları)
- [ ] Kapak görseli: istemci/sunucu sıkıştırma + Supabase Storage yükleme
- [ ] Blog editörü (Markdown veya rich text)
- [ ] Admin API: list, get, create, update, delete (Supabase + slug benzersizlik)
- [ ] Silme/düzenlemede dikkat: onay, Storage dosya temizliği
- [ ] Müşteri blog listesi (`/blog`)
- [ ] Müşteri tekil yazı (`/blog/[slug]`) + görüntülenme artırma + beğeni butonu (API: view, like)
- [ ] Ana sayfada öne çıkan bloglar (featured_on_homepage + homepage_order, limit)
- [ ] Tema ve responsive kurallarına uyum
- [ ] Metadata ve SEO (title, description)

Bu prompt'u parça parça kullanabilirsin: önce "1 ve 2'yi uygula", sonra "3'ü uygula" gibi. Her adımda proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
