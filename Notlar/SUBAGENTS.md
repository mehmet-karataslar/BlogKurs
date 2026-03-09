# Alt Ajanlar (Subagents) – BlogKurs

Bu projede AI, belirli görevler için aşağıdaki **alt ajanları** kullanır. Sen doğrudan ajan seçmezsin; sadece ne yapılmasını istediğini söylersin, Cursor uygun ajanı kendisi seçer.

## Mevcut Alt Ajanlar

| Ajan | Odak | Örnek kullanım |
|------|------|-----------------|
| **explore** | Kod tabanı keşfi, arama, dosya/pattern bulma | "Projeyi tara", "auth nerede kullanılıyor?", "tüm API route'ları listele" |
| **shell** | Terminal komutları (git, npm, build, test) | "Commit at ve push et", "npm run build çalıştır", "bağımlılıkları kur" |
| **generalPurpose** | Çok adımlı görevler, araştırma, karmaşık analiz | "Tüm sayfaları bul, hangisinde form var analiz et", derinlemesine refactor planı |

## Sen Nasıl Kullanırsın?

- **Explore için:** "Projede X’i ara", "bu fonksiyon nerede çağrılıyor?", "klasör yapısını göster" de.
- **Shell için:** "Şu komutu çalıştır", "GitHub’a push et", "testleri çalıştır" de.
- **GeneralPurpose için:** "Şu feature’ı incele ve iyileştirme öner" gibi çok adımlı isteklerde bulun.

Hangi ajanın devreye gireceği Cursor tarafından otomatik belirlenir. Detaylı seçim kriterleri `.cursor/rules/subagents-usage.mdc` içindedir.
