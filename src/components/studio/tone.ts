/**
 * The output pass tone-maps everything it draws, the background too, and
 * ACES crushes dark greys: the site's #0a0c10 would reach the screen almost
 * black. `untoneMapped` finds the linear colour to clear with so that what
 * reaches the screen is the page colour asked for. Both directions follow
 * three's ACES Filmic (r186) and its sRGB output exactly.
 */

type RGB = [number, number, number];

// GLSL builds a mat3 from columns; these are the same matrices written as rows.
const ACES_IN: RGB[] = [
  [0.59719, 0.35458, 0.04823],
  [0.076, 0.90834, 0.01566],
  [0.0284, 0.13383, 0.83777],
];
const ACES_OUT: RGB[] = [
  [1.60475, -0.53108, -0.07367],
  [-0.10208, 1.10813, -0.00605],
  [-0.00327, -0.07276, 1.07602],
];

const apply = (m: RGB[], v: RGB): RGB => m.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]) as RGB;

function invert(m: RGB[]): RGB[] {
  const [[a, b, c], [d, e, f], [g, h, i]] = m as [RGB, RGB, RGB];
  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  return [
    [(e * i - f * h) / det, (c * h - b * i) / det, (b * f - c * e) / det],
    [(f * g - d * i) / det, (a * i - c * g) / det, (c * d - a * f) / det],
    [(d * h - e * g) / det, (b * g - a * h) / det, (a * e - b * d) / det],
  ];
}
const ACES_IN_INV = invert(ACES_IN);
const ACES_OUT_INV = invert(ACES_OUT);

const fit = (v: number) => (v * (v + 0.0245786) - 0.000090537) / (v * (0.983729 * v + 0.432951) + 0.238081);

/** The positive `v` with fit(v) = u; the curve never reaches 1/0.983729, so u stops just short. */
function unfit(u: number): number {
  const w = Math.min(u, 1 / 0.983729 - 1e-4);
  const a = 1 - 0.983729 * w;
  const b = 0.0245786 - 0.432951 * w;
  const c = -(0.000090537 + 0.238081 * w);
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}

const decode = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const encode = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** 0.41666 - 0.055);
const clamp = (c: number) => Math.min(1, Math.max(0, c));

/** What the screen shows for a linear colour, as 0xRRGGBB. */
export function toneMapped(linear: RGB, exposure: number): number {
  const k = exposure / 0.6;
  const out = apply(ACES_OUT, apply(ACES_IN, linear.map((c) => c * k) as RGB).map(fit) as RGB);
  const [r, g, b] = out.map((c) => Math.round(encode(clamp(c)) * 255));
  return (r! << 16) | (g! << 8) | b!;
}

/** The linear colour to clear with so the screen shows `hex`. */
export function untoneMapped(hex: number, exposure: number): RGB {
  const k = exposure / 0.6;
  const target = [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255].map((c) => decode(c / 255)) as RGB;
  const v = apply(ACES_OUT_INV, target).map(unfit) as RGB;
  return apply(ACES_IN_INV, v).map((c) => Math.max(0, c / k)) as RGB;
}
