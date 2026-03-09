---
name: github-commit-push
description: Runs pre-push checks (lint, build, typecheck), then commits with a conventional message and pushes to GitHub. Use when the user asks to commit, push to GitHub, push changes, save to repo, or run checks before push.
---

# GitHub Commit & Push

## Ne Zaman Kullanılır

- Değişiklikleri commit edip GitHub’a push etmek istendiğinde
- “Push öncesi kontrol yap”, “commit at ve push et”, “GitHub’a gönder” gibi isteklerde
- Conventional commit mesajı ile düzenli commit + push akışı gerektiğinde

## Adımlar

### 1. Durumu Kontrol Et

- `git status` ile değişen dosyaları gör.
- Gerekirse `git diff` ile değişiklikleri incele.

### 2. Push Öncesi Kontroller (Varsa)

Projede varsa sırayla çalıştır (komutları `;` ile ayır, `&&` kullanma — özellikle Windows/PowerShell’de hata verebilir). Hata varsa önce düzelt, sonra commit/push yap:

- **Lint:** `npm run lint` veya `pnpm lint` / `yarn lint`
- **Type check:** `npm run type-check` veya `npx tsc --noEmit` (TypeScript projede)
- **Build:** `npm run build` veya `pnpm build` (Next.js için önerilir)

Kontrol script’leri `package.json` içinde yoksa bu adımı atla veya sadece mevcut script’leri çalıştır.

### 3. Stage & Commit

- Tüm değişiklikler: `git add .`  
  Sadece belirli dosyalar: `git add <dosya-yolu>`
- Commit mesajı **Conventional Commits** formatında:
  - `feat: ...` — yeni özellik
  - `fix: ...` — hata düzeltme
  - `docs: ...` — dokümantasyon
  - `style: ...` — stil/format (kod davranışı değişmez)
  - `refactor: ...` — yeniden yapılandırma
  - `chore: ...` — bakım (bağımlılık, config vb.)

Örnek:  
`git commit -m "feat: add blog list page and PostCard component"`

### 4. Push

- `git push origin <mevcut-branch>`  
  Branch adı genelde `main` veya `master`; bilinmiyorsa `git branch --show-current` ile kontrol et.
- İlk push’ta upstream yoksa: `git push -u origin <branch>`

## Kontrol Listesi

- [ ] Lint / typecheck / build (projede tanımlıysa) hatasız
- [ ] Commit mesajı conventional formatında ve anlamlı
- [ ] Push doğru remote ve branch’e yapıldı

## Örnek Komut Akışı

Komutları `;` ile ayır (`&&` kullanma; GitHub/Windows shell’de hata alınabilir):

```bash
npm run lint ; npm run build
git add .
git commit -m "feat(rules): add GitHub commit-push skill"
git push origin main
```
