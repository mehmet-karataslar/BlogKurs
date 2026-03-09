# benmuhendisiniz.com — Tasarım Klonlama Analiz Raporu

**Kaynak:** https://www.benmuhendisiniz.com/  
**Analiz Tarihi:** 2026-03-09  
**Şablon:** Web Design Clone Agent (8 bölüm)

---

## BÖLÜM 1 — GENEL GÖRSEL KİMLİK

- **Site Adı:** Ben Mühendisiniz (Mehmet Karataş portföy)
- **Site Türü:** Portföy / Kişisel marka + Blog
- **Genel Tasarım Dili:** Minimalist, Dark-first, terminal/developer estetiği
- **İlk İzlenim:** Profesyonel yazılımcı portföyü; terminal prompt (mehmet@portfolio) ile teknik kimlik vurgulanıyor; sade, okunaklı, kart tabanlı içerik.
- **Referans Tasarım Trendi:** Developer portfolio, card-based layout, subtle glassmorphism/neutral surfaces, CTA odaklı bölümler.

---

## BÖLÜM 2 — RENK PALETİ

### 2.1 — Ana Renkler

| Rol | HEX / RGB / HSL | Kullanım Yeri |
|---|---|---|
| Primary | #22c55e (tahminen – terminal vurgu) | CTA butonları, linkler, terminal prompt |
| Secondary | #64748b | İkincil metin, badge'ler |
| Accent | #10b981 / #34d399 | Vurgular, hover, başlık vurgusu |
| Background | #0f172a / #1e293b | Ana sayfa arkaplanı (koyu) |
| Surface | #1e293b / #334155 | Kart, panel arkaplanı |
| Border | #334155 / #475569 | Kenarlıklar, ayraçlar |
| Text Primary | #f8fafc / #f1f5f9 | Ana başlık ve gövde metni |
| Text Secondary | #94a3b8 | Açıklama, alt metin |
| Text Muted | #64748b | Placeholder, etiket, tarih |

### 2.2 — Durum Renkleri

| Durum | HEX | Kullanım |
|---|---|---|
| Success | #22c55e | Başarı, onay |
| Warning | #eab308 | Uyarı |
| Error | #ef4444 | Hata |
| Info | #3b82f6 | Bilgi |

### 2.3 — Gradient'lar

- Hero veya CTA bölümünde hafif gradient kullanımı muhtemel (koyu mavi–slate).
- Butonlarda solid renk tercih edilmiş; gradient tespit edilemedi.

### 2.4 — Dark Mode Renkleri

- Site dark-first; light mode tespit edilmedi. Varsa `data-theme` veya `.dark` class ile yönetilir.

### 2.5 — Tailwind Config Önerisi

```js
colors: {
  primary: { DEFAULT: '#22c55e', hover: '#16a34a', foreground: '#f8fafc' },
  secondary: { DEFAULT: '#64748b', foreground: '#f1f5f9' },
  accent: { DEFAULT: '#10b981', foreground: '#f8fafc' },
  background: '#0f172a',
  surface: '#1e293b',
  border: '#334155',
  muted: { DEFAULT: '#64748b', foreground: '#94a3b8' },
}
```

---

## BÖLÜM 3 — TİPOGRAFİ SİSTEMİ

### 3.1 — Font Ailesi

| Rol | Font Adı | Kaynak | Weights |
|---|---|---|---|
| Başlık (Heading) | Inter / system-ui | Google Fonts / System | 600, 700 |
| Gövde (Body) | Inter / system-ui | Google Fonts / System | 400, 500 |
| Mono / Kod | JetBrains Mono / Fira Code | Google Fonts | 400, 500 |
| Özel / Dekoratif | — | — | — |

Terminal satırı mono font ile gösteriliyor (mehmet@portfolio:\~).

### 3.2 — Tipografi Skalası

| Element | Font Size | Font Weight | Line Height | Letter Spacing | Renk |
|---|---|---|---|---|---|
| H1 | 2.25rem–3rem | 700 | 1.2 | -0.02em | text-primary |
| H2 | 1.875rem | 600 | 1.25 | — | text-primary |
| H3 | 1.25rem–1.5rem | 600 | 1.3 | — | text-primary |
| H4 | 1.125rem | 600 | 1.35 | — | text-primary |
| Body Large | 1.125rem | 400 | 1.6 | — | text-secondary |
| Body Default | 1rem | 400 | 1.6 | — | text-secondary |
| Body Small | 0.875rem | 400 | 1.5 | — | text-muted |
| Caption | 0.75rem | 400 | 1.4 | — | text-muted |
| Label | 0.875rem | 500 | 1.4 | — | text-secondary |
| Code / Terminal | 1rem–1.125rem | 500 | 1.5 | — | accent/primary |

