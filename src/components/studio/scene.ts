import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { agentAt, beltAt, deployAt, rocketAt, testsAt } from "./beat";
import { animateMascot, walkMascot } from "./mascot";
import {
  DARK,
  LIGHT,
  LIME,
  addLights,
  box,
  buildArch,
  buildBubble,
  buildCoffeeMachine,
  buildDesk,
  buildParcel,
  buildPlant,
  buildRocketPad,
  buildStandingMascot,
  canvasTexture,
  castShadows,
  createMaterials,
  glowMat,
  puffTexture,
} from "./parts";
import { APP_SCREEN, appScreenKey, drawAppScreen, type ScreenLabels } from "./screens";
import { untoneMapped } from "./tone";

/**
 * The welcome studio, in clay: a round island where Persisty's mascots work.
 * Two desks (an agent, a dev server), a belt carrying the work through a
 * test arch, a launch pad whose rocket goes up with each deploy, the app on
 * a big screen at the back, a mascot walking round with a coffee. It never
 * stops: every part runs its own loop (see `beat.ts`). Rendered with
 * ambient occlusion and a soft bloom for the clay-render look; the pieces
 * themselves live in `parts.ts`, shared with the still pictures.
 */

export type AnchorKey = "agent" | "tests" | "dev" | "deploy";

export interface Workshop {
  frame(ms: number): void;
  /** -1…1 on both axes: the camera leans toward the pointer. */
  setPointer(x: number, y: number): void;
  resize(width: number, height: number, pixelRatio: number): void;
  /** Where an anchor lands on the canvas, in CSS pixels. */
  anchor(key: AnchorKey): { x: number; y: number };
  dispose(): void;
}

export const CAMERA = { azimuth: Math.PI / 4, elevation: 0.5, distance: 18.5, target: new THREE.Vector3(0, 0.7, 0) };
/** Floor position from screen-space axes: `u` to the right, `v` away from the viewer. */
export const at = (u: number, v: number, y = 0) => new THREE.Vector3((u - v) / Math.SQRT2, y, (-u - v) / Math.SQRT2);
export const FACING_VIEWER = Math.PI / 4;
const BOXES = 7;

/**
 * `background` overrides the theme's page colour (the site's is darker than the app's);
 * `screenLabels` puts the big screen's words in another language (Portuguese by default).
 */
