# Cursor: Skills, Rules, Subagents, Commands – Kısa Rehber

## Skills (Beceriler)

**Ne:** Projeye özel iş akışları / talimatlar. Bir SKILL.md dosyası = bir skill (örn. “GitHub’a push öncesi kontrol”).

**Amaç:** Belirli görevlerde AI’ın adım adım ne yapacağını tanımlar; tekrar kullanılabilir.

**Sohbette nasıl çağrılır:**
- Doğrudan söyle: *“GitHub’a push etmeden önce kontrolleri çalıştır sonra push et”*
- Skill’in `description` alanındaki anahtar kelimeler tetikler (Cursor otomatik eşleştirir)

**Örnek:** `@github-push-with-checks` veya “push öncesi kontrol yap” → ilgili skill devreye girer.

---

## Rules (Kurallar)

**Ne:** Kod stilleri, mimari tercihler, “bunu böyle yap” talimatları. `.cursorrules` ve `.cursor/rules/*.mdc` dosyaları.

**Amaç:** AI’ın yazdığı kodun projeye (dil, state management, routing, naming vb.) uyumlu olmasını sağlar.

**Sohbette nasıl çağrılır:**
- **Otomatik:** Cursor, açık dosyaya / glob’a göre uygun rule’ları kendisi yükler.
- **Manuel:** `@Rules` veya `@.cursorrules` yazarak rule’ları bağlamına ekleyebilirsin.

**Örnek:** `lib/features/.../pages/*.dart` açıkken presentation rule’ları devrede olur.

---

## Subagents (Alt ajanlar)

**Ne:** Belirli işlere odaklı yardımcı ajanlar (örn. kod keşfi, shell komutları). Ana sohbetin “yardımcıları”.

**Amaç:** Büyük projede arama, terminal işleri gibi işleri özelleşmiş ajanlara bırakmak.

**Sohbette nasıl çağrılır:**
- Sen doğrudan çağırmazsın; **AI gerekince kendi kullanır** (örn. “projeyi tara” deyince explore, “şu komutu çalıştır” deyince shell ajanı).
- Kullanıcı olarak sadece görevi söylersin; hangi subagent’ın kullanılacağına Cursor karar verir.

**Özet:** Sen “ne yapılacağını” söylersin, “hangi ajan” Cursor’da otomatik.

---

## Commands (Komutlar)

**Ne:** Slash komutları (`/fix`, `/test` vb.) veya projeye özel komutlar (örn. `.claude/commands/create-feature.md`).

**Amaç:** Tek tıkla / tek komutla standart iş akışı başlatmak (test yaz, feature oluştur, hatayı düzelt vb.).

**Sohbette nasıl çağrılır:**
- **Slash:** `/fix`, `/test` gibi Cursor’un hazır komutları.
- **Özel komut:** Komut paleti (Ctrl+Shift+P) veya Cursor’un komut listesinden ilgili komutu seçmek; bazen sohbette `@` ile komut adı da kullanılabilir (Cursor sürümüne göre değişir).

**Özet:** Komut = hazır aksiyon; sohbet yerine “komutu çalıştır” diye kullanırsın.

---

## Hızlı Karşılaştırma

| Kavram     | Ne zaman kullanılır           | Sohbette nasıl                      |
|-----------|--------------------------------|-------------------------------------|
| **Skills**   | Özel iş akışı (push öncesi kontrol vb.) | Cümleyle iste veya skill adıyla @ ile |
| **Rules**    | Kodun projeye uyumlu olsun    | Otomatik (dosya/glob) veya @Rules    |
| **Subagents**| Keşif / shell / araştırma     | Sen sadece görevi söylersin, AI seçer |
| **Commands** | Hazır aksiyon (fix, test, feature) | Slash (`/fix`) veya komut paleti     |

Bu dosyayı projede `.cursor/NOTLAR-Skills-Rules-Subagents-Commands.md` olarak saklayıp gerektiğinde referans alabilirsin.
