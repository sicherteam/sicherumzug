import os
import sys
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import requests
import webbrowser

sys.stdout.reconfigure(line_buffering=True)

BASE_DIR = Path(r"C:\Users\Yasin CELIK\Downloads\sicher-team-site")
CRED_DIR = BASE_DIR / ".credentials"
CRED_DIR.mkdir(exist_ok=True)
CLIENT_SECRET_PATH = CRED_DIR / "oauth_client_secret.json"
TOKEN_PATH = CRED_DIR / "gbp_token.json"
AUTH_LINK_PATH = Path(r"C:\Users\Yasin CELIK\.gemini\antigravity\brain\89bd4e69-b08e-4d83-a1f0-ee86191e152b\scratch\auth_link.txt")

SCOPES = [
    'https://www.googleapis.com/auth/business.manage'
]

def run():
    print("Preparing OAuth Flow...", flush=True)
    # Pick a fixed port, e.g. 8088
    port = 8088
    flow = InstalledAppFlow.from_client_secrets_file(
        str(CLIENT_SECRET_PATH),
        scopes=SCOPES,
        redirect_uri=f"http://localhost:{port}/"
    )
    auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")
    
    # Save auth_url
    with open(AUTH_LINK_PATH, "w", encoding="utf-8") as f:
        f.write(auth_url)
    
    print("\n==========================================", flush=True)
    print("AUTH URL GENERATED:", flush=True)
    print(auth_url, flush=True)
    print("==========================================\n", flush=True)
    
    # Try opening browser via Windows start command
    try:
        os.system(f'cmd.exe /c start "" "{auth_url}"')
    except Exception as e:
        print("Could not auto-launch browser:", e, flush=True)
        
    print(f"Waiting for authorization on http://localhost:{port}/ ...", flush=True)
    creds = flow.run_local_server(port=port, prompt="consent")
    
    with open(str(TOKEN_PATH), 'w', encoding='utf-8') as f:
        f.write(creds.to_json())
    print(f"\nSUCCESS! Token saved to {TOKEN_PATH}", flush=True)
    
    # Test API
    headers = {'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'}
    acc_url = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts'
    res = requests.get(acc_url, headers=headers)
    print(f"Accounts status: {res.status_code}")
    print("Accounts:", res.json())

if __name__ == "__main__":
    run()
