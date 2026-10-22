import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createMascot, type Mascot } from "./mascot";

/**
 * The studio's pieces, in clay, shared by the live welcome scene and the
 * still pictures rendered from it (empty states, the guide, the site).
 * Each builder returns its group plus the parts that move or light up.
 */

export interface Palette {
  background: number;
  islandTop: number;
  islandSide: number;
  plinth: number;
  path: number;
  desk: number;
  metal: number;
  device: number;
  clay: number;
  ink: number;
  blush: number;
  pot: number;
  leaf: number;
  sky: number;
  ground: number;
}

export const DARK: Palette = {
  background: 0x0f1115,
  islandTop: 0x343a48,
  islandSide: 0x262b35,
  plinth: 0x1c2029,
  path: 0x3d4454,
  desk: 0x9a7b5f,
  metal: 0x4a5161,
  device: 0x22262e,
  clay: 0xf4f2ee,
  ink: 0x16181d,
  blush: 0xf0a8a0,
  pot: 0xe6e1d6,
  leaf: 0x5a9a63,
  sky: 0xe4eaff,
  ground: 0x1a1d24,
};

export const LIGHT: Palette = {
  ...DARK,
  background: 0xf6f7f9,
  islandTop: 0xe7e9ee,
  islandSide: 0xd2d7df,
  plinth: 0xc3c9d3,
  path: 0xdbe0e8,
  metal: 0xa7aebb,
  ground: 0xcfd4dd,
};

export const LIME = 0xc6f24e;

const mat = (color: number, roughness = 0.8, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
export const glowMat = (color: number) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3, roughness: 0.4 });

export function createMaterials(p: Palette) {
  return {
    islandTop: mat(p.islandTop, 0.9),
    islandSide: mat(p.islandSide, 0.95),
    plinth: mat(p.plinth, 0.95),
    path: mat(p.path, 1),
    desk: mat(p.desk, 0.65),
    metal: mat(p.metal, 0.5, 0.3),
    device: mat(p.device, 0.4, 0.25),
    clay: new THREE.MeshPhysicalMaterial({ color: p.clay, roughness: 0.5, sheen: 0.5, sheenRoughness: 0.5, sheenColor: new THREE.Color(0xffffff) }),
    ink: mat(p.ink, 0.2),
    blush: mat(p.blush, 0.9),
    lime: new THREE.MeshStandardMaterial({ color: LIME, emissive: LIME, emissiveIntensity: 0.6, roughness: 0.4 }),
    limeFlat: mat(LIME, 0.6),
    pot: mat(p.pot, 0.85),
    leaf: mat(p.leaf, 0.65),
    amber: mat(0xe3b24a, 0.55),
    blue: mat(0x7aa7e8, 0.55),
    red: mat(0xef7d7d, 0.55),
  };
}
export type Materials = ReturnType<typeof createMaterials>;

export const box = (w: number, h: number, d: number, r: number, material: THREE.Material) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), material);

export function castShadows<T extends THREE.Object3D>(o: T): T {
  o.traverse((c) => {
    if ((c as THREE.Mesh).isMesh) {
      c.castShadow = true;
      c.receiveShadow = true;
    }
  });
  return o;
}

export function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d") as CanvasRenderingContext2D);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** A desk with a chair, a laptop facing the mascot behind it, a mug and books. The mascot faces +z. */
export function buildDesk(m: Materials) {
  const group = new THREE.Group();
  const top = box(1.5, 0.08, 0.86, 0.035, m.desk);
  top.position.y = 0.74;
  group.add(top);
  for (const side of [-1, 1]) {
    const leg = box(0.07, 0.72, 0.74, 0.025, m.metal);
    leg.position.set(side * 0.66, 0.36, 0);
    group.add(leg);
  }
  const chair = new THREE.Group();
  chair.position.set(0, 0, -0.74);
  group.add(chair);
  const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.08, 32), m.metal);
  seat.position.y = 0.42;
  chair.add(seat);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.38, 12), m.metal);
  post.position.y = 0.2;
  chair.add(post);
  const back = box(0.5, 0.42, 0.06, 0.03, m.metal);
  back.position.set(0, 0.72, -0.24);
  chair.add(back);

  const mascot = createMascot(m);
  mascot.group.position.set(0, 0.45, -0.7);
  mascot.group.scale.setScalar(1.15);
  group.add(mascot.group);

  const base = box(0.62, 0.03, 0.42, 0.012, m.device);
  base.position.set(0, 0.795, -0.12);
  group.add(base);
  const lid = new THREE.Group();
  lid.position.set(0, 0.81, 0.08);
  lid.rotation.x = 0.32;
  group.add(lid);
  const shell = box(0.62, 0.4, 0.022, 0.012, m.device);
  shell.position.y = 0.2;
  lid.add(shell);
  const logo = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), m.lime);
  logo.position.set(0, 0.21, 0.012);
  lid.add(logo);
  const faceLight = new THREE.PointLight(0xbcd0ff, 0.22, 1.4, 2);
  faceLight.position.set(0, 1.05, -0.25);
  group.add(faceLight);

  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.1, 24), m.amber);
  mug.position.set(-0.52, 0.83, 0.08);
  group.add(mug);
  [m.blue, m.limeFlat, m.red].forEach((bm, i) => {
    const b = box(0.24, 0.05, 0.17, 0.01, bm);
    b.position.set(0.5, 0.805 + i * 0.05, 0.1);
    b.rotation.y = i * 0.25;
    group.add(b);
  });
  castShadows(group);
  return { group, mascot, faceLight };
}