### 3.3 — Tailwind Config Önerisi

```js
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-jetbrains-mono)', 'monospace'],
},
fontSize: {
  'display-lg': ['3rem', { lineHeight: '1.15' }],
  'display-md': ['2.25rem', { lineHeight: '1.2' }],
  'display-sm': ['1.875rem', { lineHeight: '1.25' }],
  'display-xs': ['1.5rem', { lineHeight: '1.3' }],
},
```

---

## BÖLÜM 4 — LAYOUT VE SPACING SİSTEMİ

### 4.1 — Grid & Container

| Kriter | Değer |
|---|---|
| Max container genişliği | 1280px (7xl) |
| Sütun sayısı | 12 (Tailwind grid) |
| Gutter (sütun arası boşluk) | 24px (gap-6) |
| Kenar padding (horizontal) | 16px–24px (px-4 / px-6) |
| Section arasındaki dikey boşluk | 64px–96px (py-16 / py-24) |

### 4.2 — Spacing Skalası

- 4px tabanlı (Tailwind default). Sık kullanılan: 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

### 4.3 — Breakpoint'ler

| İsim | Min-Width | Ne Değişiyor? |
|---|---|---|
| sm | 640px | Kart grid 2 sütun, padding artışı |
| md | 768px | Nav tam görünür, grid 2–3 sütun |
| lg | 1024px | 3 sütun kart, footer sütunları |
| xl | 1280px | Max container, 3–4 sütun |
| 2xl | 1536px | Geniş ekran padding |

### 4.4 — Layout Pattern'leri

- **Hero:** Centered, terminal satırı + kısa tanıtım metni.
- **Feature/Card section:** Grid (Proje, Blog, Hizmet kartları) — mobil 1, tablet 2, desktop 3 sütun; gap-6.
- **Section padding:** py-16 veya py-24; px-4 md:px-6 lg:px-8.
- **Footer:** Çok sütunlu (Hızlı Linkler, İletişim); alt kısımda copyright.

---

## BÖLÜM 5 — BİLEŞEN ENVANTERİ

### 5.1 — Layout Bileşenleri

| Bileşen | Var mı? | Görsel Özellikler | Davranış |
|---|---|---|---|
| Header | ✅ | Yükseklik ~64px, arkaplan surface/backdrop, border-bottom | Sticky; mobilde hamburger menü |
| Footer | ✅ | Koyu surface, sütunlar (Hızlı Linkler, İletişim), copyright | Statik |
| Sidebar | ❌ | — | — |
| Section Wrapper | ✅ | max-w-7xl mx-auto px-4/6/8, py-16/24 | — |
| Divider / Separator | Muhtemelen | border renk border | — |

### 5.2 — Navigasyon Bileşenleri

| Bileşen | Görsel Detay |
|---|---|
| Logo | "Ben Mühendisiniz" metin + icon (PNG 64px); link ana sayfaya |
| Nav Link | Ana Sayfa, Hizmetler, Projeler, Blog, Kurslar, Eğlence, Hakkımda, İletişim; hover underline/renk |
| Dropdown Menu | Tespit edilmedi |
| Hamburger Menu | Mobilde "Menü aç" butonu; collapsed state |
| Breadcrumb | Tespit edilmedi |
| Tabs | "Tümü" (Projeler / Son Yazılar) — pill veya underline |

### 5.3 — Buton Varyantları

| Varyant | Arkaplan | Metin Rengi | Border | Border Radius | Padding | Hover Efekti |
|---|---|---|---|---|---|---|
| Primary | primary | foreground | yok | rounded-lg | px-4 py-2 | Koyulaşma |
| Secondary | surface | text-primary | border | rounded-lg | px-4 py-2 | border/opacity |
| Ghost | transparent | text-secondary | yok | rounded-lg | px-4 py-2 | bg surface |
| Outline | transparent | primary | border primary | rounded-lg | px-4 py-2 | bg primary/10 |
| Link | transparent | primary | yok | — | — | underline |
| Icon Only | transparent / surface | currentColor | — | rounded-md | p-2 | bg surface |

**Buton Boyut Skalası:** sm (py-1.5 text-sm), md (py-2 text-base), lg (py-3 text-lg).

### 5.4 — Kart (Card) Bileşenleri

