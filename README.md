# BlogKurs

**Bahar Can** için geliştirilmiş, Next.js tabanlı kişisel portföy ve blog uygulaması. Blog yazıları, projeler, CV, hakkımda ve iletişim formu ile tam özellikli bir site sunar.

## Özellikler

- **Ana sayfa** — Hero, öne çıkan projeler ve blog yazıları
- **Blog** — Yazı listesi, slug ile tek yazı sayfası, görüntülenme/beğeni, TipTap ile zengin metin editörü
- **Projeler** — Proje listesi ve detay sayfaları, GitHub/demo linkleri, beğeni
- **Hakkımda** — Statik/metin sayfası, Supabase’den içerik
- **CV / Özgeçmiş** — JSON tabanlı CV düzenleme, PDF export (@react-pdf/renderer)
- **İletişim** — Form ile mesaj gönderimi, admin panelinde mesaj listesi ve yanıt
- **Admin paneli** (`/admin`) — Blog, projeler, hakkımda, CV ve iletişim mesajları yönetimi; kapak görseli yükleme
- **Tema** — Light / Dark / Sepia; CSS değişkenleri ile tutarlı renkler, localStorage’da tercih saklama
- **Responsive** — Mobil-first, sm/md/lg breakpoint’leri ile uyumlu arayüz

## Teknoloji Stack

| Alan | Teknoloji |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Stil | Tailwind CSS v4 |
| Veritabanı / Backend | Supabase (PostgreSQL, Storage) |
| Editör | TipTap (blog/proje içerik) |
| PDF | @react-pdf/renderer |
| Doğrulama | Zod |
| Grafik | Recharts |

## Proje Yapısı

```
app/
├── page.tsx                 # Ana sayfa (hero, projeler, yazılar, CTA)
├── layout.tsx               # Root layout (Header, Footer, ThemeProvider)
├── blog/                    # Blog listesi ve [slug] detay
├── projeler/                # Projeler listesi ve [slug] detay
├── hakkimda/                # Hakkımda sayfası
├── cv/                      # CV sayfası ve PDF indirme
├── iletisim/                # İletişim formu
├── admin/                   # Admin: blog, projeler, hakkımda, cv, mesajlar
└── api/                     # API route’lar (aşağıda)

components/
├── ui/                      # Card, Badge, AdminDataTable, AdminCard vb.
├── layout/                  # Header, Footer, Section
├── sections/                 # HeroSection, CardGridSection, CTASection, HomeStatsSection
├── features/                # blog, projects, cv, admin (formlar, listeler)
├── theme/                   # ThemeProvider, ThemeToggle
└── navigation/              # Navbar

lib/
├── blog.ts                  # Blog veri çekme (Supabase)
├── projects.ts              # Projeler veri çekme
├── contact.ts               # İletişim formu / mesajlar
├── cv.ts                    # CV CRUD ve PDF üretimi
├── site.ts                  # Site adı, navigasyon linkleri
├── supabase/server.ts       # Server-side Supabase client (service role)
└── types/                   # contact, project, cv vb. tipler

supabase/
├── schema.sql               # posts tablosu ve storage (blog-covers)
├── projects-schema.sql      # projects tablosu ve storage (project-covers)
├── about-schema.sql         # about sayfası
├── migrations/              # contact_messages, cv, phone alanı vb.
└── seed-*.sql               # Örnek veri script’leri
```

## API Route’lar

| Endpoint | Açıklama |
|----------|----------|
| `GET/PUT /api/cv` | CV verisi okuma / güncelleme |
| `POST /api/cv/generate-pdf` | CV’den PDF oluşturma |
| `POST /api/contact` | İletişim formu gönderimi |
| `GET/PUT /api/about` | Hakkımda içeriği |
| `GET/POST /api/admin/blog` | Blog listesi / yeni yazı |
| `GET/PUT/DELETE /api/admin/blog/[slug]` | Tek yazı CRUD |
| `POST /api/admin/blog/upload` | Blog kapak görseli yükleme |
| `GET/POST /api/admin/projeler` | Proje listesi / yeni proje |
| `GET/PUT/DELETE /api/admin/projeler/[slug]` | Tek proje CRUD |
| `POST /api/admin/projeler/upload` | Proje kapak görseli yükleme |
| `GET/PUT /api/admin/cv` | Admin CV verisi |
| `POST /api/admin/cv/upload` | CV fotoğrafı yükleme |
| `GET/PUT /api/admin/about` | Admin hakkımda |
| `POST /api/admin/about/upload` | Hakkımda görseli yükleme |
| `GET /api/admin/mesajlar` | İletişim mesajları listesi |
| `GET/PUT /api/admin/mesajlar/[id]` | Tek mesaj / yanıt güncelleme |
| `POST /api/blog/[slug]/view` | Görüntülenme artırma |
| `POST /api/blog/[slug]/like` | Beğeni artırma |
| `POST /api/projeler/[slug]/view` | Proje görüntülenme |
| `POST /api/projeler/[slug]/like` | Proje beğeni |

## Gereksinimler

- Node.js 18+
- npm / pnpm / yarn
- Supabase projesi (veritabanı + Storage)

## Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install
# veya: pnpm install / yarn install
```

### 2. Ortam değişkenleri

Proje kökünde `.env.local` oluştur:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase proje URL’i (Dashboard → Settings → API)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (güvenli tutun; sadece sunucu tarafında kullanılır)

### 3. Supabase kurulumu

1. [Supabase](https://supabase.com) üzerinde yeni proje oluştur.
2. SQL Editor’de sırayla çalıştır:
   - `supabase/schema.sql` — `posts`, storage bucket `blog-covers`
   - `supabase/projects-schema.sql` — `projects`, bucket `project-covers`
   - `supabase/about-schema.sql` — about sayfası (varsa)
   - `supabase/migrations/20260312120000_contact_messages.sql` — iletişim mesajları
   - `supabase/migrations/20260312130000_contact_messages_phone.sql` — telefon alanı (varsa)
   - `supabase/migrations/20260312140000_cv.sql` — CV tablosu
3. Storage’da `blog-covers` ve `project-covers` bucket’ları public read ve gerekli upload/delete policy’leri ile kullanılır (schema dosyalarında tanımlı).
4. İsterseniz `supabase/seed-*.sql` dosyalarıyla örnek veri ekleyebilirsiniz.

### 4. Geliştirme sunucusu

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açın.

## Script’ler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Production sunucusunu başlatır |
| `npm run lint` | ESLint çalıştırır |

## Site Yapılandırması

- **Site adı, başlık, e-posta, sosyal linkler:** `lib/site.ts` içinde `site` ve `navLinks` / `footerLinks` düzenlenebilir.
- **Metadata:** `app/layout.tsx` içinde `metadata` (title, description).

## Tema ve Erişilebilirlik

- Tema: `data-theme="light" | "dark" | "sepia"` (html). Tüm renkler `app/globals.css` içindeki CSS değişkenleri ile yönetilir.
- Responsive: Container `max-w-7xl`, section padding ve tipografi sm/md/lg breakpoint’lerine göre ayarlıdır.
- Semantik HTML ve uygun heading hiyerarşisi kullanılır.

## Dağıtım

- **Vercel:** Next.js projesi olduğu için Vercel’e bağlayıp `NEXT_PUBLIC_SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` environment variable’larını eklemeniz yeterlidir.
- Build komutu: `npm run build`, Output directory: `.next` (varsayılan).

## Lisans

Proje özel kullanım içindir. İsterseniz kendi portföy siteniz için fork edip `lib/site.ts` ve içerikleri kendi bilgilerinizle güncelleyebilirsiniz.
