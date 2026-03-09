---
name: react-component
description: Creates a React component following project conventions (functional, TypeScript props, hooks, composition). Use when the user asks to create a component, add a UI piece, build a reusable widget, or implement a button, card, form, list, or modal.
---

# React Bileşen Oluşturma

## Ne Zaman Kullanılır

- Yeni UI bileşeni (button, card, modal, form alanı vb.) yazılırken
- Mevcut sayfadan tekrar kullanılabilir parça çıkarılırken
- Liste öğesi, header, footer gibi bileşenler eklenirken

## Adımlar

### 1. Konum ve İsim

- Yeniden kullanılabilir: `components/` altında (örn. `components/ui/Button.tsx` veya `components/features/PostCard.tsx`).
- Sadece bir sayfada: ilgili sayfa/feature klasöründe veya `components/` altında anlamlı isimle.
- Dosya adı: bileşenle aynı PascalCase veya kebab-case klasör + PascalCase dosya.

### 2. Props Tipi

- TypeScript interface tanımla: gerekli ve opsiyonel prop’lar, `children?: React.ReactNode`.
- Genel/generic bileşenlerde generic kullan (örn. `List<T>`).

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}
```

### 3. Bileşen Gövdesi

- Functional component; default veya named export (proje convention’a göre).
- Sadece client davranışı (onClick, useState, useEffect) gerekiyorsa dosyanın en üstüne `'use client'`.

### 4. Stil

- Tailwind sınıfları tercih; variant’a göre sınıf birleştirme (clsx, cn, twMerge).
- Sabit stiller bileşen içinde; tema/renk proje değişkenlerine uygun olsun.

### 5. Erişilebilirlik

- Buton/link: doğru element (`<button>`, `<a>` veya `role` + `tabIndex`).
- Görsel: `alt`; etkileşimli öğelerde `aria-*` ve klavye desteği.

## Kontrol Listesi

- [ ] Props TypeScript ile tanımlı
- [ ] Functional component, gerekirse `'use client'`
- [ ] Stil (Tailwind) tutarlı
- [ ] Erişilebilirlik (semantik HTML, aria, klavye) düşünüldü
- [ ] Gerekirse bileşen colocate veya `components/` altında
