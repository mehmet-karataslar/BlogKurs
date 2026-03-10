# İletişim ve Mesajlar Özelliği – Uygulama Prompt'u

Bu dosya, BlogKurs projesine **İletişim sayfası** (kullanıcıların mesaj göndermesi) ve **Admin Mesajlar** (gelen mesajları görüntüleme ve cevaplama) özelliğini eklemek için adım adım kullanabileceğin detaylı bir prompt'tur. Blog, Projeler ve Hakkımda prompt'ları ile aynı mantıkta; proje kurallarına (tema, responsive, React/Next.js) uygun şekilde uygula.

---

## 1. Veri modeli ve depolama

- **Mesaj (Contact Message):** Kullanıcının iletişim formundan gönderdiği her kayıt bir mesaj satırıdır.
- **Depolama:** Supabase kullanılır. Mesajlar bir `contact_messages` (veya `mesajlar`) tablosunda tutulur.
- **Contact Message** için TypeScript tipi ve Supabase tablo alanları:
  - `id`: string (uuid, Supabase otomatik)
  - `name`: string (gönderen adı)
  - `email`: string (gönderen e-posta; cevap için kullanılır)
  - `subject`: string (konu; opsiyonel, boş string kabul)
  - `message`: string (mesaj metni)
  - `status`: string — **"new"** | **"read"** | **"replied"** (okundu / cevaplandı takibi)
  - `reply_text`: string (admin'in yazdığı cevap metni; boş olabilir)
  - `replied_at`: timestamptz (cevap yazılma tarihi; opsiyonel)
  - `created_at`: timestamptz (mesajın gönderilme tarihi; Supabase otomatik)
- **İsteğe bağlı:** Cevap gönderildiğinde kullanıcıya e-posta ile cevabı iletmek (e-posta servisi entegrasyonu ayrı bir adımda yapılabilir; ilk aşamada sadece `reply_text` ve `replied_at` veritabanında tutulur).

---

## 2. Müşteri tarafı – İletişim sayfası (`/iletisim`)

- **Sayfa:** `app/iletisim/page.tsx` (mevcut dosyayı genişlet).
  - Üstte kısa açıklama (örn. "Projeler, iş birlikleri veya sorularınız için formu doldurun.").
  - İstersen mevcut e-posta ve konum bilgisini de göster (site config'den).
  - **İletişim formu (Client Component):**
    - **Ad / İsim (name):** metin, zorunlu.
    - **E-posta (email):** metin, zorunlu; geçerli e-posta formatı kontrolü.
    - **Konu (subject):** metin, opsiyonel.
    - **Mesaj (message):** textarea, zorunlu; minimum karakter (örn. 10) isteğe bağlı.
  - Gönder butonu: form submit → API'ye POST → başarıda "Mesajınız alındı, en kısa sürede dönüş yapacağız." benzeri mesaj; hata durumunda hata metni.
  - Spam azaltma: İsteğe bağlı basit CAPTCHA veya honeypot alanı; ilk aşamada sadece rate limit (aynı IP’den çok istek engelleme) de düşünülebilir.
- Form tema ve responsive kurallarına uygun; `var(--color-*)`, uygun padding ve font boyutları.
- **Metadata:** title "İletişim | Site Adı", description.

---

## 3. Admin tarafı – Genel yapı

- **Yeni sekme / menü:** Admin layout'a **"Mesajlar"** linki ekle → `/admin/mesajlar`.
  - Blog, Projeler, Hakkımda ile aynı admin layout içinde; sidebar veya üst menüde "Mesajlar" tıklanınca gelen mesajlar listesine gidilir.
- **Admin sayfaları (mesajlar):**
  - `app/admin/mesajlar/page.tsx`: **Mesaj listesi** — kullanıcılardan gelen tüm mesajlar.
  - `app/admin/mesajlar/[id]/page.tsx`: **Mesaj detayı** — tek mesajı göster, cevap yaz ve kaydet (veya liste sayfasında modal/drawer ile cevap alanı).

---

## 4. Admin – Mesaj listesi (`/admin/mesajlar`)

- **Sayfa:** Tüm mesajları listele (Supabase'den; `created_at` yeniden eskiye veya tersi).
- **Her satırda (tablo veya kart):**
  - Gönderen adı (name), e-posta (email), konu (subject) — kısa önizleme.
  - Mesaj metninin ilk birkaç kelimesi (preview).
  - Durum (status): **Yeni** / **Okundu** / **Cevaplandı** — renk veya badge ile (tema badge'leri kullan).
  - Tarih (created_at).
  - Aksiyon: **"Görüntüle"** veya **"Detay"** → mesaj detay sayfasına veya açılır panel/modal.
- **Filtre (isteğe bağlı):** Sadece "Yeni" mesajları gösterme seçeneği.
- Loading ve hata: `loading.tsx`, `error.tsx`.
- Tema ve responsive: `var(--color-*)`, mobilde kart/liste düzeni.

---

## 5. Admin – Mesaj detayı ve cevaplama

- **Sayfa veya panel:** `app/admin/mesajlar/[id]/page.tsx` (veya modal/drawer).
  - **Gösterilen bilgiler:** Ad, e-posta, konu, mesaj metni, gönderim tarihi.
  - **"Okundu" işaretleme:** Detay açıldığında veya bir butonla `status` "read" yapılır (PATCH).
  - **Cevap alanı:**
    - Textarea: Admin cevap metnini yazar.
    - "Cevabı kaydet" (veya "Cevapla") butonu → PATCH ile `reply_text`, `replied_at` ve `status: "replied"` güncellenir.
  - İsteğe bağlı: "Cevabı e-posta ile gönder" — kaydettiğin cevabı gönderenin `email` adresine mail at (bu adım için e-posta servisi gerekir; prompt'ta sadece "ileride eklenebilir" notu düşülebilir).
- Başarılı kayıtta kısa bildirim veya sayfada "Cevap kaydedildi" mesajı.

---

## 6. Mesaj gönderirken / yönetirken dikkat edilecekler

- **Form validasyonu:** Ad ve e-posta zorunlu; e-posta formatı client ve (mümkünse) API'de kontrol edilsin. Mesaj alanı boş gönderilmesin.
- **Rate limiting:** Aynı IP veya e-posta adresinden kısa sürede çok sayıda istek gelirse 429 veya benzeri yanıt; spam azaltmak için.
- **Gizlilik:** Mesajlar sadece admin tarafında görünsün; public API'de mesaj listesi veya detay döndürülmesin. Sadece POST (mesaj gönderme) public.
- **Status akışı:** new → read (detay açıldığında veya manuel) → replied (cevap yazıldığında).

---

## 7. API route'ları

- **POST** `app/api/contact/route.ts` (veya `app/api/iletisim/route.ts`):
  - **Public.** Body: `{ name, email, subject?, message }`.
  - Validasyon: name, email, message zorunlu; email format.
  - Supabase'e insert: `contact_messages` tablosuna yeni satır; status varsayılan "new".
  - Başarı: 201 ve kısa mesaj; hata: 400 (validasyon) veya 500.
  - İsteğe bağlı: rate limit middleware veya basit kontrol.

- **GET** `app/api/admin/mesajlar/route.ts`:
  - Tüm mesajları döndür (admin için). İleride auth ile korunacak.
  - Sıralama: `created_at` desc (en yeni üstte).

- **GET** `app/api/admin/mesajlar/[id]/route.ts`:
  - Tek mesaj detayı (id ile).

- **PATCH** `app/api/admin/mesajlar/[id]/route.ts`:
  - Body: `{ status?, reply_text?, replied_at? }`. Okundu işaretleme veya cevap kaydetme.
  - Cevap kaydedilirken `status: "replied"`, `replied_at: now` set edilir.

---

## 8. Yardımcılar ve tip güvenliği

- `lib/types/contact.ts` (veya `lib/types/message.ts`): `ContactMessage` tipi; API request/response tipleri.
- Supabase client (mevcut `lib/supabase`): `contact_messages` tablosuna insert, select, update.
- İsteğe bağlı: `lib/contact.ts` — `createMessage(data)`, `getMessages()`, `getMessageById(id)`, `updateMessage(id, data)`; API route'lar bu fonksiyonları kullansın.

---

## 9. Özet kontrol listesi

- [ ] Supabase: `contact_messages` tablosu (name, email, subject, message, status, reply_text, replied_at, created_at)
- [ ] ContactMessage tipi ve (isteğe bağlı) lib/contact yardımcıları
- [ ] Müşteri İletişim sayfası: form (ad, e-posta, konu, mesaj) + POST API + başarı/hata mesajı
- [ ] Admin layout'a "Mesajlar" sekmesi/linki
- [ ] Admin mesaj listesi (`/admin/mesajlar`): tablo veya kart, durum badge'i, tarih, detay linki
- [ ] Admin mesaj detayı (`/admin/mesajlar/[id]`): mesaj içeriği, okundu işaretleme, cevap textarea + kaydet (PATCH)
- [ ] API: POST /api/contact (public), GET/PATCH /api/admin/mesajlar (list + by id + update)
- [ ] Validasyon (client + API), rate limit veya spam önleme (isteğe bağlı)
- [ ] Tema ve responsive kurallarına uyum
- [ ] Metadata (İletişim sayfası title, description)

Bu prompt'u parça parça uygula; blog, projeler ve hakkımda prompt'ları ile aynı pattern'leri takip et. Proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
