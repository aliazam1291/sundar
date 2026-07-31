/**
 * The sound of Sunder ji's kitchen.
 *
 * Every noise here is synthesised at play time rather than shipped as an audio
 * file — the same choice the truck horn makes. A kitchen is mostly filtered
 * noise and short transients, which is exactly what Web Audio is good at, so
 * nine cooking sounds cost zero bytes of download and never wait on a network.
 *
 * One AudioContext is shared by the whole page and is only built on a real
 * click: a context created before a user gesture starts suspended and stays
 * silent, so building it lazily is what makes the thing audible at all.
 */

let ctx = null;
let master = null;
let noiseBuffer = null;

/* Everything currently making noise, so a step change can cut the last one
   off rather than letting two dishes cook over each other. */
let live = [];

const MASTER_GAIN = 0.55;

function audio() {
  if (typeof window === "undefined") return null;

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;

  if (!ctx) {
    ctx = new Ctx();
    master = ctx.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();

  return ctx;
}

/** Call from a click handler to satisfy the autoplay policy before any timer-
 *  driven sound needs to fire. */
export function unlock() {
  audio();
}

/* Two seconds of white noise, generated once and re-used by every voice. */
function noise(c, { loop = true } = {}) {
  if (!noiseBuffer || noiseBuffer.sampleRate !== c.sampleRate) {
    noiseBuffer = c.createBuffer(1, Math.floor(c.sampleRate * 2), c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }

  const src = c.createBufferSource();
  src.buffer = noiseBuffer;
  src.loop = loop;
  return src;
}

/* Start a source and remember it, so stop() can cut it short. */
function fire(src, t, stopAt) {
  src.start(t);
  src.stop(stopAt);
  live.push(src);
  src.onended = () => {
    live = live.filter((s) => s !== src);
  };
}

const rand = (lo, hi) => lo + Math.random() * (hi - lo);

/* ── voices ───────────────────────────────────────────────────────────── */

/** Fat, wet frying. Bandpassed noise with the centre frequency wandering, so
 *  it breathes instead of sitting there like radio static. */
function sizzle(c, t, { dur = 1.6, gain = 0.3, centre = 3200, spread = 900 } = {}) {
  const src = noise(c);

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(centre, t);
  band.Q.value = 0.7;

  /* Slow wobble on the filter — the difference between oil and static. */
  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = rand(2.2, 3.6);
  const lfoGain = c.createGain();
  lfoGain.gain.value = spread;
  lfo.connect(lfoGain);
  lfoGain.connect(band.frequency);

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.08);
  amp.gain.setValueAtTime(gain, t + dur * 0.62);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  src.connect(band);
  band.connect(amp);
  amp.connect(master);

  fire(src, t, t + dur + 0.02);
  fire(lfo, t, t + dur + 0.02);
}

/** One seed hitting hot ghee: a resonant tick with almost no tail. */
function pop(c, t, { freq = rand(900, 2800), gain = 0.5 } = {}) {
  const src = noise(c, { loop: false });
  src.playbackRate.value = rand(0.8, 1.3);

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(freq, t);
  band.Q.value = rand(6, 14);

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + rand(0.05, 0.11));

  src.connect(band);
  band.connect(amp);
  amp.connect(master);

  fire(src, t, t + 0.18);
}

/** Water letting go of a bubble — pitch rises as the bubble shrinks. */
function bubble(c, t, { base = rand(150, 320), gain = 0.16 } = {}) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(base, t);
  osc.frequency.exponentialRampToValueAtTime(base * rand(2.2, 3.4), t + 0.06);

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

  osc.connect(amp);
  amp.connect(master);

  fire(osc, t, t + 0.14);
}

/** Steel ladle against a steel kadhai. High-Q noise plus one ringing partial. */
function clank(c, t, { gain = 0.22 } = {}) {
  const src = noise(c, { loop: false });

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(rand(2100, 3000), t);
  band.Q.value = 11;

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.005);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

  src.connect(band);
  band.connect(amp);
  amp.connect(master);
  fire(src, t, t + 0.2);

  const ring = c.createOscillator();
  ring.type = "triangle";
  ring.frequency.setValueAtTime(rand(1600, 2200), t);

  const ringAmp = c.createGain();
  ringAmp.gain.setValueAtTime(0.0001, t);
  ringAmp.gain.exponentialRampToValueAtTime(gain * 0.4, t + 0.006);
  ringAmp.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

  ring.connect(ringAmp);
  ringAmp.connect(master);
  fire(ring, t, t + 0.26);
}

