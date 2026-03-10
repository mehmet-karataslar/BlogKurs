-- Blog yazısı: GitHub Nedir? (benmuhendisiniz.com'dan uyarlanmıştır)
-- Supabase SQL Editor'da veya psql ile çalıştırın.

INSERT INTO public.posts (
  slug,
  title,
  excerpt,
  cover_image_url,
  content,
  published,
  featured_on_homepage,
  homepage_order,
  reading_time_minutes,
  category,
  view_count,
  like_count
) VALUES (
  'github-nedir-ne-ise-yarar',
  'GitHub Nedir? Yazılımcıların Neden GitHub Kullanması Gerekir?',
  'GitHub nedir? Kodlarımızı neden orada saklamalıyız? Bu yazıda GitHub''ın ne işe yaradığını, açık kaynak dünyasını ve kariyerinize etkisini, pazarlama dili kullanmadan, gerçek bir proje üzerinden anlatıyoruz. Hemen keşfedin!',
  NULL,
  '<h1>GitHub nedir?</h1>
<p>Bir proje geliştiriyorsun…</p>
<p>Kod yazıyorsun.<br>Yeni özellikler ekliyorsun.<br>Hataları düzeltiyorsun.</p>
<p>Ama bir noktada şu sorular geliyor:</p>
<ul>
<li>"Bu kodları nerede saklayacağım?"</li>
<li>"Bilgisayarım bozulursa ne olacak?"</li>
<li>"Ekiple birlikte nasıl geliştireceğiz?"</li>
<li>"Projeyi başkalarıyla nasıl paylaşacağım?"</li>
</ul>
<p>İşte tam burada karşına şu platform çıkıyor:</p>
<p><strong>GitHub</strong></p>
<p>Bugün dünya üzerindeki milyonlarca yazılım projesi burada barınıyor.</p>
<p>Bu yazıda GitHub''ı:</p>
<ul>
<li>gerçek bir proje üzerinden</li>
<li>teknik ama anlaşılır şekilde</li>
<li>pazarlama dili olmadan</li>
</ul>
<p>anlatacağız.</p>
<hr>
<h1>Önce temel soru: GitHub nedir?</h1>
<p>Kısa tanım:</p>
<p><strong>GitHub, yazılım projelerinin kodlarını saklamak, yönetmek ve ekip halinde geliştirmek için kullanılan bir platformdur.</strong></p>
<p>Ama bu tanım aslında eksik.</p>
<p>Daha doğru tanım şu:</p>
<blockquote><p>GitHub, <strong>Git tabanlı bir kod versiyon kontrol ve işbirliği platformudur.</strong></p></blockquote>
<p>Yani GitHub aslında iki şeyin birleşimidir:</p>
<ol>
<li>Git (versiyon kontrol sistemi)</li>
<li>Bulut tabanlı proje yönetimi</li>
</ol>
<hr>
<h1>Önce Git''i anlamak gerekir</h1>
<p>GitHub''ı anlamak için önce <strong>Git</strong>''i anlamak gerekir.</p>
<h2>Git nedir?</h2>
<p>Git, kodun geçmişini takip eden bir sistemdir.</p>
<p>Örneğin bir proje geliştiriyorsun.</p>
<ol>
<li>İlk versiyon</li>
<li>Yeni özellik ekledin</li>
<li>Hata düzelttin</li>
<li>Yeni modül ekledin</li>
</ol>
<p>Git bunların hepsini kaydeder.</p>
<p>Böylece şunları yapabilirsin:</p>
<ul>
<li>eski sürüme dönmek</li>
<li>değişiklikleri görmek</li>
<li>ekip çalışması yapmak</li>
</ul>
<p>Git''i geliştiren kişi:</p>
<p><strong>Linus Torvalds</strong></p>
<p>Aynı kişi <strong>Linux</strong> işletim sisteminin de yaratıcısıdır.</p>
<hr>
<h1>GitHub ne yapar?</h1>
<p>Git aslında bilgisayarda çalışan bir araçtır.</p>
<p>Ama GitHub şu sorunları çözer:</p>
<ul>
<li>kodları bulutta saklar</li>
<li>ekip çalışmasını kolaylaştırır</li>
<li>projeleri paylaşmayı sağlar</li>
</ul>
<p>Yani GitHub aslında:</p>
<p><strong>Git + Cloud + Collaboration</strong></p>
<hr>
<h1>Gerçek bir proje senaryosu</h1>
<p>Bir web uygulaması yaptığını düşün.</p>
<p>Örneğin:</p>
<ul>
<li>React ile frontend</li>
<li>Node.js ile backend</li>
</ul>
<p>Proje dosyaların bilgisayarında.</p>
<p>Ama şu sorunlar var:</p>
<ul>
<li>ekip arkadaşın kodu nasıl alacak?</li>
<li>değişiklikleri nasıl takip edeceksin?</li>
<li>projeyi nasıl yayınlayacaksın?</li>
</ul>
<p>GitHub bu problemleri çözer.</p>
<hr>
<h1>GitHub nasıl çalışır?</h1>
<p>GitHub''ın çalışma mantığı birkaç temel kavrama dayanır.</p>
<h2>Repository (Repo)</h2>
<p>Repository bir proje klasörüdür.</p>
<p>İçinde şunlar bulunur:</p>
<ul>
<li>kaynak kod</li>
<li>dokümantasyon</li>
<li>konfigürasyon dosyaları</li>
</ul>
<p>Bir repo genelde şu şekilde görünür:</p>
<pre><code>project-name
 ├── src
 ├── public
 ├── package.json
 └── README.md</code></pre>
<hr>
<h2>Commit</h2>
<p>Commit bir değişiklik kaydıdır.</p>
<p>Örneğin:</p>
<ul>
<li>yeni özellik ekledin</li>
<li>hata düzelttin</li>
</ul>
<p>Bu değişiklikleri Git''e kaydedersin.</p>
<p>Örnek commit:</p>
<pre><code>Add login system
Fix navbar bug
Update API integration</code></pre>
<hr>
<h2>Branch</h2>
<p>Branch yeni bir geliştirme hattıdır.</p>
<p>Örneğin:</p>
<ul>
<li>main → ana proje</li>
<li>feature-login → login geliştirmesi</li>
<li>bugfix-navbar → hata düzeltme</li>
</ul>
<p>Bu sayede ekip aynı anda çalışabilir.</p>
<hr>
<h2>Pull Request</h2>
<p>Pull Request ekip çalışmalarının merkezidir.</p>
<p>Bir geliştirici yeni özellik eklediğinde:</p>
<ol>
<li>branch oluşturur</li>
<li>kod yazar</li>
<li>pull request açar</li>
</ol>
<p>Diğer geliştiriciler kodu inceleyip onaylar.</p>
<hr>
<h1>GitHub neden bu kadar popüler?</h1>
<p>GitHub''ın bu kadar yayılmasının birkaç nedeni vardır.</p>
<h2>Açık kaynak ekosistemi</h2>
<p>GitHub dünyanın en büyük açık kaynak platformudur.</p>
<p>Birçok büyük proje burada barınır:</p>
<ul>
<li><strong>React</strong></li>
<li><strong>Vue.js</strong></li>
<li><strong>TensorFlow</strong></li>
<li><strong>Flutter</strong></li>
</ul>
<hr>
<h2>İşbirliği araçları</h2>
<p>GitHub sadece kod saklama platformu değildir.</p>
<p>Aynı zamanda proje yönetim aracıdır.</p>
<p>Özellikler:</p>
<ul>
<li>Issues</li>
<li>Pull Requests</li>
<li>Discussions</li>
<li>Project boards</li>
</ul>
<hr>
<h2>Otomasyon (CI/CD)</h2>
<p>GitHub içinde otomasyon sistemi bulunur:</p>
<p><strong>GitHub Actions</strong></p>
<p>Bununla şunlar yapılabilir:</p>
<ul>
<li>test çalıştırma</li>
<li>deploy otomasyonu</li>
<li>build işlemleri</li>
</ul>
<p>Örnek workflow:</p>
<pre><code>Push → Test → Build → Deploy</code></pre>
<hr>
<h1>GitHub fiyatları ve paketleri</h1>
<p>GitHub birkaç farklı plan sunar.</p>
<h2>Free Plan</h2>
<p>Bireysel geliştiriciler için.</p>
<p>Özellik: Sınırsız repo, private repo var, Collaborator sınırlı, GitHub Actions sınırlı. Kişisel projeler için genelde yeterlidir.</p>
<hr>
<h2>Pro Plan</h2>
<p>Fiyat: $4 / ay. Actions limiti daha yüksek, Advanced tools var.</p>
<hr>
<h2>Team Plan</h2>
<p>Fiyat: $4 / kullanıcı. Team management ve gelişmiş security.</p>
<hr>
<h2>Enterprise Plan</h2>
<p>Büyük şirketler için. Gelişmiş güvenlik, enterprise yönetim araçları, özel destek.</p>
<hr>
<h1>GitHub ile neler yapılabilir?</h1>
<p>GitHub sadece kod saklama platformu değildir.</p>
<p>Birçok farklı amaç için kullanılabilir.</p>
<ul>
<li><strong>Açık kaynak projeleri</strong> – Dünyadaki geliştiriciler projelere katkı yapabilir.</li>
<li><strong>Portfolyo</strong> – Birçok yazılımcı GitHub profilini portfolyo olarak kullanır.</li>
<li><strong>Dokümantasyon</strong> – Projeler için detaylı dokümantasyon hazırlanabilir.</li>
<li><strong>Hosting</strong> – GitHub Pages ile statik siteler yayınlanabilir.</li>
</ul>
<hr>
<h1>GitHub vs alternatifleri</h1>
<p>GitHub tek platform değildir.</p>
<p>Alternatifler: <strong>GitLab</strong>, <strong>Bitbucket</strong>.</p>
<p>GitHub''ın avantajı: büyük topluluk, açık kaynak projeler, geniş araç ekosistemi.</p>
<hr>
<h1>Modern geliştirici stack''i</h1>
<p>Bugün birçok proje şu mimariyi kullanır:</p>
<pre><code>Kod → GitHub
Deploy → Vercel
Backend → Supabase
Database → PostgreSQL</code></pre>
<p>Bu yapı modern web geliştirmede oldukça yaygındır.</p>
<hr>
<h1>Ne zaman GitHub kullanmalısın?</h1>
<p>GitHub kullan:</p>
<ul>
<li>projeni saklamak istiyorsan</li>
<li>ekip ile çalışıyorsan</li>
<li>açık kaynak proje geliştiriyorsan</li>
<li>CI/CD otomasyonu kurmak istiyorsan</li>
</ul>
<hr>
<h1>Sonuç</h1>
<p>Modern yazılım geliştirme sürecinde GitHub artık standart haline geldi.</p>
<p>Bir proje geliştirirken genelde ilk adım şu olur:</p>
<blockquote><p>"Repo oluştur."</p></blockquote>
<p>Çünkü GitHub sadece bir kod deposu değil, aynı zamanda bir geliştirme ekosistemidir.</p>
<p>Kodun geçmişini yönetmek, ekip ile çalışmak ve projeni dünyayla paylaşmak istiyorsan:</p>
<p><strong>GitHub modern geliştiricilerin en temel araçlarından biridir.</strong></p>',
  true,
  true,
  0,
  15,
  'Tech News',
  0,
  0
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  category = EXCLUDED.category,
  published = EXCLUDED.published,
  featured_on_homepage = EXCLUDED.featured_on_homepage,
  updated_at = now();
