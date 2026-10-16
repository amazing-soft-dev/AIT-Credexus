import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * "Light Rays" background, ported 1:1 from the Avenna template's Framer component (which runs
 * this shader through three.js — here it's plain WebGL, ~3 KB instead of ~560 KB).
 *
 * Two sun-ray sources sit just above the top edge (x = position %, y = -40% / -50% of height);
 * their angular intensity wobbles over time and fades with distance and depth, giving the
 * "sunlight under deep water" look. Avenna's settings: rays 32, reach 16, intensity 13,
 * position 50, colour rgb(83, 115, 229), animation speed 10.
 *
 * Optional floating particles reproduce Avenna's star/dust layer (80 grey dots, size 1,
 * slow upward drift with sideways sway).
 *
 * The loop only runs while the element is on screen; reduced-motion users get one static
 * frame; without WebGL it falls back to a CSS gradient.
 */
type Props = {
  className?: string;
  /** 0–100, as in Framer */
  intensity?: number;
  rays?: number;
  reach?: number;
  position?: number;
  color?: readonly [number, number, number];
  /** Framer "speed"; 10 = real-time seconds */
  speed?: number;
  particles?: number;
};

const FRAG = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  float diagonal = length(u_resolution);
  return clamp(
      (.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
      (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
      u_reach, 1.0) *
    clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  float speed = u_rays * 10.0;

  vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
  float raySeedA1 = 36.2214 * speed;
  float raySeedB1 = 21.11349 * speed;
  float raySpeed1 = 1.5 * speed;

  vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
  float raySeedA2 = 22.39910 * speed;
  float raySeedB2 = 18.0234 * speed;
  float raySpeed2 = 1.1 * speed;

  float strength1 = rayStrength(u_rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
  float strength2 = rayStrength(u_rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);

  float brightness = 1.0 * u_reach - (coord.y / u_resolution.y);
  float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);

  float alpha1 = strength1 * attenuation * u_colors[0].a;
  float alpha2 = strength2 * attenuation * u_colors[1].a;
  vec3 blended = u_colors[0].rgb * alpha1 + u_colors[1].rgb * alpha2;
  float a = alpha1 + alpha2 * (1.0 - alpha1);
  vec3 rgb = blended / max(a, 0.0001);
  gl_FragColor = vec4(rgb * a, a);
}`;
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

/** Framer's mapRange(value, 0, 100, 0, max) */
const map = (v: number, max: number) => (v / 100) * max;

type Particle = { x: number; y: number; r: number; v: number; phase: number; sway: number };

const AVENNA_BLUE = [83, 115, 229] as const;

export function LightRays({
  className,
  intensity = 13,
  rays = 32,
  reach = 16,
  position = 50,
  color = AVENNA_BLUE,
  speed = 10,
  particles = 0,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const glRef = React.useRef<HTMLCanvasElement>(null);
  const dotsRef = React.useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = React.useState(false);
  const [r, g, b] = color;

  React.useEffect(() => {
    const canvas = glRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      antialias: false,
      alpha: true,
    });
    if (!gl) {
      setFallback(true);
      return;
    }
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const c = [r / 255, g / 255, b / 255, 1];
    gl.uniform4fv(u("u_colors"), new Float32Array([...c, ...c]));
    gl.uniform1f(u("u_intensity"), map(intensity, 0.5));
    gl.uniform1f(u("u_rays"), map(rays, 0.3));
    gl.uniform1f(u("u_reach"), map(reach, 0.5));
    const uRes = u("u_resolution");
    const uTime = u("u_time");
    const uPos1 = u("u_rayPos1");
    const uPos2 = u("u_rayPos2");

    // Particles live on a 2D canvas above the rays.
    const dots = dotsRef.current;
    const ctx = particles > 0 ? (dots?.getContext("2d") ?? null) : null;
    let field: Particle[] = [];

    let W = 1;
    let H = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      // Soft gradients don't need full resolution: render at half size and let CSS upscale.
      canvas.width = Math.max(1, Math.round(W * 0.5));
      canvas.height = Math.max(1, Math.round(H * 0.5));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uPos1, (position / 100) * canvas.width, -0.4 * canvas.height);
      gl.uniform2f(uPos2, (position / 100 + 0.02) * canvas.width, -0.5 * canvas.height);
      if (ctx && dots) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        dots.width = Math.round(W * dpr);
        dots.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (field.length === 0) {
          field = Array.from({ length: particles }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 0.5 + Math.random(), // size 1, sizeRandomness 1
            v: 0.1 * (0.2 + Math.random()), // speed 0.1, speedRandomness 1
            phase: Math.random() * Math.PI * 2,
            sway: 9 * (0.7 + Math.random() * 0.3), // swayAmount 9, swayRandomness .3
          }));
        }
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let time = Math.random() * 1e4;
    let last = performance.now();
    let raf = 0;
    let visible = false;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      time += (dt * speed) / 1000 / 10;
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgb(149, 149, 149)";
        for (const p of field) {
          p.y -= p.v * (dt / 16);
          if (p.y < -4) {
            p.y = H + 4;
            p.x = Math.random() * W;
          }
          const x = p.x + Math.sin(now * 0.0006 + p.phase) * p.sway;
          ctx.globalAlpha = 0.25 + 0.75 * Math.max(0, 1 - p.y / H);
          ctx.beginPath();
          ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      cancelAnimationFrame(raf);
      last = performance.now();
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(wrap);
    // Paint one frame right away (no empty flash; also the static frame for reduced motion).
    frame(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity, rays, reach, position, r, g, b, speed, particles]);

  return (
    <div ref={wrapRef} aria-hidden className={cn("pointer-events-none overflow-hidden", className)}>
      {fallback ? (
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(83_115_229/0.45),transparent_70%)]" />
      ) : (
        <canvas ref={glRef} className="absolute inset-0 size-full" />
      )}
      {particles > 0 && <canvas ref={dotsRef} className="absolute inset-0 size-full" />}
    </div>
  );
}
