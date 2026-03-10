# CV / Özgeçmiş Özelliği – Uygulama Prompt'u

Bu dosya, BlogKurs projesine **CV bölümü** eklemek için kullanılacak detaylı bir prompt'tur. İki kullanım senaryosu vardır: **(1)** Admin kendi CV bilgilerini girer, kaydeder ve PDF olarak indirir; **(2)** Normal kullanıcı (ziyaretçi) aynı formu doldurup kendi CV'sini anında PDF olarak oluşturup indirir (veri kaydedilmez veya isteğe bağlı kaydedilir). Proje kurallarına (tema, responsive, React/Next.js) uygun şekilde uygula.

---

## 1. Veri modeli – CV yapısı

- **Ortak yapı:** Hem admin'in kaydettiği CV hem de kullanıcının formdan doldurduğu veri aynı CV veri modelini kullanır. PDF şablonu bu modele göre render edilir.
- **CV (Resume)** için TypeScript tipi ve alanlar:

  **Kişisel bilgiler**
  - `name`: string (ad)
  - `surname`: string (soyad)
  - `email`: string (e-posta)
  - `phone`: string (telefon; opsiyonel)
  - `location`: string (şehir / konum; opsiyonel)
  - `summary`: string (kısa özet / profil; 1–2 paragraf)
  - `photo_url`: string (profil fotoğrafı URL; opsiyonel)

  **Eğitim (dinamik liste)**
  - `education`: array. Her öğe: `id`, `school`, `degree` (örn. "Lisans"), `field` (bölüm), `start_date`, `end_date`, `description` (opsiyonel).

  **İş deneyimi (dinamik liste)**
  - `experience`: array. Her öğe: `id`, `company`, `role` (pozisyon), `start_date`, `end_date`, `description` (görevler, maddeler).

  **Yetenekler / beceriler**
  - `skills`: array. Her öğe: `id`, `name`, `level` (opsiyonel: "beginner" | "intermediate" | "advanced" | "expert") veya sadece `name` (etiket gibi).

  **Sertifikalar (opsiyonel)**
  - `certificates`: array. Her öğe: `id`, `name`, `issuer`, `date`, `url` (opsiyonel).

  **Diller (opsiyonel)**
  - `languages`: array. Her öğe: `id`, `name`, `level` (örn. "Ana dil", "İleri", "Orta").

  **Ek bilgiler (opsiyonel)**
  - `additional`: string (serbest metin; referanslar, hobiler vb.)

  **Meta**
  - `updated_at`: string (son güncelleme; admin kaydı için)

- **Depolama (sadece admin CV’si için):**
  - **Supabase:** Tek satırlık `cv` tablosu (id = 1 veya tek kayıt) veya `cv_data` JSONB tek sütun.
  - **Dosya:** `data/cv.json`; API ile okuma/yazma.
  - Normal kullanıcı formdan doldurduğunda **varsayılan olarak veri kaydedilmez**; sadece PDF oluşturulup indirilir. İleride "CV’mi kaydet" (giriş gerekir) eklenebilir.

---

## 2. Admin tarafı – CV yönetimi ve PDF

- **Menü:** Admin layout'a **"CV"** veya **"Özgeçmiş"** linki → `/admin/cv`.
- **Sayfa:** `app/admin/cv/page.tsx`
  - **Tek form:** Tüm CV alanları (ad, soyad, e-posta, telefon, konum, özet, fotoğraf URL’i veya yükleme; eğitim / deneyim / yetenekler / sertifikalar / diller için dinamik listeler – ekle/çıkar/düzenle). Hakkımda ve Projeler prompt’larındaki “dinamik liste” pattern’i aynen uygulanır.
  - **Önizleme (isteğe bağlı):** Formun altında veya yanında, doldurulan veriyle CV’nin ekranda nasıl görüneceğini göster (PDF ile aynı düzen veya basit versiyon).
  - **Kaydet:** PUT (veya POST) ile tek CV kaydını güncelle.
  - **"PDF indir" / "CV'yi PDF olarak indir" butonu:** Mevcut form verisini (veya kaydedilmiş CV verisini) kullanarak PDF üretir ve indirme başlatır. İki yol:
    - **Client-side:** Sayfada CV verisi → PDF kütüphanesi (örn. jsPDF + layout, veya @react-pdf/renderer) ile tarayıcıda PDF oluştur → blob indir.
    - **Server-side:** API’ye CV JSON gönder → sunucuda PDF oluştur (örn. @react-pdf/renderer, Puppeteer, veya başka kütüphane) → response’ta PDF dosyası döndür (Content-Disposition: attachment). Admin sayfası bu API’yi çağırır, dönen blob’u indirir.
  - Profil fotoğrafı için: Hakkımda’daki gibi upload API (Supabase Storage veya `public`) + URL’i `photo_url` alanına yazma.

