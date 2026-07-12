import time
import os
import sys
import json
from pathlib import Path
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
CORE_DATA_DIR = BASE_DIR.parent / "core" / "data"
STATE_FILE = BASE_DIR / ".publish_history.json"
PUBLISH_SCRIPT = BASE_DIR / "src" / "publish.py"


def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    return {"published_files": []}


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=4)


class ReportHandler(FileSystemEventHandler):
    def __init__(self):
        super().__init__()
        self.state = load_state()

    def process_file(self, filepath: Path):
        filename = filepath.name

        if not filename.endswith(".md"):
            return

        if filename in self.state["published_files"]:
            return

        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Detected new report: {filename}")

        is_korean = "_ko.md" in filename

        if is_korean:
            # Check if English version is published first
            english_filename = filename.replace("_ko.md", ".md")
            if english_filename not in self.state["published_files"]:
                print(
                    f"Waiting for English version ({english_filename}) to be published first..."
                )
                return

        print(f"Publishing {filename} to Naver Premium...")
        env = os.environ.copy()
        env["POST_FILE_PATH"] = str(filepath)

        try:
            result = subprocess.run(
                ["uv", "run", str(PUBLISH_SCRIPT)],
                env=env,
                check=True,
                capture_output=True,
                text=True,
            )
            print(f"Successfully published {filename}")
            print(result.stdout)

            self.state["published_files"].append(filename)
            save_state(self.state)

        except subprocess.CalledProcessError as e:
            print(f"Failed to publish {filename}:")
            print(e.stderr)

    def on_created(self, event):
        if not event.is_directory:
            path_str = (
                event.src_path.decode()
                if isinstance(event.src_path, bytes)
                else event.src_path
            )
            self.process_file(Path(path_str))

    def on_modified(self, event):
        if not event.is_directory:
            path_str = (
                event.src_path.decode()
                if isinstance(event.src_path, bytes)
                else event.src_path
            )
            self.process_file(Path(path_str))


def main():
    if not CORE_DATA_DIR.exists():
        print(f"Error: {CORE_DATA_DIR} does not exist.")
        sys.exit(1)

    print(f"Starting monitor on {CORE_DATA_DIR}...")
    event_handler = ReportHandler()
    observer = Observer()
    observer.schedule(event_handler, str(CORE_DATA_DIR), recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
            for path in CORE_DATA_DIR.rglob("*.md"):
                event_handler.process_file(path)

    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
