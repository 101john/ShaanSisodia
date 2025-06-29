import React, { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundCubes: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);

  const gridSize = 8; // Fewer cubes for larger size
  const maxAngle = 45;
  const radius = 3;

  const tiltAt = useCallback(
    (rowCenter: number, colCenter: number) => {
      if (!sceneRef.current) return;
      sceneRef.current
        .querySelectorAll<HTMLDivElement>(".bg-cube")
        .forEach((cube) => {
          const r = +cube.dataset.row!;
          const c = +cube.dataset.col!;
          const dist = Math.hypot(r - rowCenter, c - colCenter);
          if (dist <= radius) {
            const pct = 1 - dist / radius;
            const angle = pct * maxAngle;
            gsap.to(cube, {
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
              rotateX: -angle * 0.7,
              rotateY: angle * 0.7,
              rotateZ: angle * 0.2,
            });
          } else {
            gsap.to(cube, {
              duration: 0.8,
              ease: "power2.out",
              overwrite: true,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
            });
          }
        });
    },
    [radius, maxAngle]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = sceneRef.current!.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const colCenter = (e.clientX - rect.left) / cellW;
      const rowCenter = (e.clientY - rect.top) / cellH;

      tiltAt(rowCenter, colCenter);

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt]
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll<HTMLDivElement>(".bg-cube").forEach((cube) =>
      gsap.to(cube, {
        duration: 1.2,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        ease: "power2.out",
      })
    );
  }, []);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const colHit = Math.floor((e.clientX - rect.left) / cellW);
      const rowHit = Math.floor((e.clientY - rect.top) / cellH);

      const rings: Record<number, HTMLDivElement[]> = {};
      sceneRef.current
        .querySelectorAll<HTMLDivElement>(".bg-cube")
        .forEach((cube) => {
          const r = +cube.dataset.row!;
          const c = +cube.dataset.col!;
          const dist = Math.hypot(r - rowHit, c - colHit);
          const ring = Math.round(dist);
          if (!rings[ring]) rings[ring] = [];
          rings[ring].push(cube);
        });

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((ring) => {
          const delay = ring * 0.08;
          const edges = rings[ring].flatMap((cube) =>
            Array.from(cube.querySelectorAll<HTMLElement>(".cube-edge"))
          );

          // Subtle ripple effect on the wireframe edges
          gsap.to(edges, {
            borderColor: "rgba(6, 182, 212, 0.4)",
            duration: 0.2,
            delay,
            ease: "power2.out",
          });
          gsap.to(edges, {
            borderColor: "rgba(6, 182, 212, 0.08)",
            duration: 0.6,
            delay: delay + 0.2,
            ease: "power2.out",
          });
        });
    },
    [gridSize]
  );

  useEffect(() => {
    if (!sceneRef.current) return;
    simPosRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    simTargetRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    const speed = 0.01; // Slower auto-animation
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);
    };
  }, [gridSize, tiltAt]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", resetAll);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", resetAll);
      el.removeEventListener("click", onClick);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick]);

  const cells = Array.from({ length: gridSize });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
      <div
        ref={sceneRef}
        className="grid w-full h-full pointer-events-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: '8px',
          perspective: "2000px",
          padding: '20px',
        }}
      >
        {cells.map((_, r) =>
          cells.map((__, c) => (
            <div
              key={`${r}-${c}`}
              className="bg-cube relative w-full h-full [transform-style:preserve-3d]"
              data-row={r}
              data-col={c}
              style={{ minHeight: '80px' }}
            >
              {/* Wireframe cube edges - 12 edges total */}
              
              {/* Front face edges */}
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.08))',
                  transform: 'translateZ(40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.08))',
                  transform: 'translateZ(40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.08))',
                  transform: 'translateZ(40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  right: 0,
                  top: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.08))',
                  transform: 'translateZ(40px)',
                }}
              />

              {/* Back face edges */}
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.04), rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.04))',
                  transform: 'translateZ(-40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.04), rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.04))',
                  transform: 'translateZ(-40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.04), rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.04))',
                  transform: 'translateZ(-40px)',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  right: 0,
                  top: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.04), rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.04))',
                  transform: 'translateZ(-40px)',
                }}
              />

              {/* Connecting edges (front to back) */}
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  top: 0,
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.06), rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.06))',
                  transform: 'rotateY(-90deg) translateZ(40px)',
                  transformOrigin: 'left center',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  right: 0,
                  top: 0,
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.06), rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.06))',
                  transform: 'rotateY(90deg) translateZ(40px)',
                  transformOrigin: 'right center',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  left: 0,
                  bottom: 0,
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.06), rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.06))',
                  transform: 'rotateY(-90deg) translateZ(40px)',
                  transformOrigin: 'left center',
                }}
              />
              <div
                className="cube-edge absolute"
                style={{
                  right: 0,
                  bottom: 0,
                  width: '2px',
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.06), rgba(6, 182, 212, 0.12), rgba(6, 182, 212, 0.06))',
                  transform: 'rotateY(90deg) translateZ(40px)',
                  transformOrigin: 'right center',
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BackgroundCubes;