"""Prepare the seven lash photos and two clips supplied on 19 October 2026."""
from pathlib import Path
from shutil import copy2
from PIL import Image, ImageOps

source = Path("C:/Users/noc/Downloads/video/New folder")
root = Path(__file__).resolve().parent.parent
for number, original in enumerate(sorted(source.glob("179242*.jpg")), 1):
    with Image.open(original) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((1440, 1440))
        target = root / "assets" / "real" / f"lashes-{number:02d}.webp"
        image.save(target, "WEBP", quality=85, method=6)
        print(target.name, image.size, target.stat().st_size)
for prefix, name in [("AQOy", "salon-moment-01"), ("AQPM", "salon-moment-02")]:
    original = next(source.glob(f"{prefix}*.mp4"))
    copy2(original, root / "assets" / "video" / f"{name}.mp4")
    print(name, original.stat().st_size)
