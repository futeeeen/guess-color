from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PIC_DIR = ROOT / "pic"
OUTPUT = ROOT / "data.json"
IMAGE_EXTENSIONS = {
    ".avif",
    ".bmp",
    ".gif",
    ".jpeg",
    ".jpg",
    ".png",
    ".webp",
}


def as_web_path(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def build_data() -> dict:
    if not PIC_DIR.exists():
        raise FileNotFoundError(f"Cannot find image folder: {PIC_DIR}")

    sets = []
    warnings = []

    for folder in sorted(PIC_DIR.iterdir(), key=lambda p: p.name.lower()):
        if not folder.is_dir():
            continue

        images = sorted(
            [
                file
                for file in folder.iterdir()
                if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS
            ],
            key=lambda p: p.name.lower(),
        )
        answers = [file for file in images if "answer" in file.name.lower()]

        if len(answers) != 1:
            warnings.append(
                {
                    "folder": as_web_path(folder),
                    "reason": f"expected exactly 1 Answer image, found {len(answers)}",
                }
            )
            continue

        answer = answers[0]
        decoys = [file for file in images if file != answer]

        if len(decoys) < 3:
            warnings.append(
                {
                    "folder": as_web_path(folder),
                    "reason": f"expected at least 3 non-answer images, found {len(decoys)}",
                }
            )
            continue

        sets.append(
            {
                "id": folder.name,
                "folder": as_web_path(folder),
                "answer": as_web_path(answer),
                "decoys": [as_web_path(file) for file in decoys],
                "images": [as_web_path(file) for file in images],
            }
        )

    return {
        "generatedBy": "generate_data.py",
        "setCount": len(sets),
        "sets": sets,
        "warnings": warnings,
    }


def main() -> None:
    data = build_data()
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT.name} with {data['setCount']} playable sets.")
    if data["warnings"]:
        print(f"Skipped {len(data['warnings'])} folder(s):")
        for warning in data["warnings"]:
            print(f"- {warning['folder']}: {warning['reason']}")


if __name__ == "__main__":
    main()
