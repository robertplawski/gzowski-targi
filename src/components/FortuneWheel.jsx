import { useCallback, useRef, useState } from "react";

export default function FortuneWheel({ entries }) {
  const [result, setResult] = useState(null);
  const [hasReset, setHasReset] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [startingAngle, setStartingAngle] = useState(0);
  const [debug, setDebug] = useState("");

  const fortuneWheelRef = useRef(null);
  const fraction = (index) => (index + 2) / entries.length;

  const calulateAngle = (wheel, e) => {
    const rect = wheel.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const angle = Math.atan2(dy, dx);
    return angle;
  };

  const preSpin = useCallback(
    (e) => {
      if (isSpinning) return;
      if (!hasReset) return;
      if (!isDragging) return;
      if (!fortuneWheelRef || !fortuneWheelRef.current) return;

      const { current: wheel } = fortuneWheelRef;

      const angle = calulateAngle(wheel, e);

      const degrees = (angle - startingAngle) * (180 / Math.PI);

      if (!wheel.style.rotate) {
        wheel.style.rotate = `${0}deg`;
      }

      wheel.style.rotate = `${degrees}deg`;
    },
    [startingAngle, hasReset, isDragging, isSpinning],
  );

  const reset = () => {
    if (!fortuneWheelRef || !fortuneWheelRef.current) return;
    if (hasReset) return;

    const duration = 400;
    const currentRotation =
      (fortuneWheelRef.current.style.rotate.replaceAll("deg", "") % 360) +
      "deg";

    const finalRotation = `${currentRotation < 180 ? 360 : 0}deg`;
    fortuneWheelRef.current.animate(
      [{ rotate: currentRotation }, { rotate: finalRotation }],
      {
        duration,
      },
    );
    setTimeout(
      () => (fortuneWheelRef.current.style.rotate = "0deg"),
      duration * 0.9,
    );

    setHasReset(true);
  };

  const spin = () => {
    if (!hasReset) {
      reset();
      return;
    }
    if (!fortuneWheelRef || !fortuneWheelRef.current) return;
    if (isSpinning) return;

    setIsDragging(false);

    const startingDegrees = fortuneWheelRef.current.style.rotate || "0deg";

    const randomIndex = Math.round(Math.random() * entries.length);

    const randomOffset = -((randomIndex - 1) * 360) / entries.length;

    const revolutions = parseInt(Math.random() * 5, 10) + 2;

    const dramaticLeeway = (360 / entries.length) * (Math.random() - 0.5) * 0.9;
    const rotation = `${revolutions * 360 + randomOffset + dramaticLeeway}deg`;

    const keyframes = [{ rotate: startingDegrees }, { rotate: rotation }];

    const randomDurationModifier = 1000 * Math.random() * 3;

    const cooldownMultiplier = 1.1;
    const duration = 3000 + revolutions * -100 + randomDurationModifier;
    const cooldown = duration * cooldownMultiplier;

    const timing = {
      duration,
      easing: "ease-out",
    };

    fortuneWheelRef.current.animate(keyframes, timing);
    setTimeout(
      () => (fortuneWheelRef.current.style.rotate = rotation),
      duration,
    );

    setIsSpinning(true);
    setHasReset(false);
    setResult(randomIndex);
    setTimeout(() => setIsSpinning(false), cooldown);
  };

  const onPressedUp = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (!isSpinning) {
      setIsDragging(false);
      spin();
    }
  };

  const onMove = preSpin;

  const onLeave = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!isDragging) return;
    if (!isSpinning) {
      setIsDragging(false);
      spin();
    }
  };

  const onPressedDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    if (fortuneWheelRef.current)
      setStartingAngle(calulateAngle(fortuneWheelRef.current, e));

    if (!isSpinning) setIsDragging(true);
  };

  return (
    <>
      {debug && (
        <p style={{ position: "absolute", top: "0px", right: "0px" }}>
          {debug}
        </p>
      )}
      <div className="fortune-wheel-wrapper">
        <div
          className={`fortune-wheel-hint ${isDragging || isSpinning || !hasReset ? "invisible" : ""}`}
        >
          Zakręć kołem!
        </div>
        <div
          className={`fortune-wheel-popup ${hasReset || isSpinning || !result ? "invisible" : ""}`}
        >
          <p>🎉 wylosowano nr. {result} 🎉</p>
          <p className="small">kliknij aby zresetować</p>
        </div>

        <div className="fortune-wheel-flap"></div>

        {/** biome-ignore lint/a11y/noStaticElementInteractions: <this is a fortune wheel> */}
        <div
          ref={fortuneWheelRef}
          className="fortune-wheel"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onPointerUp={onPressedUp}
          onPointerDown={onPressedDown}
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
    </>
  );
}
