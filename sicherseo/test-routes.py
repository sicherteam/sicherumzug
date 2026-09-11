from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        pages_to_test = [
            ("http://localhost:4000/", "home"),
            ("http://localhost:4000/leistungen/", "leistungen_index"),
            ("http://localhost:4000/leistungen/wohlfuehl-umzug/", "wohlfuehl_umzug"),
            ("http://localhost:4000/bundesland/", "bundesland_index"),
            ("http://localhost:4000/bundesland/tirol/", "tirol_state"),
            ("http://localhost:4000/bewertungen/", "bewertungen")
        ]

        for url, name in pages_to_test:
            # Desktop
            context_desktop = browser.new_context(viewport={'width': 1280, 'height': 800})
            page_desktop = context_desktop.new_page()
            response = page_desktop.goto(url)
            print(f"URL: {url} (Desktop), Status: {response.status}")
            page_desktop.screenshot(path=f"{name}_desktop.png", full_page=False)
            context_desktop.close()

            # Mobile
            context_mobile = browser.new_context(viewport={'width': 375, 'height': 800})
            page_mobile = context_mobile.new_page()
            response = page_mobile.goto(url)
            print(f"URL: {url} (Mobile), Status: {response.status}")
            page_mobile.screenshot(path=f"{name}_mobile.png", full_page=False)
            context_mobile.close()

        browser.close()

verify()
