import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * Animated volumetric light rays (Avenna's CTA "Light Rays" component: 32 rays, colour
 * rgb(83,115,229), origin top-centre, slowly shifting). A tiny WebGL fragment shader that only
 * runs while visible; reduced-motion users get a single static frame; no WebGL → CSS fallback.
 */
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uColA;
uniform vec3 uColB;
float rays(float a, float t, float count, float speed, float seed){
  return 0.5 + 0.5 * sin(a * count + t * speed + seed);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 o = vec2(0.5, 1.08);
  vec2 d = uv - o;
  d.x *= uRes.x / uRes.y;
  float a = atan(d.x, -d.y);
  float dist = length(d);
  float t = uTime;
  float r = rays(a, t, 32.0, 0.35, 0.0) * 0.6
          + rays(a, t, 19.0, -0.27, 1.7) * 0.4;
  r *= 0.55 + 0.45 * rays(a, t, 53.0, 0.6, 4.1);
  r = pow(r, 1.6);
  float reach = exp(-dist * 1.35);
  float spread = smoothstep(1.35, 0.15, abs(a));
  float glow = exp(-dist * 4.0) * 0.55;
  float i = clamp(r * reach * spread * 1.25 + glow, 0.0, 1.0);
  vec3 col = mix(uColB, uColA, r) + vec3(glow * 0.6);
  gl_FragColor = vec4(col * i, i);
}`;
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

export function LightRays({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    gl.uniform3f(gl.getUniformLocation(prog, "uColA"), 83 / 255, 115 / 255, 229 / 255);
    gl.uniform3f(gl.getUniformLocation(prog, "uColB"), 32 / 255, 96 / 255, 223 / 255);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr * 0.6));
      canvas.height = Math.max(1, Math.round(height * dpr * 0.6));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return fallback ? (
    <div
      aria-hidden
      className={cn(
        "bg-[repeating-conic-gradient(from_160deg_at_50%_-8%,rgb(83_115_229/0.35)_0deg_2deg,transparent_2deg_6deg)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]",
        className,
      )}
    />
  ) : (
    <canvas ref={canvasRef} aria-hidden className={cn("block", className)} />
  );
}
