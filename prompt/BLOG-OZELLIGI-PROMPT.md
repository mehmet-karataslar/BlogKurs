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
  - `content`: string (**rich text çıktısı:** HTML veya editörün JSON formatı; saklama ve gösterimde aynı format kullanılır)
  - `published`: boolean (yayında mı)
  - `featured_on_homepage`: boolean (ana sayfada gösterilsin mi; varsayılan false)
  - `homepage_order`: number (ana sayfada sıralama; küçük değer önce; örn. 0, 1, 2)
  - `reading_time_minutes`: number (tahmini okuma süresi, dakika; opsiyonel, varsayılan 5)
  - `category_id`: string (kategori tablosuna FK; opsiyonel) veya `category`: string (tek alan; örn. "Teknoloji", "Kişisel")
  - `view_count`: number (görüntülenme sayısı; varsayılan 0)
  - `like_count`: number (beğeni sayısı; varsayılan 0)
  - `created_at`: timestamptz (Supabase otomatik)
  - `updated_at`: timestamptz (Supabase otomatik veya trigger)
  - İstersen: `author`, `tags` (text[] veya ayrı tablo)
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

## 4. Admin – Yeni yazı / Düzenleme sayfası (form ve düzen)

Tek bir form bileşeni hem "yeni" hem "düzenle" için kullanılsın; düzenlemede mevcut değerler doldurulsun.

**Sayfa düzeni (referans arayüzle uyumlu):**
- **Sol taraf:** İki bölüm — **(1) Temel Bilgiler** (üstte), **(2) İçerik** (altta, zengin metin editörü).
- **Sağ taraf:** Üç bölüm — **(1) Kapak Görseli**, **(2) Yayınlama**, **(3) Kategori**. Responsive: mobilde tek sütun; masaüstünde sol/sağ grid (örn. 2/3 + 1/3).

**Alanlar (sırayla):**

**Sol – Temel Bilgiler**
1. **Başlık (title)***: metin, zorunlu. Placeholder örn. "Yazı başlığı".
2. **URL Slug***: metin, zorunlu; URL'de kullanılacak. Placeholder örn. "yazi-basligi". Boş bırakılırsa başlıktan otomatik üret (Türkçe karakterleri değiştir, boşluk → tire).
3. **Özet (excerpt):** textarea, yazının kısa özeti; liste ve SEO için. Placeholder örn. "Yazının kısa özeti...".

**Sol – İçerik**
4. **İçerik (content):** **Zengin metin (rich text) editörü** — aşağıda Bölüm 6'da tanımlı. Üstte kısa bilgi: "Yazınızı düzenlemek için gelişmiş editörü kullanın." İsteğe bağlı: **"Dosyadan Aktar"** butonu (metin/Markdown dosyası yükleyip editöre aktarma).