---

## 3. Müşteri tarafı – CV sayfası (`/cv`)

- **Sayfa:** `app/cv/page.tsx` (mevcut dosyayı genişlet).
  - **İki bölüm (aynı sayfada veya sekmelerle):**

  **A) Site sahibinin CV’si (admin’in kaydettiği)**
  - Veriyi GET ile al (API veya doğrudan veri katmanı). Kayıt yoksa "Henüz CV eklenmemiş" gibi kısa mesaj.
  - Ekranda CV’yi düzenli ve okunaklı göster (başlık, kişisel bilgiler, eğitim, deneyim, yetenekler, sertifikalar, diller). Tema ve responsive kurallarına uygun.
  - **"PDF indir" butonu:** Aynı PDF oluşturma mantığı (API veya client-side); admin’in CV verisi kullanılır. Ziyaretçi tek tıkla site sahibinin CV’sini PDF olarak indirir.

  **B) Kendi CV’nizi oluşturun (CV Builder)**
  - Başlık: "Kendi CV'nizi oluşturun" / "CV Oluşturucu".
  - Açıklama: Kullanıcının kendi bilgilerini girmesi ve anında PDF alması.
  - **Form:** Admin’dekiyle aynı alanlar (ad, soyad, e-posta, telefon, konum, özet; eğitim / deneyim / yetenekler / sertifikalar / diller için dinamik listeler). Client Component; veri **varsayılan olarak hiçbir yere kaydedilmez**.
  - **"PDF oluştur" / "CV'mi indir" butonu:** Form verisini topla → PDF oluştur (client-side veya API’ye POST edip dönen PDF’i indir) → kullanıcı kendi CV’sini PDF olarak indirir.
  - İsteğe bağlı: "Önizleme" butonu ile form verisinin ekranda CV düzeniyle gösterilmesi.

- **Ortak PDF mantığı:** Hem admin hem normal kullanıcı için aynı CV şablonu/layout kullanılır; sadece veri kaynağı farklıdır (admin: DB/dosya; kullanıcı: form state).

---

## 4. CV layout şablonu – tek yapı (önizleme + PDF)

Aynı sıra ve aynı blok yapısı hem ekran önizlemesinde hem PDF çıktısında kullanılır. Tek bir “CV şablonu” bileşeni veya veri → HTML/PDF render fonksiyonu bu sıraya göre yazılır.

**Sabit sıra (yukarıdan aşağı):**

1. **Başlık / Kişisel bilgiler (header)**  
   - Ad + soyad (tek satır, büyük punto).  
   - Alt satırda: e-posta, telefon (varsa), konum (varsa) — virgül veya ` · ` ile ayrılmış tek satır.  
   - Varsa profil fotoğrafı: sağ üstte veya isim yanında (kare/yuvarlak, sabit max boyut).  
   - Veri: `name`, `surname`, `email`, `phone`, `location`, `photo_url`.

2. **Özet (summary)**  
   - Bölüm başlığı: "Özet" / "Profil" (veya benzeri).  
   - Altında `summary` metni; paragraf olarak. Boşsa bu blok hiç render edilmez.

3. **Eğitim (education)**  
   - Bölüm başlığı: "Eğitim".  
   - Her öğe: `school` (kalın), aynı satırda veya alt satırda `degree`, `field`. Sonra `start_date` – `end_date`. Varsa `description` (kısa paragraf veya madde). Öğeler arası net ayrım (margin/çizgi).  
   - Boş array ise blok gösterilmez.

4. **İş deneyimi (experience)**  
   - Bölüm başlığı: "Deneyim" / "İş Deneyimi".  
   - Her öğe: `company` (kalın), `role` (alt satır veya parantez). `start_date` – `end_date`. Sonra `description` (maddeler veya paragraf). Öğeler arası ayrım.  
   - Boş array ise blok gösterilmez.