/** The "?" bubble a mascot shows when it needs you. */
export function buildBubble() {
  const texture = canvasTexture(128, 128, (ctx) => {
    ctx.fillStyle = "#e3b24a";
    ctx.beginPath();
    ctx.arc(64, 58, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(52, 100);
    ctx.lineTo(64, 124);
    ctx.lineTo(76, 100);
    ctx.fill();
    ctx.fillStyle = "#15171c";
    ctx.font = "700 64px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", 64, 62);
  });
  const bubble = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  bubble.scale.setScalar(0.42);
  return bubble;
}

/** A parcel of work: a clay box with a coloured tape. */
export function buildParcel(m: Materials, tape: THREE.Material) {
  const group = new THREE.Group();
  const body = box(0.26, 0.2, 0.26, 0.04, m.clay);
  body.position.y = 0.1;
  group.add(body);
  const band = box(0.27, 0.025, 0.08, 0.01, tape);
  band.position.y = 0.2;
  group.add(band);
  return castShadows(group);
}

/** A folder, the workspace: a back panel with a tab and a front panel, tilted open a little. */
export function buildFolder(m: Materials, color: THREE.Material) {
  const group = new THREE.Group();
  const back = box(0.62, 0.46, 0.04, 0.03, color);
  back.position.y = 0.23;
  group.add(back);
  const tab = box(0.24, 0.08, 0.04, 0.02, color);
  tab.position.set(-0.17, 0.48, 0);
  group.add(tab);
  const paper = box(0.54, 0.38, 0.02, 0.01, m.clay);
  paper.position.set(0, 0.25, 0.035);
  group.add(paper);
  const front = new THREE.Group();
  front.position.z = 0.06;
  front.rotation.x = 0.18;
  const panel = box(0.62, 0.38, 0.04, 0.03, color);
  panel.position.y = 0.19;
  front.add(panel);
  group.add(front);
  return castShadows(group);
}

/** The test arch, its scanner bar lit blue, green as a parcel passes. */
export function buildArch(m: Materials) {
  const group = new THREE.Group();
  for (const side of [-1, 1]) {
    const pillar = box(0.14, 0.95, 0.42, 0.04, m.device);
    pillar.position.set(side * 0.38, 0.475, 0);
    group.add(pillar);
  }
  const beam = box(0.92, 0.18, 0.46, 0.05, m.device);
  beam.position.y = 1.0;
  group.add(beam);
  castShadows(group);
  const scanMat = new THREE.MeshStandardMaterial({ color: 0x7aa7e8, emissive: 0x7aa7e8, emissiveIntensity: 3.2, roughness: 0.3 });
  const scanBar = box(0.62, 0.035, 0.08, 0.015, scanMat);
  scanBar.position.y = 0.9;
  group.add(scanBar);
  const scanLight = new THREE.PointLight(0x7aa7e8, 0.8, 1.6, 2);
  scanLight.position.y = 0.7;
  group.add(scanLight);
  return { group, scanMat, scanLight };
}

export function puffTexture() {
  return canvasTexture(64, 64, (ctx) => {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  });
}