| Kart Tipi | Arkaplan | Border | Radius | Shadow | İçerik Yapısı | Hover Efekti |
|---|---|---|---|---|---|---|
| Proje/Blog/Hizmet Card | surface | border | rounded-xl | shadow-sm | Görsel üst, badge (Proje/Blog/Hizmet), başlık H3, açıklama | Scale / shadow / border glow |
| Feature Card | surface | border | rounded-lg | — | İkon + başlık + metin | — |

Kartlarda: üstte görsel (next/image), badge (Proje/Blog/Hizmet), başlık (H3), kısa açıklama; tıklanabilir link.

### 5.5 — Form Elementleri

| Element | Border | Radius | Background | Focus Stili | Placeholder Rengi | Error Stili |
|---|---|---|---|---|---|---|
| Text Input | border | rounded-lg | surface | ring-2 ring-primary | text-muted | border-error |
| Textarea | border | rounded-lg | surface | ring-2 ring-primary | text-muted | border-error |
| Search Input | border | rounded-lg / full | surface | ring-2 | text-muted | — |

İletişim: Email alanı, CTA "İletişime Geç", "LinkedIn'de Bağlan" linki.

### 5.6 — Feedback & Bildirim Bileşenleri

| Bileşen | Var mı? | Görsel Stil | Animasyon |
|---|---|---|---|
| Toast / Snackbar | Muhtemelen | — | — |
| Alert / Banner | Tespit edilmedi | — | — |
| Modal / Dialog | Tespit edilmedi | — | — |
| Tooltip | Tespit edilmedi | — | — |
| Notifications | region "Notifications alt+T" | — | — |

### 5.7 — Veri Gösterim Bileşenleri

| Bileşen | Var mı? | Görsel Detaylar |
|---|---|---|
| Badge / Tag / Chip | ✅ | Proje, Blog, Hizmet — küçük pill, farklı renk/variant |
| Avatar | Tespit edilmedi | — |
| Stat / Metric | Tespit edilmedi | — |
| Code Block | ✅ (terminal) | Mono font, accent renk, prompt stili |

### 5.8 — Özel / Siteye Özgü Bileşenler

| Bileşen Adı | Nerede Kullanılıyor? | Görsel Yapısı | Özellikler |
|---|---|---|---|
| Terminal Hero | Ana sayfa hero | Mono font, prompt "mehmet@portfolio:\~", cursor ▋ | Tek satır, CTA hissi |
| Proje/Blog/Hizmet Kartı | Ana sayfa grid | Görsel + badge + başlık + açıklama | Link wrapper, hover |
| CTA Block | İletişime Geç bölümü | Başlık, alt metin, Email link, LinkedIn butonu | İki sütun (metin + form/link) |

---

## BÖLÜM 6 — ANİMASYON VE ETKİLEŞİM

### 6.1 — Genel Animasyon Dili

- **Animasyon Yaklaşımı:** Subtle; micro-interaction ağırlıklı.
- **Genel Hız:** 200–300ms.
- **Easing:** ease-out / ease-in-out.
- **Kütüphane:** CSS transitions; Framer Motion önerilir klon için.

### 6.2 — Scroll Animasyonları

- Sayfa içi belirgin scroll-trigger animasyon tespit edilmedi; fade-in up uygulanabilir.

### 6.3 — Hover Etkileşimleri

| Element | Hover Değişimi | Geçiş Süresi |
|---|---|---|
| Kart | scale(1.02), shadow artışı, border | 200ms |
| Nav Link | underline, renk primary | 150ms |
| Primary Buton | opacity / brightness | 150ms |
| Link | underline | 150ms |

### 6.4 — Sayfa Geçiş Animasyonları

- Tespit edilmedi; Next.js App Router ile fade önerilir.

### 6.5 — Özel Animasyonlar

- Terminal cursor (▋) blink animasyonu (opsiyonel).
- Kart hover: hafif yukarı hareket + gölge.

---

## BÖLÜM 7 — GÖRSEL VARLIKLAR VE İKON SİSTEMİ

### 7.1 — Görsel Kullanımı

| Görsel Türü | Format | Boyutlar | Optimizasyon | CDN |
|---|---|---|---|---|
| Hero | — | — | — | — |
| Kart görseli | WebP, PNG, JPEG | _next/image w=3840 q=75 | next/image, lazy | Supabase storage |
| Logo | PNG | 64px (icon.png) | next/image | — |

### 7.2 — İkon Sistemi