5. **Yetenekler (skills)**  
   - Bölüm başlığı: "Yetenekler" / "Beceriler".  
   - Liste: `name` (ve varsa `level` parantez veya etiket). Satır wrap veya virgülle ayrılmış etiketler; tek sütun veya grid.  
   - Boş array ise blok gösterilmez.

6. **Sertifikalar (certificates)**  
   - Bölüm başlığı: "Sertifikalar".  
   - Her öğe: `name` (kalın), `issuer`, `date`; varsa `url` link. Kısa liste.  
   - Boş array ise blok gösterilmez.

7. **Diller (languages)**  
   - Bölüm başlığı: "Diller".  
   - Her öğe: `name`, `level` (örn. "— İleri"). Satır veya virgülle ayrılmış.  
   - Boş array ise blok gösterilmez.

8. **Ek bilgiler (additional)**  
   - Bölüm başlığı: "Ek bilgiler" veya "Diğer" (opsiyonel).  
   - `additional` serbest metin. Boşsa blok gösterilmez.

**Uygulama kuralları:**  
- Bölüm başlıkları aynı stilde (font, punto, rengi); numaralandırma yok, sadece metin.  
- Web önizlemesi: tema değişkenleri (`var(--color-*)`), responsive (font ve boşluk).  
- PDF: okunabilir font (örn. 10–12 pt), beyaz arka plan, siyah/lacivert metin; başlıklar biraz daha koyu veya büyük.  
- Tek bir “CV layout” bileşeni veya şablon fonksiyonu `CVData` alır; yukarıdaki sırayla blokları render eder. Önizleme bu bileşeni doğrudan kullanır; PDF ise aynı bileşeni React-PDF ile veya aynı yapıyı HTML’e çevirip Puppeteer ile PDF’e alır.

---

## 5. PDF oluşturma – teknik seçenekler

- **Şablon:** Yukarıdaki CV layout şablonu (Bölüm 4) kullanılır; hem ekran önizlemesi hem PDF bu yapıya uygun olsun.
- **Seçenek A – Client-side:** Tarayıcıda PDF üretmek. Örn. `@react-pdf/renderer` ile React bileşeninden PDF blob; veya jsPDF + manuel çizim. Avantaj: sunucu yükü yok. Dezavantaj: karmaşık layout’lar ve fontlar bazen zor.
- **Seçenek B – Server-side:** API route (örn. `POST /api/cv/generate-pdf`). Body: CV verisi (JSON). Sunucuda @react-pdf/renderer veya Puppeteer (HTML’i PDF’e çevir) ile PDF üret; response’ta `application/pdf` ve `Content-Disposition: attachment; filename="cv.pdf"` döndür. Client bu URL’e istek atıp blob’u indirir. Avantaj: tutarlı görünüm, ağır layout’lar. Dezavantaj: sunucu kaynağı.
- **Dosya adı:** Örn. `ad-soyad-cv.pdf` veya `cv-{timestamp}.pdf`.
- **Dil:** PDF içeriği formda girilen dilde (Türkçe alan etiketleri projede sabit; veri kullanıcıdan gelir).

---

## 6. Admin – CV düzenleme formu (detay)

- **Kişisel:** Ad, soyad, e-posta, telefon, konum, özet (textarea), profil fotoğrafı (URL veya yükleme).
- **Eğitim:** Dinamik liste. Her satır: Okul, Derece, Bölüm, Başlangıç–Bitiş tarihi, Açıklama. Ekle / Çıkar.
- **Deneyim:** Dinamik liste. Her satır: Şirket, Pozisyon, Başlangıç–Bitiş, Açıklama (madde veya paragraf). Ekle / Çıkar.
- **Yetenekler:** Dinamik liste. Her satır: Yetenek adı, Seviye (opsiyonel). Ekle / Çıkar.
- **Sertifikalar:** Dinamik liste. Her satır: Sertifika adı, Veren, Tarih, Link. Ekle / Çıkar.
- **Diller:** Dinamik liste. Her satır: Dil, Seviye. Ekle / Çıkar.
- **Ek:** Serbest metin (opsiyonel).
- Kaydet → API ile tek kayıt güncellenir. "PDF indir" → mevcut (kaydedilmiş veya formdaki) veriyle PDF indirilir.

