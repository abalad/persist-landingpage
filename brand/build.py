"""Builds the Persisty brand files from the construction rules in
docs/superpowers/specs/2026-10-22-persisty-brand-design.md.

usage: python build.py --font MonaSans[wdth,wght].ttf
Needs fontTools and uharfbuzz; rsvg-convert on PATH for the PNG exports.
Writes SVG masters to brand/ and copies with PNG exports to public/brand/.
"""

import argparse
import shutil
import subprocess
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "brand"
PUBLIC = ROOT / "public" / "brand"

LIME = "#C6F24E"
LIME_ON_LIGHT = "#6E9A00"
PAPER = "#F4F2EE"
INK = "#111318"
ICON_GROUND = "#1A1D24"

WORD = "persisty"
WEIGHT, WIDTH = 640, 110
TRACKING = -0.025  # em

# Symbol, in a 64-unit grid: stem, open orbit, dot.
def symbol(stem: str, dot: str) -> str:
    return (
        f'<rect x="13" y="19" width="9" height="36" rx="4.5" fill="{stem}"/>'
        f'<circle cx="33.5" cy="31" r="12" fill="none" stroke="{stem}" stroke-width="9" '
        f'stroke-dasharray="58.4 17" transform="rotate(-1 33.5 31)"/>'
        f'<circle cx="42.4" cy="22.9" r="5.2" fill="{dot}"/>'
    )


def svg(view: str, body: str, title: str) -> str:
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n'


def wordmark(font_path: Path) -> tuple[str, float, float]:
    """The word as one SVG path in font units (y down), its advance width and x-height."""
    font = TTFont(font_path)
    upem = font["head"].unitsPerEm
    location = {"wght": WEIGHT, "wdth": WIDTH}
    glyphs = font.getGlyphSet(location=location)
    x_height = font["OS/2"].sxHeight

    blob = hb.Blob.from_file_path(str(font_path))
    face = hb.Face(blob)
    hbfont = hb.Font(face)
    hbfont.set_variations(location)
    buf = hb.Buffer()
    buf.add_str(WORD)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})

    order = font.getGlyphOrder()
    pen = SVGPathPen(glyphs)
    x = 0.0
    track = TRACKING * upem
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        # flip y: font units grow up, SVG grows down
        glyphs[name].draw(TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset)))
        x += pos.x_advance + (track if i < len(buf.glyph_infos) - 1 else 0)
    return pen.getCommands(), x, x_height


def lockup(word_path: str, word_width: float, x_height: float, stem: str, dot: str, text: str) -> str:
    """Symbol and word side by side, the word's x-height centred on the orbit."""
    font_size = 48  # in symbol units; the word's x-height sits just inside the orbit
    scale = font_size / 1000
    gap = 17
    left = 50 + gap  # the symbol's ink ends at x = 50
    baseline = 31 + x_height * scale / 2
    width = left + word_width * scale + 6
    body = symbol(stem, dot) + f'<path d="{word_path}" fill="{text}" transform="translate({left} {baseline}) scale({scale})"/>'
    return svg(f"8 10 {width - 8:.1f} 50", body, "Persisty")


def app_icon() -> str:
    # macOS grid: 824 square at 100, radius 185; the symbol's ink is centred.
    scale = 10
    cx, cy = 31.5, 34.75  # centre of the symbol's ink in its grid
    tx, ty = 512 - cx * scale, 512 - cy * scale
    body = (
        f'<rect x="100" y="100" width="824" height="824" rx="185" fill="{ICON_GROUND}"/>'
        f'<rect x="102" y="102" width="820" height="820" rx="183" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="4"/>'
        f'<g transform="translate({tx} {ty}) scale({scale})">{symbol(PAPER, LIME)}</g>'
    )
    return svg("0 0 1024 1024", body, "Persisty")


def tile(rounded: bool) -> str:
    """The symbol filling a square: favicon (rounded) and touch icon (square; the OS rounds it)."""
    scale = 1.2
    cx, cy = 31.5, 34.75
    tx, ty = 32 - cx * scale, 32 - cy * scale
    ground = f'<rect width="64" height="64" rx="{14 if rounded else 0}" fill="{ICON_GROUND}"/>'
    return svg("0 0 64 64", ground + f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale})">{symbol(PAPER, LIME)}</g>', "Persisty")


def png(src: Path, out: Path, width: int) -> None:
    subprocess.run(["rsvg-convert", "-w", str(width), "-o", str(out), str(src)], check=True)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--font", required=True, type=Path)
    args = ap.parse_args()

    BRAND.mkdir(exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    word_path, word_width, x_height = wordmark(args.font)

    files = {
        "persisty-symbol.svg": svg("8 10 48 50", symbol(PAPER, LIME), "Persisty"),
        "persisty-symbol-on-light.svg": svg("8 10 48 50", symbol(INK, LIME_ON_LIGHT), "Persisty"),
        "persisty-symbol-white.svg": svg("8 10 48 50", symbol("#FFFFFF", "#FFFFFF"), "Persisty"),
        "persisty-symbol-black.svg": svg("8 10 48 50", symbol("#000000", "#000000"), "Persisty"),
        "persisty-logo.svg": lockup(word_path, word_width, x_height, PAPER, LIME, PAPER),
        "persisty-logo-on-light.svg": lockup(word_path, word_width, x_height, INK, LIME_ON_LIGHT, INK),
        "persisty-logo-white.svg": lockup(word_path, word_width, x_height, "#FFFFFF", "#FFFFFF", "#FFFFFF"),
        "persisty-logo-black.svg": lockup(word_path, word_width, x_height, "#000000", "#000000", "#000000"),
        "persisty-app-icon.svg": app_icon(),
        "persisty-favicon.svg": tile(rounded=True),
        "persisty-tile.svg": tile(rounded=False),
    }
    for name, content in files.items():
        (BRAND / name).write_text(content)
        shutil.copy(BRAND / name, PUBLIC / name)

    for name in ("persisty-symbol", "persisty-symbol-on-light", "persisty-logo", "persisty-logo-on-light"):
        png(BRAND / f"{name}.svg", PUBLIC / f"{name}.png", 1024)
    png(BRAND / "persisty-app-icon.svg", PUBLIC / "persisty-app-icon.png", 1024)
    png(BRAND / "persisty-favicon.svg", ROOT / "public" / "app-icon.png", 512)
    png(BRAND / "persisty-tile.svg", ROOT / "src" / "app" / "apple-icon.png", 180)
    png(BRAND / "persisty-favicon.svg", ROOT / "src" / "app" / "icon.png", 64)
    shutil.copy(BRAND / "persisty-favicon.svg", ROOT / "src" / "app" / "icon.svg")
    print("wrote", len(files), "SVG masters and the PNG exports")


if __name__ == "__main__":
    main()
