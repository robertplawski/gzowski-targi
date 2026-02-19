import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useParams } from "react-router";
import { InformationContext } from "../InformationContext";
import YoutubeVideo from "./YoutubeVideo";
import FortuneWheel from "../components/FortuneWheel";

export default function Interior() {
  const params = useParams();
  const { getByUrl } = useContext(InformationContext);
  const { secondaryVideoId, videoId, fortuneWheel } = getByUrl(params.name);
  return (
    <Fade>
      <div className="videos-container">
        <div
          className={`videos-horizontal ${secondaryVideoId || fortuneWheel ? "dual" : ""}`}
        >
          <YoutubeVideo videoId={videoId} />
          {secondaryVideoId && (
            <YoutubeVideo autoplay={0} videoId={secondaryVideoId} />
          )}
          {fortuneWheel && <FortuneWheel {...fortuneWheel} />}
        </div>
        <Link to="/">
          <button type="button" className="back">
            Powrót do strony głównej
          </button>
        </Link>
      </div>
    </Fade>
  );
}
