"""Icons and per-page share images (Open Graph / Twitter cards).

Run after a build, then build again so pages point at the new files:

    npm run build && python scripts/generate-images.py && npm run build

- Icons: src/app/favicon.ico (16/32/48), src/app/apple-icon.png (180),
  public/icon-192.png, public/icon-512.png, public/logo.png (Organization logo).
- Cards: public/og/pages/<slug>.jpg, 1200x630, for every indexable page in out/:
  the page's own h1, a section label and the page's hero screenshot.

Figtree (OFL, scripts/fonts/) is the site's font. Requires Pillow.
"""

import glob
import html
import os
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
PUBLIC = ROOT / "public"
FONT = str(ROOT / "scripts" / "fonts" / "Figtree[wght].ttf")

VIOLET = (124, 92, 246)
PINK = (236, 72, 153)
INK = (28, 26, 51)
MUTE = (107, 105, 135)
PRIMARY = (101, 81, 240)
CANVAS = (239, 237, 249)


def font(size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([weight])
    return f


def logo_mark(size: int, background: tuple[int, int, int] | None = None) -> Image.Image:
    """The two overlapping rounded squares, drawn large and scaled down for crisp edges."""
    s = 1024
    img = Image.new("RGBA", (s, s), (*background, 255) if background else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = 0.09 * s if background else 0
    span = s - 2 * pad
    w = round(0.11 * span)

    def square(x: float, y: float, colour: tuple[int, int, int]) -> None:
        box = [pad + x * span, pad + y * span, pad + (x + 0.56) * span, pad + (y + 0.56) * span]
        d.rounded_rectangle(box, radius=0.19 * span, outline=colour, width=w)

    square(0.05, 0.12, VIOLET)
    square(0.39, 0.32, PINK)
    return img.resize((size, size), Image.LANCZOS)


def icons() -> None:
    app = ROOT / "src" / "app"
    white = (255, 255, 255)
    logo_mark(256, white).save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    logo_mark(180, white).convert("RGB").save(app / "apple-icon.png")
    logo_mark(192, white).save(PUBLIC / "icon-192.png")
    logo_mark(512, white).save(PUBLIC / "icon-512.png")
    logo_mark(512).save(PUBLIC / "logo.png")


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    for word in text.split():
        trial = f"{lines[-1]} {word}" if lines else word
        if lines and draw.textlength(trial, font=f) <= width:
            lines[-1] = trial
        else:
            lines.append(word)
    return lines


def section(path: str) -> str:
    if not path:
        return "AI staffing recommendations"
    first = path.split("/")[0]
    if first == "features":
        return "Feature" if "/" in path else "All features"
    if first == "use-cases":
        return "Use case" if "/" in path else "Use cases"
    return {
        "how-it-works": "How it works",
        "results": "Benchmarks",
        "security": "Trust and privacy",
        "pricing": "Annual plans",
        "early-access": "Early access",
        "contact": "Contact sales",
        "privacy": "Privacy",
    }.get(first, first.replace("-", " ").capitalize())


def card(title: str, label: str, shot: Path) -> Image.Image:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), CANVAS)
    # Soft colour fields behind the screenshot.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse([820, 40, 1260, 420], fill=(*VIOLET, 45))
    g.ellipse([900, 330, 1320, 720], fill=(*PINK, 40))
    img.paste(glow.filter(ImageFilter.GaussianBlur(90)), (0, 0), glow.filter(ImageFilter.GaussianBlur(90)))

    # Screenshot in a white card, running off the right and bottom edges.
    s = Image.open(shot).convert("RGB")
    sw = 680
    s = s.resize((sw, round(s.height * sw / s.width)), Image.LANCZOS)
    s = s.crop((0, 0, sw, min(s.height, 470)))
    x0, y0 = 600, 130
    fh = s.height + 16
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([x0 + 8, y0 + 18, x0 + sw + 8, y0 + fh], 22, fill=(72, 56, 160, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    img.paste(shadow, (0, 0), shadow)
    frame = Image.new("RGB", (sw + 16, fh), (255, 255, 255))
    frame.paste(s, (8, 8))
    mask = Image.new("L", frame.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, frame.width, frame.height], 20, fill=255)
    img.paste(frame, (x0 - 8, y0 - 8), mask)

    d = ImageDraw.Draw(img)
    mark = logo_mark(46)
    img.paste(mark, (72, 58), mark)
    d.text((128, 60), "FitRank", font=font(34, 700), fill=INK)

    d.text((72, 176), label.upper(), font=font(20, 650), fill=PRIMARY)
    size = 58
    while True:
        f = font(size, 750)
        lines = wrap(d, title, f, 500)
        if len(lines) <= 4 or size <= 40:
            break
        size -= 4
    y = 214
    for line in lines[:4]:
        d.text((72, y), line, font=f, fill=INK)
        y += round(size * 1.12)
    d.text((72, 548), "fitrank.streamerosai.com", font=font(22, 500), fill=MUTE)
    return img


def cards() -> int:
    target = PUBLIC / "og" / "pages"
    target.mkdir(parents=True, exist_ok=True)
    made = 0
    for page in sorted(glob.glob(str(OUT / "**" / "index.html"), recursive=True)):
        rel = Path(os.path.relpath(page, OUT)).parent.as_posix()
        path = "" if rel == "." else rel
        doc = open(page, encoding="utf-8").read()
        if path == "404" or 'content="noindex' in doc:
            continue
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", doc, re.S)
        title = html.unescape(re.sub(r"<[^>]+>", "", h1.group(1))).strip() if h1 else "FitRank"
        # The hero is the first <picture> (ProductShot); card thumbnails are plain <img>.
        hero = re.search(r'<picture>.*?src="(?:/[^"]*)?/screenshots/([a-z0-9-]+)\.webp"', doc, re.S)
        shot = PUBLIC / "screenshots" / f"{hero.group(1) if hero else 'dashboard'}.webp"
        slug = path.replace("/", "-") or "home"
        card(title, section(path), shot).save(target / f"{slug}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        made += 1
    return made


if __name__ == "__main__":
    if not OUT.is_dir():
        raise SystemExit("Build first: npm run build")
    icons()
    print(f"icons written; {cards()} share cards in public/og/pages/")