/** Knife through onion into a wooden board: a dull thump with a bright edge. */
function chop(c, t) {
  const src = noise(c, { loop: false });

  const low = c.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(1100, t);
  low.Q.value = 1.2;

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.42, t + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

  src.connect(low);
  low.connect(amp);
  amp.connect(master);
  fire(src, t, t + 0.16);

  const wood = c.createOscillator();
  wood.type = "sine";
  wood.frequency.setValueAtTime(rand(150, 200), t);
  wood.frequency.exponentialRampToValueAtTime(70, t + 0.09);

  const woodAmp = c.createGain();
  woodAmp.gain.setValueAtTime(0.0001, t);
  woodAmp.gain.exponentialRampToValueAtTime(0.3, t + 0.005);
  woodAmp.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);

  wood.connect(woodAmp);
  woodAmp.connect(master);
  fire(wood, t, t + 0.14);
}

/** Masher into soft vegetable — chop's heavier cousin. */
function thud(c, t) {
  const body = c.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(120, t);
  body.frequency.exponentialRampToValueAtTime(48, t + 0.14);

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.4, t + 0.008);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);

  body.connect(amp);
  amp.connect(master);
  fire(body, t, t + 0.24);

  const squelch = noise(c, { loop: false });
  const low = c.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(700, t);

  const sAmp = c.createGain();
  sAmp.gain.setValueAtTime(0.0001, t);
  sAmp.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
  sAmp.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);

  squelch.connect(low);
  low.connect(sAmp);
  sAmp.connect(master);
  fire(squelch, t, t + 0.2);
}

/** The pressure cooker's whistle: a hard sine with vibrato and a breath of air. */
function whistle(c, t, { dur = 1.1 } = {}) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1900, t);
  osc.frequency.linearRampToValueAtTime(2250, t + 0.18);
  osc.frequency.setValueAtTime(2250, t + dur * 0.75);
  osc.frequency.linearRampToValueAtTime(2050, t + dur);

  const vib = c.createOscillator();
  vib.type = "sine";
  vib.frequency.value = 11;
  const vibGain = c.createGain();
  vibGain.gain.value = 55;
  vib.connect(vibGain);
  vibGain.connect(osc.frequency);

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.2, t + 0.12);
  amp.gain.setValueAtTime(0.2, t + dur * 0.72);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(amp);
  amp.connect(master);
  fire(osc, t, t + dur + 0.02);
  fire(vib, t, t + dur + 0.02);

  /* escaping steam under the tone */
  const air = noise(c);
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(2600, t);

  const airAmp = c.createGain();
  airAmp.gain.setValueAtTime(0.0001, t);
  airAmp.gain.exponentialRampToValueAtTime(0.1, t + 0.14);
  airAmp.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  air.connect(hp);
  hp.connect(airAmp);
  airAmp.connect(master);
  fire(air, t, t + dur + 0.02);
}

/** A chutki of powder landing on hot oil — brief, dry, high. */
function dust(c, t, { dur = 0.7 } = {}) {
  const src = noise(c);

  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(4200, t);
  hp.Q.value = 0.8;

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.13, t + 0.05);
  amp.gain.exponentialRampToValueAtTime(0.05, t + dur * 0.6);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  src.connect(hp);
  hp.connect(amp);
  amp.connect(master);
  fire(src, t, t + dur + 0.02);
}

/** Liquid falling from a height into a vessel — a rising, gargling band. */
function stream(c, t, { dur = 1.3 } = {}) {
  const src = noise(c);

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(700, t);
  band.frequency.exponentialRampToValueAtTime(1500, t + dur * 0.7);
  band.Q.value = 2.4;

  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.26, t + 0.09);
  amp.gain.setValueAtTime(0.26, t + dur * 0.7);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  src.connect(band);
  band.connect(amp);
  amp.connect(master);
  fire(src, t, t + dur + 0.02);

  for (let i = 0; i < 9; i += 1) bubble(c, t + rand(0.1, dur * 0.9), { gain: 0.09 });
}

/** Two tones a tritone apart, sagging. The sound of getting it wrong. */
function blat(c, t) {
  [196, 277].forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.55);

    const tone = c.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.setValueAtTime(1200, t);
    tone.Q.value = 0.7;

    const amp = c.createGain();
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(i ? 0.1 : 0.14, t + 0.03);
    amp.gain.setValueAtTime(i ? 0.1 : 0.14, t + 0.34);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    osc.connect(tone);
    tone.connect(amp);
    amp.connect(master);
    fire(osc, t, t + 0.64);
  });
}

