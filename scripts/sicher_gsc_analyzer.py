import os
import sys
import json
from datetime import datetime, timedelta

# Set standard output encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = r"C:\Users\Yasin CELIK\Downloads\cellular-unity-480519-v6-1ee3b407f959.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

print("=" * 60)
print("🔍 SICHER-UMZUG.AT - GOOGLE SEARCH CONSOLE API BAĞLANTISI")
print("=" * 60)

if not os.path.exists(KEY_PATH):
    print(f"❌ HATA: JSON anahtar dosyası bulunamadı: {KEY_PATH}")
    sys.exit(1)

try:
    creds = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=SCOPES)
    service = build("searchconsole", "v1", credentials=creds)

    sites = service.sites().list().execute()
    entries = sites.get("siteEntry", [])
    print(f"📋 Yetkili Mülk Sayısı: {len(entries)}")
    for s in entries:
        print(f"   -> URL: {s.get('siteUrl')} | Yetki Seviyesi: {s.get('permissionLevel')}")

    target_site = None
    for s in entries:
        url = s.get("siteUrl", "")
        if "sicher-umzug" in url or "sicherumzug" in url:
            target_site = url
            break

    if not target_site:
        print("\n⚠️ DIKKAT: sicher-umzug.at henüz bu Google Cloud Botuna yetkilendirilmemiş.")
        print("Bot E-postası:")
        print(f"👉 {creds.service_account_email}")
        print("\nNasıl Yetki Verilir:")
        print("1. Google Search Console paneline girin (https://search.google.com/search-console)")
        print("2. sicher-umzug.at mülkünü seçin.")
        print("3. Sol menüden Ayarlar (Settings) -> Kullanıcılar ve İzinler (Users and permissions) sekmesine tıklayın.")
        print("4. 'Kullanıcı Ekle' butonuna basıp yukarıdaki bot e-postasını yapıştırın.")
        print("5. İzin seviyesini 'Tam' (Full) seçip onaylayın.")
        sys.exit(0)

    print(f"\n✅ Hedef Mülk Bağlandı: {target_site}")

    # 1. Sitemaps
    try:
        sitemaps = service.sitemaps().list(siteUrl=target_site).execute()
        sm_entries = sitemaps.get("sitemap", [])
        print(f"\n[SITEMAP RAPORU] Bulunan Site Haritası: {len(sm_entries)}")
        for sm in sm_entries:
            path = sm.get("path")
            last_dl = sm.get("lastDownloaded", "Bilinmiyor")
            warnings = sm.get("warnings", 0)
            errors = sm.get("errors", 0)
            contents = sm.get("contents", [])
            sub = sum([int(c.get("submitted", 0)) for c in contents])
            idx = sum([int(c.get("indexed", 0)) for c in contents])
            print(f"- {path} | Son İndirme: {last_dl} | Gönderilen: {sub} | İndekslenen: {idx} | Hatalar: {errors}")
    except Exception as e:
        print(f"Sitemap bilgisi alınamadı: {e}")

    # 2. Search Analytics (Last 28 Days)
    end_date = (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d")
    start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")

    body_overall = {
        "startDate": start_date,
        "endDate": end_date
    }
    overall_res = service.searchanalytics().query(siteUrl=target_site, body=body_overall).execute()
    overall_rows = overall_res.get("rows", [])
    if overall_rows:
        tot_clicks = overall_rows[0].get("clicks", 0)
        tot_imp = overall_rows[0].get("impressions", 0)
        tot_ctr = overall_rows[0].get("ctr", 0) * 100
        tot_pos = overall_rows[0].get("position", 0)
        print(f"\n[SON 28 GÜN GENEL PERFORMANS]")
        print(f"Toplam Tıklama: {tot_clicks}")
        print(f"Toplam Gösterim: {tot_imp}")
        print(f"Ortalama Tıklama Oranı (CTR): %{tot_ctr:.2f}")
        print(f"Ortalama Sıralama: {tot_pos:.1f}")

    # Top Queries
    body_queries = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["query"],
        "rowLimit": 30
    }
    query_res = service.searchanalytics().query(siteUrl=target_site, body=body_queries).execute()
    q_rows = query_res.get("rows", [])
    print(f"\n[EN ÇOK GÖSTERİM / TIKLAMA ALAN 30 SORGU]")
    print(f"{'Sorgu / Anahtar Kelime':<45} | {'Tıklama':<8} | {'Gösterim':<10} | {'CTR (%)':<8} | {'Sıra':<6}")
    print("-" * 85)
    for r in q_rows:
        q = r.get("keys", [""])[0]
        clicks = r.get("clicks", 0)
        imp = r.get("impressions", 0)
        ctr = r.get("ctr", 0) * 100
        pos = r.get("position", 0)
        print(f"{q:<45} | {clicks:<8} | {imp:<10} | {ctr:<8.1f} | {pos:<6.1f}")

    # Top Pages
    body_pages = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["page"],
        "rowLimit": 20
    }
    page_res = service.searchanalytics().query(siteUrl=target_site, body=body_pages).execute()
    p_rows = page_res.get("rows", [])
    print(f"\n[EN ÇOK TIKLANAN 20 SAYFA]")
    print(f"{'Sayfa URL':<60} | {'Tıklama':<8} | {'Gösterim':<10} | {'Sıra':<6}")
    print("-" * 90)
    for r in p_rows:
        p = r.get("keys", [""])[0].replace("https://sicher-umzug.at", "")
        clicks = r.get("clicks", 0)
        imp = r.get("impressions", 0)
        pos = r.get("position", 0)
        print(f"{p:<60} | {clicks:<8} | {imp:<10} | {pos:<6.1f}")

except Exception as e:
    print(f"HATA: {e}")
