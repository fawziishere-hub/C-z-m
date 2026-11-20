-- quotes tablosunu gerçekten koruma altına alır.
--
-- NEDEN GEREKLİ:
--   AdminGate yalnızca arayüzü gizler. Supabase anon anahtarı tarayıcıya
--   gömülüdür ve herkese açıktır; RLS kapalıysa biri tarayıcı konsolundan
--   veya curl ile tüm teklif taleplerini okuyabilir. Gerçek güvenlik burada.
--
-- SIRALAMA ÖNEMLİ:
--   1. Önce Authentication > Users içinde admin@gmail.com kullanıcısını oluşturun.
--   2. Sonra bu dosyayı çalıştırın.
--   Aksi halde /admin içine kimse giremez.
--
-- NOT: Farklı bir yönetici adresi kullanacaksanız aşağıdaki
--      'admin@gmail.com' değerlerini değiştirin.

alter table public.quotes enable row level security;

-- 1) Herkes formu doldurabilsin (public site bu yüzden çalışır)
drop policy if exists "public can submit quotes" on public.quotes;
create policy "public can submit quotes"
  on public.quotes
  for insert
  to anon, authenticated
  with check (true);

-- 2) Yalnızca yönetici okuyabilir
drop policy if exists "admin can read quotes" on public.quotes;
create policy "admin can read quotes"
  on public.quotes
  for select
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@gmail.com');

-- 3) Yalnızca yönetici durum güncelleyebilir
drop policy if exists "admin can update quotes" on public.quotes;
create policy "admin can update quotes"
  on public.quotes
  for update
  to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'admin@gmail.com');

-- Kontrol: bu sorgu satır dönmemeli (RLS aktif olmalı)
--   select relname, relrowsecurity from pg_class where relname = 'quotes';
