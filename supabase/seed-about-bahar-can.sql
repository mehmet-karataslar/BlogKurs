-- Örnek Hakkımda verisi: Bahar Can (Yazılım Mühendisi)
-- Supabase SQL Editor'da çalıştırın. about tablosu ve şema önceden oluşturulmuş olmalı.

-- Önce varsa mevcut tek satırı temizleyebilirsiniz (isteğe bağlı):
-- DELETE FROM public.about;

INSERT INTO public.about (
  name,
  surname,
  tagline,
  profile_image_url,
  bio,
  schools,
  certificates,
  skills,
  technical_info,
  updated_at
) VALUES (
  'Bahar',
  'Can',
  'Full Stack Yazılım Mühendisi · React & Node.js',
  NULL,
  '<p>Merhaba, ben Bahar Can. İstanbul doğumluyum, yazılım mühendisliği alanında 6 yılı aşkın deneyime sahibim. Üniversite yıllarımdan bu yana web teknolojilerine odaklandım; önce frontend, sonra backend ve bulut mimarileri ile full stack geliştirme yapıyorum.</p>
<p>Kariyerime bir startup''ta frontend geliştirici olarak başladım; React ve modern JavaScript ekosistemi ile tanıştım. Ardından Node.js ve veritabanı tasarımına geçerek API ve servis katmanlarında çalıştım. Şu an bağımsız projeler ve ekip liderliği deneyimlerimi bir arada sürdürüyorum.</p>
<p>Kod kalitesi, test yazımı ve sürdürülebilir mimari benim için öncelikli. Açık kaynak projelere katkıda bulunmayı ve toplulukla bilgi paylaşımını seviyorum. Boş zamanlarımda teknik blog yazıyorum ve konferanslarda konuşmacı olarak yer alıyorum.</p>',
  '[
    {
      "id": "school-1",
      "name": "İstanbul Teknik Üniversitesi",
      "period": "2013–2018",
      "description": "Bilgisayar Mühendisliği, Lisans. Bitirme projesi: Dağıtık sistemlerde ölçeklenebilir önbellek mimarisi."
    },
    {
      "id": "school-2",
      "name": "Boğaziçi Üniversitesi",
      "period": "2018–2020",
      "description": "Yazılım Mühendisliği, Yüksek Lisans (tez aşamasında bırakıldı). Araştırma: Web performansı ve kullanıcı deneyimi metrikleri."
    },
    {
      "id": "school-3",
      "name": "Patika.dev – Full Stack Web Development",
      "period": "2021",
      "description": "İleri seviye bootcamp; React, Node.js, PostgreSQL ve DevOps temelleri."
    }
  ]'::jsonb,
  '[
    {
      "id": "cert-1",
      "name": "AWS Certified Developer – Associate",
      "issuer": "Amazon Web Services",
      "date": "2023-06",
      "url": "https://aws.amazon.com/certification/"
    },
    {
      "id": "cert-2",
      "name": "Meta Front-End Developer Professional Certificate",
      "issuer": "Meta (Coursera)",
      "date": "2022-11"
    },
    {
      "id": "cert-3",
      "name": "React – The Complete Guide",
      "issuer": "Udemy",
      "date": "2021-08"
    },
    {
      "id": "cert-4",
      "name": "Node.js: The Complete Guide",
      "issuer": "Udemy",
      "date": "2021-09"
    },
    {
      "id": "cert-5",
      "name": "MongoDB for Node.js Developers",
      "issuer": "MongoDB University",
      "date": "2022-03"
    },
    {
      "id": "cert-6",
      "name": "Git & GitHub – Versiyon Kontrolü",
      "issuer": "Patika.dev",
      "date": "2021-05"
    }
  ]'::jsonb,
  '[
    {"id": "skill-1", "name": "JavaScript", "level": "expert"},
    {"id": "skill-2", "name": "TypeScript", "level": "expert"},
    {"id": "skill-3", "name": "React", "level": "expert"},
    {"id": "skill-4", "name": "Next.js", "level": "advanced"},
    {"id": "skill-5", "name": "Node.js", "level": "expert"},
    {"id": "skill-6", "name": "PostgreSQL", "level": "advanced"},
    {"id": "skill-7", "name": "Supabase", "level": "advanced"},
    {"id": "skill-8", "name": "REST API Tasarımı", "level": "expert"},
    {"id": "skill-9", "name": "Git / GitHub", "level": "expert"},
    {"id": "skill-10", "name": "Tailwind CSS", "level": "advanced"},
    {"id": "skill-11", "name": "Docker", "level": "intermediate"},
    {"id": "skill-12", "name": "AWS (EC2, S3, Lambda)", "level": "intermediate"},
    {"id": "skill-13", "name": "CI/CD (GitHub Actions)", "level": "intermediate"},
    {"id": "skill-14", "name": "Figma (temel)", "level": "beginner"},
    {"id": "skill-15", "name": "Agile / Scrum", "level": "advanced"}
  ]'::jsonb,
  '<p><strong>Kullandığım araçlar:</strong> VS Code, Figma, Postman, TablePlus, Chrome DevTools.</p>
<p><strong>İşletim sistemi:</strong> macOS (geliştirme), Linux (sunucu).</p>
<p><strong>Diller:</strong> Türkçe (ana dil), İngilizce (ileri – teknik dokümantasyon ve iletişim).</p>
<p><strong>İletişim:</strong> Açık kaynak projeler, teknik yazı ve konuşma davetleri için iletişim sayfasından ulaşabilirsiniz.</p>',
  now()
);

-- Tabloda zaten bir satır varsa önce silin, sonra bu dosyayı çalıştırın:
-- DELETE FROM public.about;
