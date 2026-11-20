-- Demo verisi: yönetim panelini sahibine gösterirken boş görünmemesi için.
-- Supabase Dashboard > SQL Editor içinde çalıştırın.
--
-- ÖNEMLİ: Bu kayıtları canlıya çıkmadan önce silin:
--   delete from public.quotes;
--
-- Not: sütun adları camelCase olduğu için çift tırnak zorunlu.
-- Eğer tablonuzda "status" sütunu yoksa bu dosyayı çalıştırmadan önce ekleyin:
--   alter table public.quotes add column if not exists status text default 'pending';

insert into public.quotes
  ("companyName", "fullName", email, phone, category, message, status, created_at)
values
  ('Anadolu Bilişim A.Ş.', 'Serkan Yıldız', 'serkan@anadolubilisim.com.tr', '0532 418 72 90',
   'sunucu', 'Merkez ofis için 2 adet 2U kabin tipi sunucu ihtiyacımız var. VMware ortamı için 128GB RAM ve çift güç kaynağı şart. Fiyat ve teslim süresi rica ederiz.',
   'pending', now() - interval '2 hours'),

  ('Ege Lojistik', 'Merve Kaya', 'm.kaya@egelojistik.com', '0533 116 45 21',
   'ag-guvenlik', 'Depo ve merkez arasında VPN için firewall yenilemesi yapacağız. Mevcut cihaz 8 yaşında. 2 lokasyon için teklif bekliyoruz.',
   'pending', now() - interval '5 hours'),

  ('Yıldız İnşaat', 'Ahmet Demir', 'ahmet.demir@yildizinsaat.com.tr', '0542 377 88 14',
   'bilgisayar', 'Santiye ofisi için 15 adet dizüstü bilgisayar alacağız. AutoCAD kullanılacak, en az i7 ve 16GB RAM. Kampanya veya toplu indirim var mı?',
   'pending', now() - interval '1 day'),

  ('Marmara Tekstil', 'Elif Şahin', 'elif@marmarateks.com', '0505 240 67 33',
   'depolama', 'Üretim verilerimiz için 20TB civarı yedekleme alanı gerekiyor. NAS mi SAN mı önerirsiniz? Destek anlaşması da olacak mı?',
   'pending', now() - interval '1 day 4 hours'),

  ('Başkent Medikal', 'Hakan Öztürk', 'h.ozturk@baskentmedikal.com.tr', '0312 555 19 02',
   'toplu-proje', 'Yeni açılacak şube için komple BT kurulumu: 25 istemci, 1 sunucu, ağ güvenliği ve kablolama. Şantiye halinde, sizinle yerinde görüşebilir miyiz?',
   'pending', now() - interval '2 days'),

  ('Karadeniz Fındık San.', 'Zeynep Aksoy', 'zeynep@kdzfındık.com.tr', '0530 771 04 58',
   'sunucu', 'Mevcut sunucumuz yavaşladı, değiştirmek istiyoruz. Veri taşıma ve kurulum dahil teklif istiyoruz.',
   'confirmed', now() - interval '3 days'),

  ('Öz Anadolu Turizm', 'Burak Çelik', 'burak@ozanadoluTur.com', '0532 609 51 77',
   'ag-guvenlik', 'Otel genelinde 12 access point ihtiyacımız var. Misafir ağı ayrı olsun. Kablosuz kontrolcü de dahil olabilir.',
   'confirmed', now() - interval '4 days'),

  ('Teknopark Yazılım', 'Deniz Arslan', 'deniz@teknoparkyazilim.com', '0538 224 10 63',
   'bilgisayar', 'Geliştirici ekibimiz için 8 adet yüksek performanslı masaüstü alacağız. Ekranlar dahil mi?',
   'confirmed', now() - interval '5 days'),

  ('Güven Sigorta', 'Selin Koç', 'selin.koc@guvensigorta.com.tr', '0312 447 28 91',
   'depolama', 'KVKK kapsamında yedekleme altyapısını yeniliyoruz. Şifreleme ve uzak lokasyon opsiyonlarını da fiyatlandırır mısınız?',
   'confirmed', now() - interval '6 days'),

  ('Beyaz Et Gıda', 'Murat Erdoğan', 'murat@beyazetgida.com', '0546 882 36 19',
   'toplu-proje', 'Üretim tesisimiz için 40 adet el terminali ve 6 access point gerekiyor. Teslim şekliniz nedir?',
   'confirmed', now() - interval '7 days'),

  ('Akdeniz Turizm', 'Gizem Yalçın', 'gizem@akdenizturizm.com.tr', '0537 190 44 82',
   'sunucu', 'Rezervasyon sistemimiz için sunucu kurulumu hakkında görüştük. Siparişi onaylıyoruz, kurulum takvimini paylaşır mısınız?',
   'contacted', now() - interval '9 days'),

  ('Işık Elektrik', 'Onur Şen', 'onur@isikelektrik.com.tr', '0507 355 62 18',
   'bilgisayar', 'Teklifiniz için teşekkürler, bütçe onayından sonra döneceğiz. Görüşme için teşekkürler.',
   'contacted', now() - interval '11 days'),

  ('Anadolu Otomotiv', 'Furkan Aydın', 'furkan.aydin@anadoluoto.com', '0533 918 27 05',
   'ag-guvenlik', 'Firewall teklifinizi değerlendirdik. Alternatif marka öneriniz de olursa seviniriz.',
   'contacted', now() - interval '13 days'),

  ('Çukurova Tarım', 'Esra Polat', 'esra@cukurovatarim.com.tr', '0538 446 91 30',
   'toplu-proje', 'Sahada kullanacağımız tabletler ve ağ cihazları için teklifiniz ulaştı, teşekkürler.',
   'contacted', now() - interval '16 days'),

  ('Vega Mühendislik', 'Cem Doğan', 'cem@vegamuhendislik.com', '0544 203 78 46',
   'depolama', 'Yedekleme çözümünüzle ilgileniyoruz. 2 ofis arasında replikasyon desteği var mı?',
   'pending', now() - interval '3 days 6 hours');
