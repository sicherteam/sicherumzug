import os
import sys
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import requests

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

BASE_DIR = Path(r"C:\Users\Yasin CELIK\Downloads\sicher-team-site")
CRED_DIR = BASE_DIR / ".credentials"
CRED_DIR.mkdir(exist_ok=True)
CLIENT_SECRET_PATH = CRED_DIR / "oauth_client_secret.json"
TOKEN_PATH = CRED_DIR / "gbp_token.json"

SCOPES = [
    'https://www.googleapis.com/auth/business.manage'
]

def authenticate():
    creds = None
    if TOKEN_PATH.exists():
        try:
            creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
        except Exception:
            creds = None
            
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("Refreshing expired token...")
            creds.refresh(Request())
        else:
            print("Starting OAuth 2.0 Local Server Flow...")
            print("Browser opening automatically on your screen...")
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CLIENT_SECRET_PATH), SCOPES
            )
            creds = flow.run_local_server(port=0, prompt="consent")
            
        with open(str(TOKEN_PATH), 'w', encoding='utf-8') as f:
            f.write(creds.to_json())
            print(f"Token saved successfully to {TOKEN_PATH}!")
            
    # Test credentials
    print("\n--- Testing Google Business Profile Access for Sicher Team ---")
    headers = {'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'}
    
    # 1. List accounts
    acc_url = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts'
    res = requests.get(acc_url, headers=headers)
    print(f"Accounts status: {res.status_code}")
    accounts_data = res.json()
    print("Accounts response:", accounts_data)
    
    # 2. Check locations
    accounts = accounts_data.get('accounts', [])
    for acc in accounts:
        acc_name = acc['name']
        print(f"\nChecking locations for: {acc_name} ({acc.get('accountName')})")
        loc_url = f"https://mybusinessbusinessinformation.googleapis.com/v1/{acc_name}/locations?readMask=name,title,storefrontAddress,metadata"
        l_res = requests.get(loc_url, headers=headers)
        print(f"Locations status: {l_res.status_code}")
        print("Locations response:", l_res.json())

if __name__ == "__main__":
    authenticate()
