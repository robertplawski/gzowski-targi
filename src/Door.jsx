import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import arrowImage from "./assets/arrow.png";
import doorHandleImage from "./assets/door-handle.svg";
export default function Door({
  name,
  url,
  color,
  icon,
  iconImage,
  isLocked,
  setLocked,
}) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const onClick = useCallback(async () => {
    if (isLocked) {
      return;
    }
    setClicked((val) => !val);
    setLocked(true);
    setTimeout(() => navigate(`/wnetrze${url}`), 800);
  }, [isLocked, setLocked, navigate, url]);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      type="button"
      className={`door-wrapper ${clicked && "clicked"}`}
      onClick={() => onClick()}
    >
      <div className="interior">
        <p>Zapraszamy...</p>
        <img alt="Strzałka" src={arrowImage}></img>
      </div>
      <div
        className="door"
        style={{
          backgroundColor: color,
        }}
      >
        <p className="icon">{icon}</p>
        <p className="name">{name}</p>
        <img alt={`Logo ${name}`} className="logo" src={iconImage}></img>
        <img alt={"Klamka"} className="handle" src={doorHandleImage} />
      </div>
    </div>
  );
}
