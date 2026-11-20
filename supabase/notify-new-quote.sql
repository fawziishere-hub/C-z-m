-- Yeni teklif talebi geldiğinde e-posta bildirimi (Resend + pg_net).
--
-- NASIL ÇALIŞTIRILIR:
--   1. Supabase Dashboard > SQL Editor
--   2. Aşağıdaki __RESEND_API_KEY__ yazan yeri kendi anahtarınızla değiştirin
--      (yalnızca SQL Editor'de, bu dosyayı commit etmeyin!)
--   3. Çalıştırın
--
-- ÖNEMLİ:
--   * 'from' alanı onboarding@resend.dev olduğu için Resend, yalnızca Resend
--     hesabınızın kendi e-posta adresine teslim eder. Başka adreslere
--     göndermek için resend.com/domains üzerinden alan adı doğrulamanız gerekir.
--   * Anahtar fonksiyon tanımının içinde durur; veritabanına erişimi olan
--     biri görebilir. Demo sonrası anahtarı resend.com/api-keys üzerinden
--     yenileyin ve bu fonksiyonu yeni anahtarla tekrar çalıştırın.

create extension if not exists pg_net;

create or replace function public.notify_new_quote()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer __RESEND_API_KEY__',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'Cozum Web <onboarding@resend.dev>',
      'to', jsonb_build_array('fawziishere@gmail.com'),
      'subject', 'Yeni Teklif Talebi: ' || coalesce(new."companyName", 'Bilinmeyen firma'),
      'html',
        '<h2 style="font-family:sans-serif">Yeni Teklif Talebi</h2>' ||
        '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Firma</b></td><td>' || coalesce(new."companyName", '-') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Yetkili</b></td><td>' || coalesce(new."fullName", '-') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>E-posta</b></td><td>' || coalesce(new.email, '-') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Telefon</b></td><td>' || coalesce(new.phone, '-') || '</td></tr>' ||
        '<tr><td style="padding:4px 12px 4px 0"><b>Ürün Grubu</b></td><td>' || coalesce(new.category, '-') || '</td></tr>' ||
        '</table>' ||
        '<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">' ||
        coalesce(new.message, '') || '</p>' ||
        '<p style="font-family:sans-serif;font-size:12px;color:#64748b">' ||
        'Tüm talepler: /admin</p>'
    )
  );

  return new;
end;
$$;

drop trigger if exists on_quote_created on public.quotes;

create trigger on_quote_created
after insert on public.quotes
for each row
execute function public.notify_new_quote();

-- Test: yeni bir talep ekleyip fawziishere@gmail.com gelen kutusunu kontrol edin.
