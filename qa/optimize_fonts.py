from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

assets = Path(__file__).resolve().parent.parent / 'assets'
for path in (Path(__file__).resolve().parent / 'font-originals').glob('font-*.ttf'):
    font = TTFont(path)
    options = subset.Options()
    options.flavor = 'woff'
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x250)) + list(range(0x2000, 0x2070)) + list(range(0x2190, 0x2200)))
    sub.subset(font)
    font.flavor = 'woff'
    font.save(assets / path.with_suffix('.woff').name)
css = (assets / 'fonts.css').read_text(encoding='utf-8-sig')
(assets / 'fonts.css').write_text(css.replace('.ttf', '.woff').replace("format('truetype')", "format('woff')"), encoding='utf-8')
print([(p.name, p.stat().st_size) for p in assets.glob('*.woff')])
