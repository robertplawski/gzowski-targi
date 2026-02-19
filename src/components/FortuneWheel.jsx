import { useRef } from "react";

export default function FortuneWheel({ entries }) {
  const fortuneWheelRef = useRef(null);
  const fraction = (index) => index / entries.length;

  const spin = () => {
    if (!fortuneWheelRef || !fortuneWheelRef.current) return;
    const revolutions = 2;

    const keyframes = [
      { rotate: "0deg" },
      { rotate: revolutions * 360 + "deg" },
    ];

    fortuneWheelRef.current.animate(keyframes, timing);
  };

  return (
    <div className="fortune-wheel-wrapper">
      <div className="fortune-wheel-hint">Dotknij, aby zakręcić kołem</div>

      <div className="fortune-wheel-flap"></div>
      <div ref={fortuneWheelRef} className="fortune-wheel" onMouseUp={spin}>
        {entries.map((_, index) => (
          <>
            <div
              style={{
                rotate: fraction(index) * 360 + "deg",
              }}
              className="fortune-wheel-pole-wrapper"
            >
              <div className="fortune-wheel-pole"></div>
            </div>
            <div
              style={{
                "--size": (1 / entries.length) * 100 + "%",
                backgroundColor: `hsl(${fraction(index) * 360},100%, 70%)`,
                rotate: fraction(index) * 360 + "deg",
              }}
              className="fortune-wheel-card"
            ></div>
          </>
        ))}
      </div>
    </div>
  );
}