/** The brass bell by the door. Inharmonic partials, long decay. */
function ting(c, t) {
  const partials = [1, 2.74, 5.41, 8.12];
  const gains = [0.22, 0.11, 0.06, 0.03];

  partials.forEach((mult, i) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(658 * mult, t);

    const amp = c.createGain();
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(gains[i], t + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 1.5 - i * 0.28);

    osc.connect(amp);
    amp.connect(master);
    fire(osc, t, t + 1.6);
  });
}

/* ── scenes ───────────────────────────────────────────────────────────── */

/**
 * What each cooking action sounds like. Keys match COOK_ACTIONS in
 * lib/recipes.js — the step says what it is, this decides how it sounds.
 */
const SCENES = {
  prep: (c, t) => {
    for (let i = 0; i < 5; i += 1) chop(c, t + i * rand(0.19, 0.26));
  },

  temper: (c, t) => {
    sizzle(c, t, { dur: 1.9, gain: 0.26, centre: 3800 });
    /* Seeds go off hardest just after they hit the ghee, then trail away. */
    for (let i = 0; i < 26; i += 1) {
      const at = t + 0.06 + Math.pow(Math.random(), 0.55) * 1.6;
      pop(c, at, { gain: rand(0.24, 0.55) });
    }
  },

  fry: (c, t) => {
    sizzle(c, t, { dur: 2.2, gain: 0.32, centre: 2600, spread: 700 });
    for (let i = 0; i < 8; i += 1) pop(c, t + rand(0.1, 2), { gain: rand(0.1, 0.24) });
    clank(c, t + 1.35, { gain: 0.13 });
  },

  boil: (c, t) => {
    for (let i = 0; i < 30; i += 1) bubble(c, t + rand(0, 1.5));
    whistle(c, t + 1.15, { dur: 1.2 });
  },

  stir: (c, t) => {
    sizzle(c, t, { dur: 1.8, gain: 0.18, centre: 1900, spread: 500 });
    [0.12, 0.62, 1.12, 1.5].forEach((d) => clank(c, t + d + rand(-0.04, 0.04)));
  },

  mash: (c, t) => {
    sizzle(c, t, { dur: 2, gain: 0.16, centre: 1500, spread: 400 });
    [0, 0.36, 0.72, 1.08, 1.44].forEach((d) => thud(c, t + d));
    clank(c, t + 1.75, { gain: 0.14 });
  },

  sprinkle: (c, t) => {
    dust(c, t, { dur: 0.9 });
    sizzle(c, t + 0.12, { dur: 1.2, gain: 0.14, centre: 4200, spread: 600 });
    for (let i = 0; i < 10; i += 1) pop(c, t + rand(0.1, 0.9), { gain: rand(0.06, 0.16) });
  },

  pour: (c, t) => {
    stream(c, t, { dur: 1.4 });
    sizzle(c, t + 0.15, { dur: 1.1, gain: 0.2, centre: 3000 });
  },

  serve: (c, t) => {
    clank(c, t, { gain: 0.16 });
    ting(c, t + 0.16);
  },

  /* ── the tasting bench ── */

  /** One chutki landing on the food. Barely there, which is the point. */
  pinch: (c, t) => {
    dust(c, t, { dur: 0.4 });
    pop(c, t + 0.06, { freq: rand(2200, 3400), gain: 0.1 });
  },

  /** A steel spoon going round a steel katori. */
  taste: (c, t) => {
    clank(c, t, { gain: 0.12 });
    clank(c, t + 0.19, { gain: 0.08 });
  },

  /** He liked it. */
  praise: (c, t) => {
    clank(c, t, { gain: 0.1 });
    ting(c, t + 0.14);
  },

  /** He did not. */
  ruined: (c, t) => {
    clank(c, t, { gain: 0.12 });
    blat(c, t + 0.08);
  },

  /** Too much chilli — someone is reaching for the water. */
  gulp: (c, t) => {
    blat(c, t);
    stream(c, t + 0.3, { dur: 0.85 });
  },
};

/* ── public API ───────────────────────────────────────────────────────── */

/** Cut everything currently sounding. */
export function stop() {
  const sources = live;
  live = [];
  sources.forEach((s) => {
    try {
      s.stop();
    } catch {
      /* already stopped — nothing to do */
    }
  });
}

/**
 * Play one cooking action. Returns false when there is nothing to play, so a
 * caller can tell "no Web Audio here" from "played it".
 */
export function play(action) {
  const scene = SCENES[action];
  if (!scene) return false;

  const c = audio();
  if (!c) return false;

  stop();
  scene(c, c.currentTime + 0.02);
  return true;
}

/** Release the context — for component unmount. */
export function dispose() {
  stop();
  ctx?.close?.();
  ctx = null;
  master = null;
  noiseBuffer = null;
}

export const CAN_PLAY = (action) => action in SCENES;
