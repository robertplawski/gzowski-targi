import { useRef, useState } from "react";

export default function FortuneWheel({ entries }) {
  const [result, setResult] = useState(null);
  const [hasReset, setHasReset] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fortuneWheelRef = useRef(null);
  const fraction = (index) => (index + 2) / entries.length;

  const preSpin = (e) => {
    return;
    if (isSpinning) return;
    if (!hasReset) return;
    if (!isDragging) return;
    if (!fortuneWheelRef || !fortuneWheelRef.current) return;
    const { movementX, movementY } = e;
    const sum = movementX + movementY;
    if (!fortuneWheelRef.current.style.rotate) {
      fortuneWheelRef.current.style.rotate = 0 + "deg";
    }
    const newrot =
      parseInt(fortuneWheelRef.current.style.rotate.replaceAll("deg", "")) +
      sum +
      "deg";
    fortuneWheelRef.current.animate([{ rotate: newrot }], {
      duration: 0,
      fill: "forwards",
    });
  };

  const spin = () => {
    if (!fortuneWheelRef || !fortuneWheelRef.current) return;
    if (!hasReset) {
      fortuneWheelRef.current.animate([{ rotate: "0deg" }], {
        duration: 800,
        fill: "forwards",
      });

      setHasReset(true);
      return;
    }
    if (isSpinning) return;

    setIsDragging(false);

    const randomIndex = Math.round(Math.random() * entries.length);

    const randomOffset = -((randomIndex - 1) * 360) / entries.length;

    const revolutions = parseInt(Math.random() * 5) + 2;

    const keyframes = [
      { rotate: "0deg" },
      { rotate: revolutions * 360 + randomOffset + "deg" },
    ];

    const randomDurationModifier = 1000 * Math.random() * 3;
    const duration = 3000 + revolutions * 100 + randomDurationModifier;
    const timing = {
      duration,
      easing: "ease-out",
      fill: "forwards",
    };

    fortuneWheelRef.current.animate(keyframes, timing);

    const cooldownMultiplier = 1.1;
    setIsSpinning(true);
    setHasReset(false);
    setResult(randomIndex);
    setTimeout(() => setIsSpinning(false), duration * cooldownMultiplier);
  };

  return (
    <div className="fortune-wheel-wrapper">
      <div
        className={`fortune-wheel-hint ${isSpinning || !hasReset ? "invisible" : ""}`}
      >
        Dotknij, aby zakręcić kołem
      </div>
      <div
        className={`fortune-wheel-popup ${hasReset || isSpinning || !result ? "invisible" : ""}`}
      >
        <p>🎉 wylosowano nr. {result} 🎉</p>
        <p className="small">kliknij aby zresetować</p>
      </div>

      <div className="fortune-wheel-flap"></div>

      {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
      <div
        ref={fortuneWheelRef}
        className="fortune-wheel"
        onMouseMove={preSpin}
        onMouseUp={!isSpinning ? spin : null}
        onMouseDown={() => setIsDragging(true)}
      >
        {entries.map((_, index) => (
          <>
            <div
              style={{
                "--length": entries.length,
                "--size": (1 / entries.length) * 100 + "%",
                backgroundColor: `hsl(${fraction(index) * 360},100%, 70%)`,
                rotate: fraction(index) * 360 + "deg",
              }}
              className="fortune-wheel-card"
            >
              <div
                style={{
                  rotate: (1 / entries.length) * -2 * 360 + "deg",
                }}
              >
                <p className="fortune-wheel-card-text">{index + 1}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
