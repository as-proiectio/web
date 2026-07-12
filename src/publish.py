import os
import re
import sys
import markdown
from typing import Tuple
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth

# --- Configuration ---
NEW_POST_URL = "https://studio.premium.naver.com/post/write"
TITLE_INPUT_SELECTOR = "textarea[placeholder*='제목을 입력하세요'], input[placeholder*='제목']"
BODY_INPUT_SELECTOR = ".se-main-container, .se-content"
PUBLISH_PANEL_BUTTON = "button:has-text('발행')"
CONFIRM_PUBLISH_BUTTON = "button:has-text('발행하기')"
STATE_FILE = os.path.join(os.path.dirname(__file__), "state.json")

def process_markdown_content(content: str, is_korean: bool) -> str:
    """Removes '### Daily Point' sections and appends a disclaimer."""
    pattern = r"(###\s+(?:Daily Point|데일리 포인트|CIO 코멘트).*?)(?=\n##|\Z)"
    cleaned_content = re.sub(pattern, "", content, flags=re.DOTALL | re.IGNORECASE)
    
    disclaimer = (
        "\n\n---\n*Disclaimer: 본 발행물은 정보 제공 및 교육용으로만 제공되며 재무, 투자 또는 법률적 조언을 구성하지 않습니다.*"
        if is_korean 
        else "\n\n---\n*Disclaimer: The information provided is for informational purposes only and does not constitute financial, investment, or legal advice.*"
    )
    
    return cleaned_content.strip() + disclaimer

def extract_metadata(content: str, is_korean: bool) -> Tuple[str, str]:
    """Extracts date and tags to generate the title."""
    date_match = re.search(r"##\s+(\d{2}\s+[A-Za-z]+\s+\d{4})", content)
    post_date = date_match.group(1) if date_match else "Unknown Date"

    tags = re.findall(r"[-*]\s+\*\*([^\*]+)\*\*", content)[:3]
    tags_str = ", ".join(tags)

    title = f"{post_date} - 일일 시황 요약 ({tags_str})" if is_korean else f"{post_date} - The Daily Tape ({tags_str})"
    return title, tags_str

def read_markdown_file(file_path: str) -> str:
    """Reads the target markdown file safely."""
    if not file_path:
        print("Error: POST_FILE_PATH environment variable is not set.")
        sys.exit(1)
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        sys.exit(1)

def publish_to_naver(title: str, html_content: str):
    """Executes the Playwright publishing flow."""
    with Stealth().use_sync(sync_playwright()) as p:
        if not os.path.exists(STATE_FILE):
            print(f"Warning: State file not found at {STATE_FILE}. Please login manually and save state.json.")

        # TODO: Set headless=True when running reliably in background
        browser = p.chromium.launch(
            headless=False,
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
        )

        storage_state = STATE_FILE if os.path.exists(STATE_FILE) else None
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            storage_state=storage_state
        )
        context.grant_permissions(["clipboard-read", "clipboard-write"])
        
        page = context.new_page()

        try:
            print("Navigating to Naver Premium editor...")
            page.goto(NEW_POST_URL)
            page.wait_for_load_state("networkidle")

            print("Entering title...")
            try:
                page.wait_for_selector(TITLE_INPUT_SELECTOR, state="visible", timeout=15000)
                page.fill(TITLE_INPUT_SELECTOR, title)
            except Exception as e:
                print("Could not find title selector, proceeding anyway. Error:", e)

            print("Writing to clipboard and pasting Rich Text...")
            clipboard_injection_js = f"""
            async () => {{
                const blob = new Blob([`{html_content}`], {{ type: 'text/html' }});
                const data = [new ClipboardItem({{ 'text/html': blob }})];
                await navigator.clipboard.write(data);
            }}
            """
            page.evaluate(clipboard_injection_js)

            try:
                page.wait_for_selector(BODY_INPUT_SELECTOR, state="visible", timeout=15000)
                page.click(BODY_INPUT_SELECTOR)
                page.wait_for_timeout(500)
                page.keyboard.press("Meta+V") # Cmd+V on mac, Ctrl+V on windows
                page.wait_for_timeout(2000)
            except Exception as e:
                print("Failed to paste into body:", e)

            print("Publishing...")
            try:
                # TODO: Add logic to set tags and categories in Naver Premium Content here if needed
                page.click(PUBLISH_PANEL_BUTTON)
                page.wait_for_timeout(2000)
                page.click(CONFIRM_PUBLISH_BUTTON)
                page.wait_for_timeout(3000)
                print("Successfully published to Naver Premium!")
            except Exception as e:
                print("Could not complete publish flow automatically:", e)

            if storage_state:
                context.storage_state(path=STATE_FILE)

        except Exception as e:
            print(f"Failed to publish to Naver Premium: {e}")
            raise e
        finally:
            browser.close()

def main():
    file_path = os.environ.get("POST_FILE_PATH", "")
    content = read_markdown_file(file_path)
    print(f"Loaded Markdown: {file_path}")
    
    is_korean = "_ko.md" in file_path
    title, tags_str = extract_metadata(content, is_korean)
    print(f"Title: {title}\nTags: {tags_str}")

    raw_body = process_markdown_content(content, is_korean)
    html_content = markdown.markdown(raw_body, extensions=["tables"]).replace("\n", "")
    
    publish_to_naver(title, html_content)

if __name__ == "__main__":
    main()
