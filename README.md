# Buddy Publisher 🚀

A multi-platform automated publishing system designed to distribute investment intelligence and reports. It seamlessly connects `buddy-core` content generation with various publishing platforms, ensuring stable and reliable delivery.

## 🌟 Key Features

- **Multi-Platform Support**: Centralized distribution engine for platforms like **Substack** and **Naver Premium Content**.
- **Advanced Bot Detection Bypass**: Utilizes **Self-hosted Runners** and **Browser Stealth** technologies to navigate through complex security challenges (e.g., Cloudflare) of modern web platforms.
- **High-Fidelity Rendering**: Converts raw Markdown into rich HTML with support for complex elements like data tables and styled blocks.
- **Smart Metadata Extraction**: Dynamically identifies titles, tags, and SEO descriptions tailored for each platform's requirements.
- **Session & Continuity Management**: Implements automated session refresh logic to maintain long-term publishing stability without manual intervention.
- **Automated Content Formatting**: Handles platform-specific features like paywalls, disclaimers, and cross-links automatically.

## 🛠 Tech Stack

- **Language**: Python 3.12+
- **Automation Engine**: Playwright (Chromium) with advanced stealth patches.
- **Content Processing**: `markdown`, `re` (Regex-based parsing).
- **CI/CD Infrastructure**: GitHub Actions with Self-hosted macOS Runners for residential IP stability.

## 🚀 Infrastructure Setup (Self-hosted Runner)

To ensure high reliability and bypass IP-based restrictions, this system runs on a self-hosted environment.

### 1. Runner Installation

1. Navigate to **Settings > Actions > Runners** in your GitHub repository.
2. Follow the setup guide for your host machine (Recommended: macOS ARM64).

### 2. Background Service Configuration

Ensure the runner persists across sessions:

```bash
./svc.sh install
./svc.sh start
```

### 3. Local Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
playwright install chromium
```

## 🔐 Platform Configuration & Secrets

Configure the following secrets for target platforms:

| Name                  | Description                                       |
| :-------------------- | :------------------------------------------------ |
| `PAT_TOKEN`           | Access token for the core content repository      |
| `SUBSTACK_STATE_JSON` | Session state for Substack automation             |
| `NAVER_STATE_JSON`    | (Planned) Session state for Naver Premium Content |

## 🔄 Publishing Workflow

1. **Trigger**: `buddy-core` sends a `repository_dispatch` event upon new content generation.
2. **Fetch**: The runner downloads the target Markdown files from the source repository.
3. **Process**: The system parses content and prepares platform-specific payloads.
4. **Distribute**: Automation scripts log in to target platforms (Substack, Naver, etc.) and publish the content.
5. **Sync**: Latest session states are saved locally to ensure the next run starts seamlessly.

## 📝 Planned Features

- [x] Substack Automation Integration
- [ ] Naver Premium Content Automation
- [ ] Multi-channel Parallel Publishing
- [ ] Automated Notification (Telegram/Discord) upon Success