- **Kütüphane:** Muhtemelen Lucide / Heroicons; GitHub, LinkedIn, Instagram link ikonları.
- **Kullanım:** Inline SVG veya component; currentColor.
- **Boyut:** 20px–24px nav/sosyal.

### 7.3 — Görsel Stili

- Gerçek proje/blog görselleri (ekran görüntüsü, kapak); rounded köşeler kartlarda; overlay yok.

---

## BÖLÜM 8 — NEXT.JS YENİDEN OLUŞTURMA REHBERİ

### 8.1 — Önerilen Proje Yapısı

```
app/
├── (marketing)/
│   ├── page.tsx                 # Ana sayfa
│   ├── hizmetler/page.tsx
│   ├── projeler/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── kurslar/page.tsx
│   ├── eglence/page.tsx
│   ├── hakkimda/page.tsx
│   └── iletisim/page.tsx
├── layout.tsx
└── globals.css

components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Section.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Input.tsx
├── navigation/
│   ├── Navbar.tsx
│   └── MobileMenu.tsx
└── sections/
    ├── HeroSection.tsx
    ├── CardGridSection.tsx
    └── CTASection.tsx
```

### 8.2 — Render Stratejisi

| Sayfa | Önerilen Strateji | Gerekçe |
|---|---|---|
| Ana sayfa | SSG / ISR revalidate: 3600 | Portföy + blog özeti |
| Blog listesi | ISR revalidate: 600 | Yeni yazılar |
| Blog detay | SSG + generateStaticParams | Hız |
| Hakkımda, İletişim | SSG | Statik |
| Hizmetler, Projeler | SSG | Statik listeler |

### 8.3 — Önerilen Teknoloji Stack'i

| Kategori | Öneri |
|----------|--------|
| Framework | Next.js 14+ App Router |
| Styling | Tailwind CSS |
| UI | shadcn/ui + Radix (opsiyonel) |
| Animasyon | Framer Motion |
| İkon | Lucide React |
| Font | next/font (Inter, JetBrains Mono) |

### 8.4 — CSS Design Token Dosyası

```css
:root {
  --color-primary: #22c55e;
  --color-primary-hover: #16a34a;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --transition-base: 200ms ease-out;
}
```

### 8.5 — Öncelikli Oluşturulacak Bileşenler

1. Header (Logo + Nav + CTA + Mobile menu)
2. Footer (Hızlı Linkler + İletişim + Copyright)
3. Button (primary, secondary, outline, link)
4. Card (Proje/Blog/Hizmet variant)
5. Section (wrapper)
6. HeroSection (terminal + tagline)
7. Badge (Proje/Blog/Hizmet)
8. CardGridSection (ana sayfa grid)
9. CTASection (İletişime Geç)
10. Input / Form (İletişim)

---

## KLONLAMA ZORLUK DEĞERLENDİRMESİ

| Kategori | Puan (1–10) | Güçlü Yönler | Zorluklar |
|---|---|---|---|
| Renk & Tipografi | 2 | Tutarlı dark tema, az renk | Tam HEX değerleri tespit edilemedi |
| Layout Karmaşıklığı | 3 | Standart grid, section'lar net | Responsive detay |
| Bileşen Çeşitliliği | 4 | Kart, header, footer, terminal hero | Badge varyantları |
| Animasyon & Etkileşim | 2 | Minimal hover | — |
| Responsive Tasarım | 4 | Hamburger, grid breakpoint | Mobil menü |
| **Genel Ortalama** | **3** | — | — |

---

## KLONLAMA ÖNCELİK LİSTESİ

1. Design token'ları globals.css'e aktar; Tailwind config güncelle.
2. Layout: Header, Footer, Section.
3. UI: Button, Card, Badge, Input.
4. Sections: HeroSection (terminal), CardGridSection, CTASection.
5. Ana sayfa: section'ları sırayla yerleştir.
6. Alt sayfalar: hizmetler, projeler, blog, kurslar, eglence, hakkimda, iletisim.
7. Animasyon: hover, transition.
8. Responsive ve erişilebilirlik kontrolü.

---

## BİLİNMEYENLER VE KISITLAR

| Belirsizlik | Açıklama | Önerilen Yaklaşım |
|---|---|---|
| Tam renk değerleri | CSS kaynağı alınamadı | Analizdeki palet kullan; gerekirse canlı siteden örnek al |
| Font adı | System/Inter varsayıldı | next/font Inter + JetBrains Mono |
| Light mode | Tespit edilmedi | İleride data-theme ile eklenebilir |