**Sağ – Kapak Görseli**
5. **Kapak görseli (cover_image_url):** "URL girin veya dosya yükleyin" ifadesi; iki seçenek: **(URL)** butonu (açılır alan veya inline input ile URL yapıştır), **(Dosya)** butonu (dosya seç → sıkıştır → API'ye yükle → dönen URL kullan). Altında **Görsel Önizlemesi** alanı (seçilen/kaydedilen görsel varsa göster; yoksa placeholder/ikon).

**Sağ – Yayınlama**
6. **Yayınla (published):** Toggle — "Yazıyı hemen yayınla".
7. **Ana sayfada göster (featured_on_homepage):** Toggle — "Bu yazıyı ana sayfada öne çıkar".
8. **Okuma süresi (reading_time_minutes):** Sayı alanı (dk); varsayılan 5. Label örn. "Okuma Süresi (dk)".

**Sağ – Kategori**
9. **Kategori:** Dropdown "Kategori seçin". Kategoriler ayrı tablodan veya sabit liste (örn. "Teknoloji", "Kişisel", "Eğitim"); `category_id` veya `category` alanına yazılır.
10. **Ana sayfa sırası (homepage_order):** Sayı (opsiyonel); ana sayfada sıralama.

- Form gönderiminde: **Yeni** → POST; **Düzenle** → PUT/PATCH. Başarıda "Kaydedildi" veya liste sayfasına yönlendir.
- Validasyon: client (Zod) ve API; hata mesajları formda gösterilsin.

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

## 6. Admin – Blog editörü: zengin metin (Rich Text)

- **İçerik alanı:** **Sadece zengin metin (WYSIWYG).** Markdown kullanılmaz; editör çıktısı HTML (veya Tiptap/Lexical JSON) olarak `content` alanına kaydedilir. Müşteri tarafında içerik HTML olarak render edilir.
- **Kütüphane:** Tiptap, Lexical, Quill veya benzeri bir **rich text** kütüphanesi kullan. Tiptap önerilir (React, geniş eklenti, HTML/JSON çıktı).
- **Toolbar (menü çubuğu)** — aşağıdakiler mutlaka olsun:
  - Geri al / İleri al (undo / redo).
  - Font ailesi seçici (örn. Inter, Arial).
  - Font boyutu seçici (örn. 14px, 16px).
  - Metin rengi ve vurgu (highlight) rengi.
  - Başlık seviyesi (H1, H2, H3 …).
  - Temel biçimlendirme: **Kalın**, *İtalik*, <u>Altı çizili</u>, ~~Üstü çizili~~.
  - Kod (inline) ve kod bloğu.
  - Hizalama: sola, ortaya, sağa, iki yana.
  - Listeler: madde işaretli, numaralı, checkbox.
  - Girinti artır / azalt.
  - **"+ Ekle"** veya benzeri: medya (görsel, video), tablo, blok ekleme.
  - Link ekleme (zincir ikonu).
  - Görsel ekleme (resim ikonu).
  - Tablo ekleme (grid ikonu).
  - Alıntı (quote), kod bloğu, yatay çizgi.
  - Biçimlendirmeyi temizle.
  - Tam ekran (fullscreen) aç/kapa.
  - İsteğe bağlı: arama (Q), belge yapısı / outline.
- **İçerik alanı:** Placeholder örn. "Blog yazınızı buraya yazın...". Yüksek textarea; tema uyumlu stiller.
- **Dosyadan Aktar:** Toolbar veya üstte buton — kullanıcı .txt / .md dosyası seçer; içerik editöre aktarılır (düz metin veya Markdown isteğe bağlı HTML’e çevrilebilir).
- Editör bileşeni:
  - Client component (`"use client"`).
  - Tema uyumlu: arka plan `var(--color-surface)`, metin `var(--color-text-primary)`, border `var(--color-border)`.
  - Responsive: mobilde tam genişlik, font `text-sm sm:text-base`.
- Otomatik kaydet (opsiyonel): belirli aralıklarla taslak olarak API'ye gönderilebilir.

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
- **POST** `app/api/admin/blog/route.ts`: Yeni yazı oluştur; body: title, slug, excerpt, cover_image_url, content, published, featured_on_homepage, homepage_order, reading_time_minutes, category_id (veya category). Slug benzersizlik kontrolü; çakışma varsa 409.
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
    - İçerik: `content` alanı **rich text çıktısı (HTML)** olarak render edilir; `dangerouslySetInnerHTML` veya bir HTML render bileşeni (XSS’e karşı sanitize edilmiş içerik) kullan. Projede tek format HTML’dir.
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
- [ ] Blog editörü: zengin metin (rich text) + toolbar + Dosyadan Aktar; form düzeni sol (temel + içerik) / sağ (kapak, yayınlama, kategori)
- [ ] Admin API: list, get, create, update, delete (Supabase + slug benzersizlik)
- [ ] Silme/düzenlemede dikkat: onay, Storage dosya temizliği
- [ ] Müşteri blog listesi (`/blog`)
- [ ] Müşteri tekil yazı (`/blog/[slug]`) + görüntülenme artırma + beğeni butonu (API: view, like)
- [ ] Ana sayfada öne çıkan bloglar (featured_on_homepage + homepage_order, limit)
- [ ] Tema ve responsive kurallarına uyum
- [ ] Metadata ve SEO (title, description)

Bu prompt'u parça parça kullanabilirsin: önce "1 ve 2'yi uygula", sonra "3'ü uygula" gibi. Her adımda proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
