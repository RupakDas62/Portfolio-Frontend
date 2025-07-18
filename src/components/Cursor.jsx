import React, { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    const trailCursor = document.querySelector(".trail-cursor");

    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;

      trailCursor.style.left = `${trailX}px`;
      trailCursor.style.top = `${trailY}px`;

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Glowing trail only, since main cursor is image now */}
      <div
        className="trail-cursor fixed z-[9998] w-16 h-16 rounded-full pointer-events-none bg-cyan-400/40 blur-2xl opacity-80 shadow-[0_0_40px_#22d3ee]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

export default Cursor;
