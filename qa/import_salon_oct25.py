"""Optimize the supplied salon photos without changing their content."""
from pathlib import Path
from hashlib import sha256
from PIL import Image, ImageOps

source = Path('C:/Users/noc/AppData/Local/Temp')
target = Path(__file__).resolve().parent.parent / 'assets' / 'salon'
target.mkdir(exist_ok=True)
photos = [
    ('a80b8c47-0bcf-49f6-a3c8-fb219f89826d', 'pedicure'),
    ('cf939d76-2084-4fa1-b6c0-890aca74625d', 'head-spa-detail'),
    ('c65ee65d-d06b-4c73-ae7c-884bcc61ba1f', 'head-spa-duplicate'),
    ('6b375f05-e16a-480d-aaab-733012be9e2c', 'lash-room'),
    ('3ac458cd-cc6c-45da-b334-a18f06324e77', 'head-spa-room'),
    ('90803e6b-7771-42d2-9997-acfb32359407', 'pedicure-2018-2026'),
    ('25da4b11-ec33-45a7-b490-60f08586700b', 'lounge-2018-2026'),
    ('c3f7189d-7c43-4123-ad46-ddb6340da928', 'salon-2018-2026'),
]
seen = set()
for id_, name in photos:
    original = source / f'codex-clipboard-{id_}.png'
    digest = sha256(original.read_bytes()).hexdigest()
    if digest in seen:
        print('Skip duplicate:', name)
        continue
    seen.add(digest)
    with Image.open(original) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        image.thumbnail((1440, 1600))
        output = target / f'{name}.webp'
        image.save(output, 'WEBP', quality=85, method=6)
        print(name, image.size, output.stat().st_size)