---

## 7. API route'ları

- **GET** `app/api/cv/route.ts`: Site sahibinin (admin’in) kaydettiği CV verisini döndür. Public; `/cv` sayfası bunu kullanır.
- **GET** `app/api/admin/cv/route.ts`: Admin formu için aynı CV verisi (ileride auth).
- **PUT** `app/api/admin/cv/route.ts`: Admin’in CV verisini günceller. Body: tam CV nesnesi.
- **POST** `app/api/cv/generate-pdf/route.ts` (veya `app/api/cv/pdf/route.ts`): Body’de CV JSON alır; sunucuda PDF üretir; response’ta PDF dosyası (attachment) döner. Hem admin hem normal kullanıcı bu endpoint’i kullanabilir (admin kendi verisiyle, kullanıcı form verisiyle POST eder). İsteğe bağlı: rate limit (aynı IP’den sık PDF isteği engelleme).

(Client-side PDF kullanılıyorsa bu endpoint isteğe bağlıdır; yine de "indir" için tek tip bir API sunmak faydalı olabilir.)

---

## 8. Dikkat edilecekler

- **Gizlilik:** Kullanıcı formundan gelen veri varsayılan olarak saklanmaz; sadece PDF üretiminde kullanılır. Saklanacaksa açık onay ve gizlilik metni gerekir.
- **Validasyon:** Ad, soyad, e-posta en azından dolu olsun; e-posta formatı kontrol edilsin. PDF oluşturmadan önce client veya API’de kısa validasyon yapılabilir.
- **Hakkımda ile ilişki:** İstersen admin CV’si için Hakkımda verisinden ad, soyad, fotoğraf vb. çekilebilir; ancak CV kendi alanlarına sahip olursa (eğitim, deneyim, özet) daha esnek olur. İki ayrı veri modeli (About vs CV) tercih edilebilir.
- **Tema:** Web’de gösterilen CV önizlemesi `var(--color-*)` kullansın; PDF’in kendisi genelde beyaz arka plan ve siyah/mavi metinle basılır (okunabilirlik).

---

## 9. Yardımcılar ve tip güvenliği

- `lib/types/cv.ts`: CV tipi; Education, Experience, Skill, Certificate, Language alt tipleri; varsayılan boş CV (DEFAULT_CV) isteğe bağlı.
- `lib/cv.ts`: getCv(), saveCv(data). API route’lar ve sayfa bunları kullansın (admin CV’si için).
- PDF şablonu: Bölüm 4’teki CV layout şablonuna göre ortak bir bileşen veya fonksiyon (React-PDF Document/Page veya HTML şablonu); girdi her zaman aynı CV veri tipinde.

---

## 10. Özet kontrol listesi

- [ ] CV veri modeli (kişisel, education, experience, skills, certificates, languages, additional)
- [ ] Depolama: admin CV’si için Supabase tek satır veya `data/cv.json`
- [ ] Admin CV sayfası: form (tüm alanlar + dinamik listeler), kaydet, "PDF indir"
- [ ] Profil fotoğrafı: upload API + photo_url (Hakkımda ile aynı mantık)
- [ ] CV layout şablonu (Bölüm 4): tek sıra ve blok yapısı; önizleme + PDF aynı yapı
- [ ] PDF oluşturma: client-side veya server-side API; ortak CV şablonu
- [ ] Müşteri `/cv`: (A) site sahibi CV’si + PDF indir, (B) "Kendi CV’nizi oluşturun" formu + PDF indir (veri kaydedilmez)
- [ ] API: GET /api/cv, GET/PUT /api/admin/cv, POST /api/cv/generate-pdf (veya sadece client-side PDF)
- [ ] Validasyon (form + isteğe bağlı API), rate limit (PDF isteği)
- [ ] Tema ve responsive (web önizleme), metadata (CV sayfası title, description)

Bu prompt’u parça parça uygula; blog, projeler, hakkımda ve iletişim prompt’ları ile aynı pattern’leri takip et. Proje kurallarına (theme-and-responsive, react-nextjs-core) ve mevcut bileşenlere (Section, Card, Button) uy.