/** The launch pad, striped lime, with its rocket (and the rocket's flame, off). */
export function buildRocketPad(m: Materials) {
  const pad = new THREE.Group();
  const stripes = canvasTexture(256, 256, (ctx) => {
    ctx.fillStyle = "#2a2f3a";
    ctx.fillRect(0, 0, 256, 256);
    ctx.translate(128, 128);
    for (let i = 0; i < 16; i++) {
      ctx.rotate(Math.PI / 8);
      if (i % 2 === 0) {
        ctx.fillStyle = "#c6f24e";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 128, 0, Math.PI / 8);
        ctx.fill();
      }
    }
    ctx.fillStyle = "#2a2f3a";
    ctx.beginPath();
    ctx.arc(0, 0, 92, 0, Math.PI * 2);
    ctx.fill();
  });
  const padTop = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.7, 0.14, 48), [m.metal, new THREE.MeshStandardMaterial({ map: stripes, roughness: 0.8 }), m.metal]);
  padTop.position.y = 0.07;
  pad.add(castShadows(padTop));

  const rocket = new THREE.Group();
  pad.add(rocket);
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.21, 0.78, 32), m.clay);
  hull.position.y = 0.54;
  rocket.add(hull);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.36, 32), m.limeFlat);
  nose.position.y = 1.11;
  rocket.add(nose);
  const port = new THREE.Mesh(new THREE.CircleGeometry(0.065, 24), m.ink);
  port.position.set(0, 0.68, 0.172);
  rocket.add(port);
  const portRim = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.014, 8, 24), m.metal);
  portRim.position.set(0, 0.68, 0.17);
  rocket.add(portRim);
  for (let i = 0; i < 3; i++) {
    const fin = box(0.03, 0.26, 0.2, 0.01, m.limeFlat);
    const a = (i / 3) * Math.PI * 2;
    fin.position.set(Math.sin(a) * 0.2, 0.26, Math.cos(a) * 0.2);
    fin.rotation.y = a;
    rocket.add(fin);
  }
  castShadows(rocket);
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.15, 0.6, 24),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffb347).multiplyScalar(3), toneMapped: false, transparent: true, opacity: 0.9 }),
  );
  flame.rotation.x = Math.PI;
  flame.position.y = -0.18;
  flame.userData.noAo = true;
  flame.visible = false;
  rocket.add(flame);
  const flameLight = new THREE.PointLight(0xffa04a, 0, 3, 2);
  flameLight.position.y = 0.1;
  pad.add(flameLight);
  return { group: pad, rocket, flame, flameLight };
}

/** A potted plant; its leaves are a group, to sway. */
export function buildPlant(m: Materials) {
  const group = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.17, 0.36, 32), m.pot);
  pot.position.y = 0.18;
  group.add(pot);
  const leaves = new THREE.Group();
  leaves.position.y = 0.34;
  group.add(leaves);
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), m.leaf);
    const a = (i / 9) * Math.PI * 2;
    leaf.scale.set(0.55, 1.5, 0.28);
    leaf.position.set(Math.cos(a) * 0.12, 0.22 + (i % 3) * 0.07, Math.sin(a) * 0.12);
    leaf.rotation.set(Math.sin(a) * 0.55, -a, Math.cos(a) * 0.55);
    leaves.add(leaf);
  }
  castShadows(group);
  return { group, leaves };
}

export function buildCoffeeMachine(m: Materials) {
  const group = new THREE.Group();
  const body = box(0.46, 0.7, 0.38, 0.05, m.device);
  body.position.y = 0.35;
  group.add(body);
  const spout = box(0.12, 0.08, 0.1, 0.02, m.metal);
  spout.position.set(0, 0.48, 0.22);
  group.add(spout);
  const button = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 8), glowMat(LIME));
  button.position.set(0.14, 0.6, 0.19);
  group.add(button);
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.09, 20), m.clay);
  cup.position.set(0, 0.2, 0.22);
  group.add(cup);
  return castShadows(group);
}

/** A mascot standing, holding something in its right hand. */
export function buildStandingMascot(m: Materials, holding?: THREE.Object3D, armX = -1.2): Mascot {
  const mascot = createMascot(m);
  if (holding) mascot.handRight.add(holding);
  mascot.armRight.rotation.x = armX;
  castShadows(mascot.group);
  return mascot;
}

/** The studio's light: sky and ground, a warm key that casts shadows, a cool rim. */
export function addLights(scene: THREE.Scene, p: Palette, shadowSpan = 6) {
  scene.add(new THREE.HemisphereLight(p.sky, p.ground, 1.05));
  const key = new THREE.DirectionalLight(0xfff1dc, 2.1);
  key.position.set(5, 11, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -shadowSpan;
  key.shadow.camera.right = shadowSpan;
  key.shadow.camera.top = shadowSpan;
  key.shadow.camera.bottom = -shadowSpan;
  key.shadow.radius = 5;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa9bfff, 0.9);
  rim.position.set(-6, 5, -6);
  scene.add(rim);
  return { key, rim };
}
