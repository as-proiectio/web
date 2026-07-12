# Naver Premium Content Publisher

Buddy 리포트(`core/data/report`, `core/data/premarket`) 생성을 실시간 감지하여, 네이버 프리미엄 콘텐츠 스튜디오에 완벽한 포맷팅(Rich Text)으로 자동 발행하는 모니터링 시스템입니다.

## 주요 기능
- **실시간 감시 (Zero-load)**: `watchdog` 라이브러리를 통해 파일 생성을 이벤트를 0초만에 감지하며, 맥북 리소스를 전혀 소모하지 않습니다.
- **포맷팅 보존**: 단순 마크다운 입력이 아닌, 클립보드 API를 사용해 실제 사용자가 Rich Text 복사-붙여넣기 한 것과 동일한 방식으로 에디터에 삽입됩니다.
- **컴플라이언스 준수**: 유사투자자문법 리스크를 방지하고자, 영문 리포트의 `### Daily Point` 등 문제가 될 수 있는 섹션을 정규식을 통해 깔끔하게 잘라내고 발행합니다.
- **백그라운드 데몬**: `launchd`를 활용해 재부팅해도 백그라운드에 상주하며 알아서 작업을 수행합니다.

## 디렉토리 구조
```text
publisher/
├── src/
│   ├── monitor.py      # 실시간 와치독 감시 데몬
│   └── publish.py      # 네이버 프리미엄 콘텐츠 발행 Playwright 스크립트
├── .env.example        # 환경 변수 예시
├── .gitignore
├── install.sh          # 서비스 설치 셸 스크립트
├── pyproject.toml      # uv 의존성 명세서
└── uv.lock             # uv 버전 잠금 파일 (커밋 됨)
```

## 설치 및 실행 방법

### 1. 패키지 매니저 준비
이 프로젝트는 초고속 패키지 매니저인 [uv](https://github.com/astral-sh/uv)를 사용합니다.
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. (최초 1회) 네이버 로그인 세션 파일 생성
스크립트가 자동으로 발행하기 위해서는 캡차(Captcha)를 피하기 위한 기존 로그인 정보(쿠키 세션)가 필요합니다.
`publisher/src/` 내에 `state.json` 파일을 준비해야 합니다. (기존에 발급한 파일 복사 또는 1회 수동 런타임 실행 후 로그인 상태에서 콘솔 스토리지 추출 등 적용)

### 3. 백그라운드 데몬 설치
맥북의 데몬 매니저(launchd)에 등록하여 시스템 재부팅 후에도 자동으로 켜지게 합니다.
```bash
cd ~/workspaces/buddy/publisher
./install.sh
```
설치가 완료되면 백그라운드에서 `src/monitor.py`가 켜져서 `core/data/...` 디렉토리를 감시하게 됩니다.

> **로그 확인**: `publisher/stdout.log` 및 `publisher/stderr.log`

## 수정이 필요한 경우 (TODO)
`src/publish.py` 에는 `TODO:` 주석이 달려 있습니다. 
- 네이버 에디터 DOM 구조가 변경되었을 때 Selector 수정 필요 (`TITLE_INPUT_SELECTOR` 등)
- 백그라운드 실행을 완전히 숨기고 싶을 경우 `headless=True`로 수정

## 환경 변수
필요한 경우 `publisher/.env.example`을 참고하여 `.env` 파일을 생성하세요.
