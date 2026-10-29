import os
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from google_auth_oauthlib.flow import InstalledAppFlow, _ExclusiveWSGIServer, _RedirectWSGIApp, _WSGIRequestHandler
import wsgiref.simple_server
import requests

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'
sys.stdout.reconfigure(line_buffering=True)

BASE_DIR = Path(r"C:\Users\Yasin CELIK\Downloads\sicher-team-site")
CRED_DIR = BASE_DIR / ".credentials"
CRED_DIR.mkdir(exist_ok=True)
CLIENT_SECRET_PATH = CRED_DIR / "oauth_client_secret.json"
TOKEN_PATH = CRED_DIR / "gbp_token.json"
URL_FILE = CRED_DIR / "auth_url.txt"

SCOPES = [
    'https://www.googleapis.com/auth/business.manage'
]

def run():
    port = 8088
    flow = InstalledAppFlow.from_client_secrets_file(
        str(CLIENT_SECRET_PATH),
        scopes=SCOPES
    )
    
    success_message = """<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Yetkilendirme Başarılı</title></head>
<body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
  <div style="display: inline-block; padding: 30px 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: #f0fdf4; border: 1px solid #bbf7d0;">
    <h1 style="color: #166534; margin: 0 0 10px;">✓ Yetkilendirme Başarılı!</h1>
    <p style="color: #15803d; font-size: 16px; margin: 0;">Google Business Profile bağlantısı kuruldu. Bu sekmeyi kapatabilirsiniz.</p>
  </div>
</body>
</html>"""

    wsgi_app = _RedirectWSGIApp(success_message)
    local_server = wsgiref.simple_server.make_server(
        "localhost",
        port,
        wsgi_app,
        server_class=_ExclusiveWSGIServer,
        handler_class=_WSGIRequestHandler
    )
    
    flow.redirect_uri = f"http://localhost:{port}/"
    auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")
    
    with open(URL_FILE, "w", encoding="utf-8") as f:
        f.write(auth_url)
        
    print(f"\nAUTH_URL_START\n{auth_url}\nAUTH_URL_END\n", flush=True)
    
    # Auto-open browser
    try:
        os.system(f'cmd.exe /c start "" "{auth_url}"')
    except Exception as e:
        print("Auto open error:", e, flush=True)
        
    print(f"Server listening on http://localhost:{port}/ ...", flush=True)
    try:
        local_server.handle_request()
        
        req_uri = wsgi_app.last_request_uri
        print(f"Callback received: {req_uri[:60]}...", flush=True)
        
        parsed = urlparse(req_uri)
        qs = parse_qs(parsed.query)
        code = qs.get('code', [None])[0]
        
        if not code:
            print("ERROR: No code in callback URL!", flush=True)
            return
            
        print("Exchanging code for token...", flush=True)
        flow.fetch_token(code=code)
        
        with open(TOKEN_PATH, 'w', encoding='utf-8') as f:
            f.write(flow.credentials.to_json())
        print(f"\nSUCCESS! Token saved to {TOKEN_PATH}", flush=True)
        
        # Test accounts & locations
        headers = {'Authorization': f'Bearer {flow.credentials.token}', 'Content-Type': 'application/json'}
        acc_res = requests.get('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', headers=headers)
        print("Accounts:", acc_res.json(), flush=True)
        for a in acc_res.json().get('accounts', []):
            aname = a['name']
            l_res = requests.get(f"https://mybusinessbusinessinformation.googleapis.com/v1/{aname}/locations?readMask=name,title,storefrontAddress,metadata", headers=headers)
            print(f"Locations for {aname}:", l_res.json(), flush=True)
    finally:
        local_server.server_close()

if __name__ == "__main__":
    run()
