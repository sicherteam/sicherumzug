import os
import sys
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
import requests

sys.stdout.reconfigure(line_buffering=True)

BASE_DIR = Path(r"C:\Users\Yasin CELIK\Downloads\sicher-team-site")
CRED_DIR = BASE_DIR / ".credentials"
CRED_DIR.mkdir(exist_ok=True)
CLIENT_SECRET_PATH = CRED_DIR / "oauth_client_secret.json"
TOKEN_PATH = CRED_DIR / "gbp_token.json"

SCOPES = [
    'https://www.googleapis.com/auth/business.manage'
]

def run():
    port = 8088
    flow = InstalledAppFlow.from_client_secrets_file(
        str(CLIENT_SECRET_PATH),
        scopes=SCOPES
    )
    
    print(f"Starting local server on port {port}...", flush=True)
    # run_local_server handles PKCE, code exchange, state check, and browser opening natively!
    creds = flow.run_local_server(
        port=port,
        prompt="consent",
        authorization_prompt_message="\n================== AUTH LINK ==================\n{url}\n===============================================\n",
        success_message="<h1>Yetkilendirme Basarili!</h1><p>Google Business Profile baglantisi kuruldu. Bu pencereyi kapatabilirsiniz.</p>"
    )
    
    with open(TOKEN_PATH, 'w', encoding='utf-8') as f:
        f.write(creds.to_json())
    print(f"\nSUCCESS! Token saved to {TOKEN_PATH}", flush=True)
    
    # Test API
    headers = {'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'}
    acc_res = requests.get('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', headers=headers)
    print("Accounts status:", acc_res.status_code, flush=True)
    print("Accounts response:", acc_res.json(), flush=True)
    for a in acc_res.json().get('accounts', []):
        aname = a['name']
        l_res = requests.get(f"https://mybusinessbusinessinformation.googleapis.com/v1/{aname}/locations?readMask=name,title,storefrontAddress,metadata", headers=headers)
        print(f"Locations for {aname}:", l_res.json(), flush=True)

if __name__ == "__main__":
    run()
