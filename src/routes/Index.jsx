import { useCallback, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";
import szkolaImage from "../assets/szkola.jpg";
export default function Index() {
  const navigate = useNavigate();
  const [isClicked, setClicked] = useState(false);
  const [isLocked, setLocked] = useState(false);
  const onClick = useCallback(async () => {
    if (isLocked) {
      return;
    }
    setClicked(true);
    setLocked(true);
    setTimeout(() => navigate("/drzwi"), 800);
  }, [isLocked, navigate]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreen = useCallback(async () => {
    document.body.requestFullscreen();
    setIsFullscreen(true);
  }, []);
  return (
    <Fade>
      <section className={`main-section ${isClicked ? "clicked" : ""}`}>
        {!isFullscreen && (
          <button type="button" onClick={fullscreen} className="fullscreen">
            Fullscreen
          </button>
        )}

        {/** biome-ignore lint/a11y/useAltText: <explanation> */}
        {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img onClick={onClick} className="school-image" src={szkolaImage} />
        <Fade direction="up" className="title">
          Kliknij, aby poznać naszą szkołę
        </Fade>
      </section>
    </Fade>
  );
}