export function createWorkshop(canvas: HTMLCanvasElement, options: { light: boolean; background?: number; screenLabels?: ScreenLabels }): Workshop | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: false });
  } catch {
    return null;
  }
  const p = options.light ? LIGHT : DARK;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  // Cleared with the colour that comes out of the tone mapping as the page's own.
  scene.background = new THREE.Color().setRGB(...untoneMapped(options.background ?? p.background, renderer.toneMappingExposure), THREE.LinearSRGBColorSpace);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  scene.environmentIntensity = 0.45;
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  const m = createMaterials(p);
  const faceViewer = (g: THREE.Object3D, turn = 0) => (g.rotation.y = FACING_VIEWER + turn);

  // ---- the island: a slab on a plinth, a path round its edge --------------------
  const island = new THREE.Group();
  scene.add(island);
  const slab = new THREE.Mesh(new THREE.CylinderGeometry(4.1, 3.95, 0.5, 112), [m.islandSide, m.islandTop, m.islandSide]);
  slab.position.y = -0.25;
  island.add(slab);
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.3, 0.55, 96), m.plinth);
  plinth.position.y = -0.77;
  island.add(plinth);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.04, 0.08, 16, 140), m.islandTop);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.02;
  island.add(rim);
  const path = new THREE.Mesh(new THREE.RingGeometry(3.3, 3.75, 112), m.path);
  path.rotation.x = -Math.PI / 2;
  path.position.y = 0.006;
  island.add(path);
  castShadows(island);

  // ---- the big screen at the back: the app ----------------------------------------
  const appCanvas = document.createElement("canvas");
  appCanvas.width = APP_SCREEN.w;
  appCanvas.height = APP_SCREEN.h;
  const appCtx = appCanvas.getContext("2d") as CanvasRenderingContext2D;
  const appTexture = new THREE.CanvasTexture(appCanvas);
  appTexture.colorSpace = THREE.SRGBColorSpace;
  appTexture.anisotropy = 8;
  let appKey = "";
  {
    const g = new THREE.Group();
    g.position.copy(at(0.1, 2.85));
    faceViewer(g);
    island.add(g);
    const frame = box(3.1, 1.86, 0.12, 0.06, m.device);
    frame.position.y = 1.95;
    g.add(frame);
    for (const side of [-1, 1]) {
      const leg = box(0.1, 1.05, 0.1, 0.03, m.metal);
      leg.position.set(side * 1.1, 0.52, -0.02);
      g.add(leg);
      const foot = box(0.12, 0.05, 0.5, 0.02, m.metal);
      foot.position.set(side * 1.1, 0.025, 0);
      g.add(foot);
    }
    castShadows(g);
    // A touch over full brightness, so the screen's light parts bloom a little.
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.94, 1.715), new THREE.MeshBasicMaterial({ map: appTexture, color: new THREE.Color(1.5, 1.5, 1.5), toneMapped: false }));
    screen.position.set(0, 1.95, 0.062);
    g.add(screen);
  }

  // ---- desks --------------------------------------------------------------------
  const anchors = {} as Record<AnchorKey, THREE.Object3D>;
  const anchorAt = (key: AnchorKey, parent: THREE.Object3D, x: number, y: number, z: number) => {
    const a = new THREE.Object3D();
    a.position.set(x, y, z);
    parent.add(a);
    anchors[key] = a;
  };
  const desks = (
    [
      ["agent", -2.55, 0.95, 0.42],
      ["dev", 2.55, 0.95, -0.42],
    ] as const
  ).map(([key, u, v, turn]) => {
    const d = buildDesk(m);
    d.group.position.copy(at(u, v));
    faceViewer(d.group, turn);
    island.add(d.group);
    anchorAt(key, d.group, 0, 2.15, -0.7);
    return d;
  });
  const bubble = buildBubble();
  desks[0]?.mascot.head.add(bubble);
  bubble.position.set(0.32, 0.62, 0);

  // ---- the belt: an oval through the middle, parcels riding it --------------------
  const beltCenter = at(0, -0.15);
  const beltPoints = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    return at(1.75 * Math.cos(a), 0.95 * Math.sin(a), 0.36).add(new THREE.Vector3(beltCenter.x, 0, beltCenter.z));
  });
  const curve = new THREE.CatmullRomCurve3(beltPoints, true, "centripetal");
  const beltLength = curve.getLength();
  const beltTexture = canvasTexture(64, 64, (ctx) => {
    ctx.fillStyle = "#1d2027";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = "#2a2f3a";
    ctx.fillRect(0, 0, 64, 10);
  });
  beltTexture.wrapS = beltTexture.wrapT = THREE.RepeatWrapping;
  beltTexture.repeat.set(1, beltLength * 4);
  const ribbon = (width: number, y: number) => {
    const n = 220;
    const positions: number[] = [];
    const uvs: number[] = [];
    const index: number[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i <= n; i++) {
      const s = i / n;
      const pt = curve.getPointAt(s % 1);
      const side = new THREE.Vector3().crossVectors(curve.getTangentAt(s % 1), up).normalize().multiplyScalar(width / 2);
      positions.push(pt.x + side.x, y, pt.z + side.z, pt.x - side.x, y, pt.z - side.z);
      uvs.push(0, s, 1, s);
      if (i < n) index.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(index);
    geometry.computeVertexNormals();
    return geometry;
  };
  const beltSurface = new THREE.Mesh(ribbon(0.44, 0.36), new THREE.MeshStandardMaterial({ map: beltTexture, roughness: 0.85, side: THREE.DoubleSide }));
  beltSurface.receiveShadow = true;
  island.add(beltSurface);
  island.add(new THREE.Mesh(ribbon(0.56, 0.33), new THREE.MeshStandardMaterial({ color: p.metal, roughness: 0.6, side: THREE.DoubleSide })));
  for (const offset of [-0.27, 0.27]) {
    const railPoints = Array.from({ length: 96 }, (_, i) => {
      const s = i / 96;
      const pt = curve.getPointAt(s);
      const side = new THREE.Vector3().crossVectors(curve.getTangentAt(s), new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(offset);
      return new THREE.Vector3(pt.x + side.x, 0.39, pt.z + side.z);
    });
    island.add(castShadows(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(railPoints, true), 240, 0.028, 8, true), m.metal)));
  }
  for (let i = 0; i < 16; i++) {
    const pt = curve.getPointAt(i / 16);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.33, 10), m.metal);
    leg.position.set(pt.x, 0.165, pt.z);
    island.add(castShadows(leg));
  }
  const tapes = [m.limeFlat, m.blue, m.amber, m.red];
  const parcels = Array.from({ length: BOXES }, (_, i) => {
    const g = buildParcel(m, tapes[i % tapes.length] as THREE.Material);
    island.add(g);
    return g;
  });

  // ---- the test arch on the belt, and the mascot keeping it -----------------------
  const STATION = 0;
  const stationPoint = curve.getPointAt(STATION);
  const stationTangent = curve.getTangentAt(STATION);
  const arch = buildArch(m);
  arch.group.position.set(stationPoint.x, 0, stationPoint.z);
  arch.group.rotation.y = Math.atan2(stationTangent.x, stationTangent.z);
  island.add(arch.group);
  anchorAt("tests", arch.group, 0, 1.35, 0);
  const clipboard = box(0.2, 0.26, 0.02, 0.01, m.desk);
  clipboard.rotation.x = 1.2;
  const tester = buildStandingMascot(m, clipboard);
  {
    const out = stationPoint.clone().setY(0).sub(new THREE.Vector3(beltCenter.x, 0, beltCenter.z)).normalize();
    tester.group.position.copy(stationPoint.clone().setY(0).add(out.multiplyScalar(0.85)));
    faceViewer(tester.group, -0.9);
    island.add(tester.group);
  }

  // ---- the launch pad, its rocket, and the mascot with the remote ------------------
  const pad = buildRocketPad(m);
  pad.group.position.copy(at(-2.75, -1.55));
  pad.rocket.rotation.y = FACING_VIEWER;
  island.add(pad.group);
  anchorAt("deploy", pad.group, 0, 1.75, 0);
  const puffs = puffTexture();
  const smoke = Array.from({ length: 10 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffs, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData.angle = (i / 10) * Math.PI * 2;
    pad.group.add(s);
    return s;
  });
  const remote = box(0.1, 0.16, 0.05, 0.015, m.device);
  remote.rotation.x = 1.3;
  const remoteLight = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 6), glowMat(0xef7d7d));
  remoteLight.position.set(0, 0.05, 0.03);
  remote.add(remoteLight);
  const launcher = buildStandingMascot(m, remote, -1.0);
  launcher.group.position.copy(at(-1.75, -2.35));
  faceViewer(launcher.group, -0.6);
  island.add(launcher.group);

  // ---- a mascot walking the path with a coffee --------------------------------------
  const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.11, 20), m.amber);
  coffee.rotation.x = 1.2;
  const walker = buildStandingMascot(m, coffee, -1.25);
  island.add(walker.group);

  // ---- plants, a coffee machine with steam, motes --------------------------------------
  const plants = (
    [
      [-3.35, 1.6, 1.15],
      [3.3, 1.75, 1.0],
      [1.6, 2.9, 0.85],
      [3.1, -1.9, 0.9],
    ] as const
  ).map(([u, v, scale]) => {
    const plant = buildPlant(m);
    plant.group.position.copy(at(u, v));
    plant.group.scale.setScalar(scale);
    island.add(plant.group);
    return plant.leaves;
  });
  const machine = buildCoffeeMachine(m);
  machine.position.copy(at(-1.5, 2.6));
  faceViewer(machine, 0.2);
  island.add(machine);
  const steam = Array.from({ length: 5 }, () => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffs, transparent: true, depthWrite: false, opacity: 0 }));
    machine.add(s);
    return s;
  });
  const motes = 70;
  const motePositions = new Float32Array(motes * 3);
  const moteSeeds = Array.from({ length: motes }, () => ({ a: Math.random() * Math.PI * 2, r: 0.5 + Math.random() * 3.6, y: Math.random() * 3, speed: 0.15 + Math.random() * 0.25 }));
  const moteGeometry = new THREE.BufferGeometry();
  moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
  scene.add(new THREE.Points(moteGeometry, new THREE.PointsMaterial({ color: LIME, size: 0.045, transparent: true, opacity: 0.55, depthWrite: false })));

  addLights(scene, p);

  // ---- post-processing: ambient occlusion and a soft bloom --------------------------
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const ao = new GTAOPass(scene, camera, 1, 1);
  // The pass leaves out points and lines; sprites (smoke, steam, the bubble)
  // and the flame must stay out too, or they shade the floor as solid cards.
  const aoInternals = ao as unknown as { _overrideVisibility: () => void; _visibilityCache: THREE.Object3D[] };
  const hidePointsAndLines = aoInternals._overrideVisibility.bind(ao);
  aoInternals._overrideVisibility = () => {
    hidePointsAndLines();
    scene.traverse((o) => {
      if (((o as THREE.Sprite).isSprite || o.userData.noAo) && o.visible) {
        o.visible = false;
        aoInternals._visibilityCache.push(o);
      }
    });
  };
  ao.blendIntensity = 0.85;
  ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.4, thickness: 1, scale: 1.1 });
  composer.addPass(ao);
  // Only what emits light blooms (screens, antennas, the flame, the scanner): lit clay stays below the threshold.
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.45, 1.55));
  composer.addPass(new OutputPass());

  // ---- camera ----------------------------------------------------------------------------
  const pointer = { x: 0, y: 0, ex: 0, ey: 0 };
  const size = { w: 1, h: 1 };
  const placeCamera = (ms: number) => {
    pointer.ex += (pointer.x - pointer.ex) * 0.05;
    pointer.ey += (pointer.y - pointer.ey) * 0.05;
    const az = CAMERA.azimuth + pointer.ex * 0.08 + Math.sin(ms / 9000) * 0.035;
    const el = CAMERA.elevation - pointer.ey * 0.04;
    camera.position
      .set(Math.cos(el) * Math.cos(az) * CAMERA.distance, Math.sin(el) * CAMERA.distance, Math.cos(el) * Math.sin(az) * CAMERA.distance)
      .add(CAMERA.target);
    camera.lookAt(CAMERA.target);
  };
  placeCamera(0);
  // Compile every shader now, while the still picture is showing, so the first live frame does not stall.
  renderer.compile(scene, camera);

  const working = new THREE.Color(0xbcd0ff);
  const waiting = new THREE.Color(0xffc56b);
  const green = new THREE.Color(0x9fe870);
  const blue = new THREE.Color(0x7aa7e8);
  const projected = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  return {
    frame(ms) {
      const agent = agentAt(ms);
      const tests = testsAt(ms);
      const deploy = deployAt(ms);

      // Desks: the agent stops to ask for you, hand up, a bubble over its head.
      desks.forEach(({ mascot, faceLight }, i) => {
        const asking = i === 0 && agent.kind === "asking";
        animateMascot(mascot, ms, i, 0.45, !asking);
        if (asking) {
          mascot.head.rotation.y = 0;
          mascot.head.rotation.x = -0.12;
          mascot.armRight.rotation.x = -0.25;
          mascot.armRight.rotation.z = 2.35 + Math.sin(ms / 170) * 0.28;
        } else {
          mascot.armRight.rotation.z = 0.18;
        }
        faceLight.color.copy(asking ? waiting : working);
      });
      bubble.visible = agent.kind === "asking";
      if (bubble.visible) bubble.scale.setScalar(0.4 + Math.sin(ms / 220) * 0.02);

      // Belt and parcels; the arch lights green as one passes.
      beltTexture.offset.y = -(ms / 20_000) * beltLength * 4;
      let nearest = 1;
      beltAt(ms, BOXES).forEach((s, i) => {
        const g = parcels[i];
        if (!g) return;
        curve.getPointAt(s, tmp);
        g.position.set(tmp.x, 0.38, tmp.z);
        const t = curve.getTangentAt(s);
        g.rotation.y = Math.atan2(t.x, t.z);
        nearest = Math.min(nearest, Math.abs(s - STATION), Math.abs(1 - s + STATION));
      });
      const scanned = nearest < 0.02;
      arch.scanMat.color.copy(scanned ? green : blue);
      arch.scanMat.emissive.copy(scanned ? green : blue);
      arch.scanLight.color.copy(scanned ? green : blue);
      arch.scanLight.intensity = scanned ? 1.6 : 0.6;
      animateMascot(tester, ms, 5, 0.45, false);
      tester.head.rotation.y = Math.sin(ms / 1400) * 0.4;
      tester.armRight.rotation.x = scanned ? -1.45 : -1.2;

      // The rocket, with fire and smoke at each launch.
      const r = rocketAt(ms);
      pad.rocket.position.y = r.y;
      pad.rocket.visible = r.y < 12;
      pad.flame.visible = r.flame > 0;
      pad.flame.scale.set(1, 0.6 + r.flame * (0.8 + Math.sin(ms / 40) * 0.15), 1);
      pad.flameLight.intensity = r.flame * 4;
      const sinceLift = (ms % 16_000) - 9_000;
      smoke.forEach((puff, i) => {
        const age = sinceLift - i * 90;
        const material = puff.material as THREE.SpriteMaterial;
        if (age < 0 || age > 2600) {
          material.opacity = 0;
          return;
        }
        const k = age / 2600;
        const a = puff.userData.angle as number;
        puff.position.set(Math.cos(a) * (0.3 + k * 1.1), 0.15 + k * 0.5, Math.sin(a) * (0.3 + k * 1.1));
        puff.scale.setScalar(0.35 + k * 0.9);
        material.opacity = 0.5 * (1 - k);
      });
      animateMascot(launcher, ms, 7, 0.45, false);
      launcher.armRight.rotation.x = deploy.state === "launching" ? -2.2 : -1.0;

      // The walker, round the path with a coffee.
      const around = (ms / 26_000) * Math.PI * 2;
      const radius = 3.5;
      walker.group.position.set(Math.cos(around) * radius, 0, Math.sin(around) * radius);
      walker.group.rotation.y = -around;
      walkMascot(walker, (around * radius) / 0.2);
      walker.armRight.rotation.x = -1.25;

      // Plants sway, steam rises, motes drift.
      plants.forEach((leaves, i) => (leaves.rotation.z = Math.sin(ms / 1700 + i) * 0.04));
      steam.forEach((puff, i) => {
        const k = (ms / 2400 + i / steam.length) % 1;
        puff.position.set(Math.sin(k * 6 + i) * 0.04, 0.3 + k * 0.6, 0.22);
        puff.scale.setScalar(0.08 + k * 0.18);
        (puff.material as THREE.SpriteMaterial).opacity = 0.45 * (1 - k);
      });
      moteSeeds.forEach((seed, i) => {
        const y = (seed.y + (ms / 1000) * seed.speed * 0.4) % 3;
        const a = seed.a + ms / 30_000;
        motePositions.set([Math.cos(a) * seed.r, 0.2 + y, Math.sin(a) * seed.r], i * 3);
      });
      (moteGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // The big screen.
      const state = { agent, tests, deploy };
      const nextKey = appScreenKey(state);
      if (nextKey !== appKey) {
        appKey = nextKey;
        drawAppScreen(appCtx, state, options.screenLabels);
        appTexture.needsUpdate = true;
      }

      placeCamera(ms);
      composer.render();
    },
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    resize(width, height, pixelRatio) {
      size.w = Math.max(1, width);
      size.h = Math.max(1, height);
      const ratio = Math.min(1.75, pixelRatio);
      renderer.setPixelRatio(ratio);
      renderer.setSize(size.w, size.h, false);
      composer.setPixelRatio(ratio);
      composer.setSize(size.w, size.h);
      camera.aspect = size.w / size.h;
      camera.fov = camera.aspect < 1.3 ? 26 * (1.3 / camera.aspect) ** 0.85 : 26;
      camera.updateProjectionMatrix();
    },
    anchor(keyName) {
      anchors[keyName].getWorldPosition(projected);
      projected.project(camera);
      return { x: ((projected.x + 1) / 2) * size.w, y: ((1 - projected.y) / 2) * size.h };
    },
    dispose() {
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(material) ? material : material ? [material] : []).forEach((x) => x.dispose());
      });
      appTexture.dispose();
      composer.dispose();
      scene.environment?.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
