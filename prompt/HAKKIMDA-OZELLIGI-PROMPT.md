# Hakkımda Özelliği – Uygulama Prompt'u

Bu dosya, BlogKurs projesine **Hakkımda** (site sahibinin kendini tanıttığı, admin'den yönetilen tek profil) özelliği eklemek için adım adım kullanabileceğin detaylı bir prompt'tur. Blog ve Projeler prompt'ları ile aynı mantıkta; proje kurallarına (tema, responsive, React/Next.js) uygun şekilde uygula.

---

## 1. Veri modeli ve depolama

- **Tek profil:** Hakkımda sayfası tek bir “profil” kaydına dayanır (liste yok; ekleme/çıkarma sadece alt listelerde: okullar, sertifikalar, yetenekler).
- **Depolama seçenekleri:**
  - **Supabase:** Tek satırlık bir `about` tablosu (id, name, surname, …) veya `id = 1` gibi sabit tek kayıt.
  - **Dosya:** `data/about.json` gibi tek bir JSON dosyası; API route'lar bu dosyayı okuyup yazar.
- **Profil (About)** için TypeScript tipi ve alanlar:
  - `name`: string (ad)
  - `surname`: string (soyad)
  - `tagline`: string (kısa unvan, örn. "Yazılım Mühendisi")
  - `profile_image_url`: string (profil / kapak fotoğrafı; Supabase Storage veya `public` URL)
  - `bio`: string (uzun açıklama, hikaye; Markdown veya düz metin)
  - `schools`: array — **Okuduğu okullar.** Her öğe: `id`, `name`, `period` (örn. "2015–2019"), `description` (opsiyonel). Admin'den ekleme/çıkarma/düzenleme.
  - `certificates`: array — **Sertifikalar.** Her öğe: `id`, `name`, `issuer`, `date`, `url` (opsiyonel). Admin'den ekleme/çıkarma/düzenleme.
  - `skills`: array — **Yetenekler / beceriler.** Her öğe: `id`, `name`, `level` (opsiyonel: "beginner" | "intermediate" | "advanced" | "expert"). Admin'den ekleme/çıkarma/düzenleme.
  - `technical_info`: string (site sahibiyle ilgili teknik ve diğer bilgiler; Markdown veya HTML). İstersen ayrı alanlara bölünebilir.
  - `updated_at`: string (ISO tarih; son güncelleme)
- **Profil fotoğrafı:** Supabase Storage bucket (örn. `about` veya `avatars`) veya `public/images/about/`; yükleme API'si ile URL üretilir.

---

## 2. Admin tarafı – Genel yapı

- **Admin rotası:** `app/admin/` altında (blog ve projeler ile aynı layout).
  - Layout menüsüne "Hakkımda" linki ekle → `/admin/hakkimda`.
- **Admin sayfası (tek sayfa):**
  - `app/admin/hakkimda/page.tsx`: **Hakkımda düzenleme.** Tek bir form; tüm profil alanları burada. Liste sayfası yok (tek kayıt).

Tüm admin sayfalarında tema (CSS variables) ve responsive kuralları kullan; renkler `var(--color-*)`, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## 3. Admin – Hakkımda düzenleme formu

- **Tek form:** Hem veriyi göster hem kaydet. Sayfa açılışında mevcut profil GET ile çekilir; form doldurulur.
- **Alanlar (sırayla):**
  1. **Ad (name):** metin, zorunlu.
  2. **Soyad (surname):** metin, zorunlu.
  3. **Kısa unvan (tagline):** metin (örn. "Yazılım Mühendisi").
  4. **Profil / kapak fotoğrafı (profile_image_url):**
     - Mevcut görsel varsa önizleme (yuvarlak veya dikdörtgen).
     - Yükleme: dosya seç (image/*) → gerekirse sıkıştır → API'ye yükle → dönen URL'i alana yaz. "Kaldır" ile URL'i temizle.
  5. **Hakkımda metni (bio):** textarea veya Markdown editörü (blog ile aynı yapı).
  6. **Okuduğu okullar (schools):**
     - Dinamik liste. Her satır: Okul adı, Dönem (period), Açıklama (opsiyonel). **Ekle** ile yeni satır, **Çıkar** ile o satırı sil. Sıralama sürükle-bırak veya sıra numarası ile yapılabilir.
  7. **Sertifikalar (certificates):**
     - Dinamik liste. Her satır: Sertifika adı, Veren kurum (issuer), Tarih, Link (url). **Ekle** / **Çıkar**.
  8. **Yetenekler / beceriler (skills):**
     - Dinamik liste. Her satır: Yetenek adı, Seviye (opsiyonel: başlangıç / orta / ileri / uzman). **Ekle** / **Çıkar**.
  9. **Teknik ve diğer bilgiler (technical_info):** textarea veya Markdown; site sahibiyle ilgili tüm ek bilgiler.
- **Kaydet:** Form gönderiminde PUT (veya PATCH) ile tek kaydı güncelle; başarıda "Kaydedildi" mesajı veya kısa toast.
- **Validasyon:** Client'ta (Zod vb.) ve mümkünse API'de; ad/soyad zorunlu, URL'ler geçerli format.

---

## 4. Admin – Profil fotoğrafı yükleme

- **Hedef:** Profil/kapak fotoğrafını yükleyip `profile_image_url` alanına yazılacak URL'i üretmek.
- **API route:** `app/api/admin/about/upload/route.ts` (veya `app/api/admin/hakkimda/upload/route.ts`).
  - Method: POST.
  - Body: FormData; alan adı `file` veya `image`.
  - Dosya tipi (image/*), boyut sınırı (örn. 2 MB). İstenirse sunucuda sıkıştırma (örn. `sharp`).
  - Supabase kullanılıyorsa: Storage bucket'a yükle, public URL döndür. Dosya kullanılıyorsa: `public/images/about/` (veya benzeri) altında benzersiz isimle kaydet, `/images/about/xxx.jpg` gibi URL döndür.
  - Response: `{ url: "..." }`.
- İstemci: Dosya seç → (büyükse) sıkıştır → API'ye at → dönen URL'i form state'ine yaz; önizlemede göster.

---

## 5. Hakkımda eklerken / düzenlerken dikkat edilecekler

- **Tek kayıt:** İlk kez açıldığında kayıt yoksa boş form göster; ilk kayıtta INSERT, sonrakilerde UPDATE. Supabase'de `id = 1` veya tek satır; JSON'da tek dosya.
- **Alt listeler (schools, certificates, skills):** Her öğeye benzersiz `id` (uuid veya geçici client id) ver; çıkarırken sadece ilgili öğeyi diziden kaldır.
- **Profil fotoğrafı değişince:** Eski görseli Storage'dan veya public klasöründen silmek iyi pratiktir (opsiyonel).
- **Zorunlu alanlar:** En azından name, surname dolu olsun; diğerleri boş kalabilir.

---

## 6. API route'ları

- **GET** `app/api/about/route.ts`: Tek profil kaydını döndür. Müşteri tarafı (Hakkımda sayfası) bu endpoint'i kullanır.
- **GET** `app/api/admin/about/route.ts`: Admin formu için aynı veriyi döndür (ileride auth ile kısıtlanabilir).
- **PUT** `app/api/admin/about/route.ts`: Tek profil kaydını güncelle. Body: tüm About nesnesi (name, surname, schools, …). Validasyon yap.
- **POST** `app/api/admin/about/upload/route.ts`: Profil fotoğrafı yükle; `{ url }` döndür.

---

## 7. Müşteri tarafı – Hakkımda sayfası (`/hakkimda`)

- **Sayfa:** `app/hakkimda/page.tsx`.
  - Veriyi Server Component ile çek: GET `/api/about` veya doğrudan veri katmanından (getAbout).
  - **İçerik düzeni (sırayla):**
    - Üst: Profil fotoğrafı (varsa), ad soyad, tagline. Görsel yuvarlak veya vurgulu; tema uyumlu.
    - Hakkımda metni (bio); Markdown ise render et.
    - Okuduğu okullar: başlık + liste (okul adı, dönem, açıklama). Kart veya liste görünümü.
    - Sertifikalar: başlık + liste (ad, veren, tarih, varsa link). Kart veya liste.
    - Yetenekler: başlık + etiketler veya seviyeli liste (isim + seviye).
    - Teknik ve diğer bilgiler: başlık + içerik (Markdown/HTML).
  - **Animasyon:** Sayfa düzgün ve akıcı animasyonlarla sunulsun. Öneriler:
    - Bölümler (profil, bio, okullar, sertifikalar, yetenekler, teknik bilgi) sırayla **fade-in + hafif yukarı kayma** (opacity 0→1, transform translateY).
    - **Stagger:** Liste öğeleri (okul, sertifika, yetenek) kısa gecikmeyle (animation-delay) görünsün.
    - CSS `transition` / `animation` veya (tercih edilirse) Framer Motion gibi kütüphane. Proje kurallarına uygun; tema renkleri ve responsive korunsun.
  - Stil: Tema değişkenleri (`var(--color-*)`), responsive (text-sm sm:text-base, padding, grid). Container `max-w-3xl` veya `max-w-4xl` mx-auto.
  - **Metadata:** `generateMetadata` ile title "Hakkımda | Site Adı", description (bio'nun ilk cümleleri veya tagline).

---

## 8. Yardımcılar ve tip güvenliği

- `lib/types/about.ts`: About tipi, School, Certificate, Skill alt tipleri; varsayılan boş profil (DEFAULT_ABOUT) gerekirse.
- `lib/about.ts` (veya veri kaynağına göre `lib/supabase`): getAbout(), saveAbout(data). API route'lar ve sayfa bu fonksiyonları kullansın.
- Depolama Supabase ise: tek satırlık tablo veya key-value; `saveAbout` insert/upsert yapar.

---

## 9. Özet kontrol listesi

- [ ] About veri modeli (name, surname, tagline, profile_image_url, bio, schools, certificates, skills, technical_info)
- [ ] Depolama: Supabase tek satır veya `data/about.json`
- [ ] Admin Hakkımda sayfası (tek form; okullar/sertifikalar/yetenekler için ekle-çıkar)
- [ ] Profil fotoğrafı yükleme API'si + formda önizleme ve kaldırma
- [ ] API: GET (public), GET/PUT (admin), POST upload
- [ ] Müşteri Hakkımda sayfası (`/hakkimda`): tüm alanlar, düzenli layout
- [ ] Animasyon: bölümler ve liste öğeleri için fade-in / stagger (CSS veya kütüphane)
- [ ] Tema ve responsive kurallarına uyum
- [ ] Metadata ve SEO (title, description)

Bu prompt'u parça parça kullan; blog ve projeler prompt'ları ile aynı pattern'leri takip et. Proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
